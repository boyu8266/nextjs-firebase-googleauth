import { recordLogin } from "@/lib/firestore/services/login-history.service";
import {
  findOrCreateUser,
  GoogleProfile,
} from "@/lib/firestore/services/users.service";
import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      picture?: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && profile) {
        await findOrCreateUser(profile as GoogleProfile);
        await recordLogin(profile.sub as string, account.provider);
      }
      return true;
    },
    jwt({ token, profile, account }) {
      if (account) {
        token.sub = account.providerAccountId;
      }
      if (profile) {
        token.picture = profile.picture;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.image = token.picture;
      }
      return session;
    },
  },
});
