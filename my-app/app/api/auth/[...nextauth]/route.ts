import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { prismaClient } from "@/app/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("Signing in user:", user);

      if (!user.email) {
        console.error("User email not found during sign-in.");
        return false;
      }

      try {
        const existingUser = await prismaClient.user.findUnique({
          where: { email: user.email }
        });

        if (!existingUser) {
          await prismaClient.user.create({
            data: {
              email: user.email,
              provider:"Google"
            }
          });
        }
      } catch (error) {
        console.error("Error creating user:", error);
        return false;
      }

      return true;
    }
  }
});

export { handler as GET, handler as POST };
