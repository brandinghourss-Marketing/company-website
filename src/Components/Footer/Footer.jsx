"use client";
import Link from "next/link";
import React from "react";

const navLinks = [
  { name: "About us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/brandinghours_com/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61576789070336",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/107387708/admin/dashboard/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Brandinghourhours",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
        <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" fill="white" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #021430 0%, #010D1F 100%)" }}
    >
      {/* Top gradient line */}
      <div className="h-[2px] w-full" style={{ background: "var(--gradient-accent)" }} />

      {/* Main footer content */}
      <div className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 pt-16 pb-8">
        {/* Top section: 3-column grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Column 1: Brand + Nav */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="w-fit">
              <img src="/assets/common/logo2.png" alt="Branding Hours" className="h-14 object-contain" />
            </Link>

            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Transforming brands through creative strategy, bold design, and digital innovation.
            </p>

            <nav>
              <ul className="flex flex-col gap-3">
                {navLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors relative group inline-block"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-accent-electric transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 2: Address */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold text-white/60 tracking-widest uppercase">Find Us</h4>
            <address className="not-italic text-sm text-white/40 leading-relaxed">
              <p>Branding Hours</p>
              <p>Plot no 10, Ghyan khand - 2, Shop - 3</p>
              <p>Indirapuram, Ghaziabad</p>
              <p>Uttar Pradesh 201010</p>
              <p className="mt-1">India</p>
            </address>
          </div>

          {/* Column 3: Contact + Social */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-semibold text-white/60 tracking-widest uppercase">Get In Touch</h4>

            <div className="flex flex-col gap-3">
              <a
                href="tel:+919871741353"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 text-accent-electric" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +91 9871741353
              </a>
              <a
                href="mailto:contact@brandinghours.com"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 text-accent-electric" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                contact@brandinghours.com
              </a>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="footer-social-icon"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto h-px bg-white/[0.06] mb-8" />

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-white/50 transition-colors">
              Branding Hours
            </Link>
            . All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Strategy &middot; Design &middot; Growth
          </p>
        </div>
      </div>

      {/* Decorative subtle ring */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full border border-accent-electric/[0.04] pointer-events-none" />
    </footer>
  );
};

export default Footer;
