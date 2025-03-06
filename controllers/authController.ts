import { body } from "express-validator";
import { validationResult } from "express-validator";
import client from "../prisma/prismaClient";
import bcryptjs from "bcryptjs";

const signupValidations = [
  body("username")
    .trim()
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers.")
    .custom(async (username) => {
      const user = await client.user.findFirst({
        where: { username },
      });
      if (user) {
        throw new Error("Username already in use");
      }
    }),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters."),
  body("confirmPassowrd").custom((confirm, { req }) => {
    if (confirm === req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),
];

const authController = {
  showLoginPage: (req, res) => {
    if (res.locals.user) {
      res.redirect("/");
    }

    res.render("login");
  },

  showSignupPage: (req, res) => {
    if (res.locals.user) {
      res.redirect("/");
    }

    res.render("signup");
  },

  createUser: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
      await client.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
};

export { authController, signupValidations };
