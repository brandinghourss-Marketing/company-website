"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const tabs = [
  { name: "About us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  // Scroll-aware header behavior
  useGSAP(
    () => {
      if (!headerRef.current) return;

      // Kill any lingering tweens on the header from previous route
      gsap.killTweensOf(headerRef.current);

      // On other pages: always solid
      if (!isHomepage) {
        gsap.set(headerRef.current, {
          backgroundColor: "rgba(2, 20, 48, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottomColor: "rgba(79, 124, 255, 0.15)",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
        });
        return;
      }

      // On homepage: transparent -> solid on scroll
      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          const scrolled = self.scroll() > 80;
          gsap.to(headerRef.current, {
            backgroundColor: scrolled ? "rgba(2, 20, 48, 0.95)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
            paddingTop: scrolled ? "0.75rem" : "1.25rem",
            paddingBottom: scrolled ? "0.75rem" : "1.25rem",
            borderBottomColor: scrolled
              ? "rgba(79, 124, 255, 0.15)"
              : "transparent",
            duration: 0.3,
            overwrite: true,
          });
        },
      });
    },
    { scope: headerRef, dependencies: [isHomepage] },
  );

  // Header entrance animation
  useGSAP(
    () => {
      if (!headerRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const logo = headerRef.current.querySelector("[data-header-logo]");
      const navLinks = headerRef.current.querySelectorAll("[data-nav-link]");
      const cta = headerRef.current.querySelector("[data-header-cta]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(logo, { y: -20, opacity: 0, duration: 0.6 }, 0.2);
      tl.from(
        navLinks,
        { y: -15, opacity: 0, duration: 0.5, stagger: 0.08 },
        0.35,
      );
      tl.from(cta, { y: -15, opacity: 0, duration: 0.5 }, 0.55);
    },
    { scope: headerRef },
  );

  // Mobile menu open/close
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    document.body.style.overflow = "hidden";
    gsap.fromTo(
      menuRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
    gsap.fromTo(
      menuItemsRef.current.filter(Boolean),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      },
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    if (!menuRef.current) {
      setIsMenuOpen(false);
      return;
    }
    gsap.to(menuRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setIsMenuOpen(false),
    });
  };

  // Magnetic hover for desktop nav
  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(e.currentTarget, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex justify-between items-center border-b border-transparent"
        style={{
          backgroundColor: isHomepage ? "transparent" : "rgba(2, 20, 48, 0.95)",
          paddingTop: isHomepage ? "1.25rem" : "0.75rem",
          paddingBottom: isHomepage ? "1.25rem" : "0.75rem",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          data-header-logo
          className="flex gap-3 items-center group"
        >
          <img
            src="/assets/common/logo6.png"
            alt="Branding Hours"
            className="h-8 md:h-12 object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex gap-1">
            {tabs.map((tab, index) => (
              <li key={index}>
                <Link
                  href={tab.href}
                  data-nav-link
                  className="nav-link relative px-5 py-2 text-[15px] font-medium text-white/70 hover:text-white transition-colors inline-block"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                >
                  {tab.name}
                  <span className="nav-link-underline absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-accent-electric transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div data-header-cta className="hidden lg:block">
          <Link
            href="/contact"
            className="header-cta-btn relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white rounded-full overflow-hidden transition-all duration-300"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
          >
            <span className="relative z-10">Let&apos;s Collaborate</span>
            <svg
              className="relative z-10 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col items-end gap-[5px] p-2 group"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <span className="w-6 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-6" />
          <span className="w-5 h-[2px] bg-white/70 rounded-full transition-all duration-300 group-hover:w-6" />
          <span className="w-4 h-[2px] bg-white/50 rounded-full transition-all duration-300 group-hover:w-6" />
        </button>
      </header>

      {/* Full-screen mobile menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: "rgba(2, 20, 48, 0.98)", opacity: 0 }}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Menu items */}
          <nav className="flex flex-col items-center gap-6">
            <Link
              href="/"
              ref={(el) => (menuItemsRef.current[0] = el)}
              className="text-display-md text-white/70 hover:text-white transition-colors relative group"
              onClick={closeMenu}
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-electric transition-all duration-300 group-hover:w-full" />
            </Link>
            {tabs.map((tab, index) => (
              <Link
                key={index}
                href={tab.href}
                ref={(el) => (menuItemsRef.current[index + 1] = el)}
                className="text-display-md text-white/70 hover:text-white transition-colors relative group"
                onClick={closeMenu}
              >
                {tab.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-electric transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <div
              ref={(el) => (menuItemsRef.current[tabs.length + 1] = el)}
              className="mt-6"
            >
              <Link
                href="/contact"
                className="btn-gradient-filled text-lg px-10"
                onClick={closeMenu}
              >
                Let&apos;s Collaborate
                <svg
                  className="w-5 h-5 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
          </nav>

          {/* Bottom contact info in mobile menu */}
          <div
            ref={(el) => (menuItemsRef.current[tabs.length + 2] = el)}
            className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30 text-sm"
          >
            <a
              href="mailto:contact@brandinghours.com"
              className="hover:text-white/60 transition-colors"
            >
              contact@brandinghours.com
            </a>
            <a
              href="tel:+919871741353"
              className="hover:text-white/60 transition-colors"
            >
              +91 9871741353
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
