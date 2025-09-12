import { Router } from "express";
import express from "express";
import {
  SignUpAdmin,
  LoginAdmin,
  // GetOneAdmin,
  GetAllUsers,
  UpdateAdmin,
  deleteOneUser,
  deleteAllUsers,
  // deleteAllAdmins,
} from "../controller/adminController";
// import { authMiddleware} from "../middleware/authMiddleware";

export const adminRouter: Router = express.Router();

adminRouter.post("/signupadmin", SignUpAdmin);
adminRouter.post("/loginadmin", LoginAdmin);
// adminRouter.get("/getone/:id", GetOneAdmin);
adminRouter.get("/getall", GetAllUsers);
adminRouter.put("/update/:id",  UpdateAdmin);
adminRouter.delete("/deleteone/:id",  deleteOneUser);
adminRouter.delete("/deleteallusers",  deleteAllUsers);
// adminRouter.delete("/deleteall", deleteAllAdmins);
