import client from "../prisma/prismaClient";
import passport from "passport";
import LocalStrategy from "./LocalStrategy";

export default function configPassport() {
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
}
