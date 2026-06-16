import Link from "next/link";
import data from "../../../public/data/caseStudies.json";

export const metadata = {
  title: "Case Studies | Client Results & Success Stories | Branding Hours",
  description:
    "See how Branding Hours helps brands grow — real challenges, strategies, and measurable results across SEO, paid media, branding, and web development.",
  alternates: {
    canonical: "https://brandinghours.com/case-studies",
  },
  openGraph: {
    title: "Case Studies | Branding Hours",
    description: "Real challenges, strategies, and measurable results from Branding Hours clients.",
    url: "https://brandinghours.com/case-studies",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://brandinghours.com" },
    { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://brandinghours.com/case-studies" },
  ],
};

export default function CaseStudiesPage() {
  const studies = data.studies.filter((s) => s.published);

  return (
    <main className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <p className="section-label mb-4">{data.hero.label}</p>
          <h1 className="text-display-lg text-neutral-900 mb-5">{data.hero.title}</h1>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {data.hero.description}
          </p>
        </div>

        {studies.length === 0 ? (
          <div className="max-w-xl mx-auto text-center bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-14 flex flex-col items-center gap-5">
            <h2 className="text-2xl font-semibold font-display text-neutral-900">Case studies coming soon</h2>
            <p className="text-neutral-600">
              We&apos;re putting together detailed stories of the results we&apos;ve delivered. In the
              meantime, explore our work or get in touch to discuss your project.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/portfolio" className="btn-gradient-filled text-base">View Our Portfolio</Link>
              <Link href="/contact" className="inline-flex items-center px-5 py-2.5 rounded-full border border-neutral-300 text-neutral-700 hover:border-neutral-500 transition-colors text-sm font-semibold">
                Contact Us
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studies.map((s) => (
              <Link
                key={s.slug}
                href={`/case-studies/${s.slug}`}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-neutral-300 transition-all"
              >
                <div className="h-48 overflow-hidden bg-neutral-100 flex items-center justify-center">
                  <img src={s.image} alt={s.client} className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <span className="inline-block w-fit px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent-electric/10 text-accent-electric mb-3">
                    {s.industry}
                  </span>
                  <h2 className="text-xl font-semibold text-neutral-900 font-display mb-2 group-hover:text-accent-electric transition-colors">
                    {s.client}
                  </h2>
                  <p className="text-neutral-500 text-sm leading-relaxed">{s.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
