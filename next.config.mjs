/** @type {import('next').NextConfig} */

const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: ["jaimehayde.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jaimehayde.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
