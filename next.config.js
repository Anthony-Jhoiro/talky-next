/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  images: {
    domains: ["lh3.googleusercontent.com", "storage.googleapis.com"],
  },
};

module.exports = nextConfig;
