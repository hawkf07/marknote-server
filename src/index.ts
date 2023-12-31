import express from "express";
import { db } from "./db";
import cookierParser from "cookie-parser";
import authRouter from "./router/auth";
import functionsRouter from "./router/functions";
import cors from "cors";
import { isAuthJWT } from "./utils";
import session from "express-session";

const app = express();

app.use(cookierParser());
app.use(express.json());
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
app.use("/api/auth", authRouter);
app.use("/api/functions", isAuthJWT, functionsRouter);
app.get("/", (req, res, next) => {
  res.send({ message: "root" });
});

app.get("/hello", (req, res) => {
  res.send({ hello: "hello" });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port", process.env.PORT);
});
