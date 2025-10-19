import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <main className="page-container min-h-screen flex items-center justify-center">
      <section className="peaceful-gradient max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <p className="text-lg mb-8">
            In the meantime, feel free to explore our services or check out our latest work.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[var(--brandColor)] text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="border-2 border-[var(--brandColor)] text-[var(--brandColor)] text-lg font-semibold py-3 px-6 rounded-lg hover:bg-[var(--brandColor)] hover:text-white transition-all"
          >
            View Services
          </Link>
        </div>
      </section>
    </main>
  );
};

export default page;