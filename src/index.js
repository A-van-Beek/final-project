import express from "express";
import "dotenv/config";

import userRouter from "../routes/users.js";
import hostsRouter from "../routes/hosts.js";
import loginRouter from "../routes/login.js";
import propertiesRouter from "../routes/properties.js";
// import log from "./middleware/logMiddleware.js";
// import errorHandler from "./middleware/errorHandler.js";
// import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello world! Welkom in mijn reiswereld");
});

app.listen(3333, () => {
  console.log("Server is listening on port 3333");
});
