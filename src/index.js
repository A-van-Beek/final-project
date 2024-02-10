import express from "express";
import "dotenv/config";

import userRouter from "../routes/users.js";
import hostsRouter from "../routes/hosts.js";
import loginRouter from "../routes/login.js";
import propertiesRouter from "../routes/properties.js";
// import log from "./middleware/logMiddleware.js";
// import errorHandler from "./middleware/errorHandler.js";
// import * as Sentry from "@sentry/node";
// import jwtCheck from "./middleware/jwtCheck.js";     //probeersel van Mona?

const app = express();
const port = 3333;

app.use(express.json());
// app.use(jwtCheck);     //probeersel van Mona?
app.use("/users", userRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/login", loginRouter);

const logStuff = (req, res, next) => {
  console.log(
    `Protocol: ${req.protocol} \nHost: ${req.get("host")} \nURL: ${
      req.originalUrl
    }`
  );
  next();
};

app.get("/", logStuff, (req, res) => {
  res.send("Welkom in de B&B wereld!");
});

app.listen(port, () => {
  console.log(`mijn B&B app listening at http://localhost:${port}`);
});
