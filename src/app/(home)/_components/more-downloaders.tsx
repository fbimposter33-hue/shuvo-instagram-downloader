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
      className="w-full scroll-mt-12 py-12 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <div className="shadow-hard-sm inline-block -rotate-1 rounded-full border-2 border-[#2E1B33] bg-[#FFB020] px-4 py-1 font-label text-[13px] font-bold tracking-wide text-[#2E1B33] uppercase dark:border-[#FBF8F1]">
              {t("badge")}
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
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
                    <span className="shadow-hard-sm absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2 rounded-full border-2 border-[#2E1B33] bg-[#FF2E7E] px-3 py-0.5 font-label text-xs font-bold whitespace-nowrap text-white dark:border-[#FBF8F1]">
                      {t("youAreHere")}
                    </span>
                  )}
                  <div
                    className={cn(
                      "shadow-hard-sm flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#2E1B33] dark:border-[#FBF8F1]",
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
                "relative flex flex-col items-center space-y-3 rounded-[28px] border-2 border-[#F3E7D3] bg-white p-4 pt-6 shadow-hard-sm sm:p-6 sm:pt-8 dark:border-white/10 dark:bg-white/5";

              return url === null ? (
                <div
                  key={key}
                  aria-current="page"
                  className={cn(
                    cardClass,
                    "shadow-[4px_4px_0_0_#FF2E7E] ring-2 ring-[#FF2E7E]"
                  )}
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
                    "transition-all duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-hard"
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
