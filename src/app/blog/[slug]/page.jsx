import { notFound } from "next/navigation";
import Link from "next/link";
import blog from "../../../../public/data/blog.json";

const posts = blog.posts;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Branding Hours`,
    description: post.excerpt,
    alternates: { canonical: `https://brandinghours.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://brandinghours.com/blog/${slug}`,
      type: "article",
      images: [{ url: post.image, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function PostBody({ blocks }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2 key={i} className="text-2xl md:text-3xl font-semibold font-display text-neutral-900 mt-12 mb-4 leading-snug">
              {block.text}
            </h2>
          );
        }
        if (block.type === "p") {
          return (
            <p key={i} className="text-neutral-700 leading-relaxed text-lg mb-5">
              {block.text}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={i} className="list-disc pl-6 mb-6 space-y-2 text-neutral-700 text-lg leading-relaxed">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol key={i} className="list-decimal pl-6 mb-6 space-y-2 text-neutral-700 text-lg leading-relaxed">
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ol>
          );
        }
        return null;
      })}
    </>
  );
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://brandinghours.com${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Branding Hours", url: "https://brandinghours.com" },
    publisher: {
      "@type": "Organization",
      name: "Branding Hours",
      logo: { "@type": "ImageObject", url: "https://brandinghours.com/assets/common/logo6.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://brandinghours.com/blog/${slug}` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://brandinghours.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://brandinghours.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://brandinghours.com/blog/${slug}` },
    ],
  };

  const faqSchema = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <main className="pt-28 md:pt-32 pb-20 md:pb-28 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <article className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-neutral-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-neutral-600">Blog</Link>
        </nav>

        <header className="mb-8">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent-electric/10 text-accent-electric mb-4">
            {post.category}
          </span>
          <h1 className="text-display-lg text-neutral-900 mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <span>By {post.author}</span>
            <span>&middot;</span>
            <span>{formatDate(post.date)}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <p className="text-xl text-neutral-700 leading-relaxed mb-8 font-medium border-l-4 pl-5" style={{ borderColor: "var(--accent-electric, #4F7CFF)" }}>
          {post.intro}
        </p>

        <div>
          <PostBody blocks={post.body} />
        </div>

        {/* FAQs */}
        {post.faqs?.length > 0 && (
          <section className="mt-14 pt-10 border-t border-neutral-200">
            <h2 className="text-2xl md:text-3xl font-semibold font-display text-neutral-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-5">
              {post.faqs.map((f, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-neutral-900 text-lg mb-1">{f.question}</h3>
                  <p className="text-neutral-600 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16 bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-10 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold font-display text-neutral-900">Ready to grow your brand?</h2>
          <p className="text-neutral-600 max-w-md">
            Let&apos;s turn these strategies into real results for your business.
          </p>
          <Link href="/contact" className="btn-gradient-filled text-base group mt-2">
            Book a Free Consultation
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </article>
    </main>
  );
}
