import { NextRequest , NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";

export async function GET(req:NextRequest){

const session  = await getServerSession()

    const user = await prismaClient.user.findFirst({
        where:{
            // @ts-ignore
            email:session?.user?.email ?? ""
        }
    })

    if(!user){
        return NextResponse.json({
            meassage:"Unautherised access"
        },{
            status:403
        })
    }


}