/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "@/lib/supabase";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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

        const email = credentials.email.toLowerCase().trim();

        const { data, error } = await supabase
          .from("users")
          .select("password, username, email, role")
          .eq("email", email)
          .maybeSingle();

        if (error || !data) {
          console.error("Invalid credentials");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          data.password
        );
        if (isPasswordValid) {
          const { username, email, role } = data;
          return { username, email, role };
        } else {
          console.error("Invalid credentials");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const { data: existingUser, error } = await supabase
        .from("users")
        .select("email_verified")
        .eq("email", user.email)
        .maybeSingle();

      if (!existingUser?.email_verified) {
        return false;
      }

      return true;
    },

    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
        token.username = user.username;
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

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
