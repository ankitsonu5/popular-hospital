import mongoSanitize from "express-mongo-sanitize";

// No-op middleware (rate limiting disabled)
export const globalLimiter = (req, res, next) => next();
export const adminLimiter = (req, res, next) => next();
export const authLimiter  = (req, res, next) => next();

// ─── MongoDB Query Sanitizer ─────────────────────────────────
// Strips $ and . from req.body, req.query, req.params
export const sanitizeInput = mongoSanitize({
  replaceWith: "_",
  onSanitize: ({ req, key }) => {
    console.warn(
      `[SECURITY] Blocked NoSQL injection attempt in ${key} from ${req.ip}`,
    );
  },
});

// ─── XSS Sanitizer (lightweight) ─────────────────────────────
// Strip dangerous HTML/script tags from string values
const stripXSS = (value) => {
  if (typeof value === "string") {
    return value
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/on\w+\s*=\s*"[^"]*"/gi, "")
      .replace(/on\w+\s*=\s*'[^']*'/gi, "")
      .replace(/javascript\s*:/gi, "");
  }
  return value;
};

const sanitizeObject = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") return stripXSS(obj);
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  if (typeof obj === "object") {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }
  return obj;
};

export const xssSanitizer = (req, res, next) => {
  if (req.body) req.body = sanitizeObject(req.body);
  if (req.query) req.query = sanitizeObject(req.query);
  if (req.params) req.params = sanitizeObject(req.params);
  next();
};

// ─── Centralized Error Handler ───────────────────────────────
// Catches all unhandled errors. Never leaks stack traces in production.
export const errorHandler = (err, req, res, _next) => {
  console.error(`[ERROR] ${req.method} ${req.url}:`, err.message);

  // Multer file-size errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "File size too large." });
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: "Invalid data provided." });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Authentication failed." });
  }

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "An internal server error occurred."
      : err.message;

  res.status(statusCode).json({
    message,
    error: message,
  });
};

// ─── Regex Escaper (for search queries) ──────────────────────
// Prevents ReDoS by escaping special regex characters from user input
export const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
