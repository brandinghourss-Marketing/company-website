"use client";
import React from "react";
import Link from "next/link";
import { useContent } from "../../hooks/useContent";
import { SkeletonText } from "../UI/Skeleton";

const Collaborate = () => {
  const { content, loading } = useContent("landing", "collaborate");

  if (loading) return (
    <section className="text-center flex flex-col gap-10 items-center justify-center">
      <SkeletonText lines={3} />
      <div className="bg-gray-200 animate-pulse rounded h-12 w-48" />
    </section>
  );

  return (
    <section className="text-center flex flex-col gap-10 items-center justify-center">
      <p 
        className="text-2xl md:text-5xl"
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
      <Link 
        href={content.buttonLink || "/contact"}
        className="w-fit bg-[var(--brandColor)] text-2xl text-white px-4 py-2 rounded-md hover:underline transition-colors inline-block"
      >
        {content.buttonText}
      </Link>
    </section>
  );
};

export default Collaborate;