import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world! Welkom in mijn reiswereld");
});

app.listen(3333, () => {
  console.log("Server is listening on port 3333");
});
