import { Easing, interpolate } from "remotion";
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FPS = 30;

// Fonts are bundled in public/fonts so rendering does not depend on Google Fonts.
const fontFiles = [
  { family: "Instrument Serif", file: "InstrumentSerif-400-normal.woff2", weight: "400", style: "normal" },
  { family: "Instrument Serif", file: "InstrumentSerif-400-italic.woff2", weight: "400", style: "italic" },
  { family: "Inter", file: "Inter-500-normal.woff2", weight: "500", style: "normal" },
  { family: "Inter", file: "Inter-600-normal.woff2", weight: "600", style: "normal" },
];
for (const f of fontFiles) {
  loadFont({ family: f.family, url: staticFile(`fonts/${f.file}`), weight: f.weight, style: f.style });
}

export const fonts = {
  heading: `"Instrument Serif", Georgia, serif`,
  body: `Inter, system-ui, sans-serif`,
};

export const colors = {
  bg: "radial-gradient(circle at center, #FAF6EE 0%, #EFE8DC 100%)",
  accent: "#D87758",
  dark: "#1A1918",
  darkPill: "#2B2A27",
  card: "#EBE3D7",
  white: "#FFFFFF",
  glow: "#9B5DE5",
};

export const glowFilter = "drop-shadow(0 0 16px rgba(168,85,247,0.65))";
export const pillShadow = "0 10px 25px -5px rgba(0,0,0,.12)";
export const cardBorder = "1.5px solid rgba(0,0,0,.08)";

// Safe margins: 100px horizontal, 80px vertical.
export const safe = { x: 100, y: 80 };

// Sizes are scaled up from the 48-64px spec so they stay readable on a phone at 1080p.
export const size = { heading: 120, pill: 40 };

const popEase = Easing.bezier(0.34, 1.56, 0.64, 1);
const slideEase = Easing.bezier(0.16, 1, 0.3, 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Pop-in: scale 0 -> ~1.05 -> 1 over 14 frames (overshoot comes from the easing). */
export const pop = (frame: number, start: number) => {
  const t = interpolate(frame, [start, start + 14], [0, 1], { ...clamp, easing: popEase });
  return { transform: `scale(${t})`, opacity: frame < start ? 0 : 1 };
};

/** Slide + fade: translateY 20px -> 0, opacity 0 -> 1 over 0.35s. */
export const slideFade = (frame: number, start: number) => {
  const t = interpolate(frame, [start, start + Math.round(0.35 * FPS)], [0, 1], {
    ...clamp,
    easing: slideEase,
  });
  return { transform: `translateY(${(1 - t) * 20}px)`, opacity: t };
};

/** Stagger offset for item i: 0.08s per item. */
export const stagger = (i: number) => Math.round(i * 0.08 * FPS);

/** Short slide-in used as the scene transition. */
export const sceneEnter = (frame: number) => {
  const t = interpolate(frame, [0, 7], [0, 1], { ...clamp, easing: slideEase });
  return { transform: `translateX(${(1 - t) * 120}px)`, opacity: t };
};

/** Progress 0..1 for a stroke-draw animation. */
export const draw = (frame: number, start: number, length = 12) =>
  interpolate(frame, [start, start + length], [0, 1], { ...clamp, easing: slideEase });
