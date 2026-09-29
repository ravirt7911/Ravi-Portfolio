import React, { useCallback, useEffect, useState } from "react";
import { mockData as data } from "../data/mock";
import { MorphOverlay, RangerProvider, prefersReducedMotion } from "./Ranger";
import Hero from "./sections/Hero";
import Saga from "./sections/Saga";
import OffDuty from "./sections/OffDuty";
import Contact from "./sections/Contact";

const shouldPlayIntro = () => !prefersReducedMotion();

const useScrollReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.dataset.visible = "true";
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const Backdrop = () => (
  <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
    <div className="backdrop-grid absolute inset-0" />
    <div
      className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl transition-colors duration-700"
      style={{ background: "radial-gradient(closest-side, rgb(var(--ranger) / 0.22), transparent)" }}
    />
    <div
      className="absolute -right-40 top-[40%] h-[28rem] w-[28rem] rounded-full blur-3xl"
      style={{ background: "radial-gradient(closest-side, rgb(var(--c-blue) / 0.08), transparent)" }}
    />
    <div className="backdrop-grain absolute inset-0" />
  </div>
);

const Portfolio = () => {
  const [intro, setIntro] = useState(shouldPlayIntro);
  useScrollReveal();

  const endIntro = useCallback(() => setIntro(false), []);

  return (
    <RangerProvider>
      {intro && <MorphOverlay onDone={endIntro} />}
      <div className="relative isolate min-h-screen overflow-x-hidden">
        <Backdrop />
        <main>
          <Hero data={data} />
          <Saga data={data} />
          <OffDuty data={data} />
          <Contact data={data} />
        </main>
      </div>
    </RangerProvider>
  );
};

export default Portfolio;
