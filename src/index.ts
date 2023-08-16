import express from "express";
import { db } from "./db";
import { users } from "./db/schema";
import cookierParser from "cookie-parser";
import authRouter from "./router/auth";
import cors from "cors";

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookierParser());

app.use("/api/auth", authRouter);
app.get("/", (req, res, next) => {
  res.send({ message: "root" });
});

app.get("/hello", (req, res) => {
  res.send({ hello: "hello" });
});

app.listen(6000, () => {
  console.log("listening on port", 6000);
});
