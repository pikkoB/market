const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "marco2616@gmail.com",
    pass: "aemkxxyxoepyivbs",
  },
});

module.exports = transporter;
