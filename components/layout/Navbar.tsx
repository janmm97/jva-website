"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About",    href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-6xl transition-all duration-300 rounded-2xl border ${
          scrolled
            ? "bg-[#1F192F]/90 backdrop-blur-xl border-[rgba(196,181,232,0.18)] shadow-lg shadow-black/30"
            : "bg-[#1F192F]/55 backdrop-blur-lg border-[rgba(196,181,232,0.10)]"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-[60px]">
          <a href="/" className="flex-shrink-0">
            <img
              src="/assets/logo/jva-logo-primary-reverse-svg.svg"
              alt="JVA"
              className="h-9 w-auto"
            />
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm text-jva-lavender/80 hover:text-white rounded-lg hover:bg-[rgba(196,181,232,0.10)] transition-all duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
            >
              Contact
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-jva-lavender hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="md:hidden border-t border-[rgba(196,181,232,0.12)] px-5 py-5">
            <ul className="flex flex-col gap-1 mb-5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block px-3 py-2.5 text-jva-lavender/80 hover:text-white hover:bg-[rgba(196,181,232,0.10)] rounded-lg transition-all duration-150 text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center"
            >
              Contact
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
