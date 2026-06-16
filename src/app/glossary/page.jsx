import Link from "next/link";
import glossary from "../../../public/data/glossary.json";

export const metadata = {
  title: "Digital Marketing Glossary | SEO, Paid Media & Analytics Terms | Branding Hours",
  description:
    "A plain-English glossary of digital marketing terms — SEO, AEO, GEO, PPC, ROAS, Core Web Vitals, and more. Clear definitions to help you understand modern marketing.",
  alternates: {
    canonical: "https://brandinghours.com/glossary",
  },
  openGraph: {
    title: "Digital Marketing Glossary | Branding Hours",
    description:
      "Clear, plain-English definitions of digital marketing, SEO, paid media, and analytics terms.",
    url: "https://brandinghours.com/glossary",
  },
};

const CATEGORY_ORDER = ["Search & AI", "Paid Media", "Social & Content", "Web & Analytics"];

const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Digital Marketing Glossary",
  description: glossary.description,
  url: "https://brandinghours.com/glossary",
  hasDefinedTerm: glossary.terms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
    url: `https://brandinghours.com/glossary#${t.slug}`,
    inDefinedTermSet: "https://brandinghours.com/glossary",
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://brandinghours.com" },
    { "@type": "ListItem", position: 2, name: "Glossary", item: "https://brandinghours.com/glossary" },
  ],
};

export default function GlossaryPage() {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    terms: glossary.terms.filter((t) => t.category === cat),
  })).filter((g) => g.terms.length > 0);

  return (
    <main className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="section-label mb-4">Resources</p>
          <h1 className="text-display-lg text-neutral-900 mb-5">{glossary.title}</h1>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {glossary.description}
          </p>
        </div>

        {/* Category jump nav */}
        <nav className="flex flex-wrap justify-center gap-2 mb-14" aria-label="Glossary categories">
          {byCategory.map((g) => (
            <a
              key={g.category}
              href={`#${slugifyCategory(g.category)}`}
              className="px-4 py-2 rounded-full border border-neutral-200 text-sm font-medium text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 transition-colors"
            >
              {g.category}
            </a>
          ))}
        </nav>

        {/* Term groups */}
        <div className="flex flex-col gap-16">
          {byCategory.map((g) => (
            <section key={g.category} id={slugifyCategory(g.category)} className="scroll-mt-28">
              <h2 className="text-display-md text-neutral-900 mb-8 pb-3 border-b border-neutral-200">
                {g.category}
              </h2>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {g.terms.map((t) => (
                  <div key={t.slug} id={t.slug} className="scroll-mt-28">
                    <dt className="font-semibold text-neutral-900 text-lg mb-2 flex items-start gap-2">
                      <span
                        className="mt-2 flex-shrink-0 w-2 h-2 rounded-full"
                        style={{ background: "var(--gradient-accent)" }}
                      />
                      {t.term}
                    </dt>
                    <dd className="text-neutral-600 leading-relaxed text-[15px] pl-4">
                      {t.definition}
                      {t.service && (
                        <>
                          {" "}
                          <Link
                            href={`/services/${t.service}`}
                            className="text-blue-600 font-medium hover:underline whitespace-nowrap"
                          >
                            Learn more →
                          </Link>
                        </>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center flex flex-col items-center gap-5 bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-12">
          <p className="section-label">Put these into practice</p>
          <h2 className="text-display-md text-neutral-900 max-w-xl">
            Need help turning these concepts into real growth?
          </h2>
          <Link href="/contact" className="btn-gradient-filled text-base group mt-2">
            Book a Free Consultation
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}

function slugifyCategory(cat) {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
