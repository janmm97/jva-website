"use client";

// Footer — inline SVG social icons (replaces brandfetch CDN that causes 404s)

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/manalojanm/",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zM20 19h-3v-5.6c0-3.37-4-3.12-4 0V19h-3V8h3v1.77c1.4-2.59 7-2.78 7 2.48V19z"/>
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/thejva97",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@thejva97",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/janmm97",
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
];

const NAV_COL1 = [
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
];

const NAV_COL2 = [
  { label: "Blog",             href: "/blog",    highlight: false },
  { label: "Contact",          href: "#contact", highlight: false },
  { label: "Check out Climbr", href: "#",        highlight: true },
];

export function Footer() {
  return (
    <footer className="bg-jva-deep border-t border-[rgba(196,181,232,0.12)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/assets/logo/jva-logo-primary-reverse-transparent.png"
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

          {/* Col 4 — Socials */}
          <div>
            <h4 className="text-jva-white text-sm font-semibold mb-5 tracking-wide">
              Follow me on my socials
            </h4>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ name, href, svg }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="group flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(196,181,232,0.08)] border border-[rgba(196,181,232,0.18)] text-jva-lavender/70 hover:text-white hover:border-[rgba(196,181,232,0.40)] hover:bg-[rgba(196,181,232,0.16)] transition-all duration-200 hover:scale-110"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
