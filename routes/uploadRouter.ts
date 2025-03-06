import { Router } from "express";
import uploadController from "../controllers/uploadController";

const uploadRouter = Router();

uploadRouter.get("/upload", uploadController.showUploadPage);

export default uploadRouter;
