import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isShortcodePresent(url: string) {
  const regex = /\/(p|reel|reels|tv)\/([a-zA-Z0-9_-]+)\/?/;
  const match = url.match(regex);

  if (match && match[2]) {
    return true;
  }

  return false;
}

export function getPostShortcode(url: string): string | null {
  const regex = /\/(p|reel|reels|tv)\/([a-zA-Z0-9_-]+)\/?/;
  const match = url.match(regex);

  if (match && match[2]) {
    const shortcode = match[2];
    return shortcode;
  } else {
    return null;
  }
}

// Strips tracking/query params (e.g. ?igsh=…, ?cplk=…) so the same post
// always maps to one clean URL for the API call and the result cache.
export function normalizeInstagramUrl(url: string): string {
  const shortcode = getPostShortcode(url);
  if (!shortcode) return url.trim();
  const kindMatch = url.match(/\/(p|reel|reels|tv)\//);
  const kind = kindMatch ? kindMatch[1] : "p";
  return `https://www.instagram.com/${kind}/${shortcode}/`;
}
