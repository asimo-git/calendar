import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or API Key in environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const getDayDescription = async (key: string) => {
  const { data, error } = await supabase
    .from("days")
    .select("content, image_link, title")
    .eq("key", key)
    .single();

  if (error) {
    console.error("Error fetching data:", error.message);
    return { description: "", imageUrl: "", title: "" };
  }

  return {
    description: data?.content || "",
    imageUrl: data?.image_link || "",
    title: data?.title || "",
  };
};
