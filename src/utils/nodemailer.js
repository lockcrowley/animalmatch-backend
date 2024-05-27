const nodemailer = require('nodemailer');

const { EMAIL_SMTP_USER, EMAIL_SMTP_PASS, EMAIL_SMTP_HOST, EMAIL_SMTP_PORT } = process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_SMTP_HOST,
  port: EMAIL_SMTP_PORT,
  secure: false,
  auth: {
    user: EMAIL_SMTP_USER,
    pass: EMAIL_SMTP_PASS,
  },
});

module.exports = transporter;