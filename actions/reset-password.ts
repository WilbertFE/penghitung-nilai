import { getVerificationTokenByToken } from "@/data/verification-token";
import supabase from "@/lib/supabase";
import bcrypt from "bcryptjs";

export const resetPassword = async (token: string, password: string) => {
  try {
    // Cek token
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
      return { message: "Invalid token", ok: false };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { message: "Token has expired", ok: false };
    }

    const { data: existingUser, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", existingToken.email)
      .maybeSingle();

    if (error) {
      return { message: "Server error", ok: false };
    }

    if (!existingUser) {
      return { message: "User not found", ok: false };
    }

    const now = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: updateError } = await supabase
      .from("users")
      .update({
        password: hashedPassword,
        updated_at: now,
      })
      .eq("email", existingUser.email);

    if (updateError) {
      return { message: "Failed to update password", ok: false };
    }

    const { error: deleteError } = await supabase
      .from("tokens")
      .delete()
      .eq("id", existingToken.id);

    if (deleteError) {
      return { message: "Failed to delete token", ok: false };
    }

    return { message: "Password has been reset successfully", ok: true };
  } catch (error) {
    console.error(error);
    return { message: "Failed to reset password", ok: false };
  }
};
