import React from "react";
import Link from "next/link";

const Landing = () => {
  return (
    <section className="mt-20 relative md:grid md:grid-cols-2 gap-4">
      <section className="absolute inset-0 flex flex-col justify-center items-center gap-8 z-1 md:relative md:inset-auto md:justify-start md:items-start md:z-auto text-center md:text-left text-white md:text-black">
        <p className="text-4xl md:text-7xl font-bold md:font-normal animate-fade-in">
          Where Clicks Turn Into Clients and Your Brand Speaks Success.
        </p>
        <p className="text-3xl font-bold md:font-semibold animate-fade-in">
          From vision to value
        </p>
        <Link
          href="/contact"
          className="inline-block text-2xl underline md:no-underline hover:underline transition-colors text-white md:text-[var(--brandColor)] animate-slide-in-left"
        >
          Let's Collaborate ↗
        </Link>
      </section>
      <section className="md:block relative">
        <img src="/landing.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 md:hidden"></div>
      </section>
    </section>
  );
};

export default Landing;
