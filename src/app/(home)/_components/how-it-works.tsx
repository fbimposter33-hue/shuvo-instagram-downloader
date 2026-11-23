import React from "react";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

import { Copy, Download, Clipboard } from "lucide-react";

import { homeLinks, homeSections } from "@/lib/constants";

const stepCardClass =
  "h-full rounded-[28px] border-2 border-[#F3E7D3] bg-white p-6 shadow-hard-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hard dark:border-white/10 dark:bg-white/5";

const stepTileClass =
  "shadow-hard-sm z-10 flex h-14 w-14 rotate-3 items-center justify-center rounded-2xl border-2 border-[#2E1B33] bg-[#FF2E7E] text-2xl font-extrabold text-white dark:border-[#FBF8F1]";

const iconTileClass =
  "flex h-12 w-12 items-center justify-center rounded-xl border-2 border-[#F3E7D3] bg-[#FFF9F0] dark:border-white/10 dark:bg-white/10";

export function HowItWorks() {
  const t = useTranslations("pages.home.howItWorks");

  return (
    <section
      id={homeSections.howItWorks}
      className="w-full scroll-mt-12 py-12 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
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

          {/* Desktop version */}
          <div className="relative mx-auto mt-12 hidden w-full max-w-4xl md:block">
            <div className="grid grid-cols-3 gap-6">
              <div className="relative flex flex-col items-center space-y-4">
                <div className={stepTileClass}>1</div>
                <div className={stepCardClass}>
                  <div className="mb-4 flex justify-center">
                    <span className={iconTileClass}>
                      <Copy className="h-6 w-6 text-[#FF2E7E]" />
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">
                    {t("steps.copy.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("steps.copy.descriptionDesktop")}
                  </p>
                </div>
              </div>

              <div className="relative flex flex-col items-center space-y-4">
                <div className={stepTileClass}>2</div>
                <div className={stepCardClass}>
                  <div className="mb-4 flex justify-center">
                    <span className={iconTileClass}>
                      <Clipboard className="h-6 w-6 text-[#FF2E7E]" />
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">
                    {t("steps.paste.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("steps.paste.descriptionDesktop")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                <div className={stepTileClass}>3</div>
                <div className={stepCardClass}>
                  <div className="mb-4 flex justify-center">
                    <span className={iconTileClass}>
                      <Download className="h-6 w-6 text-[#FF2E7E]" />
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">
                    {t("steps.download.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("steps.download.descriptionDesktop")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile version with vertical steps */}
          <div className="relative mx-auto w-full max-w-sm space-y-8 md:hidden">
            {/* Vertical connecting line */}
            <div className="absolute top-0 bottom-16 left-4 w-0.5 bg-[#FFB020]"></div>

            <div className="relative flex items-start space-x-6">
              <div className="shadow-hard-sm z-10 flex h-8 w-8 shrink-0 rotate-3 items-center justify-center rounded-lg border-2 border-[#2E1B33] bg-[#FF2E7E] font-extrabold text-white dark:border-[#FBF8F1]">
                1
              </div>
              <div className="flex-1 rounded-[28px] border-2 border-[#F3E7D3] bg-white p-4 shadow-hard-sm transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5">
                <div className="mb-2 flex items-center">
                  <Copy className="mr-2 h-5 w-5 text-[#FF2E7E]" />
                  <h3 className="text-lg font-bold">{t("steps.copy.title")}</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("steps.copy.descriptionMobile")}
                </p>
              </div>
            </div>

            <div className="relative flex items-start space-x-6">
              <div className="shadow-hard-sm z-10 flex h-8 w-8 shrink-0 rotate-3 items-center justify-center rounded-lg border-2 border-[#2E1B33] bg-[#FF2E7E] font-extrabold text-white dark:border-[#FBF8F1]">
                2
              </div>
              <div className="flex-1 rounded-[28px] border-2 border-[#F3E7D3] bg-white p-4 shadow-hard-sm transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5">
                <div className="mb-2 flex items-center">
                  <Clipboard className="mr-2 h-5 w-5 text-[#FF2E7E]" />
                  <h3 className="text-lg font-bold">
                    {t("steps.paste.title")}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("steps.paste.descriptionMobile")}
                </p>
              </div>
            </div>

            <div className="relative flex items-start space-x-6">
              <div className="shadow-hard-sm z-10 flex h-8 w-8 shrink-0 rotate-3 items-center justify-center rounded-lg border-2 border-[#2E1B33] bg-[#FF2E7E] font-extrabold text-white dark:border-[#FBF8F1]">
                3
              </div>
              <div className="flex-1 rounded-[28px] border-2 border-[#F3E7D3] bg-white p-4 shadow-hard-sm transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5">
                <div className="mb-2 flex items-center">
                  <Download className="mr-2 h-5 w-5 text-[#FF2E7E]" />
                  <h3 className="text-lg font-bold">
                    {t("steps.download.title")}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t("steps.download.descriptionMobile")}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Button
              className="shadow-hard h-12 rounded-full border-2 border-[#2E1B33] bg-[#FF2E7E] px-8 font-label text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FF2E7E] active:translate-y-0 active:shadow-none dark:border-[#FBF8F1]"
              asChild
            >
              <a href={homeLinks.hero}>{t("ctaButton")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
