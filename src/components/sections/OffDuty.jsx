import React, { useEffect, useRef, useState } from "react";
import { Clapperboard, Gamepad2, Zap } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { RANGERS, suitRgb, useRanger } from "../Ranger";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const useTimeout = () => {
  const ref = useRef();
  useEffect(() => () => clearTimeout(ref.current), []);
  return (fn, ms) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(fn, ms);
  };
};

const FootballSvg = ({ className = "" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="30" fill="#F4F1EA" stroke="#0A0A12" strokeWidth="2" />
    <polygon points="32,20 43,28 39,41 25,41 21,28" fill="#0A0A12" />
    <path
      d="M32 20 V6 M43 28 L56 22 M39 41 L47 54 M25 41 L17 54 M21 28 L8 22"
      stroke="#0A0A12"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

const BasketballSvg = ({ className = "" }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <circle cx="32" cy="32" r="30" fill="#FF8A2B" stroke="#0A0A12" strokeWidth="2.5" />
    <path
      d="M2 32 H62 M32 2 V62 M12 10 C24 22 24 42 12 54 M52 10 C40 22 40 42 52 54"
      stroke="#0A0A12"
      strokeWidth="2.5"
      fill="none"
    />
  </svg>
);

const Helmet = ({ id }) => (
  <svg viewBox="0 0 48 56" className="h-10 w-9" aria-hidden="true">
    <path
      d="M24 2 C10 2 3 13 3 27 V46 C3 50 6 53 10 53 H38 C42 53 45 50 45 46 V27 C45 13 38 2 24 2 Z"
      fill={`rgb(${suitRgb(id)})`}
      stroke="rgb(var(--line) / 0.25)"
      strokeWidth="1.5"
    />
    <path d="M10 22 H38 L34 34 L26 36 V46 H22 V36 L14 34 Z" fill={id === "black" ? "#4A4A58" : "#0A0A12"} />
    <path d="M16 8 C20 6 28 6 32 8" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const CardShell = ({ className = "", children, ...rest }) => (
  <div className={`reveal card relative flex flex-col overflow-hidden p-5 ${className}`} {...rest}>
    {children}
  </div>
);

const Football = () => {
  const [count, setCount] = useState(0);
  const msg =
    count === 0
      ? "Tap the ball. Don't let it drop."
      : count < 5
      ? "Warming up."
      : count < 15
      ? "Five-a-side ready."
      : count < 30
      ? "Okay, you can play for Ravi FC."
      : "Golden Boot incoming.";

  return (
    <CardShell>
      <p className="kicker text-ranger">Football</p>
      <h3 className="mt-1.5 font-heading text-base font-bold text-cream">Chasing goals, literally</h3>
      <div className="flex flex-1 items-end justify-center pb-1 pt-8">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          aria-label="Juggle the football"
          className="rounded-full"
        >
          <span key={count} className={`block ${count ? "ball-juggle" : ""}`}>
            <FootballSvg className="h-12 w-12 drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]" />
          </span>
        </button>
      </div>
      <div className="mx-auto h-1 w-14 rounded-full bg-black/40 blur-[2px]" />
      <div className="mt-3 flex items-baseline justify-between">
        <p className="text-xs text-haze" aria-live="polite">{msg}</p>
        <p className="font-display text-2xl leading-none text-cream">{count}</p>
      </div>
    </CardShell>
  );
};

const Basketball = () => {
  const [phase, setPhase] = useState("idle");
  const [makes, setMakes] = useState(0);
  const [shots, setShots] = useState(0);
  const [msg, setMsg] = useState("Tap the ball to shoot.");
  const later = useTimeout();

  const shoot = () => {
    if (phase !== "idle") return;
    const made = Math.random() < 0.65;
    setPhase(made ? "make" : "miss");
    later(() => {
      setShots((s) => s + 1);
      if (made) setMakes((m) => m + 1);
      setMsg(
        made
          ? pick(["Swish!", "Nothing but net.", "From downtown!", "Cash."])
          : pick(["Brick.", "Rim out. Again.", "Airball. Nobody saw that."])
      );
      setPhase("idle");
    }, 900);
  };

  return (
    <CardShell>
      <p className="kicker text-ranger">Basketball</p>
      <h3 className="mt-1.5 font-heading text-base font-bold text-cream">Shooting my shot</h3>

      <div className="relative mt-3 min-h-[7.5rem] flex-1">
        <div className="absolute bottom-[58%] left-[calc(72%+52px)] h-12 w-1.5 rounded bg-cream/70" />
        <div className="absolute bottom-[58%] left-[72%] h-1 w-[52px] rounded bg-[#FF3B4E]" />
        <div
          className="absolute bottom-[calc(58%-22px)] left-[72%] h-[22px] w-[52px] border-x border-b border-dashed border-cream/40"
          style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)" }}
        />
        <button
          type="button"
          onClick={shoot}
          aria-label="Shoot the basketball"
          className={`absolute rounded-full ${phase === "make" ? "ball-make" : phase === "miss" ? "ball-miss" : ""}`}
          style={phase === "idle" ? { left: "12%", bottom: "12%" } : undefined}
        >
          <BasketballSvg className="h-8 w-8" />
        </button>
        <div className="absolute inset-x-0 bottom-0 h-px bg-line/15" />
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <p className="text-xs text-haze" aria-live="polite">{msg}</p>
        <p className="font-display text-2xl leading-none text-cream">
          {makes}
          <span className="text-lg text-haze">/{shots}</span>
        </p>
      </div>
    </CardShell>
  );
};

const Tfi = () => {
  const [bang, setBang] = useState(0);
  const later = useTimeout();

  const trigger = () => {
    setBang((b) => b + 1);
    later(() => setBang(0), 1600);
  };

  return (
    <div className="reveal md:col-span-2">
      <div
        key={bang ? `b${bang}` : "idle"}
        className={`card relative flex h-full flex-col overflow-hidden p-5 ${bang ? "animate-shake" : ""}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="kicker text-ranger">TFI</p>
            <h3 className="mt-2 font-heading text-lg font-bold text-cream">Weekend movies, mostly Telugu</h3>
          </div>
          <Clapperboard className="flex-shrink-0 text-ranger" size={28} />
        </div>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-haze">
          Not a film buff, just someone who enjoys a good Telugu movie with friends. A proper mass scene and an
          interval bang still get me every time.
        </p>
        <div className="mt-auto pt-4">
          <button type="button" onClick={trigger} className="btn-ranger">
            <Zap size={16} /> Interval bang
          </button>
        </div>

        {bang > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/90 backdrop-blur-sm">
            <p className="animate-slam font-display text-7xl leading-none text-ranger sm:text-8xl">INTERVAL</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-cream/70">Grab the popcorn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Rangers = () => {
  const { ranger, morph } = useRanger();
  const current = RANGERS.find((r) => r.id === ranger);

  return (
    <CardShell className="md:col-span-2">
      <p className="kicker text-ranger">Power Rangers</p>
      <h3 className="mt-2 font-heading text-lg font-bold text-cream">The childish stuff (proudly)</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-haze">
        Grew up on Ninja Storm, SPD and Jungle Fury and never recovered. A team of specialists combining into
        something bigger: honestly still my favourite system design diagram.
      </p>

      <div className="mt-4 flex items-end gap-2.5">
        {RANGERS.map((r) => (
          <div
            key={r.id}
            className={`transition-all duration-300 ${r.id === ranger ? "-translate-y-2 scale-110" : "opacity-50"}`}
          >
            <Helmet id={r.id} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button type="button" onClick={morph} className="btn-ranger">
          It's Morphin' Time
        </button>
        <p className="text-xs text-haze">
          Currently suited up as <span className="font-semibold text-ranger">{current?.name} Ranger</span>
        </p>
      </div>
    </CardShell>
  );
};

const Gaming = () => (
  <CardShell className="md:col-span-2">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="kicker text-ranger">Games & late nights</p>
        <h3 className="mt-2 font-heading text-lg font-bold text-cream">Where I get to be the hero</h3>
      </div>
      <Gamepad2 className="flex-shrink-0 text-ranger" size={28} />
    </div>
    <p className="mt-2 max-w-md text-sm leading-relaxed text-haze">
      Story games with a big main-character arc. Then back to the editor, because the best ideas show up after
      midnight.
    </p>
    <div className="mt-auto pt-4 font-mono text-sm">
      <p className="text-haze">
        <span className="text-ranger">$</span> git log --since=midnight --oneline | wc -l
      </p>
      <p className="mt-1 text-cream">
        more than it should be<span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-ranger" />
      </p>
    </div>
  </CardShell>
);

const OffDuty = ({ data }) => (
  <section id="off-duty" className="py-10 sm:py-12">
    <div className="container-page">
      <SectionHeader
        className="mb-6"
        title="Not just a keyboard"
        blurb={`${data.beyondCode} Go ahead, play with them.`}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Rangers />
        <Football />
        <Basketball />
        <Tfi />
        <Gaming />
      </div>
    </div>
  </section>
);

export default OffDuty;
