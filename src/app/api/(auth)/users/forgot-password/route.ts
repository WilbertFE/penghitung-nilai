import { sendResetPasswordEmail } from "@/lib/reset-password";
import supabase from "@/lib/supabase";
import { generatePasswordResetToken } from "@/lib/token";
import { NextRequest } from "next/server";
import * as z from "zod";

const formSchema = z.object({
  email: z.email("Email tidak valid."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parseResult = formSchema.safeParse(body);
    if (!parseResult.success) {
      return Response.json({ message: "Email tidak valid." }, { status: 400 });
    }
    // TODO: Implement forgot password logic here, e.g., send reset email
    const { email } = parseResult.data;

    const { data: existingUser, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (!existingUser || error) {
      return Response.json(
        { message: "Email tidak ditemukan." },
        { status: 400 }
      );
    }
    // Here you would typically generate a reset token and send an email

    const generateResetToken = await generatePasswordResetToken(email);

    if (!generateResetToken) {
      return Response.json(
        { message: "Gagal membuat token reset password." },
        { status: 500 }
      );
    }

    await sendResetPasswordEmail(email, generateResetToken.token);

    return Response.json(
      { message: `Email reset password telah dikirim ke ${email}.` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Terjadi kesalahan saat memproses permintaan." },
      { status: 500 }
    );
  }
}
