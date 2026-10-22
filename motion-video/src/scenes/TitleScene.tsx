import { useCurrentFrame } from "remotion";
import { Heading, Pill, SceneFrame } from "../components";
import { colors, pop, slideFade } from "../theme";

// Scene 1: "...ye edit hua hai Claude Code se". Pill pops on "Claude Code" (local frame 30 = 3.6s).
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame>
      <Heading style={slideFade(frame, 2)}>
        Edited with <span style={{ color: colors.accent, fontStyle: "italic" }}>Claude Code</span>
      </Heading>
      <div style={pop(frame, 30)}>
        <Pill>AI se Edit</Pill>
      </div>
    </SceneFrame>
  );
};
