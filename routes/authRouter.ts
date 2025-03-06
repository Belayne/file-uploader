import { Router } from "express";
import {
  authController,
  signupValidations,
} from "../controllers/authController";

const authRouter = Router();

authRouter.get("/login", authController.showLoginPage);
authRouter.get("/signup", authController.showSignupPage);
authRouter.post("/signup", signupValidations, authController.createUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/logout", authController.logout);

export default authRouter;
