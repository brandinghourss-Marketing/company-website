import PortfolioHero from "@/Components/Portfolio/PortfolioHero";
import PortfolioGrid from "@/Components/Portfolio/PortfolioGrid";
import React from "react";

export const metadata = {
  title: "Portfolio | Branding Hours — Our Work & Client Results",
  description:
    "Explore the Branding Hours portfolio — branding, website development, paid media, and social media campaigns we've delivered for brands across India and beyond.",
  alternates: {
    canonical: "https://brandinghours.com/portfolio",
  },
  openGraph: {
    title: "Portfolio | Branding Hours — Our Work & Client Results",
    description:
      "Explore the Branding Hours portfolio — branding, web development, paid media, and social media campaigns we've delivered.",
    url: "https://brandinghours.com/portfolio",
  },
};

const page = () => {
  return (
    <main className="page-container">
      <PortfolioHero />
      <PortfolioGrid />
    </main>
  );
};

export default page;
