import ContactHero from "@/Components/Contact/ContactHero";
import ContactSection from "@/Components/Contact/ContactSection";
import React from "react";

export const metadata = {
  title: "Contact Branding Hours | Get a Free Marketing Consultation",
  description:
    "Get in touch with Branding Hours for SEO, Google Ads, Meta Ads, social media, and website development. Request a free consultation — email contact@brandinghours.com or call +91 9871741353.",
  alternates: {
    canonical: "https://brandinghours.com/contact",
  },
  openGraph: {
    title: "Contact Branding Hours | Get a Free Marketing Consultation",
    description:
      "Get in touch with Branding Hours for SEO, paid media, social media, and website development. Request a free consultation.",
    url: "https://brandinghours.com/contact",
  },
};

const page = () => {
  return (
    <main className="page-container">
      <ContactHero />
      <ContactSection />
    </main>
  );
};

export default page;
