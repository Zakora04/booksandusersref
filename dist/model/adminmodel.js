"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adminmodel = void 0;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, default: "admin" },
    isLogin: { type: Boolean, default: false },
}, { timestamps: true });
exports.Adminmodel = mongoose_1.default.model("Admins", AdminSchema);
//# sourceMappingURL=adminmodel.js.map