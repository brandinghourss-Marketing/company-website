import Link from "next/link";
import blog from "../../../public/data/blog.json";

export const metadata = {
  title: "Blog | SEO, Paid Media & Digital Marketing Insights | Branding Hours",
  description:
    "Practical guides on SEO, Google Ads, paid media, and digital growth from the Branding Hours team. No fluff — just actionable advice to help your brand grow.",
  alternates: {
    canonical: "https://brandinghours.com/blog",
  },
  openGraph: {
    title: "Blog | Digital Marketing Insights | Branding Hours",
    description:
      "Practical guides on SEO, paid media, and digital growth from the Branding Hours team.",
    url: "https://brandinghours.com/blog",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://brandinghours.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://brandinghours.com/blog" },
  ],
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndexPage() {
  const posts = [...blog.posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <p className="section-label mb-4">{blog.hero.label}</p>
          <h1 className="text-display-lg text-neutral-900 mb-5">{blog.hero.title}</h1>
          <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {blog.hero.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-neutral-300 transition-all"
            >
              <div className="h-44 overflow-hidden bg-neutral-100 flex items-center justify-center">
                <img src={post.image} alt={post.title} className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <span className="inline-block w-fit px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent-electric/10 text-accent-electric mb-3">
                  {post.category}
                </span>
                <h2 className="text-lg font-semibold text-neutral-900 font-display mb-2 leading-snug group-hover:text-accent-electric transition-colors">
                  {post.title}
                </h2>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-neutral-400 mt-auto">
                  <span>{formatDate(post.date)}</span>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
