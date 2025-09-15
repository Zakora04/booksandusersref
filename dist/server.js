"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = require("./config/db");
const userRoutes_1 = require("./routes/userRoutes");
const bookRoutes_1 = require("./routes/bookRoutes");
const adminRoutes_1 = require("./routes/adminRoutes");
// import { BookModel } from "./model/bookmodel";
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.connectDB)();
// .then(async () => {
//   try {
//     await BookModel.collection.dropIndex("author_1");
//     console.log("Dropped unique index on author");
//   } catch (err: any) {
//     console.log("Index not found or already dropped:", err.message);
//   }
// });
app.use("/api", bookRoutes_1.bookRouter);
app.use("/api", userRoutes_1.userRouter);
app.use("/api", adminRoutes_1.adminRouter);
app.listen(PORT, () => {
    console.log(`Server is here on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map