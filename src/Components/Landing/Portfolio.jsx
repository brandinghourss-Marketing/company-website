"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";
import { useFadeUp } from "../../hooks/useAnimations";

const LazyIframe = ({ src, title, gradient, initial }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-40 relative overflow-hidden"
      style={{ background: gradient }}
    >
      <span className="absolute inset-0 flex items-center justify-center text-white/20 text-6xl font-bold font-display select-none">
        {initial}
      </span>
      {isVisible && (
        <iframe
          src={src}
          title={title}
          className="absolute top-0 left-0 pointer-events-none border-0 z-10"
          style={{
            width: "1280px",
            height: "900px",
            transform: "scale(0.32)",
            transformOrigin: "top left",
          }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          tabIndex={-1}
        />
      )}
    </div>
  );
};

const cardGradients = [
  "linear-gradient(135deg, #4F7CFF 0%, #00D4FF 100%)",
  "linear-gradient(135deg, #F5A623 0%, #FF6B6B 100%)",
  "linear-gradient(135deg, #00D4FF 0%, #4F7CFF 100%)",
  "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
  "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
];

const Portfolio = () => {
  const { content, loading } = useContent("portfolio");
  const sectionRef = useRef(null);

  useFadeUp(sectionRef, "[data-fade-up]", { dependencies: [loading] });

  useGSAP(() => {
    if (!sectionRef.current || loading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = sectionRef.current.querySelectorAll("[data-project-card]");
    if (!cards.length) return;

    // Ensure all cards are visible first
    gsap.set(cards, { opacity: 1, y: 0 });

    // Animate cards in batches as they scroll into view
    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          overwrite: true,
        });
      },
      start: "top 90%",
    });
  }, { scope: sectionRef, dependencies: [loading] });

  if (loading)
    return (
      <section
        className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
        style={{ background: "linear-gradient(135deg, #021430 0%, #0A2A5E 100%)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <SkeletonTitle />
          <SkeletonText lines={2} />
        </div>
      </section>
    );

  const projects = content.projects.slice(0, 6);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
      style={{ background: "linear-gradient(135deg, #021430 0%, #0A2A5E 100%)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p data-fade-up className="section-label mb-4">Our Work</p>
          <h2 data-fade-up className="text-display-lg text-white mb-4 max-w-3xl mx-auto">
            Brands We've <span className="gradient-text">Transformed</span>
          </h2>
          <p data-fade-up className="text-lg text-white/50 max-w-xl mx-auto">
            A glimpse of the digital experiences we've crafted for our clients.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-project-card
              className="group block rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 hover:border-accent-electric/20 transition-all duration-500"
            >
              <LazyIframe
                src={project.url}
                title={project.name}
                gradient={cardGradients[i % cardGradients.length]}
                initial={project.name.charAt(0)}
              />

              {/* Content */}
              <div className="p-5">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-accent-electric/15 text-accent-cyan mb-3">
                  {project.category}
                </span>
                <h3 className="text-lg font-semibold text-white font-display mb-1.5 group-hover:text-accent-cyan transition-colors">
                  {project.name}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-3">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-electric group-hover:gap-3 transition-all duration-300">
                  Visit Site
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View all CTA */}
        <div data-fade-up className="text-center mt-14">
          <Link href="/portfolio" className="btn-gradient-border text-lg">
            View All Projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
