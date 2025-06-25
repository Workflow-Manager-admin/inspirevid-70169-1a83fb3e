// Allow browser globals for ESLint
/* global window, setTimeout, URLSearchParams */
import React, { useState } from "react";
import { theme, FONT_FAMILY } from "./VideoTheme";
import { useQuoteParams } from "./useQuoteParams";

// PUBLIC_INTERFACE
/**
 * Standalone page for the Remotion quote video preview/generation.
 * Used when accessing the video generator as a page, not through studio sidebar.
 * Handles inspirational theme, animated quote card, and "Render Video" CTA button.
 */
export const PreviewPage: React.FC = () => {
  const data = useQuoteParams();

  // For render button click animation
  const [rendering, setRendering] = useState(false);

  // Fallback content if no data provided
  if (!data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: theme.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_FAMILY,
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: 42,
            borderRadius: 38,
            boxShadow: "0 3px 28px 0 rgba(74,20,140,0.08)",
            color: theme.primary,
            fontSize: 44,
            fontWeight: 600,
            textAlign: "center",
            border: `2px solid ${theme.accent}`,
          }}
        >
          Please return to the quote selection page and select a quote.<br />
          <a
            href="/"
            style={{
              color: theme.accent,
              fontWeight: 600,
              fontSize: 32,
              marginTop: 14,
              display: "inline-block",
              textDecoration: "underline wavy",
            }}
          >
            Go to Quote UI
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.background,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          color: theme.primary,
          fontWeight: 800,
          fontSize: 70,
          marginBottom: 8,
          marginTop: 0,
          textAlign: "center",
          letterSpacing: 2,
        }}
      >
        InspireVid – Video Preview
      </h1>
      <div
        style={{
          fontSize: 32,
          color: theme.muted,
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        Experience your inspirational quote as a stunning animated video.
      </div>
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto 34px auto",
          background: "#fff",
          borderRadius: 34,
          border: `2.5px solid ${theme.primary}`,
          boxShadow:
            "0 2px 24px 0 rgba(74,20,140,0.07), 0 1.5px 8px 0 rgba(38,198,218,0.08)",
          padding: "36px 44px 32px 44px",
          position: "relative",
        }}
      >
        <span
          style={{
            fontSize: 40,
            color: theme.primary,
            fontWeight: 700,
            textAlign: "center",
            display: "block",
            marginBottom: 28,
          }}
        >
          "{data.quote}"
        </span>
        <span
          style={{
            fontSize: 27,
            color: theme.secondary,
            fontWeight: 400,
            fontStyle: "italic",
            textAlign: "right",
            display: "block",
            marginTop: 6,
          }}
        >
          — {data.author}
        </span>
      </div>
      <button
        style={{
          background: rendering
            ? theme.secondary
            : `linear-gradient(102deg, ${theme.primary} 65%, ${theme.accent} 120%)`,
          color: "#fff",
          fontWeight: 900,
          fontSize: 32,
          padding: "18px 44px",
          border: "0",
          borderRadius: 22,
          cursor: "pointer",
          letterSpacing: 1.8,
          marginTop: 19,
          boxShadow:
            "0 1.5px 18px 0 rgba(74,20,140,0.13), 0 0.5px 5px 0 rgba(255,202,40,0.09)",
          transition: "background 0.2s, transform 0.17s",
          outline: rendering ? `3.5px solid ${theme.secondary}` : "none",
          opacity: rendering ? 0.87 : 1,
          transform: rendering ? "scale(0.97)" : "scale(1)",
        }}
        disabled={rendering}
        onClick={() => {
          setRendering(true);
          setTimeout(() => {
            // Navigate to Remotion player page for the composition
            const params = new URLSearchParams({
              quote: data.quote,
              author: data.author,
            });
            window.location.href = `/player?composition=InspireQuote&${params.toString()}`;
          }, 480);
        }}
      >
        {rendering ? "Rendering..." : "Render Video"}
      </button>
    </div>
  );
};
