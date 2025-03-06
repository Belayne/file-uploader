const uploadController = {
  showUploadPage: (req, res) => {
    if (!res.locals.user) {
      return res.redirect("/");
    }
    res.render("uploadPage");
  },
};

export default uploadController;
