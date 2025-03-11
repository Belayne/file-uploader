import { NextFunction, Request, Response } from "express";
import client from "../prisma/prismaClient";
import { body, validationResult } from "express-validator";

const folderValidators = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage("Folder name must contain at least one character."),
];

const folderController = {
  createFolder: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).redirect("/home");
    }
    try {
      const { name } = req.body;
      const folder = await client.folder.create({
        data: {
          name,
          owner: { connect: { id: res.locals.user.id } },
        },
      });
      return res.redirect("/home");
    } catch (error) {
      return next(error);
    }
  },

  showFolder: async (req, res, next) => {
    const { folderId } = req.params;
    try {
      const folder = await client.folder.findFirst({
        where: { id: folderId },
        include: { Files: true },
      });

      return res.render("folder", { folder, files: folder?.Files });
    } catch (error) {
      next(error);
    }
  },

  deleteFolder: async (req, res, next) => {
    try {
      const { folderId } = req.body;
      await client.folder.delete({
        where: { id: folderId },
        include: { Files: true },
      });
      return res.redirect("/home");
    } catch (error) {
      next(error);
    }
  },
};

export { folderController, folderValidators };
