"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { LandingSkeleton } from "../UI/Skeleton";

const Landing = () => {
  const { content, loading } = useContent("landing", "hero");
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current || loading) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Label fades up
      tl.from("[data-hero-label]", { y: 30, opacity: 0, duration: 0.8 }, 0.3);

      // Heading words reveal
      const headingEl = sectionRef.current.querySelector("[data-hero-heading]");
      if (headingEl) {
        const words = headingEl.querySelectorAll(".hero-word");
        tl.from(
          words,
          { y: "100%", opacity: 0, duration: 0.9, stagger: 0.06 },
          0.5,
        );
      }

      // Subtitle fades up
      tl.from(
        "[data-hero-subtitle]",
        { y: 20, opacity: 0, duration: 0.6 },
        "-=0.4",
      );

      // CTA button scales in
      tl.from(
        "[data-hero-cta]",
        { scale: 0.8, opacity: 0, duration: 0.5 },
        "-=0.2",
      );

      // Scroll indicator
      tl.from(
        "[data-scroll-indicator]",
        { opacity: 0, duration: 0.5 },
        "-=0.1",
      );

      // Glow pulse (continuous)
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.25,
          scale: 1.15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Scroll indicator bounce
      gsap.to("[data-scroll-indicator] svg", {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef, dependencies: [loading] },
  );

  if (loading) return <LandingSkeleton />;

  // Split title into words for reveal animation
  const titleWords = content.title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-24 md:pt-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Radial glow behind heading */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(79,124,255,0.15) 0%, transparent 70%)",
          opacity: 0.1,
        }}
      />

      {/* Decorative rings */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-accent-electric/5 pointer-events-none" />
      <div className="absolute bottom-32 left-10 w-96 h-96 rounded-full border border-accent-electric/5 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full border border-accent-cyan/5 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 sm:px-8">
        {/* Label */}
        <p data-hero-label className="section-label mb-6">
          {content.subtitle}
        </p>

        {/* Main heading - word by word reveal */}
        <h1
          data-hero-heading
          className="text-display-hero text-white mb-8 leading-[1.1]"
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden mr-[0.3em] pb-1"
            >
              <span className="hero-word inline-block">{word}</span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          data-hero-subtitle
          className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto"
        >
          Your Brand Speaks Success
        </p>

        {/* CTA */}
        <Link
          href={content.buttonLink}
          data-hero-cta
          className="btn-gradient-filled text-lg"
        >
          {content.buttonText}
        </Link>
      </div>

      {/* Scroll indicator */}
      <div
        data-scroll-indicator
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-xs tracking-widest uppercase">
          Scroll to explore
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
};

export default Landing;
