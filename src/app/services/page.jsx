import Services from "@/Components/Landing/Services";
import ServicesHero from "@/Components/Services/ServicesHero";
import React from "react";

const page = () => {
  return (
    <main className="page-container">
      <ServicesHero />
      <Services variant="standalone" />
    </main>
  );
};

export default page;
