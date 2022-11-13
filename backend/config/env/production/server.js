module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: 'https://miwelioba.hillitilsim.at/strapi',
  app: {
    keys: env.array('APP_KEYS'),
  },
  recaptchaSecret: env(
    "RECAPTCHA_SECRET_KEY",
    "6Lf1g9oiAAAAAD2ypcCEC3zffjf9xKaxiZeywsc1"
  ),
});
