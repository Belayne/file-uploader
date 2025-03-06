const authController = {
  showLoginPage: (req, res) => {
    if (res.locals.user) {
      res.redirect("/");
    }

    res.render("login");
  },

  showSignupPage: (req, res) => {
    if (res.locals.user) {
      res.redirect("/");
    }

    res.render("signup");
  },

  createUser: (req, res) => {},
};

export default authController;
