const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (user, token) => {
  const verificationLink = `${process.env.APP_BASE_URL}/verify-email/${token}`;
  console.log(user);
  const emailBody = `
    <p>Hello ${user.name},</p>
    <p>Please click the following link to verify your email address:</p>
    <a href="${verificationLink}">${verificationLink}</a>
  `;
  const mailOptions = {
    from: "HR management System <noreply@yourapp.com>",
    to: user.email,
    subject: "Verify Your Email",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${user}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};

const sendPasswordResetEmail = async (user, token) => {
  const resetLink = `${process.env.APP_BASE_URL}/reset-password/${token}`;
  const emailBody = `
    <p>Hello ${user.name},</p>
    <p>Please click the following link to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
  `;
  const mailOptions = {
    from: "HR management <noreply@yourapp.com>",
    to: user.email,
    subject: "Reset Your Password",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${user.email}`);
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`);
  }
};

const sendDefaultCredentials = async (user, defaultpassword, token) => {
  const verificationLink = `${process.env.APP_BASE_URL}/verify-email/${token}`;
  console.log(user);
  const emailBody = `
    <p>Hello ${user.name},</p>
    <p>You are register in  ${user.department}. Given string is your password to HR management System</p>
    <h3>${defaultpassword}</h3>
    <p>Warning! Please change this password as soon as you login the system!!!</p>
    <p>Please click the following link to verify your email address and happy stay </p>
    <a href="${verificationLink}">${verificationLink}</a>
  `;
  const mailOptions = {
    from: "HR Management system System <noreply@yourapp.com>",
    to: user.email,
    subject: "Your credentials for HR management system",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${user.email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};
const deptEmailChangedSendMessage = async (NotupdatedUser, UpdatedUser) => {
  const emailBody = `
    <p>Hello ${UpdatedUser.name},</p>
    <h3>Update on your details</h3>
    <p>Your initial department was ${NotupdatedUser.department} but you are assigned to ${UpdatedUser.department} department from today</p>

    <p>Your user email for Pema Hotel Inventory is changed to ${UpdatedUser.email} from ${NotupdatedUser.email}</p>
    <p>Note: You can use same password to login to HR management System!!!</p>

  `;
  const mailOptions = {
    from: "HR managementSystem <noreply@yourapp.com>",
    to: UpdatedUser.email,
    subject: "Update on your details",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${UpdatedUser.email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};
const nameChangedSendMessage = async (NotupdatedUser, UpdatedUser) => {
  const emailBody = `
    <p>Hello ${UpdatedUser.name},</p>
    <h3>Update on your details</h3>

    <p>Your user name for HR management is changed to${UpdatedUser.name} from ${NotupdatedUser.name} </p>
    <p>Note: You can use same password to login to HR  System!!!</p>

  `;
  const mailOptions = {
    from: "Pema Hotel Invetory System <noreply@yourapp.com>",
    to: UpdatedUser.email,
    subject: "Update on your details",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${UpdatedUser.email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};
const emailChangedSendMessage = async (NotupdatedUser, UpdatedUser) => {
  const emailBody = `
    <p>Hello ${UpdatedUser.name},</p>
    <h3>Update on your details</h3>

    <p>Your user email for Pema Hotel Inventory System is changed to${UpdatedUser.email} from ${NotupdatedUser.email} </p>
    <p>Note: You can use same password to login to Pema Inventory System!!!</p>

  `;
  const mailOptions = {
    from: "Pema Hotel Invetory System <noreply@yourapp.com>",
    to: UpdatedUser.email,
    subject: "Update on your details",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${UpdatedUser.email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};

const nameEmailChangedSendMessage = async (NotupdatedUser, UpdatedUser) => {
  const emailBody = `
    <p>Hello ${UpdatedUser.name},</p>
    <h3>Update on your details</h3>

    <p>Your user email for Pema Hotel Inventory System is changed to${UpdatedUser.email} from ${NotupdatedUser.email} </p>
    <p> And  user name for Pema Hotel Inventory System is changed to${UpdatedUser.name} from ${NotupdatedUser.name} </p>
    <p>Note: You can use same password to login to Pema Inventory System!!!</p>

  `;
  const mailOptions = {
    from: "HR Management system <noreply@yourapp.com>",
    to: UpdatedUser.email,
    subject: "Update on your details",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${UpdatedUser.email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};

const deptChangedSendMessage = async (NotupdatedUser, UpdatedUser) => {
  const emailBody = `
    <p>Hello ${UpdatedUser.name},</p>
    <h3>Update on your details</h3>

    <p>You are assigned to ${UpdatedUser.department} department from ${NotupdatedUser.department}  for HR management System   </p>
    <p>Note: You can use same password to login to HR management System!!!</p>

  `;
  const mailOptions = {
    from: "HR management System <noreply@yourapp.com>",
    to: UpdatedUser.email,
    subject: "Update on your details",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${UpdatedUser.email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};
const deptNameChangedSendMessage = async (NotupdatedUser, UpdatedUser) => {
  const emailBody = `
    <p>Hello ${UpdatedUser.name},</p>
    <h3>Update on your details</h3>

    <p>You are assigned to ${UpdatedUser.department} department from ${NotupdatedUser.department}  for HR management System   </p>
    <p> And  user name for HR management System is changed to${UpdatedUser.name} from ${NotupdatedUser.name} </p>
    <p>Note: You can use same password to login to HR management System!!!</p>


  `;
  const mailOptions = {
    from: " HR management <noreply@yourapp.com>",
    to: UpdatedUser.email,
    subject: "Update on your details",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${user}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};

const allChangedSendMessage = async (NotupdatedUser, UpdatedUser) => {
  const emailBody = `
    <p>Hello ${UpdatedUser.name},</p>
    <h3>Update on your details</h3>

    <p>You are assigned to ${UpdatedUser.department} department from ${NotupdatedUser.department}  for Pema Hotel Inventory System   </p>
    <p> And  user name for HR System is changed to${UpdatedUser.name} from ${NotupdatedUser.name} </p>
    <p>Your user email for HR is changed to${UpdatedUser.email} from ${NotupdatedUser.email} </p>

    <p>Note: You can use same password to login to System!!!</p>



  `;
  const mailOptions = {
    from: "HR management system <noreply@yourapp.com>",
    to: UpdatedUser.email,
    subject: "Update on your details",
    html: emailBody,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${UpdatedUser.email}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendDefaultCredentials,
  deptEmailChangedSendMessage,
  nameChangedSendMessage,
  emailChangedSendMessage,
  nameEmailChangedSendMessage,
  deptChangedSendMessage,
  deptNameChangedSendMessage,
  allChangedSendMessage,
};
