import React from "react";

const Form = () => {
  return (
    <section className="peaceful-gradient max-w-2xl w-full m-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Let's Create Something Amazing Together
        </h1>
        <p className="text-lg text-gray-600">
          Ready to transform your brand? Tell us about your project and we'll
          get back to you within 24 hours.
        </p>
      </div>

      <form className="space-y-6" method="POST" action="/mail_handler.php">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brandColor)] focus:border-transparent outline-none transition-all bg-[var(--background)]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brandColor)] focus:border-transparent outline-none transition-all bg-[var(--background)]"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brandColor)] focus:border-transparent outline-none transition-all bg-[var(--background)]"
            placeholder="Your company name"
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-2">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brandColor)] focus:border-transparent outline-none transition-all bg-[var(--background)]"
          >
            <option value="">Select a service</option>
            <option value="seo">Search Engine Optimization (SEO)</option>
            <option value="smo">Social Media Optimization (SMO)</option>
            <option value="paid-media">Paid Media Marketing</option>
            <option value="web-dev">Website Development</option>
            <option value="branding">Branding</option>
            <option value="photography">Photography</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Project Details *
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brandColor)] focus:border-transparent outline-none transition-all resize-vertical bg-[var(--background)]"
            placeholder="Tell us about your project, goals, timeline, and budget..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[var(--brandColor)] text-white text-lg font-semibold py-4 px-6 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-[var(--brandColor)] focus:ring-opacity-50"
        >
          Send Message ✨
        </button>
      </form>

      <div className="text-center mt-8 text-sm text-gray-500">
        <p>We respect your privacy. Your information will never be shared.</p>
      </div>
    </section>
  );
};

export default Form;
