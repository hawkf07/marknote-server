import express from "express";
const app = express();
app.get("/", (req, res, next) => {
  res.send({ message: "root" });
});
app.get("/hello", (req, res) => {
  res.send({ hello: "hello" });
});

app.listen(6000, () => {
  console.log("listening on port", 6000);
});
