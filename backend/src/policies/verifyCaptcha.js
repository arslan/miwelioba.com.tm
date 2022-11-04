"use strict";
/**
 * `verifyCaptcha` policy.
 */
const axios = require("axios");

module.exports = async (ctx) => {
  console.log(ctx.request.body)
  const secret = strapi.config.get("server.recaptchaSecret");
  const token = ctx.request.body.token;
  const { firstName, email, message } = ctx.request.body;

  if (!firstName || !message || !email) {
    console.log('This?')
    return 400;
  }

  if (!token) {
    console.log('That?')
    return 400;
  }

  try {
    console.log(secret, token);
    await axios({
      method: 'post',
      url: 'https://www.google.com/recaptcha/api/siteverify',
      params: {
        secret: secret,
        response: token,
      },
    }).then((res) => {
      if (res.data.success) {
        return true;
      } else {
        console.log(res.data);
        return 400;
      }
    });
  } catch (error) {
    console.log(error);
    return 500;
  }
};
