import { Router } from "express";
import uploadController from "../controllers/uploadController";
const uploadRouter = Router();

uploadRouter.get("/upload", uploadController.showUploadPage);
uploadRouter.post(
  "/upload",
  uploadController.uploadFile,
  uploadController.handleUpload
);
uploadRouter.get("/file/:fileId", uploadController.downloadFile);
uploadRouter.post("/file/delete", uploadController.deleteFile);

export default uploadRouter;
