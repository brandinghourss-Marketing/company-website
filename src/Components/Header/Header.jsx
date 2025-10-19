"use client";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "../Modal/Modal";
const tabs = [
  { name: "About us", href: "/about" },
  // { name: "Our Work", href: "/work" },
  { name: "Services", href: "/services" },
  // { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="p-4 px-2 sm:px-4 md:px-12 lg:px-20 xl:px-50 shadow-lg flex justify-between items-center sticky top-0 z-2 bg-[var(--background)]">
      <section>
        <Link href="/" className="flex gap-2 items-center justify-between">
          <img src="/assets/common/logo.png" alt="" className="w-[32px]" />
          <p className="whitespace-nowrap grid">
            <span className="text-xl font-semibold">Branding Hours</span>
            <span className="text-xs">Strategy | Time | Innovate</span>
          </p>
        </Link>
      </section>
      <section className="hidden lg:block">
        <nav>
          <ul className="flex gap-10 text-xl">
            {tabs.map((tab, index) => (
              <li key={index}>
                <Link
                  href={tab.href}
                  className="hover:text-gray-600 hover:underline transition-all"
                >
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section className="hidden lg:block">
        <button className="bg-[var(--brandColor)] text-2xl text-white px-4 py-2 rounded-md hover:underline transition-colors">
          Let's Collaborate!
        </button>
      </section>
      <section className="lg:hidden">
        <button
          className="flex flex-col items-end gap-1.5"
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-5 h-0.5 bg-black"></span>
          <span className="w-4 h-0.5 bg-black"></span>
        </button>
      </section>

      <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <section className="w-full h-full flex justify-end">
          <nav className="bg-[var(--background)] h-full w-80 p-6 transform transition-transform duration-300 ease-in-out animate-slide-in-right">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 text-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              ✕
            </button>
            <ul className="flex flex-col gap-6 text-xl mt-12">
              {tabs.map((tab, index) => (
                <li key={index}>
                  <Link
                    href={tab.href}
                    className="hover:text-gray-600 hover:underline transition-all"
                  >
                    {tab.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button className="bg-[var(--brandColor)] text-xl text-white px-4 py-2 rounded-md hover:underline transition-colors mt-6 w-full">
              Let's Collaborate!
            </button>
          </nav>
        </section>
      </Modal>
    </header>
  );
};

export default Header;
