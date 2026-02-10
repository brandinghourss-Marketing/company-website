"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const ServicesHero = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const label = sectionRef.current.querySelector("[data-label]");
    const words = sectionRef.current.querySelectorAll("[data-word]");
    const line = sectionRef.current.querySelector("[data-line]");
    const desc = sectionRef.current.querySelector("[data-desc]");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (label) tl.from(label, { y: 20, opacity: 0, duration: 0.6 }, 0.2);
    if (words.length) tl.from(words, { y: 60, opacity: 0, duration: 0.8, stagger: 0.06 }, 0.35);
    if (line) tl.from(line, { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, 0.6);
    if (desc) tl.from(desc, { y: 30, opacity: 0, duration: 0.7 }, 0.8);
  }, { scope: sectionRef });

  const title = "What We Do Best";
  const titleWords = title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-44 md:pt-52 lg:pt-56 pb-20 md:pb-28 lg:pb-32 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,124,255,0.08) 0%, transparent 70%)" }}
      />
      <div className="absolute top-16 right-16 w-32 h-32 rounded-full border border-accent-electric/[0.06] pointer-events-none" />
      <div className="absolute bottom-12 left-8 w-20 h-20 rounded-full border border-accent-cyan/[0.06] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <p data-label className="section-label mb-6 text-accent-cyan">
          Our Services
        </p>

        <h1 className="text-display-xl text-white mb-8 flex flex-wrap gap-x-4">
          {titleWords.map((word, i) => (
            <span key={i} data-word className="inline-block">
              {word}
            </span>
          ))}
        </h1>

        <div
          data-line
          className="h-[3px] w-24 rounded-full origin-left mb-8"
          style={{ background: "var(--gradient-accent)" }}
        />

        <p data-desc className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed">
          From strategy to execution — we deliver end-to-end digital solutions that drive growth.
        </p>
      </div>
    </section>
  );
};

export default ServicesHero;
