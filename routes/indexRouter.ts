import indexController from "../controllers/indexController";
import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", indexController.showIndex);
indexRouter.get("/home", indexController.showHome);

export default indexRouter;
