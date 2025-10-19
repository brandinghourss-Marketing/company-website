"use client";
import React from "react";
import { useContent } from "../../hooks/useContent";
import { LandingSkeleton } from "../UI/Skeleton";

const Process = () => {
  const { content, loading } = useContent("about", "process");

  if (loading) return <LandingSkeleton />;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <h1 className="text-4xl col-span-1 md:col-span-2">{content.title}</h1>
      <section className="peaceful-gradient rounded-xl p-10 flex flex-col gap-4">
        <h3 className="text-4xl md:text-6xl">{content.subtitle}</h3>
      </section>
      <section className="p-5 space-y-8">
        {content.steps.map((step, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold mb-4">{step.question}</h2>
            <p className="text-lg">{step.answer}</p>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Process;
