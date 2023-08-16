import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { user } from "../db/schema";
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
router.get("/get_user", async (req, res) => {
  const allUsers = db.select().from(user);
  console.log(allUsers)
  return res.send({ users: allUsers });
});
router.post("/register", async (req, res) => {
  try {
    // get username,email and password from body
    const { username, email, password } = req.body as userInput;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.insert(user).values({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    return res.status(200).json({
      message: "successfully created a new user",
      
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error,
      message: "error",
    });
  }
});

export default router;
