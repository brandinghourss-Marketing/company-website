import React from "react";
import style from "./style.css";

const TagLine = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 py-20 tagLine">
      <section>
        <p className="text-2xl">
          From{" "}
          <strong className="text-[var(--brandColor)]">
            Vision to Victory
          </strong>{" "}
          — We Make Big Ideas Happen.
        </p>
      </section>
      <section>
        <p>
          We Partner with Visionary Founders and Bold Companies, Turning Big
          Dreams into Reality — Across Every Connected Corner of Product and
          Marketing.
        </p>
      </section>
    </section>
  );
};

export default TagLine;
