"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    yearPublished: { type: Number, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    seller: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "MyUsers" },
});
exports.BookModel = mongoose_1.default.model("book", BookSchema);
//# sourceMappingURL=bookmodel.js.map