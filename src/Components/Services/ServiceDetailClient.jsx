"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import landingData from "../../../public/data/landing.json";

const ALL_SERVICES = landingData.services.items;

export default function ServiceDetailClient({ service }) {
  const allServices = ALL_SERVICES;
  const contactUrl = `/contact?service=${service.slug}`;

  return (
    <main className="pt-20 min-h-screen">
      <ServiceHero service={service} contactUrl={contactUrl} />
      {service.directAnswer && <ServiceDirectAnswer service={service} />}
      <ServiceFeatures service={service} />
      {service.staffAugmentation && <StaffAugmentationSection data={service.staffAugmentation} contactUrl={contactUrl} />}
      {service.process?.length > 0 && <ServiceProcess service={service} />}
      {service.industries?.length > 0 && <IndustryUseCases service={service} />}
      {service.faqs?.length > 0 && <ServiceFAQ service={service} />}
      <RelatedServices currentSlug={service.slug} />
      <ServiceCTA service={service} contactUrl={contactUrl} />
      <ServiceStickyCTA serviceName={service.title} contactUrl={contactUrl} />
    </main>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ServiceHero({ service, contactUrl }) {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const els = ["[data-hero-label]", "[data-hero-title]", "[data-hero-desc]"]
        .map(s => heroRef.current.querySelector(s)).filter(Boolean);
      const lineEl = heroRef.current.querySelector("[data-hero-line]");
      const imgEl = heroRef.current.querySelector("[data-hero-image]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      els.forEach((el, i) => tl.from(el, { y: i === 1 ? 50 : 30, opacity: 0, duration: i === 1 ? 0.8 : 0.6 }, 0.1 + i * 0.15));
      if (lineEl) tl.from(lineEl, { scaleX: 0, duration: 0.7, ease: "power3.inOut" }, 0.5);
      if (imgEl) {
        gsap.set(imgEl, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" });
        tl.to(imgEl, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1, ease: "power3.inOut" }, 0.3);
      }
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
        <div className="flex flex-col gap-5">
          <p data-hero-label className="section-label">Our Services</p>
          <h1 data-hero-title className="text-display-xl text-neutral-900">{service.title}</h1>
          <div data-hero-line className="h-[3px] w-20 rounded-full origin-left" style={{ background: "var(--gradient-accent)" }} />
          <p data-hero-desc className="text-lg text-neutral-600 leading-relaxed">{service.description}</p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Link href={contactUrl} className="btn-gradient-filled text-base group">
              Book a Free Consultation
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
            <WAButton />
          </div>
        </div>
        <div data-hero-image className="rounded-2xl shadow-xl overflow-hidden">
          <img src={service.image} alt={service.title} className="w-full object-contain" />
        </div>
      </div>
    </section>
  );
}

// ─── Direct Answer (AEO) ──────────────────────────────────────────────────────

function ServiceDirectAnswer({ service }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(ref.current.children, {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref }
  );

  return (
    <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-12 md:py-16 bg-neutral-50">
      <div ref={ref} className="max-w-4xl mx-auto">
        <p className="section-label mb-3">What is {service.title}?</p>
        <p className="text-lg text-neutral-700 leading-relaxed">{service.directAnswer}</p>
      </div>
    </section>
  );
}

// ─── Features grid ────────────────────────────────────────────────────────────

function ServiceFeatures({ service }) {
  const featRef = useRef(null);

  useGSAP(
    () => {
      if (!featRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const heading = featRef.current.querySelector("[data-feat-heading]");
      const pills = featRef.current.querySelectorAll("[data-feat-pill]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: featRef.current, start: "top 80%" } });
      if (heading) tl.from(heading, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, 0);
      if (pills.length) tl.from(pills, { scale: 0.7, opacity: 0, duration: 0.5, stagger: 0.07, ease: "back.out(2)" }, 0.2);
    },
    { scope: featRef }
  );

  return (
    <section ref={featRef} className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <h2 data-feat-heading className="text-display-md text-neutral-900 mb-10 md:mb-14 text-center">
          What&apos;s Included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {service.pointers.map((pointer, i) => (
            <div key={i} data-feat-pill className="flex items-center gap-3 bg-white border border-neutral-200 rounded-xl px-5 py-4 shadow-sm">
              <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: "var(--gradient-accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-neutral-800 font-medium">{pointer}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Staff Augmentation ───────────────────────────────────────────────────────

function StaffAugmentationSection({ data, contactUrl }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(ref.current.querySelectorAll("[data-aug-el]"), {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl p-8 md:p-12 border border-neutral-200" style={{ background: "linear-gradient(135deg, #021430 0%, #010D1F 100%)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p data-aug-el className="section-label mb-3" style={{ color: "#4F7CFF" }}>Staff Augmentation</p>
              <h2 data-aug-el className="text-display-md text-white mb-4">{data.headline}</h2>
              <p data-aug-el className="text-white/60 leading-relaxed mb-6">{data.description}</p>
              <div data-aug-el className="flex items-center gap-2 text-sm text-white/50">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {data.experience} &nbsp;·&nbsp; {data.model}
              </div>
            </div>
            <div>
              <p data-aug-el className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span key={i} data-aug-el className="px-4 py-2 rounded-full text-sm font-medium text-white border border-white/10 bg-white/5">{skill}</span>
                ))}
              </div>
              <div data-aug-el className="mt-8">
                <Link href={contactUrl} className="btn-gradient-filled text-sm group">
                  Hire a Developer
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process ─────────────────────────────────────────────────────────────────

function ServiceProcess({ service }) {
  const procRef = useRef(null);

  useGSAP(
    () => {
      if (!procRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const heading = procRef.current.querySelector("[data-proc-heading]");
      const cards = procRef.current.querySelectorAll("[data-proc-card]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: procRef.current, start: "top 80%" } });
      if (heading) tl.from(heading, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, 0);
      if (cards.length) tl.from(cards, { y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power3.out" }, 0.2);
    },
    { scope: procRef }
  );

  return (
    <section ref={procRef} className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <h2 data-proc-heading className="text-display-md text-neutral-900 mb-10 md:mb-14 text-center">
          How We Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {service.process.map((item) => (
            <div key={item.step} data-proc-card className="relative bg-white border border-neutral-200 rounded-2xl px-6 py-7 shadow-sm overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: "var(--gradient-accent)" }} />
              <span className="block text-5xl font-bold font-display gradient-text opacity-10 leading-none mb-3 select-none">{item.step}</span>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-[15px]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Industry Use Cases (GEO) ─────────────────────────────────────────────────

function IndustryUseCases({ service }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const heading = ref.current.querySelector("[data-ind-heading]");
      const cards = ref.current.querySelectorAll("[data-ind-card]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      if (heading) tl.from(heading, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, 0);
      if (cards.length) tl.from(cards, { y: 30, opacity: 0, duration: 0.5, stagger: 0.07, ease: "power3.out" }, 0.2);
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="section-label mb-3">Industries We Serve</p>
          <h2 data-ind-heading className="text-display-md text-neutral-900">
            Who Is This For?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {service.industries.map((industry, i) => (
            <div
              key={i}
              data-ind-card
              className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2 text-[15px]">{industry.name}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{industry.useCase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function ServiceFAQ({ service }) {
  const [openIndex, setOpenIndex] = useState(null);
  const faqRef = useRef(null);

  useGSAP(
    () => {
      if (!faqRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const heading = faqRef.current.querySelector("[data-faq-heading]");
      const items = faqRef.current.querySelectorAll("[data-faq-item]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: faqRef.current, start: "top 80%" } });
      if (heading) tl.from(heading, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, 0);
      if (items.length) tl.from(items, { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.2);
    },
    { scope: faqRef }
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section ref={faqRef} className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24 bg-neutral-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto">
        <h2 data-faq-heading className="text-display-md text-neutral-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col divide-y divide-neutral-200 border border-neutral-200 rounded-2xl overflow-hidden">
          {service.faqs.map((faq, i) => (
            <div key={i} data-faq-item>
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-neutral-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-neutral-900 text-[15px] leading-snug">{faq.question}</span>
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
                  style={{ background: "var(--gradient-accent)", transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 2v8M2 6h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 bg-white">
                  <p className="text-neutral-600 leading-relaxed text-[15px]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Related Services ─────────────────────────────────────────────────────────

function RelatedServices({ currentSlug }) {
  const ref = useRef(null);

  // Look up everything from the locally bundled JSON — no prop serialization risk
  const currentService = ALL_SERVICES.find((s) => s.slug === currentSlug);
  const related = (currentService?.relatedServices || [])
    .map((slug) => ALL_SERVICES.find((s) => s.slug === slug))
    .filter(Boolean);

  useGSAP(
    () => {
      if (!ref.current || !related.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const heading = ref.current.querySelector("[data-rel-heading]");
      const cards = ref.current.querySelectorAll("[data-rel-card]");
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 85%" } });
      if (heading) tl.from(heading, { y: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, 0);
      if (cards.length) tl.from(cards, { y: 30, duration: 0.5, stagger: 0.1, ease: "power3.out" }, 0.2);
    },
    { scope: ref }
  );

  if (!related.length) return null;

  return (
    <section ref={ref} className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="section-label mb-3">Keep Exploring</p>
          <h2 data-rel-heading className="text-display-md text-neutral-900">Related Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              data-rel-card
              className="group bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-neutral-300 transition-all"
            >
              <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ background: "var(--gradient-accent)" }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2 text-[15px] group-hover:text-blue-600 transition-colors">
                {s.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">{s.description}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function ServiceCTA({ service, contactUrl }) {
  const ctaRef = useRef(null);

  useGSAP(
    () => {
      if (!ctaRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(Array.from(ctaRef.current.children), {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
      });
    },
    { scope: ctaRef }
  );

  return (
    <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 py-20 md:py-28 bg-neutral-50">
      <div ref={ctaRef} className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <p className="section-label">Ready to get started?</p>
        <h2 className="text-display-lg text-neutral-900">
          Let&apos;s build something{" "}
          <span className="gradient-text">great together.</span>
        </h2>
        <p className="text-lg text-neutral-600">
          Reach out and let&apos;s discuss how we can help your brand grow with{" "}
          <strong>{service.title}</strong>.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href={contactUrl} className="btn-gradient-filled text-base group mt-2">
            Book a Free Consultation
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
          <WAButton className="mt-2" label="Chat on WhatsApp" />
        </div>
      </div>
    </section>
  );
}

// ─── Sticky CTA ───────────────────────────────────────────────────────────────

function ServiceStickyCTA({ serviceName, contactUrl }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(100%)" }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between gap-4"
        style={{ background: "rgba(2, 20, 48, 0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(79,124,255,0.2)" }}
      >
        <p className="text-white/70 text-sm hidden sm:block truncate">
          Interested in <span className="text-white font-semibold">{serviceName}</span>?
        </p>
        <div className="flex items-center gap-3 ml-auto">
          <WAButton compact />
          <Link href={contactUrl} className="btn-gradient-filled text-sm py-2 px-5">
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Shared WhatsApp button ───────────────────────────────────────────────────

function WAButton({ compact = false, label = "WhatsApp Us", className = "" }) {
  return (
    <a
      href="https://wa.me/919871741353?text=Hi%2C%20I'm%20interested%20in%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-${compact ? "4" : "5"} py-${compact ? "2" : "2.5"} rounded-full border border-green-500 text-green-${compact ? "400" : "600"} hover:bg-green-${compact ? "500/10" : "50"} transition-colors text-sm font-semibold ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      {!compact && label}
    </a>
  );
}
