import { Router } from "express";
import express from "express";
import { CreateBook, GetOne,  LoginUser,  SignUp } from "../controller/userController";
import { authMiddleware } from "../middleware/authMiddleware";

export const userRouter: Router = express.Router();

userRouter.post("/signup", SignUp);
userRouter.post("/login", LoginUser);
userRouter.post("/createbook", authMiddleware, CreateBook)
userRouter.get("/getone/:id", authMiddleware, GetOne)
