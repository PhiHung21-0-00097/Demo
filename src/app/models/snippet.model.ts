// models/snippet.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISnippet extends Document {
  title: string;
  description?: string;
  code: string;
  language: string;
  tags: string[]; // 👈 kiểu mảng string
  author: mongoose.Schema.Types.ObjectId; // 👈 thêm dòng này
}

const SnippetSchema = new Schema<ISnippet>(
  {
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true },
    language: { type: String, required: true },
    tags: { type: [String], required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👈 liên kết với model User
      required: true,
    },
  },
  { timestamps: true }
);

const Snippet: Model<ISnippet> =
  mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", SnippetSchema);

export default Snippet;
