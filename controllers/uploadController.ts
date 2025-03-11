import multer from "multer";
import client from "../prisma/prismaClient";
import path from "path";
import { unlink } from "fs/promises";

//Sets multer storage file directory and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-";
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadController = {
  showUploadPage: (req, res) => {
    if (!res.locals.user) {
      return res.redirect("/");
    }
    res.render("uploadPage");
  },

  uploadFile: upload.single("file"),

  handleUpload: async (req, res) => {
    const file = await client.file.create({
      data: {
        name: req.file.originalname,
        file_size: req.file.size,
        path: req.file.path,
        uploader: { connect: { id: res.locals.user.id } },
      },
    });
    res.redirect("/");
  },

  downloadFile: async (req, res, next) => {
    const { fileId } = req.params;
    try {
      const file = await client.file.findFirst({
        where: {
          id: fileId,
        },
        include: { uploader: true },
      });
      if (file?.uploader.id === res.locals.user.id) {
        if (file?.path) {
          const filePath = path.resolve("./", file?.path);
          return res.sendFile(filePath);
        } else {
          throw new Error("File not found.");
        }
      }
      return res.status(403).redirect("/");
    } catch (error) {
      next(error);
    }
  },

  deleteFile: async (req, res, next) => {
    const { fileId } = req.body;
    try {
      const file = await client.file.findFirst({
        where: {
          id: fileId,
        },
        include: { uploader: true },
      });

      if (file?.uploader.id === res.locals.user.id) {
        if (file?.path) {
          //delete from filesystem
          const filePath = path.resolve("./", file?.path);

          await unlink(filePath);

          //delete from database
          await client.file.delete({
            where: {
              id: fileId,
            },
          });
        } else {
          throw new Error("File not found.");
        }
      }
      return res.status(403).redirect("/");
    } catch (error) {
      next(error);
    }
  },

  renameFile: async (req, res, next) => {
    const { fileName, fileId } = req.body;
    try {
      const file = await client.file.findFirst({
        where: {
          id: fileId,
        },
        include: { uploader: true },
      });
      if (file) {
        if (file?.uploader.id === res.locals.user.id) {
          await client.file.update({
            data: { name: fileName },
            where: { id: fileId },
          });
          return res.redirect("/home");
        } else {
          return res.status(403).redirect("/");
        }
      }
    } catch (error) {
      next(error);
    }
  },
};

export default uploadController;
