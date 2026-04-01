// Centralized security configuration
// All security constants and settings in one place

const securityConfig = {
  // JWT — no fallback, must be set in .env
  jwt: {
    secret: process.env.JWT_SECRET,
    accessTokenExpiry: "4h",
    refreshTokenExpiry: "7d",
  },

  // CORS — strict origin whitelist
  cors: {
    allowedOrigins: (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
      .split(",")
      .map((o) => o.trim()),
  },

  // Rate limiting
  rateLimit: {
    global: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 200, // 200 requests per window
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: "Too many requests, please try again later." },
    },
    auth: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 7, // 7 login attempts per window
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        error: "Too many login attempts. Please try again after 15 minutes.",
      },
    },
  },

  // Account lockout
  lockout: {
    maxAttempts: 5,
    lockoutDurationMs: 15 * 60 * 1000, // 15 minutes
  },

  // Body parser limits
  bodyLimits: {
    json: "5mb",
    urlencoded: "5mb",
  },
};

// Validate critical env vars on startup
if (!securityConfig.jwt.secret || securityConfig.jwt.secret.length < 32) {
  console.error(
    "❌ SECURITY: JWT_SECRET must be set in .env and be at least 32 characters.",
  );
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
}

export default securityConfig;
