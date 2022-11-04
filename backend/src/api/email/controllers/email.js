"use strict";

/**
 * A set of functions called "actions" for `email`
 */

module.exports = {
  send: async (ctx, next) => {
    const { email, phone, firstName, lastName, message } = ctx.request.body;
    strapi.log.debug(`Trying to send an email from ${email} to ${process.env.EMAIL_SMTP_USER}`);

    try {
      const emailOptions = {
        from: process.env.EMAIL_FROM_FIELD,
        to: process.env.EMAIL_SMTP_USER,
        subject: `Message from ${firstName} ${lastName}`,
        text: message + " | Sent from: " + email,
        html: `<div>${message} ${phone}</div><p>Sent from:
          ${email}</p>`,
      };
      strapi.log.debug(`Email Options: ${emailOptions}`);

      // sending emails through the nodemailer provider.. does not work
      await strapi.plugins["email"].services.email.send(emailOptions);

      strapi.log.debug(`Email sent to ${process.env.EMAIL_SMTP_USER}`);
      ctx.send({ message: "Email sent" });
    } catch (err) {
      strapi.log.error(`Error sending email to ${email}`, err);
      ctx.send({ error: "Error sending email" });
    }
  },
};
