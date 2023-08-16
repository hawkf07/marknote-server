import express from "express";
import { db } from "./db";
import cookierParser from "cookie-parser";
import authRouter from "./router/auth";
import functionsRouter from "./router/functions";
import cors from "cors";
import { isAuthJWT } from "./utils";

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
app.use("/api/auth", isAuthJWT, functionsRouter);
app.get("/", (req, res, next) => {
  res.send({ message: "root" });
});

app.get("/hello", (req, res) => {
  res.send({ hello: "hello" });
});

app.listen(6000, () => {
  console.log("listening on port", 6000);
});
