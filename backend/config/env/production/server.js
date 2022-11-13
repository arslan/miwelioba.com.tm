module.exports = ({ env }) => ({
  host: env('HOST', 'miwelioba.hillitilsim.at/strapi'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  recaptchaSecret: env(
    "RECAPTCHA_SECRET_KEY",
    "6Lf1g9oiAAAAAD2ypcCEC3zffjf9xKaxiZeywsc1"
  ),
});
