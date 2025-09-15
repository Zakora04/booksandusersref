import mongoose from "mongoose";
export interface Book extends Document {
    title: string;
    yearPublished: number;
    category: string;
    author: string;
    seller: mongoose.Types.ObjectId;
}
export declare const BookModel: mongoose.Model<Book, {}, {}, {}, mongoose.Document<unknown, {}, Book, {}, {}> & Book & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=bookmodel.d.ts.map