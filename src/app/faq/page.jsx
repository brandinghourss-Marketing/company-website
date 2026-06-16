import faqData from "../../../public/data/faqPage.json";
import FaqAccordion from "@/Components/FAQ/FaqAccordion";

export const metadata = {
  title: "FAQ | Digital Marketing, SEO & Paid Media Questions | Branding Hours",
  description:
    "Answers to common questions about digital marketing, SEO, paid advertising, and web development — pricing, timelines, how we measure results, and how to get started with Branding Hours.",
  alternates: {
    canonical: "https://brandinghours.com/faq",
  },
  openGraph: {
    title: "FAQ | Digital Marketing, SEO & Paid Media Questions | Branding Hours",
    description:
      "Answers to common questions about digital marketing, SEO, paid advertising, and web development with Branding Hours.",
    url: "https://brandinghours.com/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.questions.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://brandinghours.com" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://brandinghours.com/faq" },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FaqAccordion data={faqData} />
    </>
  );
}
