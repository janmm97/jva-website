"use client";

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/manalojanm/",
    icon: "https://cdn.brandfetch.io/linkedin.com/w/32/h/32/icon",
  },
  {
    name: "X",
    href: "https://x.com/thejva97",
    icon: "https://cdn.brandfetch.io/x.com/w/32/h/32/icon",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@thejva97",
    icon: "https://cdn.brandfetch.io/youtube.com/w/32/h/32/icon",
  },
  {
    name: "GitHub",
    href: "https://github.com/janmm97",
    icon: "https://cdn.brandfetch.io/github.com/w/32/h/32/icon",
  },
];

const NAV_COL1 = [
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "#contact" },
];

const NAV_COL2 = [
  { label: "Terms & Services",  href: "/terms",   highlight: false },
  { label: "Privacy & Policy",  href: "/privacy", highlight: false },
  { label: "Check out Climbr",  href: "#",        highlight: true },
];

export function Footer() {
  return (
    <footer className="bg-jva-deep border-t border-jva-purple/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
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

          {/* Col 2 — Primary nav */}
          <ul className="space-y-3">
            {NAV_COL1.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="text-jva-lavender/70 hover:text-jva-lavender text-sm transition-colors duration-200">
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Col 3 — Secondary nav */}
          <ul className="space-y-3">
            {NAV_COL2.map(({ label, href, highlight }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`text-sm transition-colors duration-200 ${
                    highlight
                      ? "text-jva-bright hover:text-jva-lavender font-medium"
                      : "text-jva-lavender/70 hover:text-jva-lavender"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Col 3 — Socials */}
          <div>
            <h4 className="text-jva-white text-sm font-semibold mb-5 tracking-wide">
              Follow me on my socials
            </h4>
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="group flex items-center justify-center w-9 h-9 rounded-lg bg-jva-dark/80 border border-jva-purple/30 hover:border-jva-bright/50 transition-all duration-200 hover:scale-110"
                >
                  <img
                    src={icon}
                    alt={name}
                    className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
