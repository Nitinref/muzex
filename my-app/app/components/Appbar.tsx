"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Music, Users, Headphones, ChevronRight, Menu } from "lucide-react"

export function Appbar() {
    const session  = useSession()
    return (<div>
             <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative size-8">
              <div className="absolute inset-0 rounded-full bg-purple-500 blur-sm opacity-70"></div>
              <div className="relative flex size-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600">
                <Music className="size-4 text-white" />
              </div>
            </div>
            <span className="font-bold text-xl">MUZEX</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm hover:text-purple-400 transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm hover:text-purple-400 transition">
              How It Works
            </Link>
            <Link href="#community" className="text-sm hover:text-purple-400 transition">
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden md:block text-sm font-medium hover:text-purple-400 transition">
              Log in
            </Link>
            {session.data?.user && <Button className="m-2 p-2 bg-black-900" onClick={()=> signOut()}>Logout</Button>}
            {!session.data?.user && <Button className="text-sm hover:text-purple-400 transition" onClick={() => signIn()}  > Sign in </Button>}
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="size-6" />
            </Button>
          </div>
        </div>
           
        </div>
    );
}
