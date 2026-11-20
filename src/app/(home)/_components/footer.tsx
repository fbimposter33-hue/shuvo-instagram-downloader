import React from "react";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/lib/site";
import { Send } from "lucide-react";

export function Footer() {
  const t = useTranslations("layouts.home.footer");

  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-gray-100 py-6 dark:bg-gray-900">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 md:flex-row md:px-6">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <p className="text-muted-foreground text-sm">
            {t("copyright", { year })}
          </p>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            {t("developer")}
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-medium text-teal-600 hover:underline dark:text-teal-400"
            >
              <Send className="h-3.5 w-3.5" />
              @shuvon1ss
            </a>
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="#"
            className="text-muted-foreground text-sm hover:text-teal-500"
          >
            {t("links.terms")}
          </a>
          <a
            href="#"
            className="text-muted-foreground text-sm hover:text-teal-500"
          >
            {t("links.privacy")}
          </a>
          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground text-sm hover:text-teal-500"
          >
            {t("links.contact")}
          </a>
        </div>
      </div>
    </footer>
  );
}
