import React from "react";
import Link from "next/link";

const Landing = () => {
  return (
    <section className="py-20 relative md:grid md:grid-cols-2 gap-4">
      <section className="absolute -z-1 inset-0 flex flex-col justify-center items-center gap-8 z-10 md:relative md:inset-auto md:justify-start md:items-start md:z-auto text-center md:text-left text-white md:text-black">
        <p className="text-4xl md:text-7xl">
          Where Clicks Turn Into Clients and Your Brand Speaks Success.
        </p>
        <p className="text-3xl font-semibold">From vision to value</p>
        <Link
          href="/contact"
          className="inline-block text-xl underline md:no-underline hover:underline transition-colors text-white md:text-[var(--brandColor)]"
        >
          Let's Collaborate ↗
        </Link>
      </section>
      <section className="md:block">
        <img src="/landing.png" alt="" className="w-full h-full object-cover" />
      </section>
    </section>
  );
};

export default Landing;
