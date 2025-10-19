"use client";
import React from "react";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";

const FAQ = () => {
  const { content, loading } = useContent("landing", "faq");

  if (loading) return (
    <section className="rounded-xl grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 border-1 overflow-hidden">
      <section className="p-5 flex flex-col gap-4 peaceful-gradient">
        <SkeletonTitle />
        <SkeletonText lines={3} />
      </section>
      <section className="p-10 grid gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b-1 py-4">
            <SkeletonText lines={2} />
          </div>
        ))}
      </section>
    </section>
  );

  return (
    <section className="rounded-xl grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 border-1 overflow-hidden">
      <section className="p-5 flex flex-col gap-4 peaceful-gradient">
        <h1>
          <p 
            className="text-4xl"
            dangerouslySetInnerHTML={{ __html: content.title }}
          />
          <p>{content.subtitle}</p>
        </h1>
        <p className="text-lg">{content.description}</p>
      </section>
      <section className="p-10 grid gap-6">
        {content.questions.map((faq, index) => (
          <details key={index} className="border-b-1 py-4 transition-all">
            <summary className="text-xl cursor-pointer hover:text-[var(--brandColor)] transition-colors">
              {faq.question}
            </summary>
            <p 
              className="text-lg mt-2 pl-4"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </details>
        ))}
      </section>
    </section>
  );
};

export default FAQ;