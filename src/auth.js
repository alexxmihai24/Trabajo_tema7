import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/src/lib/prisma";
import { authConfig } from "@/src/auth.config";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        GitHub,
        Google,
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user || !user.password) return null; // No password = possible OAuth user without password

                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (passwordsMatch) return user;

                return null;
            },
        }),
    ],
});
