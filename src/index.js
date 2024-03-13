import express from "express";

import userRouter from "../routes/users.js";
import hostsRouter from "../routes/hosts.js";
import loginRouter from "../routes/login.js";
import loginHostRouter from "../routes/loginHost.js";
import propertiesRouter from "../routes/properties.js";
import amenitiesRouter from "../routes/amenities.js";
import bookingsRouter from "../routes/bookings.js";
import reviewRouter from "../routes/reviews.js";
// import log from "./middleware/logMiddleware.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import noResultErrorHandler from "../middleware/noResultErrorHandler.js";
import errorHandler from "../middleware/errorHandler.js";

import * as Sentry from "@sentry/node";

const app = express();
const port = 3333;
// even alle sentry uitgezet !
Sentry.init({
  dsn: "https://55dc429b8d30a80701fe6cda01aa1bbe@o4506252946833408.ingest.sentry.io/4506762533863424",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use("/users", userRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/login", loginRouter);
app.use("/loginHost", loginHostRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewRouter);

app.use(notFoundErrorHandler);
app.use(noResultErrorHandler);

// The error handler must be registered before any other error middleware and
// after all controllers
app.use(Sentry.Handlers.errorHandler());

//test error
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
  console.log("rest");
});

// Voeg de algemene errorHandler toe (optioneel)
app.use(errorHandler);

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
