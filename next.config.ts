import path from "path"; // Use ES modules import syntax

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname), // Use the path module
    };
    return config;
  },
  images: {
    domains: ["picsum.photos"],
  },
};

export default nextConfig; // Use ES modules export syntax
