import { interpolate, Easing, useCurrentFrame } from "remotion";
import { Cursor, Headline, Ripple } from "../components";
import { c, ease, gradientText, rise } from "../theme";

const CLICK = 28; // local frame for "jante hai" (11.35s)

// Scene 4: "kese karna aaye, jante hai". Cursor glides to the button and clicks on the keyword.
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const glide = Easing.bezier(0.16, 1, 0.3, 1);
  const cx = interpolate(frame, [6, CLICK - 2], [1500, 1010], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: glide,
  });
  const cy = interpolate(frame, [6, CLICK - 2], [980, 640], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: glide,
  });
  const pressed = frame >= CLICK && frame < CLICK + 5;
  const ripple = ease(frame, CLICK, 16);
  const activated = frame >= CLICK;
  return (
    <>
      <Headline style={rise(frame, 2)}>
        Kaise <span style={gradientText}>karna hai?</span>
      </Headline>
      <div style={{ position: "relative", ...rise(frame, 8) }}>
        <Ripple progress={frame >= CLICK ? ripple : 0} size={150} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "26px 56px",
            borderRadius: 999,
            fontSize: 44,
            fontWeight: 700,
            color: activated ? "#fff" : c.base,
            background: activated
              ? "linear-gradient(90deg, #D946EF 0%, #8B5CF6 100%)"
              : "rgba(255,255,255,0.95)",
            boxShadow: activated
              ? "0 0 60px rgba(217,38,169,0.6), 0 20px 40px rgba(0,0,0,0.6)"
              : "0 20px 40px rgba(0,0,0,0.6)",
            transform: `scale(${pressed ? 0.95 : 1})`,
          }}
        >
          Jaanna hai?
          <span style={{ fontSize: 40 }}>→</span>
        </div>
      </div>
      <Cursor x={cx} y={cy} pressed={pressed} />
    </>
  );
};
