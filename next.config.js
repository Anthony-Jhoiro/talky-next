/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // rewrites() {
  //   return [
  //     {
  //       source: "/api/talky/:path*",
  //       destination: `${process.env.TALKY_API_ENDPOINT}/:path*`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
