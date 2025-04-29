"use client"

import { Router } from "lucide-react";
import {useSession} from "next-auth/react"
import router from "next/router";
import { useEffect } from "react"

export function Redirect(){
    const session  = useSession();
    useEffect(()=>{
        if(session?.data?.user){
        router.push("/dashboard")
        }

    
    },[session])

}