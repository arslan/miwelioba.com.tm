/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'ru', 'tk'],
    defaultLocale: 'en',
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN]
  },
};

module.exports = nextConfig;
