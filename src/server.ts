import express, { Express, Request, Response } from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import { userRouter } from "./routes/userRoutes";
import { bookRouter } from "./routes/bookRoutes";
import { adminRouter } from "./routes/adminRoutes";
// import { BookModel } from "./model/bookmodel";

const PORT = process.env.PORT;
const app: Express = express();
app.use(express.json());
connectDB()
// .then(async () => {
//   try {
//     await BookModel.collection.dropIndex("author_1");
//     console.log("Dropped unique index on author");
//   } catch (err: any) {
//     console.log("Index not found or already dropped:", err.message);
//   }
// });

app.use("/api", bookRouter);
app.use("/api", userRouter);
app.use("/api", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is here on http://localhost:${PORT}`);
});
