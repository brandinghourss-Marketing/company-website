"use client";
import React, { useEffect, useRef } from "react";
import { useContent } from "../../hooks/useContent";
import { SkeletonText, SkeletonTitle } from "../UI/Skeleton";

const Services = () => {
  const { content, loading } = useContent("landing", "services");

  if (loading)
    return (
      <section className="grid gap-10">
        <SkeletonTitle />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SkeletonText lines={8} />
            <div className="bg-gray-200 animate-pulse rounded h-64" />
          </div>
        ))}
      </section>
    );

  return (
    <section className="grid gap-10">
      <h1 className="text-4xl grid">
        <strong>{content.title}</strong>{" "}
        <span className="text-base">{content.subtitle}</span>
      </h1>
      {content.items.map((service, index) => (
        <Service
          key={index}
          title={service.title}
          description={service.description}
          pointers={service.pointers}
          buttonText={content.buttonText}
          image={service.image}
        />
      ))}
    </section>
  );
};

export default Services;

const Service = ({ title, description, pointers, buttonText, image }) => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl overflow-hidden">
      <section 
        ref={imageRef}
        className="flex items-center justify-center order-1 md:order-2 rounded-xl overflow-hidden scroll-slide-right"
      >
        <img src={image} alt={title} className="aspect-square h-full" />
      </section>
      <section 
        ref={textRef}
        className="flex flex-col gap-4 order-2 md:order-1 p-5 peaceful-gradient scroll-slide-left"
      >
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-xl">{description}</p>
        <hr className="border-[var(--brandColor)] border-t-5 rounded-2xl" />
        <ul>
          {pointers.map((pointer, index) => (
            <li key={index}>{pointer}</li>
          ))}
        </ul>
        <button className="w-fit bg-[var(--brandColor)] text-2xl text-white px-4 py-2 rounded-md hover:underline transition-colors">
          {buttonText}
        </button>
      </section>
    </section>
  );
};
