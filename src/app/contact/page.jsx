import ContactHero from "@/Components/Contact/ContactHero";
import ContactSection from "@/Components/Contact/ContactSection";
import React from "react";

const page = () => {
  return (
    <main className="page-container">
      <ContactHero />
      <ContactSection />
    </main>
  );
};

export default page;
