import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace('Bearer','')
  if (!token) {
   res
      .status(401)
      .json({ message: "Access denied. No token provided." });
      return;
  }
  try{
const decoded=jwt.verify(token,process.env.JWT_SECRET as string);
(req as any).user=decoded;
 next();
  }catch(err){res.status(402).json({message:"Imvalid token"})
  }
  next();
};
