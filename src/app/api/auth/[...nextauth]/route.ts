/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "@/lib/supabase";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from "uuid";

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
        console.log("credentials", credentials);
        if (credentials) {
          if (
            credentials.email &&
            credentials.password &&
            credentials.username
          ) {
            const storedUser = await supabase
              .from("users")
              .select("email")
              .ilike("email", credentials.email)
              .single();
            if (storedUser.data) {
              console.log("userdata", storedUser);
            } else {
              console.log("loser");
            }
          }
          // const salt = await bcrypt.genSalt(10);
          // const hash = await bcrypt.hash(credentials.password, salt);

          // const user = {
          //   uuid: uuidv4(),
          //   username: credentials.username,
          //   email: credentials.email,
          //   password: hash,
          //   role: "user",
          //   type: "credentials",
          // };

          // const { error } = await supabase.from("users").insert(user);

          // if (error) {
          //   console.log(error);
          //   return null;
          // } else {
          //   const userData: any = { ...user };
          //   delete userData.password;
          //   return userData;
          // }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.email = user.email;
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
