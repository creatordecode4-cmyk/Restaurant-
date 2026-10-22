import { Easing, interpolate, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

// The bundled Inter file is a variable font, so one file covers every weight.
loadFont({ family: "Inter", url: staticFile("fonts/Inter-500-normal.woff2"), weight: "100 900" });

export const font = `Inter, system-ui, sans-serif`;

export const c = {
  base: "#0A0A0C",
  surface: "rgba(18,18,24,0.72)",
  surfaceSolid: "#16181F",
  stroke: "rgba(255,255,255,0.12)",
  strokeGlow: "rgba(217,38,169,0.45)",
  text: "#FFFFFF",
  muted: "#A1A1AA",
  magenta: "#D926A9",
  fuchsia: "#C026D3",
  violet: "#8B5CF6",
  pink: "#FDA4AF",
  green: "#34D399",
};

export const gradientText: React.CSSProperties = {
  backgroundImage: "linear-gradient(90deg, #F0ABFC 0%, #D946EF 45%, #8B5CF6 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

export const glass: React.CSSProperties = {
  background: c.surface,
  border: `1px solid ${c.stroke}`,
  backdropFilter: "blur(20px)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
};

export const size = { heading: 104, label: 40, body: 34 };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const quint = Easing.bezier(0.16, 1, 0.3, 1);
const spring = Easing.bezier(0.34, 1.56, 0.64, 1);

export const ease = (frame: number, start: number, len: number, e = quint) =>
  interpolate(frame, [start, start + len], [0, 1], { ...clamp, easing: e });

/** Blur-in: scale 0.92 -> 1, blur 10px -> 0, opacity 0 -> 1. */
export const blurIn = (frame: number, start: number, len = 10): React.CSSProperties => {
  const t = ease(frame, start, len);
  return {
    opacity: t,
    transform: `scale(${0.92 + 0.08 * t})`,
    filter: `blur(${(1 - t) * 10}px)`,
  };
};

/** Rise: translateY 24px -> 0 with fade, used for text lines. */
export const rise = (frame: number, start: number, len = 10): React.CSSProperties => {
  const t = ease(frame, start, len);
  return { opacity: t, transform: `translateY(${(1 - t) * 24}px)`, filter: `blur(${(1 - t) * 6}px)` };
};

/** Snappy pop with overshoot for badges and nodes. */
export const pop = (frame: number, start: number, len = 12): React.CSSProperties => {
  const t = ease(frame, start, len, spring);
  return { opacity: frame < start ? 0 : 1, transform: `scale(${t})` };
};

/** Characters of `text` visible at `frame` when typing at `cps` chars per second. */
export const typed = (text: string, frame: number, start: number, cps = 28) =>
  text.slice(0, Math.max(0, Math.floor(((frame - start) / 30) * cps)));

export const stagger = (i: number, step = 3) => i * step;
