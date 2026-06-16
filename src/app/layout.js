import { Geist, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import SmoothScroll from "@/Components/SmoothScroll/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Branding Hours | Digital Marketing & Branding Agency India",
  description: "Branding Hours is a full-service digital growth agency offering SEO, AEO, GEO, Social Media Marketing, Paid Media, Website Development, Branding, Hotstar Marketing, and Influencer Marketing across India.",
  metadataBase: new URL("https://brandinghours.com"),
  verification: {
    google: "K9SGC_XvCAr1rRz5Oy1lNROBCxUIPdQTKE_9nbWCVuY",
  },
  icons: {
    icon: "/assets/common/logo6.png",
    apple: "/assets/common/logo6.png",
  },
  openGraph: {
    siteName: "Branding Hours",
    locale: "en_IN",
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Branding Hours",
  url: "https://brandinghours.com",
  logo: "https://brandinghours.com/assets/common/logo6.png",
  description: "Full-service digital growth agency offering SEO, AEO, GEO, Social Media Marketing, Paid Media Marketing, Website Development, Branding, Hotstar Marketing, and Influencer Marketing.",
  telephone: "+91-9871741353",
  email: "contact@brandinghours.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot no 10, Ghyan khand - 2, Shop - 3, Indirapuram",
    addressLocality: "Ghaziabad",
    addressRegion: "Uttar Pradesh",
    postalCode: "201010",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/brandinghours_com/",
    "https://www.facebook.com/profile.php?id=61576789070336",
    "https://www.linkedin.com/company/107387708/",
    "https://www.youtube.com/@Brandinghourhours",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Branding Hours",
  url: "https://brandinghours.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://brandinghours.com/services",
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://brandinghours.com/#localbusiness",
  name: "Branding Hours",
  image: "https://brandinghours.com/assets/common/logo6.png",
  url: "https://brandinghours.com",
  telephone: "+91-9871741353",
  email: "contact@brandinghours.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot no 10, Ghyan khand - 2, Shop - 3, Indirapuram",
    addressLocality: "Ghaziabad",
    addressRegion: "Uttar Pradesh",
    postalCode: "201010",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "Australia" },
  ],
  sameAs: [
    "https://www.instagram.com/brandinghours_com/",
    "https://www.facebook.com/profile.php?id=61576789070336",
    "https://www.linkedin.com/company/107387708/",
    "https://www.youtube.com/@Brandinghourhours",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-PGTHPFTX');`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PGTHPFTX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
