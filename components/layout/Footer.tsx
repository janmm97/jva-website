"use client";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

export function Footer() {
  return (
    <footer className="bg-jva-deep border-t border-jva-purple/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <img
              src="/assets/logo/jva-logo-primary-reverse-svg.svg"
              alt="JVA"
              className="h-12 w-auto mb-5"
            />
            <p className="text-jva-lavender/70 text-sm leading-relaxed mb-1">
              Work less. Scale more.
            </p>
            <p className="text-jva-lavender/50 text-sm leading-relaxed mb-6">
              Powered by AI. Built for humans.
            </p>
            <p className="text-jva-lavender/40 text-xs">
              &copy; {new Date().getFullYear()} JVA. All rights reserved.
            </p>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="text-jva-white text-sm font-semibold mb-4 tracking-wide">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "One-Time Setup",
                "Setup + Retainer",
                "Full-Time VA Contract",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-jva-lavender/70 hover:text-jva-lavender text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Products */}
          <div>
            <h4 className="text-jva-white text-sm font-semibold mb-4 tracking-wide">
              Products
            </h4>
            <ul className="space-y-3">
              {[
                "Email Triage Agent",
                "UGC Content Generator",
                "Ad Generator (Coming Soon)",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-jva-lavender/70 hover:text-jva-lavender text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h4 className="text-jva-white text-sm font-semibold mb-4 tracking-wide">
              Connect
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jva-lavender/70 hover:text-jva-lavender text-sm transition-colors duration-200"
                >
                  Book a call
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jva-lavender/70 hover:text-jva-lavender text-sm transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jva-lavender/70 hover:text-jva-lavender text-sm transition-colors duration-200"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jva-lavender/70 hover:text-jva-lavender text-sm transition-colors duration-200"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-jva-purple/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <p className="text-jva-white text-sm font-medium mb-1">
                Stay in the loop
              </p>
              <p className="text-jva-lavender/50 text-xs">
                New automations, products, and insights — no spam.
              </p>
            </div>
            <form
              className="flex gap-2 w-full sm:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-jva-dark border border-jva-purple/40 rounded-full px-4 py-2 text-sm text-jva-white placeholder:text-jva-lavender/40 focus:outline-none focus:border-jva-accent/60 transition-colors w-full sm:w-64"
              />
              <button
                type="submit"
                className="bg-jva-accent hover:bg-jva-bright text-white text-sm font-medium px-5 py-2 rounded-full transition-colors duration-200 whitespace-nowrap"
              >
                Stay updated
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
