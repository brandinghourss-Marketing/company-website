import { notFound } from "next/navigation";
import Link from "next/link";
import data from "../../../../public/data/caseStudies.json";
import landing from "../../../../public/data/landing.json";

const studies = data.studies;
const serviceItems = landing.services.items;

export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = studies.find((x) => x.slug === slug);
  if (!s) return {};
  const title = `${s.client} Case Study | ${s.industry} | Branding Hours`;
  return {
    title,
    description: s.summary,
    robots: s.published ? undefined : { index: false, follow: false },
    alternates: { canonical: `https://brandinghours.com/case-studies/${slug}` },
    openGraph: {
      title,
      description: s.summary,
      url: `https://brandinghours.com/case-studies/${slug}`,
      images: [{ url: s.image, alt: s.client }],
    },
  };
}

function serviceTitle(slug) {
  return serviceItems.find((x) => x.slug === slug)?.title || slug;
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const s = studies.find((x) => x.slug === slug);
  if (!s) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://brandinghours.com" },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://brandinghours.com/case-studies" },
      { "@type": "ListItem", position: 3, name: s.client, item: `https://brandinghours.com/case-studies/${slug}` },
    ],
  };

  return (
    <main className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <article className="max-w-3xl mx-auto">
        <nav className="text-sm text-neutral-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-neutral-600">Home</Link>
          <span>/</span>
          <Link href="/case-studies" className="hover:text-neutral-600">Case Studies</Link>
        </nav>

        {!s.published && (
          <div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-amber-900 text-sm">
            <strong>Draft / template.</strong> This case study contains placeholder metrics (XX).
            Replace them with verified numbers and set <code>published: true</code> before sharing.
          </div>
        )}

        <header className="mb-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent-electric/10 text-accent-electric mb-4">
            {s.industry}
          </span>
          <h1 className="text-display-lg text-neutral-900 mb-4 leading-tight">{s.client}</h1>
          <p className="text-xl text-neutral-600 leading-relaxed">{s.summary}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {s.services.map((sv) => (
              <Link key={sv} href={`/services/${sv}`} className="px-3 py-1.5 rounded-full border border-neutral-200 text-sm text-neutral-700 hover:border-neutral-400 transition-colors">
                {serviceTitle(sv)}
              </Link>
            ))}
          </div>
        </header>

        {/* Results */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {s.results.map((r, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-bold font-display gradient-text mb-1">{r.metric}</div>
              <div className="text-sm text-neutral-500 leading-snug">{r.label}</div>
            </div>
          ))}
        </section>

        {/* Challenge */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold font-display text-neutral-900 mb-3">The Challenge</h2>
          <p className="text-neutral-700 leading-relaxed text-lg">{s.challenge}</p>
        </section>

        {/* Approach */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold font-display text-neutral-900 mb-4">Our Approach</h2>
          <ul className="space-y-3">
            {s.approach.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-neutral-700 leading-relaxed text-lg">
                <span className="mt-2 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: "var(--gradient-accent)" }} />
                {a}
              </li>
            ))}
          </ul>
        </section>

        {/* Quote */}
        {s.quote?.text && (
          <blockquote className="my-12 border-l-4 pl-6 py-2" style={{ borderColor: "var(--accent-electric, #4F7CFF)" }}>
            <p className="text-xl text-neutral-800 italic leading-relaxed mb-2">&ldquo;{s.quote.text}&rdquo;</p>
            <cite className="text-sm text-neutral-500 not-italic">— {s.quote.author}</cite>
          </blockquote>
        )}

        {/* CTA */}
        <div className="mt-14 bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-10 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold font-display text-neutral-900">Want results like these?</h2>
          <Link href="/contact" className="btn-gradient-filled text-base group mt-2">
            Start Your Project
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </article>
    </main>
  );
}
