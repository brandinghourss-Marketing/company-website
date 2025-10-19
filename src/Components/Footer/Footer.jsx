import Link from "next/link";
import React from "react";
import {
  EmailIcon,
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  YouTubeIcon,
  PhoneIcon,
} from "../Icons/SocialIcons";
const tabs = [
  { name: "About us", href: "/about" },
  //   { name: "Our Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
];
const Footer = () => {
  return (
    <footer className="mt-20 bg-[var(--brandColor)] grid grid-cols-1 md:grid-cols-2 gap-4 text-white p-4 px-2 sm:px-4 md:px-12 lg:px-20 xl:px-50">
      <section className="flex flex-col gap-10">
        <Link
          href="/"
          className="flex gap-2 items-center justify-between w-max"
        >
          <img src="/assets/common/logo.png" alt="" className="w-[32px]" />
          <p className="whitespace-nowrap grid">
            <span className="text-xl font-semibold">Branding Hours</span>
            <span className="text-xs">Strategy | Time | Innovate</span>
          </p>
        </Link>
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl">Find Us</h3>
          <address className="text-white">
            <p>Branding Hours</p>
            <p>Plot no 10, Ghyan khand - 2, Shop - 3 </p>
            <p>Indirapuram, Ghaziabad, Uttar Pardesh-201010</p>
            <p>India</p>
          </address>
        </div>
        <nav>
          <ul className="flex gap-10 text-base">
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
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl">Contact Us</h1>
        <p className="flex gap-2">
          <PhoneIcon />
          <span>+91 9871741353</span>
        </p>
        <p className="flex gap-2">
          <EmailIcon />
          <span>contact@brandinghours.com</span>
        </p>
        <div className="flex gap-4">
          <InstagramIcon className="w-8 h-8" />
          <FacebookIcon className="w-8 h-8" />
          <LinkedInIcon className="w-8 h-8" />
          <YouTubeIcon className="w-8 h-8" />
        </div>
      </section>
      <section className="col-span-1 md:col-span-2 border-t-1 p-2">
        <p className="text-xl text-center">
          &copy;{" "}
          <Link href="/" className="hover:underline transition-all">
            Branding Hours
          </Link>
          . All rights reserved.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
