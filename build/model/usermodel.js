"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usermodel = void 0;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    books: [{ type: mongoose_1.default.Types.ObjectId, ref: "book" }],
    isLogin: { type: Boolean, default: false },
    role: { type: String, default: "user" },
}, { timestamps: true });
exports.Usermodel = mongoose_1.default.model("MyUsers", UserSchema);
//# sourceMappingURL=usermodel.js.map