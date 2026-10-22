import { useCurrentFrame } from "remotion";
import { Heading, Pill, SceneFrame } from "../components";
import { colors, pop, slideFade, stagger } from "../theme";

const platforms = ["YouTube", "Reels", "Shorts"];

// Scene 2: "meri tarah aur bhi creator".
export const CreatorsScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame>
      <Heading style={slideFade(frame, 2)}>
        Meri tarah aur bhi <span style={{ color: colors.accent }}>creators</span>
      </Heading>
      <div style={{ display: "flex", gap: 28 }}>
        {platforms.map((p, i) => (
          <div key={p} style={pop(frame, 14 + stagger(i))}>
            <Pill variant="dark">{p}</Pill>
          </div>
        ))}
      </div>
    </SceneFrame>
  );
};
