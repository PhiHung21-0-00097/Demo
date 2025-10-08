import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Snippet from "@/app/models/snippet.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // bạn nhớ tạo trong .env

// 🟢 Lấy tất cả snippets
export async function GET() {
  try {
    await connectDB();
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: snippets });
  } catch (error) {
    console.error("❌ GET Snippets error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}

// 🟢 Tạo snippet mới
export async function POST(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // 🧩 Giải mã token
    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (!decoded?.id) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // 🧱 Gắn author từ token
    const newSnippet = await Snippet.create({
      ...body,
      author: decoded.id, // 👈 userId từ token
    });

    return NextResponse.json({ success: true, data: newSnippet });
  } catch (error: any) {
    console.error("❌ POST Snippet error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Create failed" },
      { status: 400 }
    );
  }
}
