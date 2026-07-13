import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ERRORS } from "../config/constants";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: "FARMER" | "BRAND";
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: ERRORS.ACCESS_DENIED });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkeyforcoffeeshopmvp12345") as {
      userId: string;
      role: "FARMER" | "BRAND";
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: ERRORS.INVALID_TOKEN });
  }
};

export const requireRole = (role: "FARMER" | "BRAND") => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ error: ERRORS.UNAUTHORIZED_ROLE });
      return;
    }
    next();
  };
};
