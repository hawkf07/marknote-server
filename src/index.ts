import express from "express";
import { db } from "./db";
import { users } from "./db/schema";
import cookierParser from 'cookie-parser'
const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cookierParser())

app.get("/", (req, res, next) => {
  res.send({ message: "root" });
});

app.get("/hello", (req, res) => {
  res.send({ hello: "hello" });
});

app.listen(6000, () => {
  console.log("listening on port", 6000);
});
