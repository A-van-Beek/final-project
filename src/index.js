import express from "express";
import userRouter from "../routes/users.js";

const app = express();

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world! Welkom in mijn reiswereld");
});

app.listen(3333, () => {
  console.log("Server is listening on port 3333");
});
