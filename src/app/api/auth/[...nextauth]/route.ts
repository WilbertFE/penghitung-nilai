/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "@/lib/supabase";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    generateSessionToken: () => {
      return uuidv4();
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        // console.log("credentials: ", credentials);

        const user = {
          uuid: uuidv4(),
          username: credentials?.username,
          email: credentials?.email,
          password: credentials?.password,
          role: "user",
        };

        if (user) {
          // console.log("success");
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user, trigger }: any) {
      // console.log("account : ", account);
      // console.log("profile : ", profile);
      // console.log("user : ", user);
      // console.log("trigger: ", trigger);

      if (trigger === "signIn") {
        if (account?.provider === "credentials") {
          const salt = await bcrypt.genSalt(10);
          const hash = await bcrypt.hash(user.password, salt);

          // console.log("hashed : ", hash);
          const { data, error } = await supabase
            .from("users")
            .insert({ ...user, type: "credentials", password: hash })
            .select();
          if (error) console.log(error);
          else {
            // console.log("insert data");
            // console.log("data : ", data);
            token.username = data[0].username;
            token.role = data[0].role;
          }
        }
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
