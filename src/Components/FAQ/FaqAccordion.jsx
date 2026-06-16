"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

export default function FaqAccordion({ data }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const heading = ref.current.querySelector("[data-faq-heading]");
      const items = ref.current.querySelectorAll("[data-faq-item]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      if (heading) tl.from(heading, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, 0);
      if (items.length) tl.from(items, { y: 20, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }, 0.2);
    },
    { scope: ref }
  );

  return (
    <main ref={ref} className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="section-label mb-4">{data.subtitle}</p>
          <h1 data-faq-heading className="text-display-lg text-neutral-900 mb-5">
            {data.title}
          </h1>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="flex flex-col divide-y divide-neutral-200 border border-neutral-200 rounded-2xl overflow-hidden">
          {data.questions.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>

        <div className="mt-14 text-center flex flex-col items-center gap-5">
          <p className="text-lg text-neutral-700">
            Still have a question? We&apos;re happy to help.
          </p>
          <Link href="/contact" className="btn-gradient-filled text-base group">
            Get in Touch
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div data-faq-item>
      <button
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-neutral-50 transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="font-semibold text-neutral-900 text-base leading-snug">{faq.question}</span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{ background: "var(--gradient-accent)", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white">
          <p className="text-neutral-600 leading-relaxed text-[15px]">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}
