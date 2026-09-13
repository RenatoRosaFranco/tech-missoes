import path from "node:path";
import type { NextConfig } from "next";

const modernPolyfill = path.join(process.cwd(), "lib/modern-polyfill.js");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "ui/site")],
  },
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
  async redirects() {
    return [
      { source: "/entrar", destination: "/login", permanent: true },
      { source: "/eventos", destination: "/events", permanent: true },
      { source: "/hackatons", destination: "/hackathons", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/login",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
