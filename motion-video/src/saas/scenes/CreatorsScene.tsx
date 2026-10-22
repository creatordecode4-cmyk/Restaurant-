import { useCurrentFrame } from "remotion";
import { Badge, Headline, Ripple } from "../components";
import { c, glass, gradientText, pop, rise, stagger } from "../theme";

const avatarGradients = [
  ["#F0ABFC", "#C026D3"],
  ["#C4B5FD", "#7C3AED"],
  ["#FDA4AF", "#D926A9"],
  ["#A5B4FC", "#6366F1"],
  ["#F9A8D4", "#9333EA"],
];
const platforms = ["YouTube", "Reels", "Shorts"];

const Avatar: React.FC<{ from: string; to: string }> = ({ from, to }) => (
  <svg width={120} height={120} viewBox="0 0 60 60">
    <defs>
      <linearGradient id={`g-${from}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={from} />
        <stop offset="1" stopColor={to} />
      </linearGradient>
    </defs>
    <circle cx={30} cy={30} r={29} fill={`url(#g-${from})`} stroke="rgba(255,255,255,0.35)" strokeWidth={1.2} />
    <circle cx={30} cy={24} r={9} fill="rgba(255,255,255,0.85)" />
    <path d="M13 50 C15 38, 45 38, 47 50" fill="rgba(255,255,255,0.85)" />
  </svg>
);

// Scene 2: "meri tarah aur bhi creator". Avatars pop in with ripple pulses, then platform pills.
export const CreatorsScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <div style={rise(frame, 2)}>
          <Badge>Meri tarah</Badge>
        </div>
        <Headline style={rise(frame, 5)}>
          Aur bhi <span style={gradientText}>creators</span>
        </Headline>
      </div>
      <div style={{ display: "flex", gap: 64 }}>
        {avatarGradients.map(([from, to], i) => {
          const start = 10 + stagger(i);
          const pulse = ((frame - start) % 24) / 24;
          return (
            <div key={from} style={{ position: "relative", ...pop(frame, start) }}>
              <Ripple progress={frame > start ? pulse : 0} size={120} color={to} />
              <Avatar from={from} to={to} />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        {platforms.map((p, i) => (
          <div
            key={p}
            style={{
              ...glass,
              ...rise(frame, 24 + stagger(i)),
              padding: "14px 34px",
              borderRadius: 999,
              color: c.text,
              fontSize: 34,
              fontWeight: 600,
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </>
  );
};
