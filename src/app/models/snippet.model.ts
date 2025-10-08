// models/snippet.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISnippet extends Document {
  title: string;
  description?: string;
  code: string;
  language: string;
  tag: string;
  // author?: string;
}

const SnippetSchema = new Schema<ISnippet>(
  {
    title: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true },
    language: { type: String, required: true },
    tag: { type: String, required: true },
    // author: { type: String },
  },
  { timestamps: true }
);

const Snippet: Model<ISnippet> =
  mongoose.models.Snippet || mongoose.model<ISnippet>("Snippet", SnippetSchema);

export default Snippet;
