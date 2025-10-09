import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Snippet from "@/app/models/snippet.model";

// 🟢 Lấy snippet theo id
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
//     const snippet = await Snippet.findById(params.id);
//     if (!snippet)
//       return NextResponse.json(
//         { success: false, message: "Not found" },
//         { status: 404 }
//       );

//     return NextResponse.json({ success: true, data: snippet });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Failed to get snippet" },
//       { status: 500 }
//     );
//   }
// }

// // 🟡 Cập nhật snippet
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
//     const body = await req.json();
//     const updated = await Snippet.findByIdAndUpdate(params.id, body, {
//       new: true,
//     });
//     if (!updated)
//       return NextResponse.json(
//         { success: false, message: "Not found" },
//         { status: 404 }
//       );

//     return NextResponse.json({ success: true, data: updated });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Update failed" },
//       { status: 400 }
//     );
//   }
// }

// // 🔴 Xóa snippet
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await connectDB();
//     const deleted = await Snippet.findByIdAndDelete(params.id);
//     if (!deleted)
//       return NextResponse.json(
//         { success: false, message: "Not found" },
//         { status: 404 }
//       );

//     return NextResponse.json({ success: true, message: "Deleted" });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Delete failed" },
//       { status: 400 }
//     );
//   }
// }
