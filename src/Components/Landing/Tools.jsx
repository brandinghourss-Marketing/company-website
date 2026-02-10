"use client";
import React, { useRef, useEffect } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";
import { useFadeUp } from "../../hooks/useAnimations";

const Tools = () => {
  const { content, loading } = useContent("landing", "tools");
  const sectionRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const tween1Ref = useRef(null);
  const tween2Ref = useRef(null);

  useFadeUp(sectionRef, "[data-fade-up]", { dependencies: [loading] });

  useGSAP(() => {
    if (!row1Ref.current || !row2Ref.current || loading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Row 1: scroll left
    tween1Ref.current = gsap.to(row1Ref.current, {
      x: "-50%",
      duration: 35,
      repeat: -1,
      ease: "none",
    });

    // Row 2: scroll right
    tween2Ref.current = gsap.fromTo(
      row2Ref.current,
      { x: "-50%" },
      { x: "0%", duration: 35, repeat: -1, ease: "none" }
    );
  }, { scope: sectionRef, dependencies: [loading] });

  // Hover pause
  const handleHover = (rowRef, tweenRef, pause) => {
    if (tweenRef.current) {
      if (pause) {
        gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
      } else {
        gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
      }
    }
  };

  if (loading)
    return (
      <section className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24" style={{ background: "linear-gradient(135deg, #021430 0%, #0A2A5E 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <SkeletonText lines={1} />
          <SkeletonTitle />
          <SkeletonText lines={2} />
        </div>
      </section>
    );

  // Duplicate icons for seamless infinite loop
  const icons = content.icons;
  const doubledIcons = [...icons, ...icons];

  return (
    <section ref={sectionRef} className="py-24 md:py-32 lg:py-40 overflow-hidden" style={{ background: "linear-gradient(135deg, #021430 0%, #0A2A5E 100%)" }}>
      {/* Text */}
      <div className="text-center mb-16 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
        <p data-fade-up className="section-label mb-4">{content.subtitle}</p>
        <h2 data-fade-up className="text-display-lg text-white mb-4 max-w-3xl mx-auto">
          {content.title}
        </h2>
      </div>

      {/* Marquee rows */}
      <div className="flex flex-col gap-4">
        {/* Row 1 - scrolls left */}
        <div
          className="flex"
          onMouseEnter={() => handleHover(row1Ref, tween1Ref, true)}
          onMouseLeave={() => handleHover(row1Ref, tween1Ref, false)}
        >
          <div ref={row1Ref} className="flex gap-4 shrink-0">
            {doubledIcons.map((icon, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-all flex items-center justify-center w-40 h-20"
              >
                <img src={icon} alt="" className="max-h-10 max-w-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - scrolls right */}
        <div
          className="flex"
          onMouseEnter={() => handleHover(row2Ref, tween2Ref, true)}
          onMouseLeave={() => handleHover(row2Ref, tween2Ref, false)}
        >
          <div ref={row2Ref} className="flex gap-4 shrink-0">
            {doubledIcons.map((icon, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/15 transition-all flex items-center justify-center w-40 h-20"
              >
                <img src={icon} alt="" className="max-h-10 max-w-full object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
