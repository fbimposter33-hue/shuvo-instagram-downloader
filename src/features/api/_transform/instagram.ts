import {
  GenGptMediaDto,
  GenGptResponseDto,
  InstagramMedia,
  InstagramPostResult,
} from "@/features/api/_dto/instagram";

function normalizeType(media: GenGptMediaDto): InstagramMedia["type"] {
  const type = (media.type || "").toLowerCase();
  if (type === "video" || type === "image" || type === "audio") {
    return type;
  }
  const ext = (media.extension || "").toLowerCase();
  if (["mp4", "mov", "webm"].includes(ext)) return "video";
  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return "image";
  if (["mp3", "m4a", "aac", "ogg"].includes(ext)) return "audio";
  return "file";
}

function normalizeExtension(
  media: GenGptMediaDto,
  type: InstagramMedia["type"]
) {
  const ext = (media.extension || "").toLowerCase().replace(/^\./, "");
  if (ext) return ext;
  if (type === "video") return "mp4";
  if (type === "image") return "jpg";
  if (type === "audio") return "m4a";
  return "bin";
}

// Turns a raw GenGPT API response into the shape the UI renders.
// Returns null when the response carries no downloadable media.
export function transformGenGptResponse(
  response: GenGptResponseDto
): InstagramPostResult | null {
  const data = response?.data;
  if (!data) return null;

  const medias: InstagramMedia[] = (data.medias || [])
    .filter((media) => media && typeof media.url === "string" && media.url)
    .map((media) => {
      const type = normalizeType(media);
      return {
        url: media.url,
        type,
        extension: normalizeExtension(media, type),
        // The API prefixes quality with the type ("image 2730x3330p 1") —
        // the UI already shows the type separately, so strip the prefix.
        quality: media.quality
          ? media.quality.replace(/^(image|video|audio)\s+/i, "")
          : undefined,
        resolution:
          media.resolution ||
          (media.width && media.height
            ? `${media.width}x${media.height}`
            : undefined),
      };
    });

  // Fallback: some responses may expose a single direct media link in
  // data.url. Live responses put the Instagram page URL there instead,
  // so only accept it when it is NOT an instagram.com page link.
  if (medias.length === 0 && data.url && !data.url.includes("instagram.com")) {
    medias.push({
      url: data.url,
      type: "file",
      extension: "mp4",
    });
  }

  if (medias.length === 0) return null;

  return {
    title: data.title?.trim() || "Instagram post",
    thumbnail: data.thumbnail || null,
    duration: data.duration || 0,
    medias,
  };
}
