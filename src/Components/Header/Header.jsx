import React from "react";
import Link from "next/link";
const tabs = [
  { name: "About us", href: "/about" },
  // { name: "Our Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
];
const Header = () => {
  return (
    <header className="p-4 px-2 sm:px-4 md:px-12 lg:px-20 xl:px-50 shadow-lg flex justify-between items-center sticky top-0 z-2 bg-[var(--background)]">
      <section>
        <Link href="/" className="flex gap-2 items-center justify-between">
          <img src="/logo.png" alt="" className="w-[32px]" />
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
        <button className="flex flex-col gap-1">
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </section>
    </header>
  );
};

export default Header;
