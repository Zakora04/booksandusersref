"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectDB = async () => {
    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
        console.error("Missing url in env.");
        throw new Error();
    }
    try {
        await mongoose_1.default.connect(MONGODB_URL);
        console.log("Connected");
    }
    catch (err) {
        console.error("error message", err);
        throw err;
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map