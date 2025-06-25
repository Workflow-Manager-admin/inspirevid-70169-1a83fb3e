import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { theme, FONT_FAMILY } from "./VideoTheme";

// PUBLIC_INTERFACE
export type QuoteVideoProps = {
  quote: string;
  author: string;
};

/**
 * PUBLIC_INTERFACE
 * Remotion animated composition that displays a quote and author with
 * inspirational modern styling, custom theme, and elegant entrance/exit animations.
 */
export const QuoteVideo: React.FC<QuoteVideoProps> = ({ quote, author }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, height, width } = useVideoConfig();

  // Animation: fade in quote, then author, then out at end
  const quoteIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.76, 0, 0.24, 1),
  });
  const authorIn = interpolate(frame, [28, 48], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.8, 0, 0.16, 1),
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 36, durationInFrames - 16],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  // Inspirational background animation (soft gradient, animated accent blob)
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(120deg, ${theme.background} 60%, ${theme.accent} 110%)`,
        fontFamily: FONT_FAMILY,
        color: theme.primary,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        letterSpacing: 0.01 * width,
        fontSmooth: "always",
      }}
    >
      <AnimatedAccentBlob width={width} height={height} frame={frame} />
      <div
        style={{
          maxWidth: 900,
          margin: "auto",
          background: "rgba(255,255,255,0.9)",
          borderRadius: 42,
          padding: "54px 48px 40px 48px",
          boxShadow:
            "0 6px 32px 0 rgba(74,20,140,0.10), 0 1.5px 9px 0 rgba(38,198,218,0.11)",
          transform: `scale(${0.95 + 0.06 * quoteIn})`,
          opacity: Math.min(quoteIn, fadeOut),
          transition: "opacity 0.6s, transform 0.4s",
          border: `3px solid ${theme.accent}`,
        }}
      >
        <span
          style={{
            fontSize: 54,
            fontWeight: 700,
            color: theme.primary,
            textShadow: `0 1px 0 ${theme.secondary}`,
            display: "block",
            marginBottom: 32,
            lineHeight: 1.15,
            letterSpacing: 1,
          }}
        >
          “{quote}”
        </span>
        <span
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: theme.muted,
            opacity: authorIn * fadeOut,
            display: "block",
            textAlign: "right",
            marginTop: 18,
            fontStyle: "italic",
          }}
        >
          — {author}
        </span>
      </div>
    </AbsoluteFill>
  );
};

// Soft animated accent blob in background for inspirational effect
function AnimatedAccentBlob({
  width,
  height,
  frame,
}: {
  width: number;
  height: number;
  frame: number;
}) {
  const t =
    0.8 + 0.18 * Math.sin((frame / 23) * Math.PI * 2) +
    0.04 * Math.cos((frame / 17) * Math.PI);
  const left = width * 0.22 + 140 * Math.sin(frame / 40);
  const top = height * 0.41 + 70 * Math.cos(frame / 22);

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.26,
      }}
    >
      <ellipse
        cx={left}
        cy={top}
        rx={320 * t}
        ry={160 * t}
        fill={theme.accent}
      />
    </svg>
  );
}
