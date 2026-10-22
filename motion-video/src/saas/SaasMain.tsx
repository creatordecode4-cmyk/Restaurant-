import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { Backdrop } from "./components";
import { CreatorsScene } from "./scenes/CreatorsScene";
import { CtaScene } from "./scenes/CtaScene";
import { EditorScene } from "./scenes/EditorScene";
import { FlowScene } from "./scenes/FlowScene";

// Same phrase-pause timing as the cream version (see ../Main.tsx).
const scenes = [
  { from: 78, duration: 69, Component: EditorScene },
  { from: 168, duration: 57, Component: CreatorsScene },
  { from: 225, duration: 63, Component: FlowScene },
  { from: 312, duration: 70, Component: CtaScene },
];

export const SaasMain: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <OffthreadVideo src={staticFile("my_video.mp4")} />
    {scenes.map(({ from, duration, Component }) => (
      <Sequence key={from} from={from} durationInFrames={duration}>
        <Backdrop>
          <Component />
        </Backdrop>
      </Sequence>
    ))}
  </AbsoluteFill>
);
