/* eslint-disable @typescript-eslint/no-explicit-any */
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/supabase";

export const generateVerificationToken = async (email: string) => {
  // Generate random token
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

  // Check if the token already exists for the user
  const existingToken: any = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await supabase.from("tokens").delete().eq("id", existingToken.id);
  }

  //   create verification token
  const { data: verificationToken, error } = await supabase
    .from("tokens")
    .insert({
      token,
      email,
      expires: new Date(expires),
      type: "EMAIL_VERIFICATION",
    })
    .select()
    .single();

  if (error) throw error;

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  // Generate random token
  const token = uuidv4();
  const fifteenMinutes = 1000 * 60 * 15;
  const expires = new Date().getTime() + fifteenMinutes; // 15 minutes

  // Check if the token already exists for the user
  const existingToken: any = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await supabase.from("tokens").delete().eq("id", existingToken.id);
  }

  //   create verification token
  const { data: resetPasswordToken, error } = await supabase
    .from("tokens")
    .insert({
      token,
      email,
      expires: new Date(expires),
      type: "PASSWORD_RESET",
    })
    .select()
    .single();

  if (error || !resetPasswordToken) throw error;

  return resetPasswordToken;
};
