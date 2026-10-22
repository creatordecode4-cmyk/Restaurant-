import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { Backdrop } from "./components";
import { CreatorsScene } from "./scenes/CreatorsScene";
import { CtaScene } from "./scenes/CtaScene";
import { IntroEditorScene } from "./scenes/IntroEditorScene";
import { FlowScene } from "./scenes/FlowScene";

// Same phrase-pause timing as the cream version (see ../Main.tsx).
const scenes = [
  { from: 168, duration: 57, Component: CreatorsScene },
  { from: 225, duration: 63, Component: FlowScene },
  { from: 312, duration: 70, Component: CtaScene },
];

export const SaasMain: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <OffthreadVideo src={staticFile("my_video.mp4")} />
    {/* Opening shot zooms the footage into a Claude Code editor; it brings its own backdrop. */}
    <Sequence durationInFrames={147}>
      <IntroEditorScene />
    </Sequence>
    {scenes.map(({ from, duration, Component }) => (
      <Sequence key={from} from={from} durationInFrames={duration}>
        <Backdrop>
          <Component />
        </Backdrop>
      </Sequence>
    ))}
  </AbsoluteFill>
);
