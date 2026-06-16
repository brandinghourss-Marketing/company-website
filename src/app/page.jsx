import LandingPage from "@/Components/Landing";
import React from "react";
import landing from "../../public/data/landing.json";
import { hreflangLanguages } from "@/lib/seo";

export const metadata = {
  alternates: {
    canonical: "https://brandinghours.com",
    languages: hreflangLanguages,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: landing.faq.questions.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer.replace(/<[^>]+>/g, ""),
    },
  })),
};

const page = () => {
  return (
    <main className="page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingPage />
    </main>
  );
};

export default page;
