import { NextRequest, NextResponse } from "next/server"; 
import {z} from  "zod";

const CreateStreamSchema = z.object({
    url:z.string(),
    creatorId:z.string()
})

export async  function POST(req:NextRequest) {
    try{
    const data  = CreateStreamSchema.parse(await req.json());
    }catch{

        NextResponse.json({
            message:"Error while providing the stream credential"
        })
    }

}