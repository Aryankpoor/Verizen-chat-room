/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
      env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      },
};

export default nextConfig;
