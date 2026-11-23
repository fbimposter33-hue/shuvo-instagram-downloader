"use client";

import React from "react";

import { useTranslations } from "next-intl";
import { useIsMobile } from "@/hooks/use-is-mobile";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { LogoImage, LogoText } from "@/components/logo";
import { LocaleDropdown } from "@/features/i18n/locale-dropdown";
import { ThemeToggleButton } from "@/features/theme/theme-toggle-button";

import { Menu, Send } from "lucide-react";

import { homeLinks } from "@/lib/constants";
import { siteConfig } from "@/lib/site";

const navLinkClass =
  "rounded-full border-2 border-transparent px-4 py-2 font-label text-sm font-semibold transition-all duration-200 hover:border-[#2E1B33] hover:bg-white hover:shadow-hard-sm active:translate-y-px dark:hover:border-[#FBF8F1] dark:hover:bg-white/10";

function LogoLockup() {
  return (
    <>
      <span className="shadow-hard-sm flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-[#2E1B33] bg-[#FF2E7E] dark:border-[#FBF8F1]">
        <LogoImage className="h-6 w-6 fill-white" />
      </span>
      <LogoText />
    </>
  );
}

export function Header() {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const t = useTranslations("layouts.home.header");

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#2E1B33]/10 bg-[#FBF8F1]/85 backdrop-blur-md dark:border-white/10 dark:bg-[#251B2D]/85">
      <div className="container mx-auto flex h-[72px] items-center px-4">
        <div
          role="button"
          onClick={scrollUp}
          className="flex cursor-pointer items-center gap-2.5"
        >
          <LogoLockup />
        </div>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center gap-1.5 md:flex">
          <a href={homeLinks.features} className={navLinkClass}>
            {t("links.features")}
          </a>
          <a href={homeLinks.howItWorks} className={navLinkClass}>
            {t("links.howItWorks")}
          </a>
          <a href={homeLinks.frequentlyAsked} className={navLinkClass}>
            {t("links.frequentlyAsked")}
          </a>

          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-hard-pink ml-2 hidden items-center gap-2 rounded-full border-2 border-[#2E1B33] bg-[#2E1B33] px-4 py-2 font-label text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#FF2E7E] active:translate-y-0 active:shadow-none lg:inline-flex dark:border-[#FBF8F1]"
          >
            <Send className="h-4 w-4" />
            @shuvon1ss
          </a>

          <div className="border-border ml-2 flex items-center gap-2 border-l pl-2">
            <LocaleDropdown />
            <ThemeToggleButton />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="ml-auto flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shadow-hard-sm h-10 w-10 rounded-xl border-2 border-[#2E1B33] bg-white hover:bg-[#FFF9F0] dark:border-[#FBF8F1] dark:bg-white/10"
              >
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80%] bg-[#FBF8F1] pr-0 sm:w-[350px] dark:bg-[#251B2D]"
            >
              <SheetHeader className="border-b">
                <SheetTitle>
                  <div className="flex items-center gap-2.5">
                    <LogoLockup />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">
                <nav className="flex flex-col gap-3 px-4">
                  <a
                    href={homeLinks.features}
                    className="shadow-hard-sm rounded-2xl border-2 border-[#2E1B33] bg-white px-4 py-3 text-lg font-semibold transition-all duration-200 active:translate-y-px dark:border-[#FBF8F1] dark:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {t("links.features")}
                  </a>

                  <a
                    href={homeLinks.howItWorks}
                    className="shadow-hard-sm rounded-2xl border-2 border-[#2E1B33] bg-white px-4 py-3 text-lg font-semibold transition-all duration-200 active:translate-y-px dark:border-[#FBF8F1] dark:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {t("links.howItWorks")}
                  </a>
                  <a
                    href={homeLinks.frequentlyAsked}
                    className="shadow-hard-sm rounded-2xl border-2 border-[#2E1B33] bg-white px-4 py-3 text-lg font-semibold transition-all duration-200 active:translate-y-px dark:border-[#FBF8F1] dark:bg-white/10"
                    onClick={() => setOpen(false)}
                  >
                    {t("links.frequentlyAsked")}
                  </a>
                  <a
                    href={siteConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shadow-hard-pink flex items-center gap-2 rounded-2xl border-2 border-[#2E1B33] bg-[#2E1B33] px-4 py-3 text-lg font-semibold text-white dark:border-[#FBF8F1]"
                    onClick={() => setOpen(false)}
                  >
                    <Send className="h-5 w-5" />
                    @shuvon1ss
                  </a>
                </nav>
              </div>
              <div className="border-border mt-auto border-t px-4 py-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {t("themeLabel")}
                    </span>
                    <ThemeToggleButton variant="outline" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {t("localeLabel")}
                    </span>
                    <LocaleDropdown variant="outline" />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
