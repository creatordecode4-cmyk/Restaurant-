import { AbsoluteFill, useCurrentFrame } from "remotion";
import { cardBorder, colors, fonts, pillShadow, safe, sceneEnter, size } from "./theme";

export const SceneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: colors.bg }}>
      <AbsoluteFill
        style={{
          padding: `${safe.y}px ${safe.x}px`,
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          ...sceneEnter(frame),
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Heading: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      fontFamily: fonts.heading,
      fontSize: size.heading,
      // Instrument Serif only ships weight 400.
      fontWeight: 400,
      letterSpacing: "-0.02em",
      lineHeight: 1.05,
      color: colors.dark,
      textAlign: "center",
      ...style,
    }}
  >
    {children}
  </div>
);

type PillVariant = "accent" | "dark" | "light";

const pillColors: Record<PillVariant, { bg: string; fg: string }> = {
  accent: { bg: colors.accent, fg: colors.white },
  dark: { bg: colors.darkPill, fg: colors.white },
  light: { bg: colors.white, fg: colors.dark },
};

export const Pill: React.FC<{
  children: React.ReactNode;
  variant?: PillVariant;
  style?: React.CSSProperties;
}> = ({ children, variant = "accent", style }) => (
  <div
    style={{
      fontFamily: fonts.body,
      fontSize: size.pill,
      fontWeight: 500,
      padding: "18px 40px",
      borderRadius: 999,
      background: pillColors[variant].bg,
      color: pillColors[variant].fg,
      boxShadow: pillShadow,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <div
    style={{
      background: colors.card,
      border: cardBorder,
      borderRadius: 28,
      padding: "36px 48px",
      fontFamily: fonts.body,
      fontWeight: 600,
      fontSize: 44,
      color: colors.dark,
      boxShadow: pillShadow,
      ...style,
    }}
  >
    {children}
  </div>
);
