import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "../db";
import { user } from "../db/schema";
import { getUser } from "../utils";
import { isMainThread } from "worker_threads";
const router = Router();

type userInput = {
  username: string;
  email?: string;
  password: string;
};
router.get("/", (req, res) => {
  console.log(req.body);
  res.send("root of auth");
});
// login

router.post("/login", async (req, res) => {
  try {
    const { username, password, email } = req.body as userInput;
    const allUser = await getUser(req.body);
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
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token).status(200).send({
      message: "successfully login ",
      userId: user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
    });
  }
});
//logout
router.post("/logout", (req, res) => {
  if (req.cookies("token")) {
    res.clearCookie("token").send({ message: "logout!" });
  }
});
//register
router.post("/register", async (req, res) => {
  try {
    // get username,email and password from body
    const { username, email, password } = req.body as userInput;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(user)
      .values({
        username,
        email,
        password: hashedPassword,
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
