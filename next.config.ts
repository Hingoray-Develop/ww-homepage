import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /react/, // 쿼리스트링 ?react가 있을 때 적용
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
