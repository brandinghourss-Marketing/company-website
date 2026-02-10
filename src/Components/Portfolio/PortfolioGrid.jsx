"use client";
import React, { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";

const cardGradients = [
  "linear-gradient(135deg, #4F7CFF 0%, #00D4FF 100%)",
  "linear-gradient(135deg, #F5A623 0%, #FF6B6B 100%)",
  "linear-gradient(135deg, #00D4FF 0%, #4F7CFF 100%)",
  "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
  "linear-gradient(135deg, #10B981 0%, #059669 100%)",
  "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
  "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
  "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
  "linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)",
  "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
];

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
      className="h-56 relative overflow-hidden"
      style={{ background: gradient }}
    >
      {/* Gradient placeholder with initial */}
      <span className="absolute inset-0 flex items-center justify-center text-white/20 text-8xl font-bold font-display select-none">
        {initial}
      </span>
      {/* Iframe only mounts when in viewport */}
      {isVisible && (
        <iframe
          src={src}
          title={title}
          className="absolute top-0 left-0 pointer-events-none border-0 z-10"
          style={{
            width: "1280px",
            height: "900px",
            transform: "scale(0.44)",
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

const PortfolioGrid = () => {
  const { content, loading } = useContent("portfolio");
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || loading) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = sectionRef.current.querySelectorAll("[data-card]");
    if (!cards.length) return;

    gsap.set(cards, { opacity: 1, y: 0 });

    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        gsap.from(batch, {
          y: 50,
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
      <section className="py-20 md:py-28 lg:py-36 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
        <div className="max-w-6xl mx-auto">
          <SkeletonTitle />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-neutral-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );

  const projects = content.projects;

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-36 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-card
              className="group block rounded-2xl border border-neutral-200/80 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-accent-electric/20 transition-all duration-500"
            >
              <LazyIframe
                src={project.url}
                title={project.name}
                gradient={cardGradients[i % cardGradients.length]}
                initial={project.name.charAt(0)}
              />

              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent-electric/10 text-accent-electric mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold text-neutral-900 font-display mb-2 group-hover:text-accent-electric transition-colors">
                  {project.name}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-electric group-hover:gap-3 transition-all duration-300">
                  Visit Site
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
