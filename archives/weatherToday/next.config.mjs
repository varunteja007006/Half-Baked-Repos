/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  turbopack: {
    root: "/home/varun/Documents/Github/Half-Baked-Repos/weatherToday",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        port: "",
      },
    ],
  },
};

export default nextConfig;
