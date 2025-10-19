"use client";
import React from "react";
import { useContent } from "../../hooks/useContent";
import { LandingSkeleton } from "../UI/Skeleton";

const Landing = () => {
  const { content, loading } = useContent("about", "landing");

  if (loading) return <LandingSkeleton />;

  return (
    <section className="mt-20 flex flex-col gap-10 peaceful-gradient rounded-xl p-10">
      <h1 className="text-4xl md:text-7xl font-bold md:font-normal animate-fade-in">
        {content.title}
      </h1>
      <h3 className="text-3xl font-bold animate-fade-in">{content.subtitle}</h3>
      <p className="text-lg animate-fade-in">{content.description}</p>
    </section>
  );
};

export default Landing;
