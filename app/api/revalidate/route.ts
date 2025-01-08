import Home from "@/app/page";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    revalidatePath("/");
    await Home();
    return NextResponse.json({ success: true, message: "Page revalidated" });
  } catch (error) {
    console.error("Error during revalidation:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
