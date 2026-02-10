"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { SkeletonText } from "../UI/Skeleton";
import { useFadeUp, useLineReveal } from "../../hooks/useAnimations";

const TagLine = () => {
  const { content, loading } = useContent("landing", "tagline");
  const sectionRef = useRef(null);

  useFadeUp(sectionRef, "[data-fade-up]", { dependencies: [loading] });
  useLineReveal(sectionRef);

  useGSAP(() => {
    if (!sectionRef.current || loading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = sectionRef.current.querySelectorAll("[data-character]");
    chars.forEach((char) => {
      gsap.from(char, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
      gsap.to(char, {
        y: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, { scope: sectionRef, dependencies: [loading] });

  if (loading)
    return (
      <section className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <SkeletonText lines={3} />
        </div>
      </section>
    );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 bg-neutral-50 overflow-hidden"
    >
      {/* Character left - professional woman */}
      <img
        data-character
        src="/assets/common/character%201.png"
        alt=""
        className="hidden lg:block absolute bottom-0 left-4 xl:left-12 w-48 xl:w-56 pointer-events-none select-none opacity-90"
      />
      {/* Character right - girl with laptop */}
      <img
        data-character
        src="/assets/common/character3rd.png"
        alt=""
        className="hidden lg:block absolute bottom-0 right-4 xl:right-12 w-44 xl:w-52 pointer-events-none select-none opacity-90"
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 data-fade-up className="text-display-xl text-neutral-900 mb-6">
          {content.prefix}{" "}
          <span className="gradient-text">{content.highlightText}</span>{" "}
          {content.suffix}
        </h2>

        <p data-fade-up className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-10">
          {content.description}
        </p>

        {/* Decorative accent line */}
        <div
          data-line
          className="h-1 w-32 mx-auto rounded-full"
          style={{ background: "var(--gradient-accent)" }}
        />
      </div>
    </section>
  );
};

export default TagLine;
