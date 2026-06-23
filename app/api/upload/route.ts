import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST() {
  try {
    // test simple (on upload une vidéo exemple plus tard)
    return NextResponse.json({
      message: "Cloudinary prêt"
    });
  } catch (e) {
    return NextResponse.json(
      { error: "upload error" },
      { status: 500 }
    );
  }
}