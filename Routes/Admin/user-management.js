const express = require("express");
const {
  getAddDeptUser,
  postAddDeptUser,
  getDeptUser,
  postDeptUser,
  postDeleteDeptUser,
  getUpdateDeptUser,
  logout,
  getSort,
} = require("../../Controllers/Admin/user-management");
const { loginrequired } = require("../../Middlewares/jwt");
const router = express.Router();

//============================== Department User Management ========================//
router.get("/adddeptuser", loginrequired, getAddDeptUser);
router.post("/adddeptuser", loginrequired, postAddDeptUser);
router.get("/view-dept-user", loginrequired, getDeptUser);
router.get("/update-dept-user/:id", loginrequired, getUpdateDeptUser);
router.post("/update-dept-user/:id", loginrequired, postDeptUser);
router.post("/view-dept-user/:id", loginrequired, postDeleteDeptUser);
router.post("/filter-by-gender", loginrequired, getSort);
router.get("/logOut", loginrequired, logout);

module.exports = router;
