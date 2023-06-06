const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fs = require("fs");
const User = require("../../Models/LoginRegister/user");
const {
  allChangedSendMessage,
  deptNameChangedSendMessage,
  deptChangedSendMessage,
  nameEmailChangedSendMessage,
  deptEmailChangedSendMessage,
  sendDefaultCredentials,
  emailChangedSendMessage,
  nameChangedSendMessage,
} = require("../LoginRegister/email");
const jwt = require("jsonwebtoken");
const employeeUser = require("../../Models/LoginRegister/employeeModel");

exports.getAddDeptUser = async (req, res) => {
  const successMessage = req.flash('success');
  const errorMessage = req.flash('error');
  const token = req.cookies.access_token;
  res.user = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(res.user.id);
  res.render("Admin/add-department-user", { user, errorMessage, successMessage });
};
//================================ secure password===============================//
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};
//---------------Add Other Department Users ---------------------//
exports.postAddDeptUser = async (req, res) => {
  try {
    const department = req.body.department;
    const name = req.body.name;
    const dob = req.body.dob;
    const appointment_date = req.body.appointment_date;
    const employee_id = req.body.employee_id;
    const designation = req.body.designation;
    const gender = req.body.gender;
    const employee = new employeeUser({
      department: department,
      name: name,
      dob: dob,
      employee_id: employee_id,
      appointment_date: appointment_date,
      designation: designation,
      gender: gender
    });
    await employee.save();
    console.log("employee saved");
    req.flash("success", 'Employee added!')
    res.redirect("/adddeptuser")

  } catch (error) {
    console.log(error.message);
  }
};

//---------------Managing  employee department users -----------------------------//

exports.getDeptUser = async (req, res) => {
  const successMessage = req.flash('success');
  const errorMessage = req.flash('error');
  const token = req.cookies.access_token;
  res.user = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(res.user.id);
  const user1 = await employeeUser.find({});
  res.render("Admin/view-department-user", {
    users: user1.reverse(),
    user,
    successMessage,
    errorMessage
  });
};

exports.getUpdateDeptUser = async (req, res) => {
  try {
    const successMessage = req.flash('success');
    const errorMessage = req.flash('error');
    const token = req.cookies.access_token;
    res.user = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(res.user.id);
    const employee = await employeeUser.findById(req.params.id);
    console.log(user);
    res.render("Admin/update-user", {
      user: user,
      user1: employee,
      successMessage,
      errorMessage
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
exports.postDeptUser = async (req, res) => {
  try {
    const department = req.body.department;
    const name = req.body.name;
    const dob = req.body.dob;
    const appointment_date = req.body.appointment_date;
    const employee_id = req.body.employee_id;
    const designation = req.body.designation;
    const gender = req.body.gender;

    const founEmployee = await employeeUser.findById(req.params.id);
    if(founEmployee){
      await employeeUser.updateOne({_id: req.params.id},{
        $set:{
          department: department,
          name: name,
          dob: dob,
          employee_id: employee_id,
          appointment_date: appointment_date,
          designation: designation,
          gender: gender
        }
      });
      req.flash("success", 'Updated successfully!');
      res.redirect("/update-dept-user/"+ req.params.id);
    }
    
  } catch (error) {
    console.error(error);
  }
};
exports.postDeleteDeptUser = async (req, res) => {
  try {
    await employeeUser.findByIdAndRemove(req.params.id);
    req.flash("success", 'Deleted successfully!');
    res.redirect("/view-dept-user");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.logout = async(req, res) => {
  res.cookie("access_token", "", {
    maxAge: 1
  });
  res.redirect("/");
}

//Sort

exports.getFilter = async (req, res) => {
  const successMessage = req.flash('success');
  const errorMessage = req.flash('error');
  const token = req.cookies.access_token;
  res.user = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(res.user.id);
  const user1 = await employeeUser.find({gender: req.body.gender});
  res.render("Admin/view-department-user", {
    users: user1.reverse(),
    user,
    successMessage,
    errorMessage
  });
};



