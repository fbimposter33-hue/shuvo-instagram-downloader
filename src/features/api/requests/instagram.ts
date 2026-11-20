import React from "react";

import {
  GenGptResponseDto,
  InstagramPostResult,
} from "@/features/api/_dto/instagram";
import { transformGenGptResponse } from "@/features/api/_transform/instagram";

// GenGPT download API (by Tanjid Islam). CORS is `*` (verified live), so the
// browser calls it directly — the API can take 25–50s on a cache miss, which
// would exceed the timeout of a Next.js API-route proxy on most free hosts.
export const INSTAGRAM_API_BASE =
  "https://r-gengpt-api.vercel.app/api/video/download";

// The upstream API is slow on a cache miss (~25–50s), so allow up to 100s.
const REQUEST_TIMEOUT_MS = 100_000;
const MAX_ATTEMPTS = 2;

export type InstagramApiErrorKey =
  | "notFound"
  | "noMedia"
  | "tooManyRequests"
  | "serverError";

export class InstagramApiError extends Error {
  errorKey: InstagramApiErrorKey;

  constructor(errorKey: InstagramApiErrorKey, message?: string) {
    super(message || errorKey);
    this.name = "InstagramApiError";
    this.errorKey = errorKey;
  }
}

export type GetInstagramPostRequest = {
  url: string;
};

export type GetInstagramPostResponse = InstagramPostResult;

async function fetchOnce(instagramUrl: string): Promise<InstagramPostResult> {
  const apiUrl = `${INSTAGRAM_API_BASE}?url=${encodeURIComponent(instagramUrl)}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(apiUrl, { signal: controller.signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new InstagramApiError(
        "serverError",
        "The API took too long to respond"
      );
    }
    throw new InstagramApiError("serverError", "Network request failed");
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 404) {
    throw new InstagramApiError("notFound", "Post not found");
  }
  if (response.status === 429) {
    throw new InstagramApiError("tooManyRequests", "Too many requests");
  }
  if (!response.ok) {
    throw new InstagramApiError(
      "serverError",
      `API responded with HTTP ${response.status}`
    );
  }

  const json = (await response.json()) as GenGptResponseDto;

  if (json.status !== "success") {
    throw new InstagramApiError(
      "notFound",
      json.message || "The API could not fetch this post"
    );
  }

  const result = transformGenGptResponse(json);
  if (!result) {
    throw new InstagramApiError(
      "noMedia",
      "No downloadable media was found in this post"
    );
  }

  return result;
}

async function fetchWithRetry(
  instagramUrl: string
): Promise<InstagramPostResult> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await fetchOnce(instagramUrl);
    } catch (error) {
      lastError = error;
      // Only retry transient failures (network / timeout / upstream 5xx).
      const retryable =
        error instanceof InstagramApiError &&
        error.errorKey === "serverError";
      if (!retryable || attempt === MAX_ATTEMPTS) {
        throw error;
      }
    }
  }
  throw lastError;
}

export function useGetInstagramPost() {
  return React.useCallback((data: GetInstagramPostRequest) => {
    return fetchWithRetry(data.url);
  }, []);
}
