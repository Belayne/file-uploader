import client from "../prisma/prismaClient";

const indexController = {
  showIndex: (req, res) => {
    if (res.locals.user) {
      return res.redirect("/home");
    }
    res.render("index");
  },

  showHome: async (req, res) => {
    if (res.locals.user) {
      const files = await client.file.findMany({
        where: {
          uploader_id: res.locals.user.id,
          folder: null,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const folders = await client.folder.findMany({
        where: {
          owner_id: res.locals.user.id,
        },
      });

      return res.render("home", { files, folders });
    } else res.redirect("/");
  },
};

export default indexController;
