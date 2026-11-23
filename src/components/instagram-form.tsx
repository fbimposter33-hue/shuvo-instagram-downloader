"use client";

import React from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Download, FileAudio, FileImage, FileVideo, Loader2, X } from "lucide-react";

import {
  cn,
  getPostShortcode,
  isShortcodePresent,
  normalizeInstagramUrl,
} from "@/lib/utils";
import { useGetInstagramPostMutation } from "@/features/react-query/mutations/instagram";
import {
  InstagramApiError,
} from "@/features/api/requests/instagram";
import {
  InstagramMedia,
  InstagramPostResult,
} from "@/features/api/_dto/instagram";

// 5 minutes
const CACHE_TIME = 5 * 60 * 1000;

const useFormSchema = () => {
  const t = useTranslations("components.instagramForm.inputs");

  return z.object({
    url: z
      .string({ required_error: t("url.validation.required") })
      .trim()
      .min(1, {
        message: t("url.validation.required"),
      })
      .refine(
        (value) =>
          /^https:\/\/(www\.)?instagram\.com\//i.test(value) &&
          isShortcodePresent(value),
        { message: t("url.validation.invalid") }
      ),
  });
};

function triggerDownload(media: InstagramMedia, shortcode: string, index: number) {
  // Ensure we are in a browser environment
  if (typeof window === "undefined") return;

  const filename = `shuvo-insta-${shortcode}-${index + 1}.${media.extension}`;

  // Route through the proxy so the browser saves the file instead of
  // opening it (the media links are cross-origin short links).
  const proxyUrl = new URL("/api/download-proxy", window.location.origin);
  proxyUrl.searchParams.append("url", media.url);
  proxyUrl.searchParams.append("filename", filename);

  const link = document.createElement("a");
  link.href = proxyUrl.toString();
  link.target = "_blank";
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

type CachedResult = {
  result?: InstagramPostResult;
  expiresAt: number;
  invalid?: {
    messageKey: string;
  };
};

export function InstagramForm(props: { className?: string }) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const cachedResults = React.useRef(new Map<string, CachedResult>());
  const autoFetchedRef = React.useRef(false);

  const [result, setResult] = React.useState<InstagramPostResult | null>(null);
  const [resultShortcode, setResultShortcode] = React.useState<string>("post");
  const [downloadAllProgress, setDownloadAllProgress] = React.useState<{
    current: number;
    total: number;
  } | null>(null);

  const t = useTranslations("components.instagramForm");

  const {
    isError,
    isPending,
    mutateAsync: getInstagramPost,
  } = useGetInstagramPostMutation();

  const formSchema = useFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const errorMessage = form.formState.errors.url?.message;

  const isDisabled = isPending || !form.formState.isDirty;
  const isShowClearButton = form.watch("url").length > 0;

  function clearUrlField() {
    form.setValue("url", "");
    form.clearErrors("url");
    setResult(null);
    inputRef.current?.focus();
  }

  function setCachedResult(
    cacheKey: string,
    result?: InstagramPostResult,
    invalid?: CachedResult["invalid"]
  ) {
    cachedResults.current?.set(cacheKey, {
      result,
      expiresAt: Date.now() + CACHE_TIME,
      invalid,
    });
  }

  function getCachedResult(cacheKey: string) {
    const cached = cachedResults.current?.get(cacheKey);

    if (!cached) {
      return null;
    }

    if (cached.expiresAt < Date.now()) {
      cachedResults.current.delete(cacheKey);
      return null;
    }

    return cached;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isError) {
      toast.dismiss("toast-error");
    }

    const cleanUrl = normalizeInstagramUrl(values.url);
    const shortcode = getPostShortcode(cleanUrl) || "post";

    const cached = getCachedResult(cleanUrl);
    if (cached?.invalid) {
      form.setError("url", { message: t(cached.invalid.messageKey) });
      return;
    }

    if (cached?.result) {
      setResult(cached.result);
      setResultShortcode(shortcode);
      return;
    }

    setResult(null);
    setDownloadAllProgress(null);

    try {
      const post = await getInstagramPost({ url: cleanUrl });

      setResult(post);
      setResultShortcode(shortcode);
      setCachedResult(cleanUrl, post);
      toast.success(t("toasts.success"), {
        id: "toast-success",
        position: "top-center",
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof InstagramApiError) {
        const errorMessageKey = `serverErrors.${error.errorKey}`;
        form.setError("url", { message: t(errorMessageKey) });
        if (error.errorKey === "notFound" || error.errorKey === "noMedia") {
          setCachedResult(cleanUrl, undefined, {
            messageKey: errorMessageKey,
          });
        }
      } else {
        toast.error(t("toasts.error"), {
          dismissible: true,
          id: "toast-error",
          position: "top-center",
        });
      }
    }
  }

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Share-link support: ?url=<instagram-link> auto-fills and auto-fetches,
  // the same behaviour as Shuvo's YouTube downloader.
  React.useEffect(() => {
    if (autoFetchedRef.current) return;
    autoFetchedRef.current = true;

    const shared = new URLSearchParams(window.location.search).get("url");
    if (shared && /^https:\/\/(www\.)?instagram\.com\//i.test(shared) && isShortcodePresent(shared)) {
      form.setValue("url", shared, { shouldDirty: true });
      void form.handleSubmit(onSubmit)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Browsers only allow one automatic download at a time, so the files
  // are triggered one by one with a short gap. The first click usually
  // makes the browser ask permission for multiple downloads.
  function downloadAll() {
    if (!result || downloadAllProgress) return;
    const total = result.medias.length;
    setDownloadAllProgress({ current: 0, total });
    result.medias.forEach((media, index) => {
      setTimeout(() => {
        triggerDownload(media, resultShortcode, index);
        setDownloadAllProgress({ current: index + 1, total });
        if (index === total - 1) {
          setTimeout(() => setDownloadAllProgress(null), 1000);
        }
      }, index * 900);
    });
  }

  const mediaIcon = (media: InstagramMedia) => {
    if (media.type === "video") return <FileVideo className="h-4 w-4" />;
    if (media.type === "image") return <FileImage className="h-4 w-4" />;
    if (media.type === "audio") return <FileAudio className="h-4 w-4" />;
    return <Download className="h-4 w-4" />;
  };

  const mediaLabel = (media: InstagramMedia, index: number) => {
    const typeLabel = t(`result.types.${media.type}`);
    const detail = media.quality || media.resolution;
    return detail
      ? `${typeLabel} · ${detail}`
      : `${typeLabel} ${media.type === "image" ? index + 1 : ""}`.trim();
  };

  return (
    <div className={cn("w-full", props.className)}>
      <div className="card-goriber p-4 text-left shadow-[6px_6px_0_0_#2E1B33,0_18px_40px_rgba(255,46,126,0.3)] sm:p-5 dark:border-white/15 dark:bg-[#2E1B33] dark:shadow-[6px_6px_0_0_rgba(251,248,241,0.9),0_18px_40px_rgba(255,46,126,0.3)]">
        <div className="mb-2 flex min-h-5 items-center">
          {errorMessage ? (
            <p className="text-sm font-medium text-red-500">{errorMessage}</p>
          ) : null}
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-3 sm:flex-row sm:items-center"
          >
          <FormField
            control={form.control}
            name="url"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">
                  {t("inputs.url.label")}
                </FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      {...field}
                      type="url"
                      ref={inputRef}
                      minLength={1}
                      maxLength={255}
                      placeholder={t("inputs.url.placeholder")}
                      className="h-14 rounded-2xl border-2 border-[#E1DAD0] bg-[#FFF9F0] px-5 pr-14 text-base shadow-none transition-all duration-200 focus-visible:border-[#FF2E7E] focus-visible:ring-4 focus-visible:ring-[#FF2E7E]/25 md:text-base dark:border-white/15 dark:bg-white/5"
                    />
                    {isShowClearButton && (
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={clearUrlField}
                        className="shadow-hard-sm absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl border-2 border-[#E1DAD0] bg-white text-[#2E1B33] transition-all duration-200 hover:bg-[#FFF9F0] active:translate-y-[-45%] dark:border-white/20 dark:bg-white/10 dark:text-[#FBF8F1]"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={isDisabled}
            type="submit"
            className="h-14 shrink-0 rounded-2xl border-2 border-[#2E1B33] bg-[#FF2E7E] px-7 font-label text-base font-bold text-white shadow-[4px_4px_0_0_#2E1B33,0_8px_20px_rgba(255,46,126,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FF2E7E] active:translate-y-0 active:shadow-none disabled:opacity-60 dark:border-[#FBF8F1]"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {t("submit")}
          </Button>
          </form>
        </Form>
        {isPending ? (
          <p className="mt-3 text-center text-xs font-medium text-amber-600 dark:text-amber-400">
            {t("fetching")}
          </p>
        ) : (
          <p className="text-muted-foreground mt-3 text-center text-xs">
            {t("hint")}
          </p>
        )}
      </div>

      {result && (
        <div className="shadow-hard mx-auto mt-4 w-full max-w-xl space-y-3 rounded-[28px] border-2 border-[#F3E7D3] bg-white p-4 text-left sm:p-5 dark:border-white/15 dark:bg-[#2E1B33]">
          <div className="flex items-start gap-3">
            {result.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.thumbnail}
                alt={result.title}
                className="h-20 w-20 shrink-0 rounded-2xl border-2 border-[#F3E7D3] object-cover dark:border-white/15"
                loading="lazy"
              />
            )}
            <p className="line-clamp-3 text-sm font-medium">{result.title}</p>
          </div>
          <p className="text-muted-foreground text-xs">{t("result.ready")}</p>
          {result.medias.length > 1 && (
            <div className="space-y-1">
              <Button
                type="button"
                onClick={downloadAll}
                disabled={!!downloadAllProgress}
                className="shadow-hard h-12 w-full rounded-2xl border-2 border-[#2E1B33] bg-[#00A878] font-label text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#00A878] active:translate-y-0 active:shadow-none disabled:opacity-60 dark:border-[#FBF8F1]"
              >
                {downloadAllProgress ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {downloadAllProgress
                  ? t("result.downloading", {
                      current: downloadAllProgress.current,
                      total: downloadAllProgress.total,
                    })
                  : t("result.downloadAll", { count: result.medias.length })}
              </Button>
              {downloadAllProgress && (
                <p className="text-muted-foreground text-center text-xs">
                  {t("result.downloadAllHint")}
                </p>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2">
            {result.medias.map((media, index) => (
              <Button
                key={`${media.url}-${index}`}
                type="button"
                variant="outline"
                onClick={() => triggerDownload(media, resultShortcode, index)}
                className="shadow-hard-sm h-12 w-full justify-between rounded-2xl border-2 border-[#E1DAD0] bg-white px-4 font-label font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF2E7E] hover:bg-white hover:text-[#FF2E7E] dark:border-white/15 dark:bg-white/5"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#2E1B33]/10 bg-[#FFF0F6] text-[#FF2E7E] dark:border-white/15 dark:bg-white/10">
                    {mediaIcon(media)}
                  </span>
                  {mediaLabel(media, index)}
                </span>
                <span className="flex items-center gap-1 text-xs uppercase">
                  {media.extension}
                  <Download className="h-4 w-4" />
                </span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
