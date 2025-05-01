"use client"

import { Router } from "lucide-react";
import {useSession} from "next-auth/react"
import router from "next/router";
import { useEffect } from "react"
import { useRouter } from "next/navigation";

export function Redirect(){
    const session  = useSession();
    const router = useRouter();
    useEffect(()=>{
        if(session?.data?.user){
            // @ts-ignore
          router.push("/dashboard")
        }

    
    },[session])
    return null

}