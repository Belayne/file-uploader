import { Strategy } from "passport-local";
import bycrypt from "bcryptjs";
import client from "../prisma/prismaClient";

const verifyFunction = async (
  username: string,
  password: string,
  done: Function
) => {
  try {
    const user = await client.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return done(null, false, { message: "Incorrect username or passowrd" });
    }

    const match = bycrypt.compare(password, user.password);

    if (!match) {
      return done(null, false, { message: "Incorrect username or password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

export default new Strategy(verifyFunction);
