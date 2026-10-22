import { useCurrentFrame } from "remotion";
import { Card, Heading, SceneFrame } from "../components";
import { colors, draw, glowFilter, pop, slideFade, stagger } from "../theme";

const steps = ["Raw Video", "Claude Code", "Final Edit"];
const CONNECTOR = 140;

const Connector: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width={CONNECTOR} height={24} style={{ overflow: "visible" }}>
    <defs>
      <clipPath id={`reveal-${progress}`}>
        <rect x={0} y={-10} width={CONNECTOR * progress} height={44} />
      </clipPath>
    </defs>
    <g clipPath={`url(#reveal-${progress})`}>
      <line
        x1={8}
        y1={12}
        x2={CONNECTOR - 20}
        y2={12}
        stroke={colors.accent}
        strokeWidth={4}
        strokeDasharray="10 10"
        strokeLinecap="round"
      />
      <path
        d={`M ${CONNECTOR - 26} 2 L ${CONNECTOR - 12} 12 L ${CONNECTOR - 26} 22`}
        fill="none"
        stroke={colors.accent}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

// Scene 3: "Claude Code se edit kara rahe". Nodes pop left to right, dashed connectors draw between them.
export const FlowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const nodeStart = (i: number) => 6 + i * 14 + stagger(i);
  return (
    <SceneFrame>
      <Heading style={{ ...slideFade(frame, 0), fontSize: 96 }}>Aise hota hai edit</Heading>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {steps.map((s, i) => {
          const isHero = i === 1;
          return (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {i > 0 && <Connector progress={draw(frame, nodeStart(i) - 10, 10)} />}
              <div style={pop(frame, nodeStart(i))}>
                <Card
                  style={
                    isHero
                      ? {
                          background: colors.darkPill,
                          color: colors.white,
                          border: `2px solid ${colors.glow}`,
                          filter: glowFilter,
                        }
                      : undefined
                  }
                >
                  {s}
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </SceneFrame>
  );
};
