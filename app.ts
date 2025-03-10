import express from "express";
import path from "path";
import expressSession from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import configPassport from "./auth_config/configPassport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import indexRouter from "./routes/indexRouter";
import authRouter from "./routes/authRouter";
import uploadRouter from "./routes/uploadRouter";
import folderRouter from "./routes/folderRouter";

dotenv.config();
configPassport();
const app = express();
app.set("views", path.join(path.dirname("./"), "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(path.dirname("./"), "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // a day in ms
    },
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 24 * 60 * 60 * 1000, // a day in ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());

//Make user obj available to all the views if authenticaed
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(indexRouter);
app.use(authRouter);
app.use(uploadRouter);
app.use("/folder", folderRouter);

app.listen(3000, () => console.log("App listening on port 3000"));
