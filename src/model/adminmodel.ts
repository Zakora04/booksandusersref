import "dotenv/config";
import mongoose, { model, Schema } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: string;
  isLogin: boolean;
}

const AdminSchema = new mongoose.Schema<IAdmin>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, default: "admin" },
    isLogin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Adminmodel = mongoose.model<IAdmin>("Admins", AdminSchema);
