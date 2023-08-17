import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "../db";
import * as schema from "../db/schema";
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { RequestWithUser } from "../types";
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
  req: Request & { user: string | jwt.JwtPayload },

  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      res.send({ message: "error no token provided!" }).status(400);
    }
    console.log(token);
    const user = jwt.verify(token, process.env.JWT_SECRET, {
      maxAge: "7d",
    });
    console.log(user);
    req.user = user;
    console.log(token);
    next();
  } catch (error) {
    if (error) {
      res
        .status(400)
        .clearCookie("s")
        .send("error" + error);
    }
  }
};
