# SHUVO Insta Downloader (Instagram Reel, Video & Photo Downloader)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Developed by Shuvo Ahmed** — Telegram: [@shuvon1ss](https://t.me/shuvon1ss)

Download Instagram **reels, videos and photos** (including multi-photo
carousels) with Next.js. Paste an Instagram link, get the post's title,
thumbnail and a download button for every media file — no login required.

**Disclaimer:** This tool is intended for educational/personal use only.
Downloading content from Instagram may violate their Terms of Service. Please
respect copyright laws and only download content you have the right to use.

## How it works

Media is fetched with the **GenGPT API** (by Tanjid Islam):

```
GET https://r-gengpt-api.vercel.app/api/video/download?url=<instagram-url>
```

- The browser calls the API directly (its CORS is `*`). The API can take
  **25–50 seconds** on a cache miss, which is longer than a Next.js API-route
  proxy survives on most free hosts — that is why there is no server proxy
  for the fetch step.
- The response's real download links are in `data.medias[]` (short `is.gd`
  links). Note: `data.url` in the response is the Instagram page URL, not a
  media link.
- Files are downloaded through `/api/download-proxy`, which follows the
  short-link redirect to Instagram's CDN and forces a save with a
  `shuvo-insta-…` filename.
- Share links work too: open the site with `?url=<instagram-link>` and the
  link is auto-filled and auto-fetched.
- Supported links: `/p/…`, `/reel/…`, `/reels/…`, `/tv/…` (extra tracking
  parameters like `?igsh=` or `?cplk=` are stripped automatically).

## ✨ Features

- **Reels, videos, photos & carousels:** every media in a post gets its own
  download button, labelled with type, quality/resolution and format. Reels
  also expose their separate audio track when the API returns one.
- **Modern Frontend Stack:** Next.js 15 (App Router), TypeScript, Tailwind
  CSS v4, Shadcn/ui.
- **Type-Safe API layer:** the GenGPT response is normalized in
  `src/features/api/_transform/instagram.ts`.
- **Resilient fetching:** 100s timeout + one automatic retry for transient
  API failures, and a 5-minute client-side result cache.
- **Form Handling & Validation:** React Hook Form + Zod.
- **Theming & i18n:** light/dark mode (`next-themes`) and 5 languages
  (`next-intl`: en, de, es, fr, ru).

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   npm install # or yarn install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

3. **Build for production** (rebuild the locale bundles first whenever you
   edit files under `src/features/i18n/messages/`):

   ```bash
   npm run build:locales
   npm run build
   npm start
   ```

   Deployable as-is on Vercel or any Node host — no environment variables
   are required. To use your own domain/name in SEO metadata, edit
   `src/lib/site.ts`.

## 💡 Usage

1. Copy an Instagram reel/post URL.
2. Paste it into the input on the home page and press **Download**.
3. Wait a few seconds (first fetch of a post can take up to ~1 minute).
4. Tap the download button for the video, photo or audio file you want.

## 📜 License & Credits

MIT License — see `LICENSE.md`. Original open-source template by Riadh
Azzoun; rebranded and reworked for **Shuvo Ahmed** with the GenGPT download
API by Tanjid Islam.

---

Happy Coding! Remember to use this project responsibly.
