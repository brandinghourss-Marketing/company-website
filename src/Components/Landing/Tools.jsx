import React from "react";
const toolsArr = [
  {
    icon: "adobe-2048x506.webp",
  },
  {
    icon: "semrush.png",
  },
  {
    icon: "blender-logo-2048x555.webp",
  },
  {
    icon: "wix-studio-1-1-2048x341.png",
  },
  {
    icon: "unreal-logo-2048x545.webp",
  },
  {
    icon: "figma_logo_white.svg",
  },
  {
    icon: "webflow-2048x364.webp",
  },
  {
    icon: "shopify-2048x597.webp",
  },
  {
    icon: "wordpress-logo-2048x423.webp",
  },
];
const Tools = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section className="grid grid-cols-3 gap-3 order-2 md:order-1">
        {toolsArr.map((item, index) => (
          <div
            key={index}
            className="p-2 sm:p-4 md:p-6 lg:p-10 bg-[var(--brandColor)] border-1 border-gray-200 rounded-xl flex items-center justify-center"
          >
            <img src={`/${item.icon}`} alt="" />
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-5 md:px-[50px_0px] justify-center order-1 md:order-2">
        <h3 className="text-2xl">TOOLS WE USE</h3>
        <h1 className="text-4xl">
          Tools That Don’t Just Build Brands — They Build Legacies.
        </h1>
        <p className="text-lg">
          At Branding Hours, every tool in our kit is chosen with purpose — to
          turn bold ideas into powerful brands that lead, inspire, and perform
        </p>
      </section>
    </section>
  );
};

export default Tools;
