import client from "../prisma/prismaClient";
import LocalStrategy from "./LocalStrategy";
import passport from "passport";

passport.use(LocalStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
