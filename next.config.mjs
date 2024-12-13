/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["img.freepik.com", "veterinaire-tour-hassan.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      use: "raw-loader",
    });
    return config; // Make sure to return the updated config
  },
};

export default nextConfig;
