"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";

const Collaborate2 = () => {
  const { content, loading } = useContent("landing", "collaborate2");
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || loading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Text and elements fade up
    const elements = sectionRef.current.querySelectorAll("[data-final]");
    gsap.from(elements, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // CTA button subtle pulse
    const ctaBtn = sectionRef.current.querySelector("[data-final-cta]");
    if (ctaBtn) {
      gsap.to(ctaBtn, {
        scale: 1.03,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Glow drift
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.2,
        scale: 1.1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, { scope: sectionRef, dependencies: [loading] });

  if (loading)
    return (
      <section
        className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
        style={{ background: "linear-gradient(135deg, #021430 0%, #010D1F 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <SkeletonTitle />
          <SkeletonText lines={3} />
        </div>
      </section>
    );

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 lg:py-44 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #021430 0%, #010D1F 100%)" }}
    >
      {/* Radial glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(79,124,255,0.12) 0%, transparent 70%)",
          opacity: 0.1,
        }}
      />

      {/* Character - celebrating girl */}
      <img
        data-final
        src="/assets/common/charcter4th.png"
        alt=""
        className="hidden lg:block absolute bottom-0 left-8 xl:left-16 w-48 xl:w-56 pointer-events-none select-none opacity-80"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p data-final className="section-label mb-6">
          {content.subtitle}
        </p>

        <h2 data-final className="text-display-hero text-white mb-6">
          Ready to Build Something{" "}
          <span className="gradient-text">Unforgettable?</span>
        </h2>

        <p data-final className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto">
          We live for creating magical brand experiences &mdash; from the first spark to the final reveal.
        </p>

        <Link
          href={content.buttonLink || "/contact"}
          data-final
          data-final-cta
          className="btn-gradient-filled text-xl px-10 py-4"
        >
          {content.buttonText}
        </Link>

        {/* Contact details */}
        <div data-final className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/40 text-sm">
          <a href="mailto:contact@brandinghours.com" className="hover:text-white/70 transition-colors">
            contact@brandinghours.com
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="tel:+919871741353" className="hover:text-white/70 transition-colors">
            +91 9871741353
          </a>
        </div>
      </div>
    </section>
  );
};

export default Collaborate2;
