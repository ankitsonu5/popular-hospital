"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fafafa",
            padding: "1rem",
            fontFamily: "Segoe UI, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <div
              style={{ fontSize: "3.5rem", fontWeight: 700, color: "#0d9488", marginBottom: "1rem" }}
            >
              Oops!
            </div>
            <h1
              style={{ fontSize: "1.5rem", fontWeight: 600, color: "#1f2937", marginBottom: "0.75rem" }}
            >
              Something went wrong
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
              We're sorry, an unexpected error occurred. Please try again or go
              back to the home page.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={reset}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#0d9488",
                  color: "#fff",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  padding: "0.75rem 1.5rem",
                  border: "1px solid #0d9488",
                  color: "#0d9488",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  fontSize: "1rem",
                }}
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
