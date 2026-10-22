import { Composition } from "remotion";
import { Main, TOTAL_FRAMES } from "./Main";
import { FPS } from "./theme";
import { SaasMain } from "./saas/SaasMain";

export const Root: React.FC = () => (
  <>
    <Composition
      id="Main"
      component={Main}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Composition
      id="Saas"
      component={SaasMain}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1920}
      height={1080}
    />
  </>
);
