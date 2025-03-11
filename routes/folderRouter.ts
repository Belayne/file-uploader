import { Router } from "express";
import {
  folderController,
  folderValidators,
} from "../controllers/folderController";

const folderRouter = Router();

folderRouter.post("/new", folderValidators, folderController.createFolder);

folderRouter.get("/:folderId", folderController.showFolder);

folderRouter.post("/delete", folderController.deleteFolder);

export default folderRouter;
