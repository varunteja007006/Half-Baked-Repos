import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "dog.ceo",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
      }
    ]
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
