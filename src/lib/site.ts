import { Metadata } from "next";

export const siteConfig = {
  name: "SHUVO Insta Downloader",
  domain: "shuvo-insta-downloader.vercel.app",
  shortName: "SHUVO Insta",
  creator: "Shuvo Ahmed",
  description:
    "Download Instagram reels, videos and photos — fast, free, and no login required. Just paste the URL and download. By Shuvo Ahmed.",
  ogDescription:
    "Download Instagram reels, videos and photos — fast, free, and no login required. Just paste the URL and download.",
  url: "https://shuvo-insta-downloader.vercel.app",
  telegram: "https://t.me/shuvon1ss",
};

export const siteMetadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  creator: siteConfig.creator,
  authors: [{ name: "Shuvo Ahmed", url: siteConfig.telegram }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: siteConfig.name,
    description: siteConfig.ogDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.ogDescription,
    creator: siteConfig.creator,
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/web.manifest.json",
};
