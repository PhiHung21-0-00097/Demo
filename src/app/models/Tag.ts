import { Schema, model, models, Model, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
  description?: string;
}

const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Tag: Model<ITag> = models.Tag || model<ITag>("Tag", TagSchema);
export default Tag;
