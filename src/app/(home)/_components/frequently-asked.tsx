import React from "react";

import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { homeSections } from "@/lib/constants";

export function FrequentlyAsked() {
  const t = useTranslations("pages.home.frequentlyAsked");

  return (
    <section
      id={homeSections.frequentlyAsked}
      className="w-full scroll-mt-12 py-12 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-2">
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

          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6">
            {/* General */}
            <div className="rounded-[28px] border-2 border-[#F3E7D3] bg-white p-6 shadow-hard-sm sm:p-8 dark:border-white/10 dark:bg-white/5">
              <h3 className="mb-4 flex items-center text-xl font-bold">
                <div className="shadow-hard-sm mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-[#2E1B33] bg-[#FFF0F6] dark:border-[#FBF8F1] dark:bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#FF2E7E]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                </div>
                {t("sections.general.title")}
              </h3>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b">
                  <AccordionTrigger className="font-label py-4 text-left font-semibold hover:text-[#FF2E7E] hover:no-underline">
                    {t("sections.general.q1.trigger")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-start">
                    {t("sections.general.q1.content")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b">
                  <AccordionTrigger className="font-label py-4 text-left font-semibold hover:text-[#FF2E7E] hover:no-underline">
                    {t("sections.general.q2.trigger")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-start">
                    {t("sections.general.q2.content")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b">
                  <AccordionTrigger className="font-label py-4 text-left font-semibold hover:text-[#FF2E7E] hover:no-underline">
                    {t("sections.general.q3.trigger")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-start">
                    {t("sections.general.q3.content")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Technical */}
            <div className="rounded-[28px] border-2 border-[#F3E7D3] bg-white p-6 shadow-hard-sm sm:p-8 dark:border-white/10 dark:bg-white/5">
              <h3 className="mb-4 flex items-center text-xl font-bold">
                <div className="shadow-hard-sm mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-[#2E1B33] bg-[#FFF0F6] dark:border-[#FBF8F1] dark:bg-white/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#FF2E7E]"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                  </svg>
                </div>
                {t("sections.technical.title")}
              </h3>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-4" className="border-b">
                  <AccordionTrigger className="font-label py-4 text-left font-semibold hover:text-[#FF2E7E] hover:no-underline">
                    {t("sections.technical.q1.trigger")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-start">
                    {t("sections.technical.q1.content")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-b">
                  <AccordionTrigger className="font-label py-4 text-left font-semibold hover:text-[#FF2E7E] hover:no-underline">
                    {t("sections.technical.q2.trigger")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-start">
                    {t("sections.technical.q2.content")}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6" className="border-b">
                  <AccordionTrigger className="font-label py-4 text-left font-semibold hover:text-[#FF2E7E] hover:no-underline">
                    {t("sections.technical.q2.trigger")}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-start">
                    {t("sections.technical.q2.content")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
