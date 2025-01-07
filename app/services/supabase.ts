import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or API Key in environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const getDayDescription = async (key: string) => {
  const { data, error } = await supabase
    .from("days")
    .select("content, image_link")
    .eq("key", key)
    .single();

  console.log({ data, error });

  if (error) {
    console.error("Error fetching data:", error.message);
    return { description: "", imageUrl: "" };
  }

  return { description: data?.content || "", imageUrl: data?.image_link || "" };
};