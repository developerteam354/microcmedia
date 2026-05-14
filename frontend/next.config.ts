/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],          // fixes the /logo.png quality warning
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",  // fixes the StickyImageStack error
      },
    ],
  },
};

module.exports = nextConfig;