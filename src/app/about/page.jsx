import Landing from "@/Components/About/Landing";
import Process from "@/Components/About/Process";
import Vision from "@/Components/About/Vision";
import React from "react";

export const metadata = {
  title: "About Branding Hours | Digital Marketing & Branding Agency",
  description:
    "Meet Branding Hours — a full-service digital growth agency in India. Learn about our vision, our process, and how we help brands grow with SEO, paid media, web development, and branding.",
  alternates: {
    canonical: "https://brandinghours.com/about",
  },
  openGraph: {
    title: "About Branding Hours | Digital Marketing & Branding Agency",
    description:
      "Meet Branding Hours — a full-service digital growth agency in India. Our vision, our process, and how we help brands grow.",
    url: "https://brandinghours.com/about",
  },
};

const page = () => {
  return (
    <main className="page-container">
      <Landing />
      <Process />
      <Vision />
    </main>
  );
};

export default page;
