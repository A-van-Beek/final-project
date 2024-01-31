import express from "express";
import userRouter from "../routes/users.js";
import hostsRouter from "../routes/hosts.js";
import propertiesRouter from "../routes/properties.js";

const app = express();

app.use("/users", userRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);

app.get("/", (req, res) => {
  res.send("Hello world! Welkom in mijn reiswereld");
});

app.listen(3333, () => {
  console.log("Server is listening on port 3333");
});
