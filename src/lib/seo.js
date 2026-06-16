// Shared SEO helpers

import countries from "../../public/data/countries.json";

export const BASE_URL = "https://brandinghours.com";

// hreflang map for the 5-country strategy.
// India is the primary/default market; the four country pages are localized landings.
export const hreflangLanguages = {
  "en-IN": `${BASE_URL}`,
  "en-US": `${BASE_URL}/us`,
  "en-GB": `${BASE_URL}/uk`,
  "en-CA": `${BASE_URL}/ca`,
  "en-AU": `${BASE_URL}/au`,
  "x-default": `${BASE_URL}`,
};

export function getCountry(code) {
  return countries[code];
}

export function countryMetadata(code) {
  const c = countries[code];
  const url = `${BASE_URL}/${code}`;
  const title = `${c.hero.label} | Branding Hours`;
  const description = c.hero.description;
  return {
    title,
    description,
    alternates: { canonical: url, languages: hreflangLanguages },
    openGraph: { title, description, url, locale: hreflangLocale(code) },
  };
}

function hreflangLocale(code) {
  return { us: "en_US", uk: "en_GB", ca: "en_CA", au: "en_AU" }[code] || "en_US";
}

export function countrySchemas(code) {
  const c = countries[code];
  const url = `${BASE_URL}/${code}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${url}#localbusiness`,
      name: "Branding Hours",
      url,
      image: `${BASE_URL}/assets/common/logo6.png`,
      telephone: "+91-9871741353",
      email: "contact@brandinghours.com",
      priceRange: "$$",
      description: c.intro,
      areaServed: { "@type": "Country", name: c.name },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot no 10, Ghyan khand - 2, Shop - 3, Indirapuram",
        addressLocality: "Ghaziabad",
        addressRegion: "Uttar Pradesh",
        postalCode: "201010",
        addressCountry: "IN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: c.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
}
