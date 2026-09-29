import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export const RANGERS = [
  { id: "red", name: "Red" },
  { id: "blue", name: "Blue" },
  { id: "black", name: "Black" },
  { id: "white", name: "White" },
  { id: "green", name: "Green" },
];

// Theme-aware accent (readable text/borders) vs. the fixed suit color (fills)
export const rangerRgb = (id) => `var(--r-${id})`;
export const suitRgb = (id) => `var(--c-${id})`;

const STORAGE_KEY = "rtk-ranger";
const RangerContext = createContext(null);

export const prefersReducedMotion = () => {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
};

const readStored = () => {
  try {
    const id = localStorage.getItem(STORAGE_KEY);
    return RANGERS.some((r) => r.id === id) ? id : "red";
  } catch {
    return "red";
  }
};

export const RangerProvider = ({ children }) => {
  const [ranger, setRanger] = useState(readStored);
  const [morphKey, setMorphKey] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--ranger", rangerRgb(ranger));
    root.dataset.ranger = ranger;
    root.dataset.theme = ranger === "black" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, ranger);
    } catch {}
  }, [ranger]);

  const playSuitUp = useCallback(() => {
    if (!prefersReducedMotion()) setMorphKey((k) => k + 1);
  }, []);

  const morph = useCallback(() => {
    playSuitUp();
    setRanger((current) => {
      const i = RANGERS.findIndex((r) => r.id === current);
      return RANGERS[(i + 1) % RANGERS.length].id;
    });
  }, [playSuitUp]);

  const morphTo = useCallback(
    (id) => {
      if (id === ranger) return;
      playSuitUp();
      setRanger(id);
    },
    [ranger, playSuitUp]
  );

  return (
    <RangerContext.Provider value={{ ranger, setRanger, morph, morphTo }}>
      {children}
      {morphKey > 0 && <MorphOverlay key={morphKey} quick />}
    </RangerContext.Provider>
  );
};

export const useRanger = () => useContext(RangerContext);

export const RangerPicker = ({ className = "" }) => {
  const { ranger, morphTo } = useRanger();
  return (
    <div className={`flex items-center gap-2.5 ${className}`} role="radiogroup" aria-label="Pick your Ranger color">
      {RANGERS.map((r) => (
        <button
          key={r.id}
          type="button"
          role="radio"
          aria-checked={ranger === r.id}
          aria-label={`${r.name} Ranger`}
          title={`${r.name} Ranger`}
          onClick={() => morphTo(r.id)}
          className={`h-4 w-4 rotate-45 rounded-[3px] border border-line/30 transition-transform duration-200 hover:scale-125 ${
            ranger === r.id ? "scale-125 ring-2 ring-cream/80 ring-offset-2 ring-offset-ink" : "opacity-70"
          }`}
          style={{ backgroundColor: `rgb(${suitRgb(r.id)})` }}
        />
      ))}
    </div>
  );
};

// Suit-up timeline in ms for the full intro; the quick morph plays it faster
const SUIT_UP = {
  streaks: 0,
  flash: 480,
  outline: 600,
  fill: 900,
  plates: 1250,
  visor: 1350,
  lock: 1600,
  name: 1650,
  glint: 1750,
  exit: 2500,
  exitLength: 450,
};

// Black suit disappears on the dark overlay, so it glows gunmetal instead
const glowRgb = (id) => (id === "black" ? "150 152 168" : suitRgb(id));

const DOME =
  "M100 14 C54 14 24 50 24 102 V176 C24 204 44 224 72 226 H128 C156 224 176 204 176 176 V102 C176 50 146 14 100 14 Z";
const VISOR =
  "M38 92 H162 C160 112 152 124 136 128 L114 134 V180 C114 184 111 186 108 186 H92 C89 186 86 184 86 180 V134 L64 128 C48 124 40 112 38 92 Z";

const HelmetLayer = ({ className = "", style, children }) => (
  <svg viewBox="0 0 200 240" className={`absolute inset-0 h-full w-full overflow-visible ${className}`} style={style}>
    {children}
  </svg>
);

const SuitUpHelmet = ({ id, at }) => {
  const suit = `rgb(${suitRgb(id)})`;
  const glow = `rgb(${glowRgb(id)})`;

  return (
    <div className="relative aspect-[5/6] w-[min(62vw,40vh,340px)]">
      <div
        className="suit-glow absolute -inset-1/4 rounded-full"
        style={{ background: `radial-gradient(closest-side, ${glow} , transparent)`, animationDelay: at("lock") }}
      />
      <div
        className="suit-ring absolute left-1/2 top-[45%] h-full w-full rounded-full border-2"
        style={{ borderColor: glow, animationDelay: at("lock") }}
      />

      {/* Suit fills in from the chin up behind a scan line */}
      <div className="suit-fill absolute inset-0" style={{ animationDelay: at("fill") }}>
        <HelmetLayer>
          <path d={DOME} fill={suit} stroke={id === "black" ? glow : "none"} strokeOpacity="0.6" strokeWidth="2" />
          <path d="M100 16 C92 30 90 60 92 88 H108 C110 60 108 30 100 16 Z" fill="#fff" fillOpacity="0.14" />
          <path d="M58 40 C72 26 90 22 104 22" stroke="#fff" strokeOpacity="0.5" strokeWidth="5" fill="none" strokeLinecap="round" />
        </HelmetLayer>
      </div>
      <div
        className="suit-scan absolute inset-x-[8%] h-1 rounded-full"
        style={{ background: "#fff", boxShadow: `0 0 18px 6px ${glow}`, animationDelay: at("fill") }}
      />

      {/* Energy outline traces the helmet first */}
      <HelmetLayer>
        <path
          d={DOME}
          pathLength="1"
          className="suit-outline"
          fill="none"
          stroke={glow}
          strokeWidth="3"
          style={{ filter: `drop-shadow(0 0 6px ${glow})`, animationDelay: at("outline") }}
        />
      </HelmetLayer>

      {/* Ear discs and mouthplate */}
      <HelmetLayer className="suit-plates" style={{ animationDelay: at("plates") }}>
        <circle cx="26" cy="150" r="11" fill="#C8CCD6" stroke="#0A0A12" strokeOpacity="0.4" strokeWidth="2" />
        <circle cx="174" cy="150" r="11" fill="#C8CCD6" stroke="#0A0A12" strokeOpacity="0.4" strokeWidth="2" />
        <path d="M70 194 H130 C130 206 124 216 114 220 H86 C76 216 70 206 70 194 Z" fill="#C8CCD6" />
        <path d="M84 202 H116 M86 209 H114" stroke="#0A0A12" strokeOpacity="0.45" strokeWidth="2.5" strokeLinecap="round" />
      </HelmetLayer>

      {/* Visor drops and locks, then catches a glint */}
      <HelmetLayer className="suit-visor" style={{ animationDelay: at("visor") }}>
        <defs>
          <linearGradient id="suit-visor-gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={id === "black" ? "#5A5A6A" : "#2A2A3A"} />
            <stop offset="1" stopColor="#05050A" />
          </linearGradient>
          <linearGradient id="suit-glint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="suit-visor-clip">
            <path d={VISOR} />
          </clipPath>
        </defs>
        <path d={VISOR} fill="url(#suit-visor-gloss)" />
        <path d="M46 98 H154" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
        <g clipPath="url(#suit-visor-clip)">
          <rect
            className="suit-glint"
            x="0"
            y="80"
            width="40"
            height="120"
            fill="url(#suit-glint)"
            style={{ animationDelay: at("glint") }}
          />
        </g>
      </HelmetLayer>
    </div>
  );
};

export const MorphOverlay = ({ quick = false, onDone }) => {
  const { ranger } = useRanger();
  const [gone, setGone] = useState(false);
  const speed = quick ? 0.55 : 1;
  const at = (step) => `${Math.round(SUIT_UP[step] * speed)}ms`;
  const total = (SUIT_UP.exit + SUIT_UP.exitLength) * speed + 50;
  const name = RANGERS.find((r) => r.id === ranger)?.name;
  const glow = `rgb(${glowRgb(ranger)})`;

  useEffect(() => {
    const t = setTimeout(() => {
      setGone(true);
      onDone && onDone();
    }, total);
    return () => clearTimeout(t);
  }, [total, onDone]);

  if (gone) return null;

  return (
    <div
      className="suit-cover fixed inset-0 z-[100] cursor-pointer overflow-hidden"
      style={{ "--suit-speed": speed, animationDelay: at("exit") }}
      onClick={() => {
        setGone(true);
        onDone && onDone();
      }}
      aria-hidden="true"
    >
      {/* Five Ranger streaks converge on the center */}
      {RANGERS.map((r, i) => (
        <div
          key={r.id}
          className={`suit-streak absolute h-[3px] w-[45vw] rounded-full ${i % 2 ? "suit-streak-r right-1/2" : "suit-streak-l left-1/2"}`}
          style={{
            top: `${38 + i * 6}%`,
            background: `rgb(${glowRgb(r.id)})`,
            boxShadow: `0 0 12px 2px rgb(${glowRgb(r.id)})`,
            animationDelay: `${Math.round((SUIT_UP.streaks + i * 50) * speed)}ms`,
          }}
        />
      ))}
      <div
        className="suit-flash absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 45%, #fff, ${glow} 30%, transparent 65%)`, animationDelay: at("flash") }}
      />

      <div
        className="suit-stage absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center"
        style={{ animationDelay: at("exit") }}
      >
        <p
          className="suit-callout font-display text-5xl leading-none text-white sm:text-7xl"
          style={{ animationDelay: at("streaks"), textShadow: "3px 3px 0 #000" }}
        >
          It's Morphin' Time!
        </p>
        <SuitUpHelmet id={ranger} at={at} />
        <div className="suit-name flex flex-col items-center gap-3" style={{ animationDelay: at("name") }}>
          <p className="font-display text-5xl leading-none tracking-wide sm:text-6xl" style={{ color: glow, textShadow: `0 0 24px ${glow}` }}>
            {name} Ranger
          </p>
          {!quick && (
            <p className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.3em] text-white/80">
              Tap to skip
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
