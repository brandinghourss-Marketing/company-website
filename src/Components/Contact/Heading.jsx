import React from "react";

const Heading = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
      <h1 className="text-4xl">
        What's Your <span className="underline">Vision?</span>
      </h1>
      <p className="text-2xl">
        Give us the background—we'll handle the blueprint.
      </p>
    </section>
  );
};

export default Heading;
