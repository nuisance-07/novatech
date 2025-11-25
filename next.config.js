/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'upload.wikimedia.org'],
  },
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ['localhost:3000']
  //   }
  // }
};

module.exports = nextConfig;