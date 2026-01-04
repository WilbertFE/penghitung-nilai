import supabase from "@/lib/supabase";

export const getTokenByEmailAndType = async (email: string, type: string) => {
  try {
    const { data, error } = await supabase
      .from("tokens")
      .select("*")
      .eq("email", email)
      .eq("type", type)
      .maybeSingle();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getTokenByTokenAndType = async (token: string, type: string) => {
  try {
    const { data: verificationToken } = await supabase
      .from("tokens")
      .select("*")
      .eq("token", token)
      .eq("type", type)
      .maybeSingle();

    return verificationToken;
  } catch (error) {
    console.error(error);
  }
};
