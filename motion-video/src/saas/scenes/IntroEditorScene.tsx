import { AbsoluteFill, interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { Badge } from "../components";
import { c, ease, font, glass, gradientText, pop, rise, stagger, typed } from "../theme";

// Covers 0-4.9s: "Abhi jo aap apne screen pe dekh rahe ho, ye edit hua hai Claude Code se".
// The footage zooms out into a window (the "screen"), then that window becomes a Claude Code
// editing session; "Edited with Claude Code" lands on the spoken keyword (frame 108 = 3.6s).
const ZOOM_OUT = [10, 32] as const;
const SPLIT = [56, 74] as const;
const PROMPT_START = 66;
const WORK = [82, 118] as const;
const KEYWORD = 108;

const PROMPT = "Motion graphics add karo";
const steps = ["Captions", "Motion cards", "Transitions"];
const clips = [
  { at: 0.18, w: 0.12, color: c.magenta },
  { at: 0.42, w: 0.1, color: c.violet },
  { at: 0.62, w: 0.12, color: c.fuchsia },
  { at: 0.84, w: 0.1, color: c.violet },
];

const lerp = (t: number, a: number, b: number) => a + (b - a) * t;

export const IntroEditorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = ease(frame, ZOOM_OUT[0], ZOOM_OUT[1] - ZOOM_OUT[0]);
  const split = ease(frame, SPLIT[0], SPLIT[1] - SPLIT[0]);
  const work = ease(frame, WORK[0], WORK[1] - WORK[0]);
  const done = frame >= KEYWORD;

  // Window rect: full frame -> centred screen -> left half of the editor.
  const full = { x: 0, y: 0, w: 1920, h: 1080 };
  const centred = { x: 360, y: 250, w: 1200, h: 675 };
  const left = { x: 100, y: 250, w: 1040, h: 585 };
  const box = {
    x: lerp(split, lerp(zoom, full.x, centred.x), left.x),
    y: lerp(split, lerp(zoom, full.y, centred.y), left.y),
    w: lerp(split, lerp(zoom, full.w, centred.w), left.w),
    h: lerp(split, lerp(zoom, full.h, centred.h), left.h),
  };
  const radius = 20 * zoom;
  const titleBar = 48 * zoom;
  const scanX = interpolate(frame, [WORK[0], WORK[1]], [0, box.w], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const caretOn = Math.floor(frame / 8) % 2 === 0;

  return (
    <AbsoluteFill style={{ fontFamily: font, overflow: "hidden" }}>
      {/* Backdrop fades in as the footage zooms out. */}
      <AbsoluteFill style={{ background: c.base, opacity: zoom }}>
        <div
          style={{
            position: "absolute",
            width: 1100,
            height: 1100,
            left: -300,
            top: -450,
            background: "radial-gradient(circle, rgba(217,38,169,0.38) 0%, rgba(217,38,169,0) 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 1200,
            height: 1200,
            right: -350,
            bottom: -550,
            background: "radial-gradient(circle, rgba(139,92,246,0.36) 0%, rgba(139,92,246,0) 65%)",
          }}
        />
      </AbsoluteFill>

      {/* Top line: "Jo aap dekh rahe ho" swaps to "Edited with Claude Code" on the keyword. */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          height: 130,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!done ? (
          <div style={rise(frame, 24)}>
            <Badge style={{ fontSize: 34, padding: "16px 34px" }}>Jo aap screen pe dekh rahe ho</Badge>
          </div>
        ) : (
          <div
            style={{
              ...rise(frame, KEYWORD, 8),
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: c.text,
            }}
          >
            Edited with <span style={gradientText}>Claude Code</span>
          </div>
        )}
      </div>

      {/* The "screen": live footage inside a window. */}
      <div
        style={{
          position: "absolute",
          left: box.x,
          top: box.y,
          width: box.w,
          height: box.h + titleBar,
          borderRadius: radius,
          overflow: "hidden",
          border: zoom > 0 ? `1.5px solid ${done ? c.violet : c.stroke}` : "none",
          boxShadow:
            zoom > 0
              ? done
                ? "0 0 70px rgba(139,92,246,0.55), 0 30px 60px rgba(0,0,0,0.7)"
                : "0 30px 60px rgba(0,0,0,0.7)"
              : "none",
          background: c.surfaceSolid,
        }}
      >
        <div
          style={{
            height: titleBar,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 20px",
            borderBottom: `1px solid ${c.stroke}`,
            opacity: zoom,
          }}
        >
          {["#FF5F57", "#FEBC2E", "#28C840"].map((col) => (
            <div key={col} style={{ width: 13, height: 13, borderRadius: 99, background: col }} />
          ))}
          <div style={{ marginLeft: 14, color: c.muted, fontSize: 22, fontWeight: 500 }}>my_video.mp4</div>
          <div
            style={{
              ...pop(frame, KEYWORD),
              marginLeft: "auto",
              fontSize: 22,
              fontWeight: 700,
              color: c.green,
              padding: "6px 16px",
              borderRadius: 999,
              background: "rgba(52,211,153,0.14)",
              border: "1px solid rgba(52,211,153,0.5)",
            }}
          >
            ✓ Edited
          </div>
        </div>
        <div style={{ position: "relative", width: box.w, height: box.h }}>
          <OffthreadVideo
            src={staticFile("my_video.mp4")}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Scan line while Claude Code works. */}
          {frame >= WORK[0] && frame < WORK[1] && (
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: scanX - 120,
                width: 120,
                background: "linear-gradient(90deg, rgba(217,38,169,0) 0%, rgba(217,38,169,0.35) 100%)",
                borderRight: `3px solid ${c.magenta}`,
                boxShadow: `0 0 24px ${c.magenta}`,
              }}
            />
          )}
        </div>
      </div>

      {/* Timeline under the window: edit clips appear as the scan passes them. */}
      <div
        style={{
          position: "absolute",
          left: left.x,
          top: left.y + left.h + 48 + 30,
          width: left.w,
          height: 64,
          ...glass,
          borderRadius: 14,
          opacity: split,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            top: 26,
            height: 12,
            borderRadius: 99,
            background: "rgba(255,255,255,0.08)",
          }}
        />
        {clips.map((clip) => (
          <div
            key={clip.at}
            style={{
              position: "absolute",
              left: 16 + clip.at * (left.w - 32) - (clip.w * (left.w - 32)) / 2,
              top: 14,
              width: clip.w * (left.w - 32),
              height: 36,
              borderRadius: 8,
              background: clip.color,
              boxShadow: `0 0 16px ${clip.color}`,
              ...pop(frame, WORK[0] + Math.round(clip.at * (WORK[1] - WORK[0]))),
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: 6,
            bottom: 6,
            left: 16 + work * (left.w - 32),
            width: 3,
            background: "#fff",
            opacity: frame >= WORK[0] ? 1 : 0,
          }}
        />
      </div>

      {/* Claude Code chat panel. */}
      <div
        style={{
          position: "absolute",
          left: 1190,
          top: left.y,
          width: 630,
          height: left.h + 48 + 30 + 64,
          ...glass,
          borderRadius: 20,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 34,
          opacity: split,
          transform: `translateX(${(1 - split) * 80}px)`,
          filter: `blur(${(1 - split) * 8}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 99,
              background: c.violet,
              boxShadow: `0 0 14px ${c.violet}`,
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 700, color: c.text }}>Claude Code</div>
        </div>
        <div
          style={{
            alignSelf: "flex-end",
            maxWidth: 520,
            padding: "20px 26px",
            borderRadius: "20px 20px 6px 20px",
            background: "linear-gradient(90deg, rgba(217,38,169,0.85), rgba(139,92,246,0.85))",
            color: "#fff",
            fontSize: 36,
            fontWeight: 600,
            minHeight: 44,
            opacity: frame >= PROMPT_START ? 1 : 0,
          }}
        >
          {typed(PROMPT, frame, PROMPT_START, 40)}
          {frame < WORK[0] && <span style={{ opacity: caretOn ? 1 : 0 }}>▍</span>}
        </div>
        <div style={{ ...rise(frame, WORK[0]), color: c.muted, fontSize: 32, fontWeight: 500 }}>
          {done ? "Video edit ho gaya" : "Editing my_video.mp4…"}
        </div>
        <div
          style={{
            ...rise(frame, WORK[0]),
            height: 12,
            borderRadius: 99,
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${work * 100}%`,
              height: "100%",
              borderRadius: 99,
              background: "linear-gradient(90deg, #D946EF, #8B5CF6)",
              boxShadow: `0 0 14px ${c.magenta}`,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {steps.map((s, i) => {
            const at = WORK[0] + 8 + stagger(i, 8);
            const ok = frame >= at;
            return (
              <div
                key={s}
                style={{
                  ...rise(frame, at - 6),
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  fontSize: 36,
                  fontWeight: 600,
                  color: c.text,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 99,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    background: ok ? "rgba(52,211,153,0.16)" : "rgba(255,255,255,0.06)",
                    border: `1px solid ${ok ? "rgba(52,211,153,0.6)" : c.stroke}`,
                    color: c.green,
                  }}
                >
                  {ok ? "✓" : ""}
                </div>
                {s}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
