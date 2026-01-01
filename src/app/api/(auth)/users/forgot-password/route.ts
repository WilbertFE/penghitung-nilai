import supabase from "@/lib/supabase";
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

    const existingUser = await supabase
      .from("users")
      .select("id")
      .eq("email", email);

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
