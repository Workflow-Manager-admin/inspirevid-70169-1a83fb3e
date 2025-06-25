import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  // useVideoConfig,
} from "remotion";
import { theme, FONT_FAMILY } from "./VideoTheme";

/**
 * PUBLIC_INTERFACE
 * End screen for inspirational video, with modern animated "Thank you for watching!" message.
 */
export const EndScreen: React.FC = () => {
  const frame = useCurrentFrame();
  // Remove unused vars for lint
  // const { durationInFrames, width, height } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 21], [0, 1], { extrapolateRight: "clamp" });
  const bounceY =
    32 * Math.sin(((frame - 6) / 36) * Math.PI) * (fadeIn > 0.5 ? 1 : 0);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 80% 30%, ${theme.secondary} 0, ${theme.accent} 62%, ${theme.background} 100%)`,
        fontFamily: FONT_FAMILY,
        color: theme.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.93)",
          borderRadius: 46,
          boxShadow:
            "0 2px 44px 0 rgba(74,20,140,0.19), 0 1.5px 9px 0 rgba(255,202,40,0.17)",
          border: `2.5px solid ${theme.secondary}`,
          padding: "64px 80px",
          opacity: fadeIn,
          transform: `translateY(${bounceY}px) scale(${0.98 + 0.03 * fadeIn})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 65,
            fontWeight: 800,
            color: theme.primary,
            marginBottom: 24,
            textShadow: `0 3.5px 0 ${theme.secondary}`,
            letterSpacing: 2,
          }}
        >
          Thank you for watching!
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: theme.muted,
            marginTop: 6,
            marginBottom: 28,
            letterSpacing: 1.5,
          }}
        >
          Stay inspired. Share your brilliance.
        </div>
        <div
          style={{
            fontSize: 22,
            color: theme.primary,
            fontWeight: 400,
            marginTop: 14,
            opacity: 0.85,
          }}
        >
          © {new Date().getFullYear()} InspireVid
        </div>
      </div>
    </AbsoluteFill>
  );
};
