"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
    const session  = useSession()
    return (
        <div>
            <div className="flex justify-between p-4 bg-gray-100">
                <div className="text-xl font-bold">
                    Muzi
                </div>
                <div>
                    {session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={()=> signOut()}>Logout</button>}
                    {!session.data?.user && <button className="m-2 p-2 bg-blue-400 text-white rounded" onClick={() => signIn()}  > Sign in with Google </button>}
                </div>
            </div>
        </div>
    );
}
