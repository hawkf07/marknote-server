import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";
export const router = Router();

type userInput = {
  username: string;
  email?: string;
  password: string;
};
// login
router.post("/login", (req, res) => {
  try {
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});
//logout

//register

router.post("/register", async (req, res) => {
  try {
    // get username,email and password from body
    const { username, email, password } = req.body as userInput;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
      })
      .returning();
    return res.status(200).json({
      message: "successfully created a new user",
      id: newUser[0].id,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});
