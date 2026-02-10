"use client";
import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";
import { useFadeUp } from "../../hooks/useAnimations";

const FAQ = () => {
  const { content, loading } = useContent("landing", "faq");
  const sectionRef = useRef(null);

  useFadeUp(sectionRef, "[data-fade-up]", { dependencies: [loading] });

  if (loading)
    return (
      <section className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
        <div className="max-w-3xl mx-auto">
          <SkeletonTitle />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-b py-4">
              <SkeletonText lines={2} />
            </div>
          ))}
        </div>
      </section>
    );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p data-fade-up className="section-label mb-4">Frequently Asked Questions</p>
          <h2 data-fade-up className="text-display-lg text-neutral-900">
            Got Questions?<br />We&apos;ve Got Answers.
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-neutral-200">
          {content.questions.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef(null);
  const iconRef = useRef(null);

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);

    if (next) {
      // Open
      gsap.set(answerRef.current, { height: "auto" });
      const h = answerRef.current.offsetHeight;
      gsap.fromTo(answerRef.current, { height: 0 }, { height: h, duration: 0.4, ease: "power2.inOut" });
      gsap.to(iconRef.current, { rotation: 45, duration: 0.3 });
      gsap.fromTo(
        answerRef.current.querySelector("p"),
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.15 }
      );
    } else {
      // Close
      gsap.to(answerRef.current, { height: 0, duration: 0.35, ease: "power2.inOut" });
      gsap.to(iconRef.current, { rotation: 0, duration: 0.3 });
    }
  };

  return (
    <div
      data-fade-up
      className={`py-5 transition-colors ${isOpen ? "border-l-2 border-l-accent-electric pl-4 -ml-4" : ""}`}
    >
      <button
        className="w-full flex items-center justify-between gap-4 text-left"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-neutral-900">{question}</span>
        <span
          ref={iconRef}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-accent-electric text-2xl font-light"
        >
          +
        </span>
      </button>
      <div ref={answerRef} className="overflow-hidden" style={{ height: 0 }}>
        <p
          className="text-neutral-600 text-base pt-3 pb-1"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </div>
    </div>
  );
};
