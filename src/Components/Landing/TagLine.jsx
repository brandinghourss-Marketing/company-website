"use client";
import React from "react";
import { useContent } from "../../hooks/useContent";
import { SkeletonText } from "../UI/Skeleton";

const TagLine = () => {
  const { content, loading } = useContent("landing", "tagline");

  if (loading)
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 py-20">
        <SkeletonText lines={2} />
        <SkeletonText lines={3} />
      </section>
    );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 py-20 tagLine">
      <section>
        <p className="text-2xl">
          {content.prefix}{" "}
          <strong className="text-[var(--brandColor)]">
            {content.highlightText}
          </strong>{" "}
          {content.suffix}
        </p>
      </section>
      <section>
        <p>{content.description}</p>
      </section>
    </section>
  );
};

export default TagLine;
