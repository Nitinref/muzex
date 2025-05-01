import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/app/lib/db";
import youtubesearchapi from "https://www.googleapis.com/youtube/v3/search"; 

const YT_REGEX = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/;

const CreateStreamSchema = z.object({
  url: z.string(),
  creatorId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = YT_REGEX.test(data.url);

    if (!isYt) {
      return NextResponse.json(
        { message: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const extractedId = data.url.split("?v=")[1];

    // Fetch video details from YouTube
    const res = await youtubesearchapi.GetVideoDetails(extractedId);
    const thumbnails = res.thumbnail?.thumbnails || [];

    // Sort by width to find best thumbnails
    thumbnails.sort((a: { width: number }, b: { width: number }) => a.width - b.width);

    const fallbackThumbnail =
      "https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg";

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId,
        type: "Youtube",
        title: res.title ?? "Can't find video",
        smallImg:
          thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1]?.url ?? fallbackThumbnail,
        bigImg:
          thumbnails[thumbnails.length - 1]?.url ?? fallbackThumbnail,
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
