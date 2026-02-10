"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";

const Vision = () => {
  const { content, loading } = useContent("about", "vision");
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = sectionRef.current.querySelector("[data-vision-heading]");
    const line = sectionRef.current.querySelector("[data-vision-line]");
    const paragraphs = sectionRef.current.querySelectorAll("[data-vision-p]");
    const ctaSubtitle = sectionRef.current.querySelector("[data-vision-cta-subtitle]");
    const ctaBtn = sectionRef.current.querySelector("[data-vision-btn]");

    // Heading + line
    const headingTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    if (heading) {
      headingTl.from(heading, { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" }, 0);
    }
    if (line) {
      headingTl.from(line, { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, 0.3);
    }

    // Paragraphs stagger in on scroll
    if (paragraphs.length) {
      paragraphs.forEach((p, i) => {
        gsap.from(p, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
          },
        });
      });
    }

    // CTA area
    if (ctaSubtitle) {
      gsap.from(ctaSubtitle, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaSubtitle,
          start: "top 85%",
        },
      });
    }
    if (ctaBtn) {
      gsap.from(ctaBtn, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ctaBtn,
          start: "top 90%",
        },
      });
    }
  }, { scope: sectionRef });

  if (loading)
    return (
      <section className="grid gap-10 py-24 px-6">
        <SkeletonTitle />
        <SkeletonText lines={7} />
      </section>
    );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
      style={{ background: "linear-gradient(135deg, #021430 0%, #010D1F 60%, #0A2A5E 100%)" }}
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(79,124,255,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Heading */}
        <h2 data-vision-heading className="text-display-lg text-white mb-4">
          {content.title}
        </h2>

        {/* Gradient accent line */}
        <div
          data-vision-line
          className="mx-auto h-[3px] w-20 rounded-full origin-center mb-12"
          style={{ background: "var(--gradient-accent)" }}
        />

        {/* Vision paragraphs */}
        <div className="space-y-6 mb-16">
          {content.content.map((paragraph, index) => (
            <p
              key={index}
              data-vision-p
              className="text-lg md:text-xl text-white/50 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-6">
          <p
            data-vision-cta-subtitle
            className="text-xl md:text-2xl font-semibold text-white/70 font-display max-w-2xl"
          >
            {content.callToAction.subtitle}
          </p>
          <Link
            href="/contact"
            data-vision-btn
            className="btn-gradient-filled text-lg px-10 group"
          >
            {content.callToAction.buttonText}
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Decorative ring */}
      <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full border border-accent-electric/[0.05] pointer-events-none" />
    </section>
  );
};

export default Vision;
