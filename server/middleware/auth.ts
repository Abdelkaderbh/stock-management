import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/AuthenticatedRequest";

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      res.status(401).send({ message: "Invalid token" });
      return;
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
    if (typeof decodedToken === "object") {
      req.userId = decodedToken.id;
      req.userEmail = decodedToken.email;
    }
    next();
  } catch (err) {
    res.status(401).send((err as Error).message);
  }
};
