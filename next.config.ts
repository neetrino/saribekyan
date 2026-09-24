import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
  // Next 15 defaults dynamic client-router cache to 0s (refetch every click).
  // Restore short TTL so revisited/prefetched routes feel instant.
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default withNextIntl(nextConfig);
