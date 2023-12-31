import { Request } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import { user } from "../db/schema";
export interface RequestWithUser extends Request {
  user:
    | {
        username: string;
        id: number;
        email: string;
        password: string;
        date_created: string;
      }
    | jwt.JwtPayload;
}

export interface RequestWithToken extends Request {
  token: string  | JwtPayload 
}
