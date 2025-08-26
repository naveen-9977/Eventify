import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.type.split("/")[1] || "png";
    const fileName = `${Date.now()}.${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // ✅ ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const url = `/uploads/${fileName}`;

    return NextResponse.json({ url }, { status: 200 });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ message: "Upload failed", error: err.message }, { status: 500 });
  }
}
