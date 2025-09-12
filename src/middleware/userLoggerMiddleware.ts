import { Request, Response, NextFunction } from 'express';


export const userLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`User Route Accessed: ${req.method} ${req.path} at ${new Date().toISOString()}`);
  next();
};
