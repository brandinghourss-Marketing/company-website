"use client";
import React, { useEffect, useRef } from "react";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";

const Tools = () => {
  const { content, loading } = useContent("landing", "tools");
  const iconsRef = useRef([]);

  useEffect(() => {
    if (!content) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, index * 100);
          }
        });
      },
      { threshold: 0.2 }
    );

    iconsRef.current.forEach((icon) => {
      if (icon) observer.observe(icon);
    });

    return () => observer.disconnect();
  }, [content]);

  if (loading) return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section className="grid grid-cols-3 gap-3 order-2 md:order-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-20" />
        ))}
      </section>
      <section className="flex flex-col gap-5 justify-center order-1 md:order-2">
        <SkeletonText lines={1} />
        <SkeletonTitle />
        <SkeletonText lines={3} />
      </section>
    </section>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section className="grid grid-cols-3 gap-3 order-2 md:order-1">
        {content.icons.map((icon, index) => (
          <div
            key={index}
            ref={(el) => (iconsRef.current[index] = el)}
            data-index={index}
            className="p-2 sm:p-4 md:p-6 lg:p-10 bg-[var(--brandColor)] border-1 border-gray-200 rounded-xl flex items-center justify-center bubble-up"
          >
            <img src={icon} alt="" />
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-5 md:px-[50px_0px] justify-center order-1 md:order-2">
        <h3 className="text-2xl">{content.subtitle}</h3>
        <h1 className="text-4xl">{content.title}</h1>
        <p 
          className="text-lg"
          dangerouslySetInnerHTML={{ __html: content.description }}
        />
      </section>
    </section>
  );
};

export default Tools;