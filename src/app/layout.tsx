import type { Metadata } from "next";
import {
  Baloo_Da_2 as DisplayFont,
  Hind_Siliguri as LabelFont,
} from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { LocaleProvider } from "@/features/i18n/locale-provider";
import { ReactQueryProvider } from "@/features/react-query/react-query-provider";

import { cn } from "@/lib/utils";
import { siteMetadata } from "@/lib/site";
import { getLocale, getMessages } from "next-intl/server";

import "./globals.css";

// Goriberbondhu theme type: Baloo Da 2 for display/body, Hind Siliguri
// for labels and small text (both cover Bengali via the system fallback).
const balooDa2 = DisplayFont({
  variable: "--font-baloo",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700", "800"],
});

const hindSiliguri = LabelFont({
  variable: "--font-hind",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased",
          balooDa2.variable,
          hindSiliguri.variable,
          balooDa2.className
        )}
      >
        <LocaleProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <ReactQueryProvider>
              {children}
              <Toaster closeButton />
            </ReactQueryProvider>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
