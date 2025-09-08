import { Router } from "express";
import express from "express";
import { CreateBook, GetOne,  LoginUser,  SignUp } from "../controller/userController";

export const userRouter: Router = express.Router();

userRouter.post("/signup", SignUp);
userRouter.post("/login", LoginUser);
userRouter.post("/createbook",CreateBook)
userRouter.get("/getone/:id",GetOne)
