"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";

const contactInfo = [
  {
    label: "Phone",
    value: "+91 9871741353",
    href: "tel:+919871741353",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "contact@brandinghours.com",
    href: "mailto:contact@brandinghours.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Address",
    value: "Plot no 10, Ghyan Khand - 2, Shop - 3, Indirapuram, Ghaziabad, UP 201010",
    href: null,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/brandinghours_com/" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61576789070336" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/107387708/admin/dashboard/" },
  { name: "YouTube", href: "https://www.youtube.com/@Brandinghourhours" },
];

const ContactSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const infoCards = sectionRef.current.querySelectorAll("[data-info-card]");
    const socialItems = sectionRef.current.querySelectorAll("[data-social]");
    const formEls = sectionRef.current.querySelectorAll("[data-form-el]");

    // Ensure all elements are visible first (prevent stuck invisible state)
    gsap.set([...infoCards, ...socialItems, ...formEls], { opacity: 1, y: 0, x: 0, scale: 1 });

    // Info cards stagger in
    if (infoCards.length) {
      gsap.from(infoCards, {
        x: -40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }

    // Social links pop in
    if (socialItems.length) {
      gsap.from(socialItems, {
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }

    // Form elements stagger up
    if (formEls.length) {
      gsap.from(formEls, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formEls[0],
          start: "top 90%",
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-36 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-12">
        {/* Left: Contact info */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h2 className="text-display-md text-neutral-900 mb-3">Contact Info</h2>
            <p className="text-neutral-600 leading-relaxed">
              Reach out through any of these channels — we'd love to hear from you.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {contactInfo.map((item, i) => {
              const content = (
                <div
                  data-info-card
                  className="flex gap-4 items-start p-5 rounded-2xl border border-neutral-200/80 bg-white shadow-sm hover:shadow-md hover:border-accent-electric/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: "var(--gradient-accent)" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-400 tracking-widest uppercase mb-1">{item.label}</p>
                    <p className="text-neutral-900 text-sm leading-relaxed">{item.value}</p>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={i} href={item.href} className="block">{content}</a>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </div>

          {/* Social links */}
          <div>
            <p className="text-xs font-semibold text-neutral-400 tracking-widest uppercase mb-4">Follow Us</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-social
                  className="px-4 py-2 rounded-full text-sm border border-neutral-200 text-neutral-600 hover:border-accent-electric/30 hover:text-accent-electric hover:bg-accent-electric/5 transition-all duration-300"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-3">
          <div className="rounded-3xl border border-neutral-200/80 bg-white p-8 md:p-10 shadow-sm">
            <h3 data-form-el className="text-2xl font-semibold text-neutral-900 mb-2 font-display">
              Send Us a Message
            </h3>
            <p data-form-el className="text-neutral-500 mb-8">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form className="flex flex-col gap-5" method="POST" action="/mail_handler.php">
              <div data-form-el className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-300 focus:border-accent-electric focus:ring-2 focus:ring-accent-electric/10"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-300 focus:border-accent-electric focus:ring-2 focus:ring-accent-electric/10"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div data-form-el>
                <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-300 focus:border-accent-electric focus:ring-2 focus:ring-accent-electric/10"
                  placeholder="Your company name"
                />
              </div>

              <div data-form-el>
                <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 outline-none transition-all duration-300 focus:border-accent-electric focus:ring-2 focus:ring-accent-electric/10"
                >
                  <option value="">Select a service</option>
                  <option value="seo">Search Engine Optimization (SEO)</option>
                  <option value="smo">Social Media Optimization (SMO)</option>
                  <option value="paid-media">Paid Media Marketing</option>
                  <option value="web-dev">Website Development</option>
                  <option value="branding">Branding</option>
                  <option value="photography">Photography</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div data-form-el>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 outline-none transition-all duration-300 resize-vertical focus:border-accent-electric focus:ring-2 focus:ring-accent-electric/10"
                  placeholder="Tell us about your project, goals, timeline, and budget..."
                ></textarea>
              </div>

              <button
                data-form-el
                type="submit"
                className="btn-gradient-filled text-base w-full justify-center mt-2 group"
              >
                Send Message
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>

            <p data-form-el className="text-center mt-6 text-xs text-neutral-400">
              We respect your privacy. Your information will never be shared.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
