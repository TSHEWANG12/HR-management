const jwt = require("jsonwebtoken");

exports.loginrequired = (req, res, next) => {
  const token = req.cookies["access_token"];
  if (token) {
    const validatetoken = jwt.verify(token, process.env.JWT_SECRET);
    if (validatetoken) {
      res.user = validatetoken._id;
      next();
    } else {
      return res.render("LoginRegister/login", { message: "You are logout" });
    }
  } else {
    return res.render("LoginRegister/login", { message: "Please login" });
  }
};
