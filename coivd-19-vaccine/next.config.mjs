/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
      return [
          {
              source: '/',
              destination: '/login',
              permanent: false, 
          },
      ];
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
