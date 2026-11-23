import React from "react";

import { useTranslations } from "next-intl";

import { ArrowDown, CheckCircle, Shield, TvMinimalPlay, Zap } from "lucide-react";

import { homeLinks, homeSections } from "@/lib/constants";
import { InstagramForm } from "@/components/instagram-form";

export function Hero() {
  const t = useTranslations("pages.home.hero");
  const tSite = useTranslations("pages.home");
  const tFeatures = useTranslations("pages.home.features");

  // "Instagram" is a brand name and appears verbatim in every locale's
  // hero title, so it is safe to split on it for the gradient treatment.
  const title = t("title");
  const brand = "Instagram";
  const [titleBefore, titleAfter] = title.includes(brand)
    ? title.split(brand)
    : [title, ""];

  const chips = [
    {
      label: tFeatures("cards.free.title"),
      Icon: Shield,
      tileClass: "bg-[#FF2E7E]",
      rotateClass: "-rotate-1",
    },
    {
      label: tFeatures("cards.noRegistration.title"),
      Icon: CheckCircle,
      tileClass: "bg-[#00A878]",
      rotateClass: "rotate-1",
    },
    {
      label: tFeatures("cards.fast.title"),
      Icon: Zap,
      tileClass: "bg-[#FFB020]",
      rotateClass: "-rotate-1",
    },
    {
      label: tFeatures("cards.hdQuality.title"),
      Icon: TvMinimalPlay,
      tileClass: "bg-[#FF9A3D]",
      rotateClass: "rotate-1",
    },
  ];

  return (
    <section
      id={homeSections.hero}
      className="relative w-full scroll-mt-16 overflow-hidden py-14 md:py-24 lg:py-28"
    >
      {/* Dotted paper + colour blobs (Goriber palette) */}
      <div aria-hidden="true" className="bg-dot-grid absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#FF2E7E]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute top-48 -right-24 h-80 w-80 rounded-full bg-[#FFB020]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#FF9A3D]/15 blur-3xl"
      />

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-5 text-center">
          <div
            className="animate-fade-up inline-block -rotate-2 rounded-full border-2 border-[#2E1B33] bg-[#FFB020] px-4 py-1.5 shadow-hard-sm dark:border-[#FBF8F1]"
            style={{ animationDelay: "0ms" }}
          >
            <span className="font-label text-xs font-bold tracking-[0.18em] text-[#2E1B33] uppercase">
              ✦ {tSite("title")}
            </span>
          </div>

          <div
            className="animate-fade-up max-w-4xl space-y-4 text-balance"
            style={{ animationDelay: "80ms" }}
          >
            <h1 className="text-[clamp(2.75rem,7vw,4.375rem)] leading-[1.05] font-extrabold tracking-tight">
              {titleBefore}
              {titleAfter !== "" || title.includes(brand) ? (
                <span className="bg-gradient-to-r from-[#FF2E7E] to-[#FF9A3D] bg-clip-text text-transparent">
                  {brand}
                </span>
              ) : null}
              {titleAfter}
            </h1>
            <p className="text-ink-variant mx-auto max-w-[700px] text-lg md:text-xl dark:text-[#D9C8F5]">
              {t("description")}
            </p>
          </div>

          <div
            className="animate-fade-up flex flex-wrap items-center justify-center gap-2.5"
            style={{ animationDelay: "160ms" }}
          >
            {chips.map(({ label, Icon, tileClass, rotateClass }) => (
              <span
                key={label}
                className={`shadow-hard-sm flex items-center gap-2 rounded-full border-2 border-[#2E1B33] bg-white py-1.5 pr-4 pl-1.5 font-label text-[13px] font-semibold text-[#2E1B33] transition-all duration-200 hover:-translate-y-0.5 hover:rotate-0 dark:border-[#FBF8F1] dark:bg-white/10 dark:text-[#FBF8F1] ${rotateClass}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border border-[#2E1B33]/20 ${tileClass}`}
                >
                  <Icon className="h-3.5 w-3.5 text-white" />
                </span>
                {label}
              </span>
            ))}
          </div>

          <div
            className="animate-fade-up flex w-full justify-center"
            style={{ animationDelay: "240ms" }}
          >
            <InstagramForm className="max-w-2xl" />
          </div>

          <div className="animate-fade-up mt-4" style={{ animationDelay: "320ms" }}>
            <a
              href={homeLinks.howItWorks}
              className="group flex flex-col items-center gap-2"
            >
              <span className="font-label text-muted-foreground text-sm font-semibold group-hover:underline">
                {t("learnMore")}
              </span>
              <span className="shadow-hard-sm flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#2E1B33] bg-[#FF2E7E] transition-all duration-200 group-hover:-translate-y-0.5 dark:border-[#FBF8F1]">
                <ArrowDown className="h-5 w-5 animate-bounce text-white" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
