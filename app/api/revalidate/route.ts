import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    revalidatePath("/");

    const url = new URL(request.url);
    const baseUrl = `${url.protocol}//${url.host}`;

    await fetch(`${baseUrl}/`);

    return NextResponse.json({ success: true, message: "Page revalidated" });
  } catch (error) {
    console.error("Error during revalidation:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
