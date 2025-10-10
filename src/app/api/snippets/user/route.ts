import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Snippet from "@/app/models/snippet.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // bạn nhớ tạo trong .env

// 🟢 Lấy tất cả snippets theo người dùng
export async function GET(req: Request) {
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

    const decoded: any = jwt.verify(token, JWT_SECRET);

    if (!decoded?.id) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }
    const snippets = await Snippet.find({ author: decoded.id }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ success: true, data: snippets });
  } catch (error) {
    console.error("❌ GET Snippets error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}
