import React from "react";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { rangerRgb } from "../Ranger";

const Saga = ({ data }) => {
  const jobs = data.about.experience;

  return (
    <section id="saga" className="py-10">
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_2.2fr] lg:gap-12">
        <div className="lg:sticky lg:top-16 lg:self-start">
          <SectionHeader
            title="Five episodes and counting"
            blurb="Every team got its own Ranger color. The current season is at the top."
            className=""
          />
        </div>

        <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[9px] before:top-6 before:w-px before:bg-gradient-to-b before:from-line/20 before:to-transparent">
          {jobs.map((job, i) => {
            const c = rangerRgb(job.ranger);
            return (
              <li key={job.id} className="reveal relative pl-8" style={{ transitionDelay: `${i * 60}ms` }}>
                <span
                  className="absolute left-0 top-5 h-5 w-5 rotate-45 rounded-[5px]"
                  style={{ backgroundColor: `rgb(${c})`, boxShadow: `0 0 18px rgb(${c} / 0.45)` }}
                  aria-hidden="true"
                />

                <article
                  className="card group relative overflow-hidden px-5 py-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderColor: `rgb(${c} / 0.18)` }}
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: `rgb(${c} / 0.15)` }}
                  />

                  <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="kicker text-[10px]" style={{ color: `rgb(${c})` }}>
                      Episode {String(jobs.length - i).padStart(2, "0")}
                    </span>
                    {job.current && (
                      <span
                        className="rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-ink"
                        style={{ backgroundColor: `rgb(${c})` }}
                      >
                        Current
                      </span>
                    )}
                    <span className="ml-auto font-mono text-[11px] text-haze">{job.duration}</span>
                  </div>

                  <h3 className="relative mt-1.5 font-heading text-base font-bold text-cream sm:text-lg">
                    {job.title} <span className="font-medium text-haze">at</span>{" "}
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                      style={{ color: `rgb(${c})` }}
                    >
                      {job.company}
                      <ArrowUpRight size={15} className="ml-0.5 inline -translate-y-0.5" />
                    </a>
                  </h3>

                  <p className="relative mt-1.5 text-sm leading-relaxed text-cream/80">{job.summary}</p>

                  <ul className="relative mt-2 space-y-1">
                    {job.description.map((d) => (
                      <li key={d} className="flex gap-2.5 text-[13px] leading-relaxed text-haze">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rotate-45"
                          style={{ backgroundColor: `rgb(${c})` }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <p className="relative mt-2.5 font-mono text-[11px] text-haze/80">{job.tech.join("  ·  ")}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Saga;
