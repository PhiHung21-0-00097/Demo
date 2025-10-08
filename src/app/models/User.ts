import mongoose, { Schema, models, model, Model } from "mongoose";

export interface IUser extends Document {
  _id: number;
  name: string;
  email: string;
  password: string;
}
const UserSchema = new Schema<IUser>(
  {
    _id: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // không trả về password khi query
    },
  },
  { timestamps: true } // tự động tạo createdAt & updatedAt
);

// Tránh lỗi “Cannot overwrite model once compiled”
const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
