"use client";
import React from "react";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";

const Collaborate2 = () => {
  const { content, loading } = useContent("landing", "collaborate2");

  if (loading) return (
    <section className="grid grid-rows-[max-content_1fr] gap-4 bg-[var(--brandColor)] text-white p-10 rounded-xl">
      <section className="grid grid-cols-1 md:grid-cols-[1fr_max-content_1fr] gap-8 md:gap-20">
        <section className="flex flex-col gap-4">
          <SkeletonText lines={1} />
          <SkeletonTitle />
        </section>
        <hr className="h-full border-r-1" />
        <section className="flex flex-col gap-4">
          <SkeletonText lines={4} />
          <div className="bg-gray-200 animate-pulse rounded h-12 w-32" />
        </section>
      </section>
      <section className="flex items-center justify-center border-t-1">
        <div className="bg-gray-200 animate-pulse rounded h-48 w-full" />
      </section>
    </section>
  );

  return (
    <section className="grid grid-rows-[max-content_1fr] gap-4 bg-[var(--brandColor)] text-white p-10 rounded-xl">
      <section className="grid grid-cols-1 md:grid-cols-[1fr_max-content_1fr] gap-8 md:gap-20">
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl">{content.subtitle}</h3>
          <h1 
            className="text-4xl"
            dangerouslySetInnerHTML={{ __html: content.title }}
          />
        </section>
        <hr className="h-full border-r-1" />
        <section className="flex flex-col gap-4">
          <p 
            className="text-2xl"
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
          <button className="w-fit bg-[var(--brandColor)] text-2xl text-white px-4 py-2 rounded-md hover:underline transition-colors border-1">
            {content.buttonText}
          </button>
        </section>
      </section>
      <section className="flex items-center justify-center border-t-1">
        <img src={content.image} alt={content.imageAlt} />
      </section>
    </section>
  );
};

export default Collaborate2;