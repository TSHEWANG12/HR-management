const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../../Models/LoginRegister/user");
const { sendVerificationEmail, sendPasswordResetEmail } = require("./email");
const jwt = require("jsonwebtoken");

exports.getLogin = async (req, res) => {
  const successMessage = req.flash("success");
  res.render("LoginRegister/login", { successMessage });
};

const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET
  );
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (!user.isVerified) {
        return res.render("LoginRegister/login", {
          errorMessage: "Your email was not verified",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        var redirectPath;
        const role = user.role.toString().toLowerCase();

        console.log(role);
        if (role === "admin") {
          redirectPath = "/view-dept-user";
        } else if (role === "department-user") {
          redirectPath = "/department-user-dashboard";
        } else if (role === "store manager") {
          redirectPath = "/store-manager-dashboard";
        } else if (role === "pocurement") {
          redirectPath = "/procurement-dashboard";
        }
        console.log("PATH" + redirectPath);

        const token = createToken(user._id);
        res.cookie("access_token", token, { httpOnly: true });
        return res.redirect(redirectPath);
      }
    }
    return res.render("LoginRegister/login", {
      errorMessage: "Invalid email or password",
    });
  } catch (error) {
    console.error(`Error logging in user: ${error}`);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
};

exports.getRegister = async (req, res) => {
  res.render("LoginRegister/register");
};
//secure password
const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

//========================= Registeration ====================================//
exports.postRegister = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = "Admin";
    const foundduser = await User.findOne({ email: email });
    const verificationToken = crypto.randomBytes(20).toString("hex");
    if (foundduser) {
      res.render("LoginRegister/register", {
        errorMessage: "Email has already taken.",
      });
    } else {
      const spassword = await securePassword(password);
      const user = new User({
        name: name,
        email: email,
        role: role,
        password: spassword,
        verificationToken,
      });
      await user.save();
      if (user) {
        await sendVerificationEmail(user, user.verificationToken);
        res.render("LoginRegister/login", {
          errorMessage: "Please verify your email Now",
        });
      } else {
        res.render("LoginRegister/register", { errorMessage: "Something wrong" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

// routes/auth.js

exports.getVerifyToken = async (req, res) => {
  const { token } = req.params;

  try {
    // Find the user with the provided verification token
    const user = await User.findOne({
      verificationToken: token,
    });

    // If the token is valid, update the user's emailVerified status and redirect to login page
    if (user) {
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
      return res.render("LoginRegister/login", {
        successMessage:
          "You have succesfully verified your email.\n Please provide your credientials to login",
      });
    }

    // If the token is invalid, display an error message
    return res.status(400).render("error", {
      errorMessage: "Invalid verification token",
    });
  } catch (error) {
    console.error(`Error verifying email: ${error}`);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
};

exports.getForgotPassword = async (req, res) => {
  res.render("LoginRegister/forgot-password");
};

exports.postForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user with the provided email
    const user = await User.findOne({ email });
    if(user){
       // Generate a password reset token for the user
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Send a password reset email to the user's email address
    await sendPasswordResetEmail(user, resetToken);

    // Redirect the user to a page informing them to check their email
    return res.render("LoginRegister/forgot-password", {
      successMessage: "Please refresh your mail to reset your password",
    });

    }else{
      return res.status(500).render("LoginRegister/forgot-password", {
        errorMessage: "Please enter the valid email",
      });
      
    }

   
  } catch (error) {
    console.error(`Error resetting password: ${error}`);
    return res.status(500).render("LoginRegister/forgot-password", {
      errorMessage: "Please enter the valid email",
    });
  }
};

exports.getResetToken = async (req, res) => {
  const { token } = req.params;

  try {
    // Find the user with the provided password reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    // If the token is valid, display a form for the user to enter a new password
    if (user) {
      return res.render("LoginRegister/reset-new-password", { token });
    }

    // If the token is invalid, display an error message
    return res.status(400).render("error", {
      errorMessage: "Invalid password reset token",
    });
  } catch (error) {
    console.error(`Error resetting password: ${error}`);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
};

exports.postResetToken = async (req, res) => {
  const { token } = req.params;
  const { password, confirmpassword } = req.body;
  console.log(token, { $gt: Date.now() });

  try {
    // Find the user with the provided password reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    console.log(password, confirmpassword);
    console.log(user);
    // If the token is valid and the passwords match, update the user's password and redirect to login page
    if (user && password === confirmpassword) {
      user.password = await securePassword(password);
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
      res.redirect("/?successMessage=You have successfully changed the password, Please login");

    }

    // If the token is invalid or the passwords don't match, display an error message
    return res.status(400).render("LoginRegister/reset-new-password", {
      token,
      errorMessage: "Invalid password or passwords do not match",
    });
  } catch (error) {
    console.error(`Error resetting password: ${error}`);
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
};

