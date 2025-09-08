import { Router } from "express";
import express from "express";

import { Createbook, GetOneBook } from "../controller/bookController";

export const bookRouter: Router = express.Router();

bookRouter.post("/signupbook", Createbook);
bookRouter.get("/getonebook/:id",GetOneBook)
