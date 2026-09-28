import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Contact = ({ data }) => {
  const { contact } = data;

  return (
    <section id="contact" className="relative overflow-hidden pb-6 pt-4">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full opacity-60"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgb(var(--ranger) / 0.18), transparent 65%)" }}
      />
      <div className="container-page relative">
        <div className="reveal card flex flex-col items-start justify-between gap-6 p-6 sm:p-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-4xl leading-[0.9] tracking-wide text-cream sm:text-5xl">
              Let's build <span className="text-ranger">something together</span>
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-haze">
              Got a retrieval problem, a multi-agent idea, or a five-a-side team that's one player short?
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a href={`mailto:${contact.email}`} className="btn-ranger">
              <Mail size={16} /> {contact.email}
            </a>
            <a href={contact.profiles.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="GitHub">
              <Github size={16} />
            </a>
            <a href={contact.profiles.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        <footer className="mt-6 text-center text-xs text-haze">
          <p>© {new Date().getFullYear()} Ravi Teeja K. Morphed, suited up, and still trying to nutmeg you.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
