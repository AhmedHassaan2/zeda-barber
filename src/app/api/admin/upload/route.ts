import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const ALLOWED_MIMES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_SIZE = 10 * 1024 * 1024;

const MAGIC_BYTES: Record<string, Uint8Array> = {
  "image/jpeg": new Uint8Array([0xFF, 0xD8, 0xFF]),
  "image/png": new Uint8Array([0x89, 0x50, 0x4E, 0x47]),
  "image/webp": new Uint8Array([0x52, 0x49, 0x46, 0x46]),
};

function checkMagicBytes(buffer: Uint8Array, mime: string): boolean {
  const magic = MAGIC_BYTES[mime];
  if (!magic) return false;
  for (let i = 0; i < magic.length; i++) {
    if (buffer[i] !== magic[i]) return false;
  }
  return true;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ success: false, error: "لم يتم اختيار ملف" }, { status: 400 });
    }

    if (!ALLOWED_MIMES.has(file.type)) {
      return NextResponse.json(
        { success: false, error: `نوع الملف غير مسموح: ${file.type}. المسموح: JPG, PNG, WebP` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "حجم الملف يتجاوز 10 ميجابايت" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    if (!checkMagicBytes(buffer, file.type)) {
      return NextResponse.json(
        { success: false, error: "الملف تالف أو غير صالح" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${Date.now()}.${ext}`;

    const { error } = await supabaseAdmin.storage.from("gallery").upload(filename, buffer, {
      contentType: file.type,
      upsert: true,
    });

    if (error) throw error;

    const { data: urlData } = supabaseAdmin.storage.from("gallery").getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      filename,
      url: urlData.publicUrl,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "فشل الرفع" },
      { status: 500 }
    );
  }
}
