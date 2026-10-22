import { useCurrentFrame } from "remotion";
import { Headline } from "../components";
import { c, ease, glass, gradientText, pop, rise } from "../theme";

const NODE_W = 360;
const GAP = 170;
const nodes = [
  { label: "Raw Video", sub: "my_video.mp4", hero: false },
  { label: "Claude Code", sub: "AI editing", hero: true },
  { label: "Final Edit", sub: "ready to post", hero: false },
];

// Scene 3: "Claude Code se edit kara rahe". Circuit lines draw node to node via stroke-dashoffset.
export const FlowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const nodeStart = (i: number) => 6 + i * 16;
  const width = nodes.length * NODE_W + (nodes.length - 1) * GAP;
  return (
    <>
      <Headline style={{ ...rise(frame, 0), fontSize: 92 }}>
        Aise hota hai <span style={gradientText}>edit</span>
      </Headline>
      <div style={{ position: "relative", width, height: 200 }}>
        <svg width={width} height={200} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
          {[0, 1].map((i) => {
            const x1 = (i + 1) * NODE_W + i * GAP + 6;
            const x2 = x1 + GAP - 12;
            const len = x2 - x1;
            const t = ease(frame, nodeStart(i + 1) - 12, 12);
            const travel = (frame * 4) % 24;
            return (
              <g key={i}>
                <line x1={x1} y1={100} x2={x2} y2={100} stroke="rgba(255,255,255,0.12)" strokeWidth={3} />
                <line
                  x1={x1}
                  y1={100}
                  x2={x2}
                  y2={100}
                  stroke={c.magenta}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeDasharray={`${len}`}
                  strokeDashoffset={len * (1 - t)}
                  style={{ filter: `drop-shadow(0 0 8px ${c.magenta})` }}
                />
                {t >= 1 && (
                  <line
                    x1={x1}
                    y1={100}
                    x2={x2}
                    y2={100}
                    stroke="#fff"
                    strokeWidth={4}
                    strokeDasharray="6 18"
                    strokeDashoffset={-travel}
                    opacity={0.7}
                  />
                )}
              </g>
            );
          })}
        </svg>
        {nodes.map((n, i) => (
          <div
            key={n.label}
            style={{
              ...glass,
              ...pop(frame, nodeStart(i)),
              position: "absolute",
              left: i * (NODE_W + GAP),
              top: 10,
              width: NODE_W,
              height: 180,
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              border: n.hero ? `1.5px solid ${c.violet}` : glass.border,
              boxShadow: n.hero
                ? `0 0 60px rgba(139,92,246,0.55), 0 20px 40px rgba(0,0,0,0.6)`
                : glass.boxShadow,
            }}
          >
            <div style={{ fontSize: 42, fontWeight: 700, color: c.text, ...(n.hero ? gradientText : {}) }}>
              {n.label}
            </div>
            <div style={{ fontSize: 26, fontWeight: 500, color: c.muted }}>{n.sub}</div>
          </div>
        ))}
      </div>
    </>
  );
};
