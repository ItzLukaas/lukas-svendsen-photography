import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-site",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline' https://consent.cookiebot.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.googletagmanager.com",
      "connect-src 'self' https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
      "frame-src 'self' https://consent.cookiebot.com https://consentcdn.cookiebot.com",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [256, 384, 640, 750, 828, 1080],
    qualities: [75, 78, 82, 86, 90],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async redirects() {
    return [
      {
        source: "/cases",
        destination: "/referencer",
        permanent: true,
      },
      {
        source: "/cases/:slug",
        destination: "/referencer/:slug",
        permanent: true,
      },
      {
        source: "/fotograf",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fotograf/:by",
        destination: "/fotograf-:by",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          {
            key: "Link",
            value: "<https://images.unsplash.com>; rel=preconnect; crossorigin",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*\\.(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
