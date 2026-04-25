import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    unoptimized: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "aws.dylanbatar.lat",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:
          "wedding-api-prod-event-assets-861450637146.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4566",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4566",
        pathname: "/**",
      },
    ],
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
