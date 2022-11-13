// path: ./config/plugins.js

module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env('EMAIL_PROVIDER_SMTP'),
        port: env.int('EMAIL_PROVIDER_PORT'), // no need to set host or port etc.
        secure: true,
        auth: {
          user: env("EMAIL_USERNAME"),
          pass: env('EMAIL_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_FROM_FIELD'),
        defaultReplyTo: env('EMAIL_REPLY_TO_FIELD'),
      },
    },
  },
  // ...
});
