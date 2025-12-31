/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendVerificationEmail } from "@/lib/mail";
import supabase from "@/lib/supabase";
import { generateVerificationToken } from "@/lib/token";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import zxcvbn from "zxcvbn";

const Schemas = z.object({
  full_name: z
    .string()
    .min(3, "Nama harus setidaknya 3 karakter")
    .max(64, "Nama paling banyak 64 karakter.")
    .transform((v) => v.trim()),
  username: z
    .string()
    .min(3, "Username harus setidaknya 3 karakter.")
    .max(32, "Username paling banyak 32 karakter.")
    .transform((v) => v.toLowerCase().trim()),
  email: z
    .email("Email tidak valid.")
    .transform((v) => v.toLocaleLowerCase().trim()),
  password: z
    .string()
    .min(8, "Password harus setidaknya 8 karakter.")
    .max(64, "Password paling banyak 64 karakter.")
    .refine((value) => zxcvbn(value).score >= 3, {
      message: "Password terlalu lemah.",
    }),
});

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();

    // sanitasi input
    const parsed = Schemas.safeParse(req);

    if (!parsed.success) {
      return Response.json(
        { message: parsed.error.issues.map((e) => e.message).join(", ") },
        {
          status: 400,
        }
      );
    }

    const { email, username, password, full_name } = parsed.data;

    // cek apakah user sudah ada berdasarkan email
    const { data: emailData, error: emailError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (emailError) {
      return Response.json(
        { message: "Kesalahan server" },
        {
          status: 500,
        }
      );
    }

    if (emailData) {
      return Response.json(
        { message: "Email sudah digunakan" },
        {
          status: 400,
        }
      );
    }

    // cek username
    const { data: usernameData, error: usernameError } = await supabase
      .from("users")
      .select("username")
      .eq("username", username)
      .maybeSingle();

    if (usernameError) {
      return Response.json(
        { message: "Kesalahan server" },
        {
          status: 500,
        }
      );
    }

    if (usernameData) {
      return Response.json(
        { message: "Username sudah digunakan" },
        {
          status: 400,
        }
      );
    }

    // buat user baru
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = {
      uuid: uuidv4(),
      full_name,
      username,
      email: email,
      password: hash,
      role: "user",
      type: "credentials",
      email_verified: null,
    };

    const { error: createUserError } = await supabase
      .from("users")
      .insert(user);

    if (createUserError) {
      if (createUserError.code === "23505") {
        return Response.json(
          { message: "Email atau username sudah digunakan" },
          { status: 409 }
        );
      }
      return Response.json(
        { message: "Kesalahan server" },
        {
          status: 500,
        }
      );
    }

    // generate verification token
    const verficationToken: any = await generateVerificationToken(email);

    await sendVerificationEmail(email, verficationToken.token);

    return Response.json(
      { message: "Verifikasi email telah dikirim" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Kesalahan server" },
      {
        status: 500,
      }
    );
  }
}
