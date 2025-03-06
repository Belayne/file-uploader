import multer from "multer";

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

  handleUpload: (req, res) => {
    console.log(req.file);
    res.redirect("/");
  },
};

export default uploadController;
