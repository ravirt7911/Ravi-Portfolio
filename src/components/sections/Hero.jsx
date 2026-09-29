import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { RANGERS, RangerPicker, useRanger } from "../Ranger";

const TICKER = [
  "Vector Search",
  "Football",
  "Multi-Agent Systems",
  "Basketball",
  "RAG in Production",
  "Late-Night Commits",
  "Power Rangers",
  "Shipping",
];

const K = "text-[#FF5FB0]";
const P = "text-[#8AB4FF]";
const S = "text-[#FFC83D]";
const C = "text-haze/70 italic";
const D = "text-cream/60";

const CodeCard = ({ data }) => {
  const { ranger } = useRanger();
  const rangerName = RANGERS.find((r) => r.id === ranger)?.name;

  const lines = [
    [["// hello, world", C]],
    [["const ", K], ["ravi", "text-cream"], [" = {", D]],
    [["  role", P], [": ", D], [`"${data.hero.role}"`, S], [",", D]],
    [["  company", P], [": ", D], [`"${data.hero.company}"`, S], [",", D]],
    [["  offTheClock", P], [": [", D], ['"football"', S], [", ", D], ['"basketball"', S], [", ", D], ['"TFI"', S], ["],", D]],
    [["  ranger", P], [": ", D], [`"${rangerName}"`, "text-ranger font-bold"], [",", D], ["  // try the picker", C]],
    [["  status", P], [": ", D], ['"shipping"', S], [",", D]],
    [["};", D]],
  ];

  return (
    <div className="force-dark card relative overflow-hidden bg-ink-2 text-cream shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-line/[0.06] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF3B4E]" />
        <span className="h-3 w-3 rounded-full bg-[#FFC83D]" />
        <span className="h-3 w-3 rounded-full bg-[#2BD97C]" />
        <span className="ml-3 font-mono text-xs text-haze">ravi.ts</span>
      </div>
      <pre className="overflow-x-auto px-4 py-5 font-mono text-[12px] leading-6 sm:text-[13px]">
        {lines.map((tokens, i) => (
          <div key={i} className="code-line flex" style={{ animationDelay: `${300 + i * 90}ms` }}>
            <span className="mr-4 w-4 select-none text-right text-haze/40">{i + 1}</span>
            <code>
              {tokens.map(([text, cls], j) => (
                <span key={j} className={cls}>
                  {text}
                </span>
              ))}
              {i === lines.length - 1 && <span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-ranger" />}
            </code>
          </div>
        ))}
      </pre>
    </div>
  );
};

const Hero = ({ data }) => {
  const [first, ...rest] = data.hero.name.split(" ");

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col">
      <header className="container-page flex h-16 flex-shrink-0 items-center justify-between">
        <span className="flex items-baseline gap-1 font-display text-3xl leading-none tracking-wide">
          <span className="text-cream">RT7</span>
          <span className="h-2 w-2 rotate-45 bg-ranger" />
        </span>
        <div className="flex items-center gap-3">
          <span className="kicker hidden text-[10px] text-haze sm:inline">Pick your Ranger</span>
          <RangerPicker />
        </div>
      </header>

      <div className="container-page grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <p className="kicker flex items-center gap-3 text-haze">
            <span className="live-dot h-2 w-2 rounded-full bg-ranger" />
            Currently at {data.hero.company}
          </p>

          <h1 className="mt-4 font-display leading-[0.85] tracking-wide">
            <span className="sr-only">Kamsu </span>
            <span className="block text-[clamp(3.5rem,10vw,7rem)] text-cream">{first}</span>
            <span className="relative block text-[clamp(2.75rem,7.5vw,5rem)]">
              <span aria-hidden="true" data-text={rest.join(" ")} className="text-outline absolute left-1 top-1 select-none" />
              <span className="relative text-ranger">{rest.join(" ")}</span>
            </span>
          </h1>

          <p className="mt-5 font-heading text-base font-semibold text-cream sm:text-lg">
            {data.hero.role}{" "}
            <a
              href={data.hero.companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ranger underline decoration-ranger/40 underline-offset-4 hover:decoration-ranger"
            >
              @ {data.hero.company}
            </a>
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-haze sm:text-[15px]">{data.hero.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <a href={`mailto:${data.contact.email}`} className="btn-ranger">
              <Mail size={16} /> Let's talk
            </a>
            <a href={data.contact.profiles.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Github size={16} /> GitHub
            </a>
            <a href={data.contact.profiles.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <CodeCard data={data} />
        </div>
      </div>

      <div className="mb-6 -rotate-1 overflow-hidden border-y border-ranger/30 bg-ranger py-2">
        <div className="animate-marquee flex w-max whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center font-display text-xl tracking-wider text-ink">
              {t}
              <span className="mx-5 inline-block h-2 w-2 rotate-45 bg-ink" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
