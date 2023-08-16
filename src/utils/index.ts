import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "../db";
import * as schema from "../db/schema";
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
type userInput = {
  username: string;
  email?: string;
  password: string;
};

export const getUser = async (userInput: userInput) => {
  const theUser = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.username, userInput.username));

  return theUser;
};

export const isAuthJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies("token");
  if (!token) {
    res.send({ message: "error no token provided!" }).status(400);
  }

  const user = jwt.verify(token, process.env.JWT_SECRET, {
    maxAge: "7d",
  });
  req.user = user;
  next();
};
