import { notFound } from "next/navigation";
import landing from "../../../../public/data/landing.json";
import ServiceDetailClient from "@/Components/Services/ServiceDetailClient";

const services = landing.services.items;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const metaOverrides = {
  seo: {
    title: "SEO, AEO & GEO Services | Search & AI Engine Optimization | Branding Hours",
    description: "Rank on Google, get cited by ChatGPT & Perplexity, and appear in AI-generated answers. Branding Hours delivers SEO, Answer Engine Optimization (AEO) & Generative Engine Optimization (GEO) to maximize your search visibility.",
  },
  "social-media-marketing": {
    title: "Social Media Marketing Services | Instagram, Facebook & LinkedIn | Branding Hours",
    description: "Grow your brand with strategic social media marketing — content creation, Reels, community management, and social media advertising across Instagram, Facebook, LinkedIn & more.",
  },
  "paid-media": {
    title: "Paid Media Marketing | Google Ads, Meta Ads & Performance Max | Branding Hours",
    description: "Drive qualified leads and maximize ROI with expert paid media campaigns — Google Ads, Meta Ads, Performance Max, YouTube Advertising, and remarketing campaigns managed by Branding Hours.",
  },
  "web-dev": {
    title: "Website Development | Shopify, Custom Web & Staff Augmentation | Branding Hours",
    description: "Build fast, conversion-optimized websites and e-commerce stores. Shopify development, custom Next.js websites, landing pages, and dedicated Full-Stack Developers available on a staff augmentation model.",
  },
  branding: {
    title: "Branding, Design & Brand Strategy Services | Branding Hours",
    description: "Create a powerful brand identity with Branding Hours — brand strategy, visual identity design, logo design, brand positioning, guidelines, packaging design, and brand storytelling.",
  },
  photography: {
    title: "Product Photography & Brand Photography Services | Branding Hours",
    description: "Professional product and brand photography that elevates your brand — e-commerce listings, lifestyle shoots, editing and retouching by Branding Hours.",
  },
  "hotstar-marketing": {
    title: "Hotstar Marketing & OTT Advertising | Disney+ Hotstar Ads | Branding Hours",
    description: "Reach millions on Disney+ Hotstar with targeted OTT advertising campaigns. Video ads, regional audience targeting, live sports advertising, and full performance reporting by Branding Hours.",
  },
  "influencer-marketing": {
    title: "Influencer Marketing Services | Instagram & YouTube Influencers | Branding Hours",
    description: "Scale brand awareness and conversions through creator-led campaigns. Micro and macro influencer marketing, influencer discovery, campaign strategy, and performance tracking by Branding Hours.",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const override = metaOverrides[slug];
  const title = override?.title ?? `${service.title} | Branding Hours`;
  const description = override?.description ?? service.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://brandinghours.com/services/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://brandinghours.com/services/${slug}`,
      images: [{ url: service.image, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const service = services[index];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `https://brandinghours.com/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: "Branding Hours",
      url: "https://brandinghours.com",
      telephone: "+91-9871741353",
      email: "contact@brandinghours.com",
    },
    serviceType: service.title,
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Services`,
      itemListElement: service.pointers.map((pointer, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: pointer,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}
