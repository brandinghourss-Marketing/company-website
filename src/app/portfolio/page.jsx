import PortfolioHero from "@/Components/Portfolio/PortfolioHero";
import PortfolioGrid from "@/Components/Portfolio/PortfolioGrid";
import React from "react";

const page = () => {
  return (
    <main className="page-container">
      <PortfolioHero />
      <PortfolioGrid />
    </main>
  );
};

export default page;
