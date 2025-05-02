import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";

const YT_REGEX = /^https:\/\/www\.youtube\.com\/watch\?v=([\w-]{11})$/;

const CreateStreamSchema = z.object({
  url: z.string(),
  creatorId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());

    const match = data.url.match(YT_REGEX);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const extractedId = match[1];

    // Fetch video details using YouTube Data API v3
    const apiKey = process.env.YOUTUBE_API_KEY;
    const ytRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${extractedId}&key=${apiKey}&part=snippet`
    );

    if (!ytRes.ok) {
      return NextResponse.json(
        { message: "Failed to fetch video details from YouTube" },
        { status: 500 }
      );
    }

    const ytData = await ytRes.json();
    const snippet = ytData.items?.[0]?.snippet;

    const title = snippet?.title ?? "Can't find video";
    const thumbnails = snippet?.thumbnails ?? {};
    const fallbackThumbnail =
      "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg";

    const allThumbnails = Object.values(thumbnails) as { url: string; width?: number }[];
    allThumbnails.sort((a, b) => (a.width || 0) - (b.width || 0));

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title,
        smallImg:
          allThumbnails.length > 1
            ? allThumbnails[allThumbnails.length - 2].url
            : allThumbnails[0]?.url ?? fallbackThumbnail,
        bigImg:
          allThumbnails[allThumbnails.length - 1]?.url ?? fallbackThumbnail,
      },
    });

    return NextResponse.json({ message: "Stream added successfully", stream });
  } catch (e) {
    console.error("POST /stream error:", e);
    return NextResponse.json(
      { message: "Error while providing the stream credential" },
      { status: 500 }
    );
  }
}
