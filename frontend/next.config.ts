// next.config.js

import { webpack } from "next/dist/compiled/webpack/webpack";
import { config } from "next/dist/build/templates/pages";
import path from "path";
const nextConfig = {
  turbopack: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
