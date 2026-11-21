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
    <div className={cn("w-full space-y-2", props.className)}>
      {errorMessage ? (
        <p className="h-4 text-sm text-red-500 sm:text-start">{errorMessage}</p>
      ) : (
        <div className="h-4"></div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-2 sm:flex-row sm:items-end"
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
                    />
                    {isShowClearButton && (
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={clearUrlField}
                        className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 cursor-pointer"
                      >
                        <X className="text-red-500" />
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
            className="bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-600"
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
        <p className="text-center text-xs text-amber-600 dark:text-amber-400">
          {t("fetching")}
        </p>
      ) : (
        <p className="text-muted-foreground text-center text-xs">{t("hint")}</p>
      )}

      {result && (
        <div className="mx-auto w-full max-w-xl space-y-3 rounded-xl border bg-white p-4 text-left shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-start gap-3">
            {result.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.thumbnail}
                alt={result.title}
                className="h-16 w-16 shrink-0 rounded-lg object-cover"
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
                className="w-full bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-600"
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
                className="w-full justify-between hover:border-teal-500 hover:text-teal-600"
              >
                <span className="flex items-center gap-2">
                  {mediaIcon(media)}
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
