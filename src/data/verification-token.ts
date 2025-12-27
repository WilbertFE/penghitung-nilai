import supabase from "@/lib/supabase";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verficationToken = await supabase
      .from("tokens")
      .select("*")
      .eq("email", email)
      .single();

    return verficationToken;
  } catch (error) {
    console.log(error);
  }
};
