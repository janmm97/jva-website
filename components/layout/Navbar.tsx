"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const BOOKING_URL = "https://form.typeform.com/to/kVhRsNfy";

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About",    href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Outer wrapper — provides top padding so pill floats above content */
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto max-w-6xl transition-all duration-300 rounded-2xl border ${
          scrolled
            ? "bg-jva-dark/90 backdrop-blur-xl border-jva-purple/30 shadow-lg shadow-black/30"
            : "bg-jva-dark/70 backdrop-blur-lg border-jva-purple/20"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-[60px]">

          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="/assets/logo/jva-logo-primary-reverse-svg.svg"
              alt="JVA"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop nav links — centered */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm text-jva-lavender/80 hover:text-white rounded-lg hover:bg-jva-purple/20 transition-all duration-150"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right — CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
            >
              Book a call
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
          <div className="md:hidden border-t border-jva-purple/20 px-5 py-5">
            <ul className="flex flex-col gap-1 mb-5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block px-3 py-2.5 text-jva-lavender/80 hover:text-white hover:bg-jva-purple/20 rounded-lg transition-all duration-150 text-sm"
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
              Book a call
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
