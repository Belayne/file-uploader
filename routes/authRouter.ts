import { Router } from "express";
import {
  authController,
  signupValidations,
} from "../controllers/authController";

const authRouter = Router();

authRouter.get("/login", authController.showLoginPage);
authRouter.get("/signup", authController.showSignupPage);
authRouter.post("/signup", signupValidations, authController.createUser);

export default authRouter;
