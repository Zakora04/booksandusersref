import mongoose from "mongoose";

export interface Book extends Document {
  title: string;
  yearPublished: number;
  category: string;
  author: string;
  seller: mongoose.Types.ObjectId;
}

const BookSchema = new mongoose.Schema<Book>({
  title: { type: String, required: true },
  yearPublished: { type: Number, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "MyUsers" },
});

export const BookModel = mongoose.model<Book>("book", BookSchema);
