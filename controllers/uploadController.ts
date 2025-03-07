import multer from "multer";
import client from "../prisma/prismaClient";

//Sets multer storage file directory and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file: ", file);
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log("file: ", file);
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
    console.log(file);
    res.redirect("/");
  },
};

export default uploadController;
