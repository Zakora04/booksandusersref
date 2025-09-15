import "dotenv/config";
import mongoose from "mongoose";
export interface IUser extends Document {
    name: string;
    password: string;
    email: string;
    phoneNumber: string;
    books: mongoose.Types.ObjectId[];
    isLogin: boolean;
    role: string;
}
export declare const Usermodel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=usermodel.d.ts.map