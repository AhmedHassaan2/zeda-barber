import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ videos: [] });
  }
  return NextResponse.json({ videos: data ?? [] });
}

export async function POST(req: Request) {
  try {
    const { title, url, platform } = await req.json();
    if (!url) {
      return NextResponse.json({ success: false, error: "رابط الفيديو مطلوب" }, { status: 400 });
    }

    const entry = {
      id: Date.now().toString(),
      title: title || "فيديو",
      url,
      platform: platform || "other",
      created_at: new Date().toISOString(),
    };

    const { error } = await supabaseAdmin.from("videos").insert(entry);

    if (error) throw error;

    return NextResponse.json({ success: true, video: entry });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "فشل الإضافة" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "المعرف مطلوب" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("videos").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "فشل الحذف" },
      { status: 500 }
    );
  }
}
