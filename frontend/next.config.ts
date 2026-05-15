import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
