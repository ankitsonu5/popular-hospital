/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  poweredByHeader: false, // Remove X-Powered-By header
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: "http", hostname: "localhost", port: "5100" },
      { protocol: "http", hostname: "127.0.0.1", port: "5100" },
      { protocol: "https", hostname: "*.popularhospital.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ─── Core Security Headers ───────────────────
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },

          // ─── HSTS: Force HTTPS for 1 year ───────────
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },

          // ─── Referrer Policy ─────────────────────────
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // ─── Content Security Policy ─────────────────
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.tiny.cloud https://translate.google.com http://translate.google.com https://translate.googleapis.com http://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com http://www.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tiny.cloud https://translate.googleapis.com http://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com http://www.gstatic.com",
              "font-src 'self' https://fonts.gstatic.com https://www.gstatic.com data:",
              "img-src 'self' data: blob: https: http://localhost:5100 https://www.gstatic.com http://www.gstatic.com https://translate.google.com http://translate.google.com https://translate-pa.googleapis.com https://img.youtube.com https://i.ytimg.com https://s.ytimg.com",
              "media-src 'self' blob: https:",
              "connect-src 'self' http://localhost:5100 https://*.popularhospital.com https://translate.googleapis.com http://translate.googleapis.com https://translate-pa.googleapis.com https://translate.google.com http://translate.google.com",
              "frame-src 'self' https://translate.google.com http://translate.google.com https://translate.googleapis.com http://translate.googleapis.com https://translate-pa.googleapis.com https://www.youtube.com https://youtube.com",
              "frame-ancestors 'self'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },

          // ─── Permissions Policy ──────────────────────
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=()",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5100";
    return [
      {
        source: "/api-backend/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
