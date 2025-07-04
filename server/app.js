import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import authRouter from "./routes/auth.route.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "..", "client", "views"));
app.use(
  express.static(path.join(import.meta.dirname, "..", "client", "public"))
);

app.use(
  session({ secret: "my-secret", resave: true, saveUninitialized: false })
);
app.use(flash());

app.use(authMiddleware);
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use("/", authRouter);

app.get("/", (req, res) => {
  if (!req.user) return res.status(200).render("home");
  res.status(200).render("index");
});

export default app;
