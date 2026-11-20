// app/api/download-proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

// Media files are fetched from Instagram's CDN — keep the proxy generous
// but bounded so a stuck upstream cannot hang the function forever.
export const maxDuration = 60;

function sanitizeFilename(raw: string | null): string {
  const fallback = "shuvo-insta-video.mp4";
  if (!raw) return fallback;
  const cleaned = raw.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return cleaned || fallback;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const fileUrl = searchParams.get("url");
  const filename = sanitizeFilename(searchParams.get("filename"));

  if (!fileUrl) {
    return NextResponse.json(
      { error: "missingUrl", message: "url is required" },
      { status: 400 }
    );
  }

  try {
    if (!fileUrl.startsWith("https://")) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Fetch the file from the external URL. fetch() follows the is.gd
    // short-link redirect to the Instagram CDN automatically.
    const fileResponse = await fetch(fileUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36",
      },
      redirect: "follow",
    });

    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch file: ${fileResponse.statusText}`);
    }

    const contentType = fileResponse.headers.get("Content-Type") || "";
    // A short link that lands on an HTML page means the media is gone.
    if (contentType.includes("text/html")) {
      throw new Error("Upstream did not return a media file");
    }

    const fileStream = fileResponse.body;

    if (!fileStream) {
      throw new Error("File stream is not available");
    }

    // Set headers to force download
    const headers = new Headers();
    headers.set("Content-Disposition", `attachment; filename="${filename}"`);
    headers.set("Content-Type", contentType || "application/octet-stream");
    if (fileResponse.headers.get("Content-Length")) {
      headers.set(
        "Content-Length",
        fileResponse.headers.get("Content-Length")!
      );
    }

    return new NextResponse(fileStream, {
      status: 200,
      headers: headers,
    });
  } catch (error: any) {
    console.error("Download proxy error:", error);
    return NextResponse.json(
      { error: "serverError", message: error.message },
      { status: 500 }
    );
  }
}
