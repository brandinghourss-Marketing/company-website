"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { SkeletonText } from "../UI/Skeleton";

const Collaborate = () => {
  const { content, loading } = useContent("landing", "collaborate");
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || loading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Section grows into view
    gsap.from(sectionRef.current, {
      scale: 0.95,
      opacity: 0.8,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      },
    });

    // Text and button fade up
    const elements = sectionRef.current.querySelectorAll("[data-collab]");
    gsap.from(elements, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, { scope: sectionRef, dependencies: [loading] });

  if (loading)
    return (
      <section className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
        style={{ background: "var(--gradient-cta)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <SkeletonText lines={3} />
        </div>
      </section>
    );

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 overflow-hidden"
      style={{ background: "var(--gradient-cta)" }}
    >
      {/* Decorative shapes */}
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full border border-accent-electric/10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full border border-accent-electric/10 pointer-events-none" />

      {/* Diagonal line pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 21px)",
        }}
      />

      {/* Character - guy with laptop */}
      <img
        data-collab
        src="/assets/common/character2nd.png"
        alt=""
        className="hidden lg:block absolute bottom-0 right-8 xl:right-16 w-48 xl:w-56 pointer-events-none select-none opacity-80"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p
          data-collab
          className="text-display-lg text-white mb-4"
        >
          At <strong className="text-white">Branding Hours</strong>, design is more than
          aesthetics &mdash; it&apos;s{" "}
          <span className="gradient-text">strategy in motion.</span>
        </p>
        <p data-collab className="text-lg text-white/60 mb-10">
          Every solution we craft is built to solve problems and inspire action.
        </p>
        <Link
          href={content.buttonLink || "/contact"}
          data-collab
          className="btn-gradient-filled text-lg"
        >
          {content.buttonText}
        </Link>
      </div>
    </section>
  );
};

export default Collaborate;
