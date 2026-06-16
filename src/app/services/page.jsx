import Services from "@/Components/Landing/Services";
import ServicesHero from "@/Components/Services/ServicesHero";
import React from "react";

export const metadata = {
  title: "Our Services | SEO, Paid Media, Web Development & Branding | Branding Hours",
  description:
    "Explore Branding Hours' full range of digital growth services — SEO, AEO & GEO, social media marketing, Google & Meta Ads, website development, branding, photography, Hotstar marketing, and influencer marketing.",
  alternates: {
    canonical: "https://brandinghours.com/services",
  },
  openGraph: {
    title: "Our Services | SEO, Paid Media, Web Development & Branding | Branding Hours",
    description:
      "Explore Branding Hours' full range of digital growth services — SEO, social media, paid media, web development, branding, and more.",
    url: "https://brandinghours.com/services",
  },
};

const page = () => {
  return (
    <main className="page-container">
      <ServicesHero />
      <Services variant="standalone" />
    </main>
  );
};

export default page;
