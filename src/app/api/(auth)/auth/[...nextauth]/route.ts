/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "@/lib/supabase";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

const Schemas = z.object({
  email: z
    .email("Email tidak valid.")
    .trim()
    .transform((v) => v.toLowerCase()),
  password: z.string().min(1, "Password wajib diisi."),
});

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          console.error("Credentials not provided");
          return null;
        }

        const parsed = Schemas.safeParse(credentials);

        if (!parsed.success) {
          console.error("Invalid credentials format");
          return null;
        }

        const email = parsed.data.email;
        const password = parsed.data.password;

        const { data, error } = await supabase
          .from("users")
          .select("password, username, email, role, full_name")
          .eq("email", email)
          .maybeSingle();

        if (error || !data) {
          console.error("Invalid credentials");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, data.password);
        if (isPasswordValid) {
          const { username, email, role, full_name } = data;
          return { username, email, role, full_name };
        } else {
          console.error("Invalid credentials");
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === "google") {
        const email = user.email?.toLowerCase();

        if (!email) return false;

        const { data: existingUser } = await supabase
          .from("users")
          .select("role, username, full_name, email")
          .eq("email", email)
          .maybeSingle();
        if (existingUser) {
          user.role = existingUser.role;
          user.username = existingUser.username;
          user.full_name = existingUser.full_name;
          user.email = existingUser.email;
        } else {
          // sign up
          const uuid = uuidv4();
          const newUser = {
            username: `user-${uuid}`,
            full_name: user.name,
            password: null,
            email,
            role: "user",
            type: "google",
            uuid,
            email_verified: new Date(),
          };
          const { error, data: newUserData } = await supabase
            .from("users")
            .insert(newUser)
            .select()
            .single();

          if (error) {
            console.error(error);
            return false;
          }
          user.role = newUserData.role;
          user.username = newUserData.username;
          user.full_name = newUserData.full_name;
          user.email = newUserData.email;
        }

        return true;
      }

      if (account?.provider === "credentials") {
        const { data: existingUser } = await supabase
          .from("users")
          .select("email_verified")
          .eq("email", user.email)
          .maybeSingle();

        if (!existingUser?.email_verified) {
          return false;
        }

        return true;
      }
      return false;
    },

    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
        token.username = user.username;
        token.full_name = user.full_name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("username" in token) {
        session.user.username = token.username;
      }

      if ("role" in token) {
        session.user.role = token.role;
      }

      if ("email" in token) {
        session.user.email = token.email;
      }

      if ("full_name" in token) {
        session.user.full_name = token.full_name;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
