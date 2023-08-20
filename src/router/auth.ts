import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../db";
import { user } from "../db/schema";
import { getUser } from "../utils";
import { isMainThread } from "worker_threads";
const router = Router();

type userInput = {
  name: string;
  email?: string;
  password: string;
};
router.get("/", (req, res) => {
  console.log(req.body);
  res.send("root of auth");
});
// login

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { name, password, email } = req.body as userInput;

    console.log(req.body, "is body");
    const allUser = await getUser(req.body);
    console.log(allUser);
    const user = allUser[0];
    console.log(user);
    if (!user) {
      res
        .send({
          message: "user not found!",
        })
        .status(400);
    }
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    console.log(passwordIsMatch);
    if (!passwordIsMatch) {
      res.status(400).send({
        message: "Password is not match!",
      });
    }
    const token = jwt.sign(user, process.env.JWT_SECRET);
    return res
      .cookie("token", token, {
        // secure: true,
        // httpOnly: false,
        // signed: true,
        // sameSite:"lax"
      })
      .status(200)
      .send({
        message: "successfully login ",
        userId: user.id,
      });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
    });
  }
});
//logout
router.get("/logout", (req, res) => {
  console.log(req.cookies);
  if (req.cookies.token) {
    res.clearCookie("token").send({ message: "logout!" });
  }
});
//register
router.post("/register", async (req, res) => {
  try {
    // get username,email and password from body
    const { name, email, password } = req.body as userInput;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(user)
      .values({
        email,
        password: hashedPassword,
        username: name,
      })
      .returning();
    return res.status(200).json({
      message: "successfully created a new user",
      userId: newUser[0].id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
      message: "error",
    });
  }
});

export default router;
