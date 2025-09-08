import "dotenv/config";
import mongoose, { model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  books: mongoose.Types.ObjectId[];
  isLogin:boolean
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    books: [{ type: mongoose.Types.ObjectId, ref: "book" }],
  isLogin: { type: Boolean, default: false },

  },
  { timestamps: true }
);

export const Usermodel = mongoose.model<IUser>("MyUsers", UserSchema);
