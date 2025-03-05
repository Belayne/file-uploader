import express from "express";
import passport from "passport";
import path from "path";
import expressSession from "express-session";
import dotenv from "dotenv";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

dotenv.config();

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

//Make user available to all the views if authenticaed
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.listen(3000, () => console.log("App listening on port 3000"));
