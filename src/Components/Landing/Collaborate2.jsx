import React from "react";

const Collaborate2 = () => {
  return (
    <section className="grid grid-rows-[max-content_1fr] gap-4 bg-[var(--brandColor)] text-white p-10 rounded-xl">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl">Partner with the Visionaries.</h3>
          <h1 className="text-4xl">
            Join Branding Hours where ideas turn into unforgettable brands. ✨
          </h1>
        </section>
        <section className="flex flex-col gap-4">
          <p className="text-2xl">
            We live for creating magical brand experiences — from the first
            spark to the final reveal. If bold ideas, wild creativity, and a
            little chaos excite you, join the Branding Hours crew and be part of
            the magic.
          </p>
          <button className="w-fit bg-[var(--brandColor)] text-2xl text-white px-4 py-2 rounded-md hover:underline transition-colors border-1">
            Contact Us
          </button>
        </section>
      </section>
      <section className="flex items-center justify-center">
        <img src="/marketingTeam.png" alt="" />
      </section>
    </section>
  );
};

export default Collaborate2;
