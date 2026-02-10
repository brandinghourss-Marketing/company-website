"use client";
import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { LandingSkeleton } from "../UI/Skeleton";

const Process = () => {
  const { content, loading } = useContent("about", "process");
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const label = sectionRef.current.querySelector("[data-process-label]");
    const heading = sectionRef.current.querySelector("[data-process-heading]");
    const line = sectionRef.current.querySelector("[data-process-line]");
    const cards = sectionRef.current.querySelectorAll("[data-process-card]");
    const connectors = sectionRef.current.querySelectorAll("[data-connector]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    if (label) {
      tl.from(label, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0);
    }
    if (heading) {
      tl.from(heading, { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.15);
    }
    if (line) {
      tl.from(line, { scaleX: 0, duration: 0.8, ease: "power3.inOut" }, 0.3);
    }

    // Stagger cards with their connectors
    if (cards.length) {
      cards.forEach((card, i) => {
        const number = card.querySelector("[data-step-number]");
        const cardContent = card.querySelector("[data-step-content]");

        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
        });

        // Connector line grows down
        if (connectors[i]) {
          cardTl.from(connectors[i], {
            scaleY: 0,
            duration: 0.5,
            ease: "power3.out",
          }, 0);
        }

        // Number pops in
        if (number) {
          cardTl.from(number, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2)",
          }, 0.15);
        }

        // Card slides up
        if (cardContent) {
          cardTl.from(cardContent, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          }, 0.25);
        }
      });
    }
  }, { scope: sectionRef });

  if (loading) return <LandingSkeleton />;

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 bg-neutral-50"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16 md:mb-20">
          <p data-process-label className="section-label mb-4">
            {content.title}
          </p>
          <h2 data-process-heading className="text-display-lg text-neutral-900">
            {content.subtitle}
          </h2>
          <div
            data-process-line
            className="mx-auto mt-6 h-[3px] w-20 rounded-full origin-center"
            style={{ background: "var(--gradient-accent)" }}
          />
        </div>

        {/* Timeline steps */}
        <div className="relative">
          {content.steps.map((step, index) => {
            const stepNum = String(index + 1).padStart(2, "0");
            const isLast = index === content.steps.length - 1;

            return (
              <div key={index} data-process-card className="relative flex gap-6 md:gap-10 pb-12 last:pb-0">
                {/* Timeline line + number */}
                <div className="flex flex-col items-center shrink-0">
                  {/* Number circle */}
                  <div
                    data-step-number
                    className="relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white z-10 shrink-0"
                    style={{ background: "var(--gradient-accent)" }}
                  >
                    {stepNum}
                  </div>

                  {/* Connector line */}
                  {!isLast && (
                    <div
                      data-connector
                      className="w-[2px] flex-1 mt-2 origin-top rounded-full bg-gradient-to-b from-accent-electric/30 to-transparent"
                    />
                  )}
                </div>

                {/* Card content */}
                <div
                  data-step-content
                  className="flex-1 pb-8 pt-1"
                >
                  <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 md:p-8 shadow-sm hover:shadow-md hover:border-accent-electric/20 transition-all duration-300">
                    <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-3 font-display">
                      {step.question}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-base md:text-lg">
                      {step.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
