"use server";

import supabase from "@/lib/supabase";
import { getTokenByTokenAndType } from "@/data/verification-token";
import crypto from "crypto";

export const newVerification = async (token: string) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const existingToken = await getTokenByTokenAndType(
      hashedToken,
      "EMAIL_VERIFICATION"
    );

    if (!existingToken) {
      return { error: "Invalid token" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired" };
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", existingToken.email)
      .maybeSingle();

    if (!existingUser) {
      return { error: "User not found" };
    }
    const now = new Date();

    const { error } = await supabase
      .from("users")
      .update({
        email_verified: now,
        email: existingToken.email,
        updated_at: now,
      })
      .eq("email", existingUser.email);

    const response = await supabase
      .from("tokens")
      .delete()
      .eq("id", existingToken.id);

    return { success: "Email Verified" };
  } catch (error) {
    console.error(error);
  }
};
