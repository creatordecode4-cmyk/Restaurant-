import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { blurIn, c, font, glass } from "./theme";

/** Dark canvas with slowly drifting magenta / violet glows. */
export const Backdrop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 90], [0, 40]);
  return (
    <AbsoluteFill style={{ background: c.base, fontFamily: font, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          left: -300 + drift,
          top: -450,
          background: "radial-gradient(circle, rgba(217,38,169,0.38) 0%, rgba(217,38,169,0) 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          right: -350 - drift,
          bottom: -550,
          background: "radial-gradient(circle, rgba(139,92,246,0.36) 0%, rgba(139,92,246,0) 65%)",
        }}
      />
      <AbsoluteFill
        style={{
          padding: "80px 100px",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          ...blurIn(frame, 0, 9),
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      ...glass,
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 26px",
      borderRadius: 999,
      border: `1px solid ${c.strokeGlow}`,
      color: c.pink,
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      ...style,
    }}
  >
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: 99,
        background: c.magenta,
        boxShadow: `0 0 12px ${c.magenta}`,
      }}
    />
    {children}
  </div>
);

export const Headline: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      fontSize: 104,
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.05,
      color: c.text,
      textAlign: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

/** White SaaS cursor arrow. */
export const Cursor: React.FC<{ x: number; y: number; pressed?: boolean }> = ({ x, y, pressed }) => (
  <svg
    width={44}
    height={52}
    viewBox="0 0 22 26"
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `scale(${pressed ? 0.88 : 1})`,
      transformOrigin: "top left",
      filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))",
    }}
  >
    <path d="M2 2 L2 21 L7 16.5 L10.5 24 L14 22.5 L10.5 15 L17.5 15 Z" fill="#fff" stroke="#111" strokeWidth={1.4} strokeLinejoin="round" />
  </svg>
);

/** Expanding ring used for click and avatar pulses. */
export const Ripple: React.FC<{ progress: number; size: number; color?: string }> = ({
  progress,
  size,
  color = c.magenta,
}) => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      width: size,
      height: size,
      marginLeft: -size / 2,
      marginTop: -size / 2,
      borderRadius: 999,
      border: `3px solid ${color}`,
      opacity: progress <= 0 ? 0 : 0.7 * (1 - progress),
      transform: `scale(${1 + progress * 1.2})`,
    }}
  />
);
