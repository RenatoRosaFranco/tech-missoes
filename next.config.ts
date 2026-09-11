import path from "node:path";
import type { NextConfig } from "next";

const modernPolyfill = path.join(process.cwd(), "lib/modern-polyfill.js");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    resolveAlias: {
      "next/dist/build/polyfills/polyfill-module": "./lib/modern-polyfill.js",
      "next/dist/build/polyfills/polyfill-module.js": "./lib/modern-polyfill.js",
    },
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next/dist/build/polyfills/polyfill-module": modernPolyfill,
      "next/dist/build/polyfills/polyfill-module.js": modernPolyfill,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/entrar",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
