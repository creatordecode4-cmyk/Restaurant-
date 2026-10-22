import { useCurrentFrame } from "remotion";
import { Heading, Pill, SceneFrame } from "../components";
import { pop, slideFade } from "../theme";

// Scene 4: "kese karna aaye, jante hai". Pill pops on "jante" (local frame 28 = 11.35s).
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneFrame>
      <Heading style={slideFade(frame, 2)}>Kaise karna hai?</Heading>
      <div style={pop(frame, 28)}>
        <Pill>Jaanna hai? →</Pill>
      </div>
    </SceneFrame>
  );
};
