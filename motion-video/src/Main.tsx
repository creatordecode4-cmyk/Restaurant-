import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { CreatorsScene } from "./scenes/CreatorsScene";
import { CtaScene } from "./scenes/CtaScene";
import { FlowScene } from "./scenes/FlowScene";
import { TitleScene } from "./scenes/TitleScene";

// Ends at 12.73s, where the CapCut outro (black + logo) begins.
export const TOTAL_FRAMES = 382;

// Frame ranges come from the phrase pauses in the audio (4.9s, 7.5s, 9.6s, 11.35s).
const scenes = [
  { from: 78, duration: 69, Component: TitleScene },
  { from: 168, duration: 57, Component: CreatorsScene },
  { from: 225, duration: 63, Component: FlowScene },
  { from: 312, duration: 70, Component: CtaScene },
];

export const Main: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "black" }}>
    <OffthreadVideo src={staticFile("my_video.mp4")} />
    {scenes.map(({ from, duration, Component }) => (
      <Sequence key={from} from={from} durationInFrames={duration}>
        <Component />
      </Sequence>
    ))}
  </AbsoluteFill>
);
