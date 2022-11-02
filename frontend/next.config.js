/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'ru', 'tk'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
