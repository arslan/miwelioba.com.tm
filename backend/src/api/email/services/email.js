// "use strict";
// const nodemailer = require("nodemailer");

// /**
//  * email service.
//  */
// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SMTP_HOST,
//   auth: {
//     user: process.env.EMAIL_SMTP_USER,
//     pass: process.env.EMAIL_SMTP_PASS,
//   },
// });

// module.exports = {
//   send1: ({ to, subject, text }) => {
//     // Setup e-mail data.
//     const options = {
//       from: process.env.EMAIL_SMTP_USER,
//       to,
//       subject,
//       text,
//     };
//     // Return a promise of the function that sends the email.
//     return transporter.sendMail(options);
//   },
// };
