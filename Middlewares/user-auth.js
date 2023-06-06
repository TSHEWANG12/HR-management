const User = require("../Models/LoginRegister/user");
const isLogin = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      const user = await User.findById(req.session.user_id);

      if (user) {
        let redirectPath;

        if (user.role === "Admin") {
          redirectPath = "/admin-dashboard";
        } else if (user.role === "Department User") {
          redirectPath = "/department-user-dashboard";
        } 

        if (redirectPath) {
          return res.redirect(redirectPath);
        }
      }
    }

    // If no redirectPath is set or user_id is not found, proceed to next middleware
    next();
  } catch (error) {
    console.log(error.message);
    res.redirect("/");
  }
};

const isNotLoggedIn = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      const user = await User.findById(req.session.user_id);

      if (user) {
        let redirectPath;

        if (user.role === "Admin") {
          redirectPath = "/admin-dashboard";
        } else if (user.role === "Department User") {
          redirectPath = "/department-user-dashboard";
        }

        return res.redirect(redirectPath);
      }
    }

    next();
  } catch (error) {
    console.log(error.message);
    next();
  }
};

module.exports = {
  isLogin,

  isNotLoggedIn,
};
