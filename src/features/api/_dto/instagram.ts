// DTOs for the GenGPT download API:
// GET https://r-gengpt-api.vercel.app/api/video/download?url=<instagram-url>
// Verified live on 2026-11-20 against a reel and a photo carousel post.

export type GenGptMediaDto = {
  id?: string;
  url: string;
  // "video" | "image" | "audio"
  type: string;
  extension?: string;
  quality?: string;
  resolution?: string | null;
  width?: number | null;
  height?: number | null;
  duration?: number;
  thumbnail?: string;
  is_audio?: boolean;
  mimeType?: string;
};

export type GenGptDataDto = {
  statusCode?: number;
  // NOTE: in live responses this is the original Instagram page URL,
  // NOT a direct media link. Real download links live in `medias`.
  url?: string;
  title?: string;
  thumbnail?: string;
  duration?: number;
  medias?: GenGptMediaDto[];
};

export type GenGptResponseDto = {
  status: string; // "success" on success
  code?: string;
  message?: string;
  data?: GenGptDataDto;
};

// Normalized shape the UI works with.
export type InstagramMedia = {
  url: string;
  type: "video" | "image" | "audio" | "file";
  extension: string;
  quality?: string;
  resolution?: string;
};

export type InstagramPostResult = {
  title: string;
  thumbnail: string | null;
  duration: number;
  medias: InstagramMedia[];
};
