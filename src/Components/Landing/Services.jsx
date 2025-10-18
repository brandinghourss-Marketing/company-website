import React from "react";
const servicesArr = [
  {
    Title: "Search Engine Optimization (SEO)",
    Description:
      "Boost your visibility, attract organic traffic, and rank higher on search engines with smart SEO strategies.",
    Pointers: [
      "Keyword Optimization",
      "On-Page SEO",
      "Technical SEO",
      "Backlink Building",
      "Competitor Analysis",
      "Content Strategy",
    ],
    Button: "Let's Collaborate",
    link: "/seo.png",
  },
  {
    Title: "Social Media Optimization (SMO)",
    Description:
      "Turn social engagement into business growth with a strong, consistent, and optimized social presence.",
    Pointers: [
      "Profile & Page Optimization",
      "Content Calendar & Strategy",
      "Visual Branding",
      "Community Management",
      "Performance Tracking",
      "Hashtag & Trend Optimization",
    ],
    Button: "Let's Collaborate",
    link: "/smo.png",
  },
  {
    Title: "Paid Media Marketing / Lead Generation",
    Description:
      "Reach your audience faster and generate quality leads with targeted paid campaigns across platforms.",
    Pointers: [
      "PPC Campaigns",
      "Social Media Ads",
      "Display & Retargeting Ads",
      "Audience Targeting & Segmentation",
      "Lead Capture & Nurturing",
      "Performance Tracking & Optimization",
    ],
    Button: "Let's Collaborate",
    link: "/paid-media.png",
  },
  {
    Title: "Website Development / UI & UX",
    Description:
      "Build fast, intuitive, and visually stunning websites that drive engagement and conversions.",
    Pointers: [
      "Custom Website Design",
      "Responsive Development",
      "User Experience (UX) Design",
      "User Interface (UI) Design",
      "E-commerce / Web App Integration",
      "Website Maintenance & Optimization",
    ],
    Button: "Let's Collaborate",
    link: "/web-dev.png",
  },
  {
    Title: "Branding",
    Description:
      "Create a strong, memorable brand identity that resonates with your audience and builds trust.",
    Pointers: [
      "Brand Strategy",
      "Logo Design & Visual Identity",
      "Brand Guidelines",
      "Messaging & Tone of Voice",
      "Rebranding",
      "Brand Collateral Design",
    ],
    Button: "Let's Collaborate",
    link: "/branding.png",
  },
  {
    Title: "Photography / Product Shoot",
    Description:
      "Showcase your products and brand story with high-quality, professional photography.",
    Pointers: [
      "Product Photography",
      "Brand Photography",
      "Editing & Retouching",
      "Lifestyle / Context Shots",
      "Event / Campaign Photography",
      "Content Optimization",
    ],
    Button: "Let's Collaborate",
    link: "/photography.png",
  },
];
const Services = () => {
  return (
    <section className="py-20 grid gap-10">
      <h1 className="text-4xl grid">
        <strong>Services</strong>{" "}
        <span className="text-base">To help you grow</span>
      </h1>
      {servicesArr.map((el, index) => {
        return (
          <Service
            key={index}
            Title={el.Title}
            Description={el.Description}
            Pointers={el.Pointers}
            Button={el.Button}
            link={el.link}
          />
        );
      })}
    </section>
  );
};

export default Services;

const Service = ({ Title, Description, Pointers, link }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-10 border-1 rounded-2xl">
      <section className="flex items-center justify-center order-1 md:order-2">
        <img src={link} alt={Title} className="aspect-square w-100" />
      </section>
      <section className="flex flex-col gap-4 order-2 md:order-1">
        <h1 className="text-3xl font-bold">{Title}</h1>
        <p className="text-xl">{Description}</p>
        <hr className="border-[var(--brandColor)] border-t-5 rounded-2xl" />
        <ul>
          {Pointers.map((pointer, index) => (
            <li key={index}>{pointer}</li>
          ))}
        </ul>
        <button className="w-fit bg-[var(--brandColor)] text-2xl text-white px-4 py-2 rounded-md hover:underline transition-colors">
          Let's Collaborate!
        </button>
      </section>
    </section>
  );
};
