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

const CardShell = React.forwardRef(({ className = "", children, ...rest }, ref) => (
  <div ref={ref} className={`reveal card relative flex flex-col overflow-hidden p-5 ${className}`} {...rest}>
    {children}
  </div>
));

const useInView = (ref) => {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
};

// Penalty shootout: pick a corner, the keeper guesses. Top corners are riskier.
const KICKS = 5;
const COL_X = [19, 50, 81];
const ROW_Y = [15, 45];
const ZONE_LABELS = [
  ["top left", "top middle", "top right"],
  ["bottom left", "bottom middle", "bottom right"],
];

const shootoutVerdict = (goals) =>
  goals === KICKS
    ? "Perfect five. Book the World Cup slot."
    : goals >= 4
    ? "Clinical. Keeper needs a lie down."
    : goals >= 3
    ? "Solid. Would take that in a shootout."
    : goals >= 1
    ? "Needs work. More five-a-side."
    : "The keeper is now your biggest fan.";

const Football = () => {
  const [kicks, setKicks] = useState([]);
  const [shot, setShot] = useState(null);
  const [msg, setMsg] = useState("Pick a corner. Top ones are risky.");
  const [best, setBest] = useState(null);
  const later = useTimeout();
  const done = kicks.length >= KICKS;
  const goals = kicks.filter((k) => k === "goal").length;

  const shoot = (col, row) => {
    if (shot || done) return;
    const keeper = Math.floor(Math.random() * 3);
    const skied = row === 0 && Math.random() < 0.25;
    const outcome = skied ? "miss" : keeper === col ? "saved" : "goal";
    setShot({ col, row, keeper, outcome });
    later(() => {
      const next = [...kicks, outcome];
      setKicks(next);
      if (next.length >= KICKS) {
        const total = next.filter((k) => k === "goal").length;
        setBest((b) => (b === null ? total : Math.max(b, total)));
        setMsg(`${total}/${KICKS}. ${shootoutVerdict(total)}`);
      } else {
        setMsg(
          outcome === "goal"
            ? pick(["GOAL!", "Top bins.", "Keeper went the wrong way."])
            : outcome === "saved"
            ? pick(["Saved. He read it.", "Keeper got a hand to it."])
            : "Over the bar. Row Z."
        );
      }
      later(() => setShot(null), 700);
    }, 800);
  };

  const restart = () => {
    setKicks([]);
    setShot(null);
    setMsg("Pick a corner. Top ones are risky.");
  };

  const ballPos = !shot
    ? { left: "50%", top: "90%", transform: "translate(-50%,-50%)" }
    : shot.outcome === "miss"
    ? { left: `${COL_X[shot.col]}%`, top: "-10%", transform: "translate(-50%,-50%) scale(0.6)", opacity: 0 }
    : { left: `${COL_X[shot.col]}%`, top: `${ROW_Y[shot.row]}%`, transform: "translate(-50%,-50%) scale(0.7)" };

  const keeperCol = shot ? shot.keeper : 1;
  const keeperTilt = shot ? (shot.keeper === 0 ? -65 : shot.keeper === 2 ? 65 : 0) : 0;

  return (
    <CardShell>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="kicker text-ranger">Football</p>
          <h3 className="mt-1.5 font-heading text-base font-bold text-cream">Penalties</h3>
        </div>
        <div className="flex items-center gap-1.5 pt-1" aria-label={`${goals} goals from ${kicks.length} kicks`}>
          {Array.from({ length: KICKS }, (_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full border ${
                kicks[i] === "goal"
                  ? "border-ranger bg-ranger"
                  : kicks[i]
                  ? "border-[#FF3B4E] bg-[#FF3B4E]/40"
                  : "border-line/25"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-3 min-h-[10rem] flex-1 select-none">
        <div className="absolute inset-x-[4%] top-0 h-[60%] border-x-2 border-t-2 border-cream/70"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgb(var(--line) / 0.07) 0 1px, transparent 1px 8px), repeating-linear-gradient(-45deg, rgb(var(--line) / 0.07) 0 1px, transparent 1px 8px)",
          }}
        >
          <div className="grid h-full grid-cols-3 grid-rows-2">
            {ZONE_LABELS.flatMap((labels, row) =>
              labels.map((label, col) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => shoot(col, row)}
                  disabled={!!shot || done}
                  aria-label={`Shoot ${label}`}
                  className="group relative z-10 flex items-center justify-center outline-offset-[-3px] hover:bg-ranger/15 disabled:pointer-events-none"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cream/0 transition-colors group-hover:bg-ranger" />
                </button>
              ))
            )}
          </div>
        </div>
        <div className="absolute inset-x-0 top-[60%] h-px bg-line/20" />

        <div
          className="pointer-events-none absolute z-[5] h-9 w-5 rounded-md bg-[#FFC83D] transition-all duration-500 ease-out"
          style={{
            left: `${COL_X[keeperCol]}%`,
            top: shot && shot.keeper !== 1 ? "34%" : "30%",
            transform: `translate(-50%,-50%) rotate(${keeperTilt}deg)`,
          }}
        >
          <span className="absolute -left-1.5 top-0 h-2.5 w-2.5 rounded-full bg-cream" />
          <span className="absolute -right-1.5 top-0 h-2.5 w-2.5 rounded-full bg-cream" />
        </div>

        <div
          className="pointer-events-none absolute z-20 transition-all duration-[750ms]"
          style={{ ...ballPos, transitionTimingFunction: "cubic-bezier(0.2,0.7,0.3,1)" }}
          aria-hidden="true"
        >
          <FootballSvg className="h-8 w-8 drop-shadow-[0_6px_8px_rgba(0,0,0,0.5)]" />
        </div>

        {shot && kicks.length < KICKS && shot.outcome === "goal" && (
          <p className="animate-slam pointer-events-none absolute inset-x-0 top-[62%] z-30 text-center font-display text-3xl text-ranger">GOAL</p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-haze" aria-live="polite">{msg}</p>
        {done ? (
          <button type="button" onClick={restart} className="btn-ghost flex-shrink-0 px-3 py-1 text-xs">
            Again
          </button>
        ) : (
          <p className="font-display text-2xl leading-none text-cream">
            {goals}
            <span className="text-lg text-haze">/{kicks.length}</span>
          </p>
        )}
      </div>
      {best !== null && <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-haze/70">Best {best}/{KICKS}</p>}
    </CardShell>
  );
};

// Shot meter: release when the marker is in the green. Streaks speed it up.
const Basketball = () => {
  const [phase, setPhase] = useState("idle");
  const [makes, setMakes] = useState(0);
  const [shots, setShots] = useState(0);
  const [streak, setStreak] = useState(0);
  const [msg, setMsg] = useState("Release in the green.");
  const later = useTimeout();
  const rootRef = useRef(null);
  const markerRef = useRef(null);
  const valueRef = useRef(0);
  const inView = useInView(rootRef);

  useEffect(() => {
    if (phase !== "idle" || !inView) return undefined;
    const period = 1300 - Math.min(streak, 5) * 110;
    const offset = Math.random() * 2;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = ((now - t0) / period + offset) % 2;
      const v = p < 1 ? p : 2 - p;
      valueRef.current = v;
      if (markerRef.current) markerRef.current.style.left = `${v * 100}%`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, inView, streak]);

  const shoot = () => {
    if (phase !== "idle") return;
    const v = valueRef.current;
    const off = Math.abs(v - 0.5);
    const outcome = off < 0.12 ? "make" : v < 0.5 ? "short" : "long";
    const perfect = off < 0.05;
    setPhase(outcome);
    later(() => {
      setShots((n) => n + 1);
      if (outcome === "make") {
        setMakes((m) => m + 1);
        setStreak((k) => k + 1);
        setMsg(perfect ? pick(["Swish!", "Nothing but net.", "Cash."]) : "Rattles in. Ugly but it counts.");
      } else {
        setStreak(0);
        setMsg(outcome === "short" ? pick(["Short. Use your legs.", "Front rim. So close."]) : "Too strong. Off the glass.");
      }
      setPhase("idle");
    }, 900);
  };

  return (
    <CardShell ref={rootRef}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="kicker text-ranger">Basketball</p>
          <h3 className="mt-1.5 font-heading text-base font-bold text-cream">Shooting my shot</h3>
        </div>
        {streak >= 2 && <p className="animate-slam pt-1 font-mono text-[10px] uppercase tracking-widest text-ranger">Streak {streak}</p>}
      </div>

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
          className={`absolute rounded-full ${
            phase === "make" ? "ball-make" : phase === "short" ? "ball-short" : phase === "long" ? "ball-miss" : ""
          }`}
          style={phase === "idle" ? { left: "12%", bottom: "12%" } : undefined}
        >
          <BasketballSvg className="h-8 w-8" />
        </button>
        <div className="absolute inset-x-0 bottom-0 h-px bg-line/15" />
      </div>

      <div className="relative mt-3 h-2.5 rounded-full bg-line/10" aria-hidden="true">
        <div className="absolute inset-y-0 left-[38%] w-[24%] rounded-full bg-ranger/30" />
        <div className="absolute inset-y-0 left-[45%] w-[10%] rounded-full bg-ranger" />
        <div ref={markerRef} className="absolute -top-1 h-[18px] w-1 -translate-x-1/2 rounded bg-cream shadow" style={{ left: "0%" }} />
      </div>
      <button type="button" onClick={shoot} disabled={phase !== "idle"} className="btn-ghost mt-2.5 w-full py-1.5 text-xs">
        Release
      </button>

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

const POSTER_PREFIX = ["Mass", "Rebel", "Vector", "Cosine", "Late-Night", "Full-Stack", "Prod"];
const POSTER_NOUN = ["Reddy", "Raja", "Warrior", "Baadshah", "Ustaad", "Naidu", "Leader"];
const POSTER_TAGS = [
  "Bugs don't ship him. He ships them.",
  "One engineer. Zero downtime.",
  "Retrieves what others can't.",
  "Mass is a state of mind.",
  "The interval bang is coming.",
  "Deploys on Fridays. Sleeps fine.",
];
const POSTER_GENRE = ["Action", "Mass Entertainer", "Family Drama", "Thriller", "Blockbuster"];

const newPoster = (prev) => {
  let next;
  do {
    next = {
      title: `${pick(POSTER_PREFIX)} ${pick(POSTER_NOUN)}`,
      tag: pick(POSTER_TAGS),
      genre: pick(POSTER_GENRE),
      tilt: Math.round((Math.random() * 4 - 2) * 10) / 10,
    };
  } while (prev && next.title === prev.title);
  return next;
};

const Poster = ({ poster, onClick }) => {
  const [first, ...rest] = poster.title.split(" ");
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Movie poster: ${poster.title}. Click for a new one.`}
      className="group relative block aspect-[3/4] w-40 flex-shrink-0 overflow-hidden rounded-md text-left shadow-2xl shadow-black/50 transition-transform duration-300 hover:scale-[1.03] sm:w-44"
      style={{ transform: `rotate(${poster.tilt}deg)` }}
    >
      <div key={poster.title} className="animate-slam absolute inset-0 flex flex-col justify-between p-3"
        style={{ background: "linear-gradient(160deg, rgb(var(--ranger)) 0%, #0A0A12 78%)" }}
      >
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 70% 25%, #fff, transparent 45%)" }} />
        <p className="relative font-mono text-[9px] uppercase tracking-[0.25em] text-white/80">A Ravi film</p>
        <div className="relative">
          <p className="font-display text-[2.6rem] leading-[0.85] text-white" style={{ textShadow: "2px 2px 0 rgb(0 0 0 / 0.55)" }}>
            {first}
            <span className="block">{rest.join(" ")}</span>
          </p>
          <p className="mt-2 text-[10px] font-semibold italic leading-tight text-white/85">{poster.tag}</p>
          <div className="mt-2 flex items-center justify-between border-t border-white/25 pt-1.5 font-mono text-[8px] uppercase tracking-widest text-white/70">
            <span>{poster.genre}</span>
            <span className="rounded border border-white/50 px-1">U/A</span>
          </div>
        </div>
      </div>
    </button>
  );
};

const Tfi = () => {
  const [bang, setBang] = useState(0);
  const [poster, setPoster] = useState(() => newPoster());
  const later = useTimeout();

  const trigger = () => {
    setBang((b) => b + 1);
    later(() => setBang(0), 1600);
  };

  return (
    <div className="reveal md:col-span-2">
      <div
        key={bang ? `b${bang}` : "idle"}
        className={`card relative flex h-full flex-col gap-5 overflow-hidden p-5 sm:flex-row sm:items-center ${bang ? "animate-shake" : ""}`}
      >
        <div className="flex min-w-0 flex-1 flex-col self-stretch">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="kicker text-ranger">TFI</p>
              <h3 className="mt-2 font-heading text-lg font-bold text-cream">Weekend movies, mostly Telugu</h3>
            </div>
            <Clapperboard className="flex-shrink-0 text-ranger sm:hidden" size={28} />
          </div>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-haze">
            Not a film buff, just someone who enjoys a good Telugu movie with friends. A proper mass scene and an
            interval bang still get me every time.
          </p>
          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-4">
            <button type="button" onClick={trigger} className="btn-ranger">
              <Zap size={16} /> Interval bang
            </button>
            <button type="button" onClick={() => setPoster(newPoster)} className="btn-ghost">
              <Clapperboard size={16} /> New poster
            </button>
          </div>
        </div>

        <div className="flex justify-center sm:pr-2">
          <Poster poster={poster} onClick={() => setPoster(newPoster)} />
        </div>

        {bang > 0 && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ink/90 backdrop-blur-sm">
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

// Commits by hour of day: a joke chart, deliberately not real telemetry
const HOURS = [9, 8, 6, 3, 2, 1, 1, 1, 2, 3, 4, 4, 3, 3, 4, 5, 5, 4, 3, 4, 5, 6, 8, 10];
const hourLabel = (h) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? "am" : "pm"}`;
const hourQuip = (h) =>
  h >= 0 && h < 5
    ? pick(["just one more fix", "it works, don't touch it", "the best ideas show up now", "sleep is a side quest"])
    : h < 9
    ? "asleep. Allegedly."
    : h < 18
    ? "in the office, behaving"
    : "warming up for the real shift";
const PEAK = HOURS.indexOf(Math.max(...HOURS));

const Gaming = () => {
  const [hour, setHour] = useState(0);
  const [quip, setQuip] = useState("the best ideas show up now");
  const max = Math.max(...HOURS);

  const select = (h) => {
    setHour(h);
    setQuip(hourQuip(h));
  };

  return (
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

      <div className="mt-4">
        <div className="mb-2 flex items-baseline justify-between gap-3 font-mono text-[11px]">
          <span className="uppercase tracking-widest text-haze">Commits by hour (vibes)</span>
          <span className="text-cream" aria-live="polite">
            <span className="text-ranger">{hourLabel(hour)}</span> · {quip}
          </span>
        </div>
        <div className="flex h-20 items-end gap-[3px]" role="group" aria-label="Commit activity by hour of day">
          {HOURS.map((v, h) => (
            <button
              key={h}
              type="button"
              onMouseEnter={() => select(h)}
              onFocus={() => select(h)}
              onClick={() => select(h)}
              aria-label={`${hourLabel(h)}: ${v > 6 ? "lots of" : v > 3 ? "some" : "few"} commits`}
              className="group relative h-full flex-1 outline-offset-2"
            >
              <span
                className={`absolute inset-x-0 bottom-0 rounded-t-sm transition-all duration-200 ${
                  h === hour ? "bg-ranger" : h === PEAK ? "bg-ranger/70" : "bg-ranger/25 group-hover:bg-ranger/50"
                }`}
                style={{ height: `${Math.max(8, (v / max) * 100)}%` }}
              />
            </button>
          ))}
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-haze/70">
          <span>12am</span>
          <span>6am</span>
          <span>12pm</span>
          <span>6pm</span>
          <span>11pm</span>
        </div>
      </div>

      {/* <div className="mt-4 font-mono text-sm">
        <p className="text-haze">
          <span className="text-ranger">$</span> git log --since=midnight --oneline | wc -l
        </p>
        <p className="mt-1 text-cream">
          more than it should be<span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-ranger" />
        </p>
      </div> */}
    </CardShell>
  );
};

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
