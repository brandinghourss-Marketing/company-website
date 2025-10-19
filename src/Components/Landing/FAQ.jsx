import React from "react";
const faqArr = [
  {
    question: "What happens when your brand gets the Branding Hours touch?",
    answer:
      " It transforms — from ordinary to unforgettable. #BrandedByBrandingHours isn’t just a tagline; it’s the standard of creative excellence your business deserves.",
  },
  {
    question:
      "What Happens Behind the Scenes When You Work with Branding Hours?",
    answer:
      "When you work with Branding Hours, our creative team dives deep into understanding your brand, audience, and goals. Behind the scenes, we craft unique strategies, stunning designs, and powerful stories to make your brand stand out and shine online.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "At Branding Hours, our pricing is flexible and value-driven. We tailor each package based on your brand’s goals, scope, and vision—whether it’s a full rebrand, logo design, or digital strategy. Every project is custom-built to deliver maximum impact without compromise. 💡 #BrandStrategy #CreativeAgency #CustomBranding",
  },
  {
    question: "What types of industries does Branding Hours work with?",
    answer:
      "From startups and tech innovators to lifestyle, fashion, and hospitality brands—Branding Hours partners with visionaries across industries. Our versatile team adapts to your niche, ensuring your brand voice connects with the right audience, wherever you are. 🚀 #DigitalBranding #IndustryExperts #CreativeDesign",
  },
  {
    question: "Why Branding Hours vs anyone else?",
    answer:
      "Because we don’t just design—we build stories that inspire. At Branding Hours, creativity meets strategy to create brands that not only look good but also work smart. Our unique blend of innovation, storytelling, and design thinking makes your brand unforgettable. ✨ #BrandExperience #CreativeInnovation #DesignThinking",
  },
];
const FAQ = () => {
  return (
    <section className="rounded-xl grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 border-1 ">
      <section className="p-4 flex flex-col gap-4 md:border-r-1 bg-[var(--brandColor)]/10">
        <h1>
          <p className="text-4xl">
            FAQ<span className="text-lg">s</span>
          </p>
          <p>Frequently Asked Questions</p>
        </h1>
        <p className="text-lg">
          Here are some of our FAQs. If you have any other questions you’d like
          answered please feel free to email us.
        </p>
      </section>
      <section className="p-10 grid gap-6">
        {faqArr.map((faq, index) => {
          return (
            <details key={index} className="border-b-1 py-4 transition-all">
              <summary className="text-xl cursor-pointer hover:text-[var(--brandColor)] transition-colors">
                {faq.question}
              </summary>
              <p className="text-lg mt-2 pl-4">{faq.answer}</p>
            </details>
          );
        })}
      </section>
    </section>
  );
};

export default FAQ;
