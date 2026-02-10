"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";

const Services = ({ variant = "homepage" }) => {
  const { content, loading } = useContent("landing", "services");
  const sectionRef = useRef(null);

  // Section heading animation
  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const label = sectionRef.current.querySelector("[data-section-label]");
    const headingWords = sectionRef.current.querySelectorAll("[data-heading-word]");
    const accentLine = sectionRef.current.querySelector("[data-accent-line]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    if (label) {
      tl.from(label, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0);
    }
    if (headingWords.length) {
      tl.from(headingWords, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      }, 0.15);
    }
    if (accentLine) {
      tl.from(accentLine, {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.inOut",
      }, 0.4);
    }
  }, { scope: sectionRef });

  if (loading)
    return (
      <section className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
        <div className="max-w-7xl mx-auto grid gap-16">
          <SkeletonTitle />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SkeletonText lines={8} />
              <div className="bg-gray-200 animate-pulse rounded-2xl h-72" />
            </div>
          ))}
        </div>
      </section>
    );

  const headingWords = content.title.split(" ");

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-28 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-10 md:mb-16 lg:mb-24">
          <p data-section-label className="section-label mb-4">
            {content.subtitle}
          </p>
          <h2 className="text-display-xl text-neutral-900 flex flex-wrap justify-center gap-x-4">
            {headingWords.map((word, i) => (
              <span key={i} data-heading-word className="inline-block">
                {word}
              </span>
            ))}
          </h2>
          <div
            data-accent-line
            className="mx-auto mt-6 h-[3px] w-20 rounded-full origin-center"
            style={{ background: "var(--gradient-accent)" }}
          />
        </div>

        {/* Service cards */}
        <div className="grid gap-14 sm:gap-16 md:gap-24 lg:gap-32">
          {content.items.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              title={service.title}
              description={service.description}
              pointers={service.pointers}
              buttonText={content.buttonText}
              buttonLink={content.buttonLink}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

const ServiceCard = ({ index, title, description, pointers, buttonText, buttonLink, image }) => {
  const cardRef = useRef(null);
  const isEven = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  useGSAP(() => {
    if (!cardRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const card = cardRef.current;
    const numberEl = card.querySelector("[data-service-number]");
    const imageWrapper = card.querySelector("[data-service-image]");
    const imageEl = card.querySelector("[data-service-img]");
    const titleEl = card.querySelector("[data-service-title]");
    const lineEl = card.querySelector("[data-service-line]");
    const descEl = card.querySelector("[data-service-desc]");
    const pills = card.querySelectorAll("[data-service-pill]");
    const btnEl = card.querySelector("[data-service-btn]");

    // Main card entrance timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      },
    });

    // 1. Background number fades in
    if (numberEl) {
      tl.from(numberEl, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, 0);
    }

    // 2. Image clip-path wipe reveal (alternating direction)
    if (imageWrapper) {
      const fromClip = isEven
        ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
        : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
      const toClip = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

      gsap.set(imageWrapper, { clipPath: fromClip });
      tl.to(imageWrapper, {
        clipPath: toClip,
        duration: 1,
        ease: "power3.inOut",
      }, 0.1);
    }

    // 3. Image parallax (scale down + drift on scrub)
    if (imageEl) {
      gsap.set(imageEl, { scale: 1.15 });
      gsap.to(imageEl, {
        scale: 1,
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }

    // 4. Title slides up
    if (titleEl) {
      tl.from(titleEl, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      }, 0.3);
    }

    // 5. Accent gradient line scales in
    if (lineEl) {
      tl.from(lineEl, {
        scaleX: 0,
        duration: 0.6,
        ease: "power3.inOut",
      }, 0.5);
    }

    // 6. Description fades up
    if (descEl) {
      tl.from(descEl, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }, 0.55);
    }

    // 7. Pills stagger with bouncy ease
    if (pills.length) {
      tl.from(pills, {
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(2)",
      }, 0.65);
    }

    // 8. Button bounces in
    if (btnEl) {
      tl.from(btnEl, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.5)",
      }, 0.8);
    }
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
    >
      {/* Large background number with gradient */}
      <span
        data-service-number
        className="absolute -top-10 left-0 text-[9rem] md:text-[12rem] font-bold font-display pointer-events-none select-none leading-none gradient-text opacity-[0.06]"
      >
        {number}
      </span>

      {/* Image with clip-path reveal */}
      <div
        data-service-image
        className={`rounded-2xl overflow-hidden shadow-xl ${isEven ? "md:order-1" : "md:order-2"}`}
      >
        <img
          data-service-img
          src={image}
          alt={title}
          className="w-full aspect-square object-cover will-change-transform"
          loading="lazy"
        />
      </div>

      {/* Text content */}
      <div className={`flex flex-col gap-5 ${isEven ? "md:order-2" : "md:order-1"}`}>
        <h3 data-service-title className="text-display-md text-neutral-900">
          {title}
        </h3>

        {/* Accent gradient line */}
        <div
          data-service-line
          className="h-[3px] w-16 rounded-full origin-left"
          style={{ background: "var(--gradient-accent)" }}
        />

        <p data-service-desc className="text-lg text-neutral-600 leading-relaxed">
          {description}
        </p>

        {/* Pointers as pills */}
        <div className="flex flex-wrap gap-2">
          {pointers.map((pointer, i) => (
            <span
              key={i}
              data-service-pill
              className="px-4 py-1.5 rounded-full text-sm bg-navy-950/5 text-navy-950 border border-transparent hover:bg-accent-electric/10 hover:border-accent-electric/20 hover:text-accent-electric transition-all duration-300 cursor-default"
            >
              {pointer}
            </span>
          ))}
        </div>

        <Link
          href={buttonLink || "/contact"}
          data-service-btn
          className="btn-gradient-filled text-base w-fit mt-2 group"
        >
          {buttonText}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
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
  );
};
