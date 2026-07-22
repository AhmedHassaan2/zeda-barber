import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.storage.from("gallery").list("", {
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) throw error;

    const images = (data ?? [])
      .filter((f) => f.metadata?.mimetype?.startsWith("image/"))
      .map((f) => {
        const { data: urlData } = supabaseAdmin.storage.from("gallery").getPublicUrl(f.name);
        return {
          name: f.name,
          url: urlData.publicUrl,
          created_at: f.created_at,
        };
      });

    return NextResponse.json({ success: true, images });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "فشل تحميل الصور" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ success: false, error: "اسم الملف مطلوب" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.storage.from("gallery").remove([name]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "فشل الحذف" },
      { status: 500 }
    );
  }
}
