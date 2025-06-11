/** @type {import('next').NextConfig} */

const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      "jaimehayde.com",
      "api.pruebaensilencio.es",
      "shop.jaimehayde.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jaimehayde.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.pruebaensilencio.es",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "shop.jaimehayde.com",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
