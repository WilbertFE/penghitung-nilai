import { NextRequest } from "next/server";
import * as z from "zod";
import zxcvbn from "zxcvbn";
import { resetPassword } from "../../../../../lib/reset-password";

const formSchema = z.object({
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
    const body = await request.json();
    const parsedBody = formSchema.safeParse(body);
    if (!parsedBody.success) {
      return Response.json(
        { message: "Password tidak valid." },
        { status: 400 },
      );
    }
    // Lakukan logika reset password di sini

    const response = await resetPassword(body.token, parsedBody.data.password);

    if (!response?.ok) {
      return Response.json(
        { message: response?.message || "Failed to reset password" },
        { status: 500 },
      );
    }
    return Response.json(
      { message: "Password has been reset successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
