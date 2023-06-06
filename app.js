const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const app = express();
const userManagement = require("./Routes/Admin/user-management");
const loginRegister = require("./Routes/LoginRegister/user");

app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Middleware
app.use(
  session({
    secret: "ghishing123hhhh",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(
  "/",
  userManagement,
  loginRegister,
);

module.exports = app;
