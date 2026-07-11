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
      "img-src 'self' data: blob: https://images.unsplash.com https://image.mux.com https://www.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self' data:",
      "media-src 'self' blob: https://stream.mux.com",
      "style-src 'self' 'unsafe-inline' https://consent.cookiebot.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.googletagmanager.com",
      "connect-src 'self' https://consent.cookiebot.com https://consentcdn.cookiebot.com https://www.google-analytics.com https://region1.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://stream.mux.com https://*.mux.com",
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
    qualities: [75, 78, 80, 82, 86, 90],
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
      {
        source: "/ydelser/eventfotograf",
        destination: "/ydelser/fotografering",
        permanent: true,
      },
      {
        source: "/ydelser/sportsfotograf",
        destination: "/ydelser/fotografering",
        permanent: true,
      },
      {
        source: "/ydelser/koncertfotograf",
        destination: "/ydelser/fotografering",
        permanent: true,
      },
      {
        source: "/ydelser/bryllupsfotograf",
        destination: "/ydelser/fotografering",
        permanent: true,
      },
      {
        source: "/ydelser/erhvervsfotograf",
        destination: "/ydelser/fotografering",
        permanent: true,
      },
      {
        source: "/ydelser/portraetfotograf",
        destination: "/ydelser/fotografering",
        permanent: true,
      },
      {
        source: "/ydelser/videograf",
        destination: "/ydelser/videoproduktion",
        permanent: true,
      },
      {
        source: "/ydelser/dronefoto",
        destination: "/ydelser/drone",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.htm",
        destination: "/",
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
        source: "/brand/:path*",
        headers: [
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
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
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
