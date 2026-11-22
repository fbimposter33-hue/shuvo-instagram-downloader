import React from "react";

import { useTranslations } from "next-intl";

import { Facebook, Instagram, Music2, Youtube } from "lucide-react";

import { homeSections } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Shuvo Ahmed's other free downloaders — the same cross-links used on his
// YouTube and TikTok downloader sites. All URLs verified live 2026-11-22.
const downloaders = [
  {
    key: "youtube",
    url: "https://saytd.vercel.app",
    Icon: Youtube,
    chipClass: "bg-[#FF0000]",
  },
  {
    key: "facebook",
    url: "https://fb-video-downloader-byshuvo.vercel.app",
    Icon: Facebook,
    chipClass: "bg-[#1877F2]",
  },
  {
    key: "tiktok",
    url: "https://tiktok-web-shuvo.vercel.app",
    Icon: Music2,
    chipClass: "bg-black dark:bg-gray-950",
  },
  {
    key: "instagram",
    url: null, // this site
    Icon: Instagram,
    chipClass: "bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600",
  },
] as const;

export function MoreDownloaders() {
  const t = useTranslations("pages.home.moreDownloaders");

  return (
    <section
      id={homeSections.moreDownloaders}
      className="w-full scroll-mt-12 bg-gradient-to-b from-white to-gray-50 py-12 md:py-24 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="mb-2 inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700 dark:bg-teal-800 dark:text-teal-50">
              {t("badge")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
              {t("description")}
            </p>
          </div>

          <div className="mt-8 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {downloaders.map(({ key, url, Icon, chipClass }) => {
              const card = (
                <>
                  {url === null && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-500 px-3 py-0.5 text-xs font-semibold whitespace-nowrap text-white">
                      {t("youAreHere")}
                    </span>
                  )}
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl",
                      chipClass
                    )}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-base font-bold sm:text-lg">
                    {t(`${key}.name`)}
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">
                    {t(`${key}.tagline`)}
                  </p>
                </>
              );

              const cardClass =
                "relative flex flex-col items-center space-y-3 rounded-xl border bg-white p-4 pt-6 shadow-sm sm:p-6 sm:pt-8 dark:bg-gray-800";

              return url === null ? (
                <div
                  key={key}
                  aria-current="page"
                  className={cn(cardClass, "ring-2 ring-teal-500")}
                >
                  {card}
                </div>
              ) : (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    cardClass,
                    "transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                  )}
                >
                  {card}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
