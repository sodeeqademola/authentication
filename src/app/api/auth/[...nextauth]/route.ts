"use server";
import { PrismaClient, User } from "@prisma/client";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

const authOptions = {
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const creEmail = credentials?.email;
        const crePassword = credentials?.password;
        const user = await prisma.user.findUnique({
          where: {
            email: creEmail,
          },
        });
        if (!user) {
          throw new Error("please register before login");
        }
        const confirmPassword = await bcrypt.compareSync(
          crePassword as string,
          user.password as string
        );

        if (user && confirmPassword) {
          const { password, ...others } = user;
          return others;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user as User;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log(session.user);
      if (session) {
        session.user = token.user;
      }
      return session;
    },
  },
} as AuthOptions;

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
