import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "../db";
import * as schema from "../db/schema";
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";
import { RequestWithUser } from "../types";
type userInput = {
  name: string;
  email?: string;
  password: string;
};

export const getUser = async (userInput: userInput) => {
  const theUser = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.username, userInput.name));

  return theUser;
};

export const isAuthJWT = async (
  req: Request & { token: string | jwt.JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];

    req.token = token;
    console.log(req.token);
    next();
  } else {
    res.status(401).send("Forbidden");
  }
};
