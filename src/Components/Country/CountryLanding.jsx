import Link from "next/link";
import landing from "../../../public/data/landing.json";

const services = landing.services.items;

export default function CountryLanding({ data }) {
  return (
    <main className="pt-24 md:pt-28">
      {/* Hero */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label mb-4">{data.hero.label}</p>
          <h1 className="text-display-xl text-neutral-900 mb-6 leading-tight">{data.hero.title}</h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto mb-8">
            {data.hero.description}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-gradient-filled text-base group">
              Book a Free Consultation
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
            <a
              href="https://wa.me/919871741353?text=Hi%2C%20I'm%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-green-500 text-green-600 hover:bg-green-50 transition-colors text-sm font-semibold"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 pb-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-neutral-700 leading-relaxed text-center">{data.intro}</p>
        </div>
      </section>

      {/* Local points */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.localPoints.map((pt, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-sm">
              <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">{pt.title}</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">{pt.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-3">What We Do</p>
            <h2 className="text-display-md text-neutral-900">Services for {data.name} Brands</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all"
              >
                <h3 className="font-semibold text-neutral-900 text-[15px] mb-1 group-hover:text-accent-electric transition-colors">{s.title}</h3>
                <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display-md text-neutral-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-6">
            {data.faqs.map((f, i) => (
              <div key={i} className="border border-neutral-200 rounded-2xl p-6 bg-white">
                <h3 className="font-semibold text-neutral-900 text-lg mb-2">{f.question}</h3>
                <p className="text-neutral-600 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-20 md:py-28 bg-neutral-50">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <p className="section-label">Ready to grow in {data.name}?</p>
          <h2 className="text-display-lg text-neutral-900">
            Let&apos;s build something <span className="gradient-text">great together.</span>
          </h2>
          <Link href="/contact" className="btn-gradient-filled text-base group mt-2">
            Book a Free Consultation
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
