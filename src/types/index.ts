import { Request } from "express";

import jwt from "jsonwebtoken";
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
