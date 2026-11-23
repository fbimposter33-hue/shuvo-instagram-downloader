import React from "react";

import { useTranslations } from "next-intl";

import { homeSections } from "@/lib/constants";

const statCardClass =
  "flex flex-col items-center rounded-[28px] border-2 border-[#F3E7D3] bg-white p-6 shadow-hard-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hard dark:border-white/10 dark:bg-white/5";

const statNumberClass =
  "bg-gradient-to-r from-[#FF2E7E] to-[#FF9A3D] bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl";

export function Testimonials() {
  const t = useTranslations("pages.home.testimonials");

  return (
    <section id={homeSections.testimonials} className="w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-3">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              {t("title")}
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
              {t("description")}
            </p>
          </div>
          <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className={statCardClass}>
              <span className={statNumberClass}>50K+</span>
              <span className="text-muted-foreground text-sm sm:text-base">
                {t("stats.downloads")}
              </span>
            </div>
            <div className={statCardClass}>
              <span className={statNumberClass}>100K+</span>
              <span className="text-muted-foreground text-sm sm:text-base">
                {t("stats.users")}
              </span>
            </div>
            <div className={statCardClass}>
              <span className={statNumberClass}>4.9/5</span>
              <span className="text-muted-foreground text-sm sm:text-base">
                {t("stats.rating")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
