"use server";

import supabase from "@/lib/supabase";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  try {
    const existingToken = await getVerificationTokenByToken(token);

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

    const { error } = await supabase
      .from("users")
      .update({ email_verified: new Date(), email: existingToken.email })
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
