import React from "react";

import { useTranslations } from "next-intl";

import { Sparkle } from "lucide-react";

/**
 * Pink ticker band under the header. Every item reuses an existing
 * string from the site's locales (feature card titles + the hero form
 * hint) — no new copy and no new locale keys.
 */
export function MarqueeBand() {
  const t = useTranslations("pages.home");

  const items = [
    t("features.cards.free.title"),
    t("features.cards.noRegistration.title"),
    t("features.cards.fast.title"),
    t("features.cards.hdQuality.title"),
    t("hero.formHint"),
  ];

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-b-2 border-[#2E1B33] bg-[#FF2E7E] py-2.5"
    >
      <div className="animate-marquee flex w-max">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {items.map((item, index) => (
              <span
                key={index}
                className="font-label flex items-center gap-6 pr-6 text-[13px] font-bold tracking-[0.14em] whitespace-nowrap text-white uppercase"
              >
                {item}
                <Sparkle className="h-3.5 w-3.5 fill-[#FFB020] text-[#FFB020]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
