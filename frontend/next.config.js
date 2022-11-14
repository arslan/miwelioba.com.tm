/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'ru', 'tk'],
    defaultLocale: 'en',
  },
  images: {
    domains: [process.env.IMAGE_DOMAIN],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
