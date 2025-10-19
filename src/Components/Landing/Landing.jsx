"use client";
import React from "react";
import Link from "next/link";
import { useContent } from "../../hooks/useContent";
import { LandingSkeleton } from "../UI/Skeleton";

const Landing = () => {
  const { content, loading } = useContent("landing", "hero");

  if (loading) return <LandingSkeleton />;

  return (
    <section className="mt-20 relative md:grid md:grid-cols-2 gap-4 peaceful-gradient rounded-xl">
      <section className="absolute inset-0 p-5 flex flex-col justify-center items-center gap-8 z-1 md:relative md:inset-auto md:justify-start md:items-start md:z-auto text-center md:text-left text-white md:text-black">
        <p className="text-4xl md:text-7xl font-bold md:font-normal animate-fade-in">
          {content.title}
        </p>
        <p className="text-3xl font-bold md:font-semibold animate-fade-in">
          {content.subtitle}
        </p>
        <Link
          href={content.buttonLink}
          className="inline-block text-2xl underline md:no-underline hover:underline transition-colors text-white md:text-[var(--brandColor)] animate-slide-in-left"
        >
          {content.buttonText}
        </Link>
      </section>
      <section className="md:block relative h-96 md:h-auto">
        <img src={content.image} alt={content.imageAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 md:hidden"></div>
      </section>
    </section>
  );
};

export default Landing;
