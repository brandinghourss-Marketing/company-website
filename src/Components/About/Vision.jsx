"use client";
import React from "react";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";

const Vision = () => {
  const { content, loading } = useContent("about", "vision");

  if (loading)
    return (
      <section className="grid gap-10">
        <SkeletonTitle />
        <SkeletonText lines={7} />
      </section>
    );

  return (
    <section className="grid gap-10">
      <h1 className="text-5xl font-semibold text-center">{content.title}</h1>
      <div className="space-y-4 text-xl text-center max-w-4xl mx-auto">
        {content.content.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      <h3 className="text-center text-2xl font-semibold ">
        {content.callToAction.subtitle}
      </h3>
      <section className="text-center">
        <button className="bg-[var(--brandColor)] text-2xl text-white px-4 py-2 rounded-md hover:underline transition-colors">
          {content.callToAction.buttonText}
        </button>
      </section>
    </section>
  );
};

export default Vision;