export const dynamic = "force-static";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: "https://brandinghours.com/sitemap.xml",
    host: "https://brandinghours.com",
  };
}
