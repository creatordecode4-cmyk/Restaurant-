import { interpolate, useCurrentFrame } from "remotion";
import { Badge, Headline } from "../components";
import { c, glass, gradientText, pop, rise, typed } from "../theme";

const COMMAND = "edit my_video.mp4 --style motion";

// Scene 1: "...ye edit hua hai Claude Code se". "Edited" chip lands on "Claude Code" (local frame 30).
export const EditorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = interpolate(frame, [0, 69], [16, 4]);
  const caretOn = Math.floor(frame / 8) % 2 === 0;
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={rise(frame, 2)}>
          <Badge>Edited with</Badge>
        </div>
        <Headline style={rise(frame, 6)}>
          <span style={gradientText}>Claude Code</span>
        </Headline>
      </div>
      <div style={{ perspective: 1200 }}>
        <div
          style={{
            ...glass,
            ...rise(frame, 10, 12),
            width: 1080,
            borderRadius: 20,
            overflow: "hidden",
            transform: `${rise(frame, 10, 12).transform} rotateX(${tilt}deg)`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 22px",
              borderBottom: `1px solid ${c.stroke}`,
            }}
          >
            {["#FF5F57", "#FEBC2E", "#28C840"].map((col) => (
              <div key={col} style={{ width: 14, height: 14, borderRadius: 99, background: col }} />
            ))}
            <div style={{ marginLeft: 18, color: c.muted, fontSize: 22, fontWeight: 500 }}>
              claude-code — terminal
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "34px 36px",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: 34,
              color: c.text,
            }}
          >
            <div>
              <span style={{ color: c.magenta }}>&gt; </span>
              {typed(COMMAND, frame, 12)}
              <span style={{ opacity: caretOn ? 1 : 0, color: c.violet }}>▍</span>
            </div>
            <div
              style={{
                ...pop(frame, 30),
                fontFamily: "inherit",
                fontSize: 26,
                fontWeight: 600,
                color: c.green,
                padding: "10px 20px",
                borderRadius: 999,
                background: "rgba(52,211,153,0.12)",
                border: "1px solid rgba(52,211,153,0.45)",
              }}
            >
              ✓ Edited
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
