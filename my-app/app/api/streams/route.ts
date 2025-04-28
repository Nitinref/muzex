import { NextRequest, NextResponse } from "next/server"; 
import {z} from  "zod";
import {prismaClient } from "@/app/lib/db";

const YT_REGEX = new RegExp("^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$")

const CreateStreamSchema = z.object({
    url:z.string(),
    creatorId:z.string()
})


export async function POST(req:NextRequest) {
    try{
    const data  = CreateStreamSchema.parse(await req.json());
    const isYt = YT_REGEX.test("youtube");

    if (!isYt) {
        return NextResponse.json({
            message: "Invalid YouTube URL"
        }, { status: 400 });
    }

    const extractedId = data.url.split("?v=")[1];

    await prismaClient.stream.create({
        data: {
        userId:data.creatorId,
        url:data.url,
        extractedId,
        type:"Youtube"
        } 
    })
    }catch(e){

      return  NextResponse.json({
            message:"Error while providing the stream credential"
        })
    }

}

export async function GET(req:NextRequest) {

const creatorId = req.nextUrl.searchParams.get("creatorId");
const streams = await prismaClient.stream.findMany({

    where:{
        //@ts-ignore
        userId : creatorId
    }
})

return NextResponse.json({
    streams
})
    
}