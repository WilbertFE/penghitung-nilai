/* eslint-disable @typescript-eslint/no-explicit-any */
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import supabase from "@/lib/supabase";

const generateVerificationToken = async (email: string) => {
  // Generate random token
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

  // Check if the token already exists for the user
  const existingToken: any = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await supabase.from("tokens").delete().eq("id", existingToken.id);
  }

  //   create verification token
  const verificationToken = await supabase.from("tokens").insert({
    token,
    email,
    expires: new Date(expires),
  });

  return verificationToken;
};
