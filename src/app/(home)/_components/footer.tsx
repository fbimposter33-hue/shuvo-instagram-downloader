import React from "react";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/lib/site";
import { LogoText } from "@/components/logo";
import { Send } from "lucide-react";

const footerLinkClass =
  "font-label text-sm font-semibold text-[#FBF8F1]/70 transition-colors duration-200 hover:text-white";

export function Footer() {
  const t = useTranslations("layouts.home.footer");

  const year = new Date().getFullYear();

  return (
    <footer className="w-full">
      <div className="rounded-t-[32px] border-t-2 border-[#2E1B33] bg-[#2E1B33] py-10 text-[#FBF8F1] dark:border-[#FBF8F1]/20">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
          <div className="flex flex-col items-center gap-2.5 md:items-start">
            <LogoText className="text-[#FBF8F1]" />
            <p className="text-sm text-[#FBF8F1]/70">
              {t("copyright", { year })}
            </p>
            <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#FBF8F1]/70">
              {t("developer")}
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FF2E7E] px-3 py-1 font-label font-bold text-white shadow-[3px_3px_0_0_#FFB020] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FFB020] active:translate-y-0"
              >
                <Send className="h-3.5 w-3.5" />
                @shuvon1ss
              </a>
            </p>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className={footerLinkClass}>
              {t("links.terms")}
            </a>
            <a href="#" className={footerLinkClass}>
              {t("links.privacy")}
            </a>
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={footerLinkClass}
            >
              {t("links.contact")}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
