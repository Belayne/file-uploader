import { Router } from "express";
import uploadController from "../controllers/uploadController";
const uploadRouter = Router();

uploadRouter.get("/upload", uploadController.showUploadPage);
uploadRouter.post(
  "/upload",
  uploadController.uploadFile,
  uploadController.handleUpload
);

export default uploadRouter;
