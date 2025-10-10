import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Snippet from "@/app/models/snippet.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // bạn nhớ tạo trong .env
// ✅ GET /api/snipet/[id]
export async function GET(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Lấy params.id từ context
    const params = await context.params; // ✅ phải await
    const snippetId = params.id;

    const snippet = await Snippet.findById(snippetId);
    if (!snippet)
      return NextResponse.json(
        { success: false, message: "Snippet not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: snippet });
  } catch (err: any) {
    console.error("GET /snipet/[id] error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// // 🟡 Cập nhật snippet

export async function PUT(
  req: Request,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const { params } = context;

    // await params nếu nó là Promise
    const resolvedParams = params instanceof Promise ? await params : params;
    const snippetId = resolvedParams.id;

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

    // Tìm snippet theo id
    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return NextResponse.json(
        { success: false, message: "Snippet not found" },
        { status: 404 }
      );
    }

    // Kiểm tra quyền
    if (snippet.author.toString() !== decoded.id) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    // Cập nhật snippet
    const body = await req.json();
    snippet.title = body.title || snippet.title;
    snippet.description = body.description || snippet.description;
    snippet.code = body.code || snippet.code;
    snippet.language = body.language || snippet.language;
    snippet.tags = body.tags || snippet.tags;

    await snippet.save();

    return NextResponse.json({ success: true, data: snippet });
  } catch (error: any) {
    console.error("❌ PUT Snippet error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Update failed" },
      { status: 500 }
    );
  }
}
