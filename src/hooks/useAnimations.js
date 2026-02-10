"use client";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export const useTextReveal = (containerRef, selector = "[data-reveal]", options = {}) => {
  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = containerRef.current.querySelectorAll(selector);
    elements.forEach((el) => {
      const words = el.textContent.split(" ");
      el.innerHTML = words
        .map(
          (w) =>
            `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${w}</span></span>`
        )
        .join(" ");

      const innerSpans = el.querySelectorAll("span > span");
      gsap.to(innerSpans, {
        y: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          ...options.scrollTrigger,
        },
      });
    });
  }, { scope: containerRef, dependencies: options.dependencies || [] });
};

export const useFadeUp = (containerRef, selector = "[data-fade-up]", options = {}) => {
  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = containerRef.current.querySelectorAll(selector);
    gsap.from(elements, {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        ...options.scrollTrigger,
      },
    });
  }, { scope: containerRef, dependencies: options.dependencies || [] });
};

export const useParallax = (containerRef, selector, speed = 0.3) => {
  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = containerRef.current.querySelectorAll(selector);
    elements.forEach((el) => {
      gsap.to(el, {
        y: () => speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, { scope: containerRef });
};

export const useStaggerGrid = (containerRef, selector, options = {}) => {
  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = containerRef.current.querySelectorAll(selector);
    gsap.from(items, {
      y: 40,
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      stagger: { amount: 0.8, from: "start" },
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        ...options.scrollTrigger,
      },
    });
  }, { scope: containerRef, dependencies: options.dependencies || [] });
};

export const useLineReveal = (containerRef, selector = "[data-line]") => {
  useGSAP(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines = containerRef.current.querySelectorAll(selector);
    gsap.from(lines, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });
};
