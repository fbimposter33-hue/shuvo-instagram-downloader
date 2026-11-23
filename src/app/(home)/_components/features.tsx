import React from "react";

import { useTranslations } from "next-intl";

import { CheckCircle, Shield, TvMinimalPlay, Zap } from "lucide-react";

import { homeSections } from "@/lib/constants";

const cardClass =
  "flex flex-col items-center space-y-3 rounded-[28px] border-2 border-[#F3E7D3] bg-white p-6 shadow-hard-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hard dark:border-white/10 dark:bg-white/5";

const tileClass =
  "flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#2E1B33] shadow-hard-sm dark:border-[#FBF8F1]";

export function Features() {
  const t = useTranslations("pages.home.features");

  return (
    <section
      id={homeSections.features}
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
          <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8 xl:grid-cols-4">
            <div className={cardClass}>
              <div className={`${tileClass} bg-[#FF2E7E]`}>
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl">
                {t("cards.free.title")}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                {t("cards.free.description")}
              </p>
            </div>
            <div className={cardClass}>
              <div className={`${tileClass} bg-[#00A878]`}>
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl">
                {t("cards.noRegistration.title")}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                {t("cards.noRegistration.description")}
              </p>
            </div>
            <div className={cardClass}>
              <div className={`${tileClass} bg-[#FFB020]`}>
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl">
                {t("cards.fast.title")}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                {t("cards.fast.description")}
              </p>
            </div>
            <div className={cardClass}>
              <div className={`${tileClass} bg-[#FF9A3D]`}>
                <TvMinimalPlay className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold sm:text-xl">
                {t("cards.hdQuality.title")}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">
                {t("cards.hdQuality.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
