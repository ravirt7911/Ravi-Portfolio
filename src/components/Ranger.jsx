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

  const morph = useCallback(() => {
    setMorphKey((k) => k + 1);
    setRanger((current) => {
      const i = RANGERS.findIndex((r) => r.id === current);
      return RANGERS[(i + 1) % RANGERS.length].id;
    });
  }, []);

  return (
    <RangerContext.Provider value={{ ranger, setRanger, morph }}>
      {children}
      {morphKey > 0 && <MorphOverlay key={morphKey} quick />}
    </RangerContext.Provider>
  );
};

export const useRanger = () => useContext(RangerContext);

export const RangerPicker = ({ className = "" }) => {
  const { ranger, setRanger } = useRanger();
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
          onClick={() => setRanger(r.id)}
          className={`h-4 w-4 rotate-45 rounded-[3px] border border-line/30 transition-transform duration-200 hover:scale-125 ${
            ranger === r.id ? "scale-125 ring-2 ring-cream/80 ring-offset-2 ring-offset-ink" : "opacity-70"
          }`}
          style={{ backgroundColor: `rgb(${suitRgb(r.id)})` }}
        />
      ))}
    </div>
  );
};

export const MorphOverlay = ({ quick = false, onDone }) => {
  const [gone, setGone] = useState(false);
  const stagger = quick ? 40 : 80;
  const hold = quick ? 450 : 1150;
  const total = hold + RANGERS.length * stagger + 400;

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
      className={`fixed inset-0 z-[100] flex cursor-pointer ${quick ? "" : "morph-cover"}`}
      style={quick ? undefined : { animationDelay: `${hold}ms` }}
      onClick={() => {
        setGone(true);
        onDone && onDone();
      }}
      aria-hidden="true"
    >
      {RANGERS.map((r, i) => (
        <div
          key={r.id}
          className="morph-bar h-full flex-1"
          style={{
            backgroundColor: `rgb(${suitRgb(r.id)})`,
            animationDelay: `${i * stagger}ms, ${hold + i * stagger}ms`,
          }}
        />
      ))}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ animation: `fade-out 0.25s ease ${hold}ms both` }}
      >
        <p
          className="morph-text font-display text-6xl leading-none text-white sm:text-8xl md:text-9xl"
          style={{
            animationDelay: `${RANGERS.length * stagger}ms`,
            textShadow: "4px 4px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
          }}
        >
          It's Morphin' Time!
        </p>
        {!quick && (
          <p
            className="morph-text mt-4 rounded-full bg-black/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.3em] text-white"
            style={{ animationDelay: `${RANGERS.length * stagger + 200}ms` }}
          >
            Tap to skip
          </p>
        )}
      </div>
    </div>
  );
};
