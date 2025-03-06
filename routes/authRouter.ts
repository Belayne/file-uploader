import { Router } from "express";
import authController from "../controllers/authController";

const authRouter = Router();

authRouter.get("/login", authController.showLoginPage);
authRouter.get("/signup", authController.showSignupPage);

export default authRouter;
