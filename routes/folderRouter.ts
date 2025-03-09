import { Router } from "express";
import {
  folderController,
  folderValidators,
} from "../controllers/folderController";

const folderRouter = Router();

folderRouter.post(
  "/folder/new",
  folderValidators,
  folderController.createFolder
);

export default folderRouter;
