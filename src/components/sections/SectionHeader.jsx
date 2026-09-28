import React from "react";

const SectionHeader = ({ title, blurb, className = "mb-8" }) => (
  <div className={`reveal max-w-xl ${className}`}>
    <h2 className="font-display text-4xl leading-[0.9] tracking-wide text-cream sm:text-5xl">{title}</h2>
    {blurb && <p className="mt-3 text-sm leading-relaxed text-haze">{blurb}</p>}
  </div>
);

export default SectionHeader;
