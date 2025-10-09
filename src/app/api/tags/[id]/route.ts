import Tag from "@/app/models/Tag";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   await connectDB();
//   const data = await req.json();
//   const tag = await Tag.findByIdAndUpdate(params.id, data, { new: true });
//   return NextResponse.json(tag);
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   await connectDB();
//   await Tag.findByIdAndDelete(params.id);
//   return NextResponse.json({ success: true });
// }
