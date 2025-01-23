import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or API Key in environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const getDayDescription = async (key: string) => {
  try {
    const { data, error } = await supabase
      .from("days")
      .select("content, image_link, title")
      .eq("key", key)
      .single();

    if (error) {
      console.error(`Error fetching data from Supabase: ${error.message}`);
    }

    return {
      description: data?.content || null,
      imageUrl: data?.image_link || null,
      title: data?.title || null,
    };
  } catch (error) {
    console.error(
      "Error in getDayDescription:",
      error instanceof Error && error.message
    );
    return {
      description: null,
      imageUrl: null,
      title: null,
    };
  }
};
