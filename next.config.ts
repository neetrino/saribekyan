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
    // Admin uploads: team photos up to 2 MB, PDF documents up to 10 MB (plus form fields).
    // The default Server Action body limit is 1 MB.
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
};

export default withNextIntl(nextConfig);
