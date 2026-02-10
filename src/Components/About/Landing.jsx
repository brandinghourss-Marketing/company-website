"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { LandingSkeleton } from "../UI/Skeleton";

const Landing = () => {
  const { content, loading } = useContent("about", "landing");
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const label = sectionRef.current.querySelector("[data-label]");
    const words = sectionRef.current.querySelectorAll("[data-word]");
    const desc = sectionRef.current.querySelector("[data-desc]");
    const decorLine = sectionRef.current.querySelector("[data-decor-line]");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (label) {
      tl.from(label, { y: 20, opacity: 0, duration: 0.6 }, 0.2);
    }
    if (words.length) {
      tl.from(words, { y: 60, opacity: 0, duration: 0.8, stagger: 0.06 }, 0.35);
    }
    if (decorLine) {
      tl.from(decorLine, { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, 0.6);
    }
    if (desc) {
      tl.from(desc, { y: 30, opacity: 0, duration: 0.7 }, 0.8);
    }
  }, { scope: sectionRef });

  if (loading) return <LandingSkeleton />;

  const titleWords = content.title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-44 md:pt-52 lg:pt-60 pb-28 md:pb-36 lg:pb-44 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/assets/common/aboutus.png')" }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(2,20,48,0.85) 0%, rgba(1,13,31,0.75) 100%)" }} />

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,124,255,0.08) 0%, transparent 70%)" }}
      />
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full border border-accent-electric/[0.06] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full border border-accent-cyan/[0.06] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Hashtag label */}
        <p data-label className="section-label mb-6 text-accent-cyan">
          {content.subtitle}
        </p>

        {/* Title with word-by-word reveal */}
        <h1 className="text-display-xl text-white mb-8 flex flex-wrap gap-x-4">
          {titleWords.map((word, i) => (
            <span key={i} data-word className="inline-block">
              {word}
            </span>
          ))}
        </h1>

        {/* Gradient accent line */}
        <div
          data-decor-line
          className="h-[3px] w-24 rounded-full origin-left mb-8"
          style={{ background: "var(--gradient-accent)" }}
        />

        {/* Description */}
        <p data-desc className="text-xl md:text-2xl text-white/50 max-w-2xl leading-relaxed">
          {content.description}
        </p>
      </div>
    </section>
  );
};

export default Landing;
