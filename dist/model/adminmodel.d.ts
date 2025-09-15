import "dotenv/config";
import mongoose from "mongoose";
export interface IAdmin extends Document {
    name: string;
    password: string;
    email: string;
    phoneNumber: string;
    role: string;
    isLogin: boolean;
}
export declare const Adminmodel: mongoose.Model<IAdmin, {}, {}, {}, mongoose.Document<unknown, {}, IAdmin, {}, {}> & IAdmin & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=adminmodel.d.ts.map