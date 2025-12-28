import supabase from "@/lib/supabase";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("tokens")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const { data: verificationToken } = await supabase
      .from("tokens")
      .select("*")
      .eq("token", token)
      .maybeSingle();

    return verificationToken;
  } catch (error) {
    console.error(error);
  }
};
