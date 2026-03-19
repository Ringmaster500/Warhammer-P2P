"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoSwordIcon, MenuIcon, XIcon } from "@/components/Icons";

const navLinks = [
  { label: "Browse Armies", href: "/browse" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "List Your Army", href: "/list" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition:
          "background-color 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease",
        backgroundColor: scrolled
          ? "rgba(12, 10, 9, 0.88)"
          : "rgba(12, 10, 9, 0.0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid transparent",
      }}
    >
      <div
        className="container"
        style={{
          padding: "0 1.5rem",
          height: "4.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.25rem",
              height: "2.25rem",
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              borderRadius: "0.5rem",
              boxShadow: "0 0 20px rgba(249,115,22,0.4)",
            }}
          >
            <LogoSwordIcon size={16} color="white" />
          </span>
          <span
            style={{
              fontWeight: 800,
              fontSize: "1.25rem",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
            }}
          >
            War<span style={{ color: "var(--accent-primary)" }}>-Rent</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "0.5rem 0.875rem",
                borderRadius: "0.5rem",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
                transition: "color 150ms ease, background-color 150ms ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "var(--text-primary)";
                (e.target as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = "var(--text-secondary)";
                (e.target as HTMLAnchorElement).style.backgroundColor = "";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <Link href="/login" className="btn btn-secondary btn-sm">
            Log In
          </Link>
          <Link href="/register" className="btn btn-primary btn-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            border: "1.5px solid var(--border-card)",
            borderRadius: "0.5rem",
            color: "var(--text-primary)",
            cursor: "pointer",
            padding: "0.5rem",
            lineHeight: 0,
          }}
        >
          {menuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--text-secondary)",
                display: "block",
              }}
            >
              {link.label}
            </Link>
          ))}
          <hr className="divider" style={{ margin: "0.5rem 0" }} />
          <Link href="/login" className="btn btn-secondary" style={{ textAlign: "center" }}>
            Log In
          </Link>
          <Link href="/register" className="btn btn-primary" style={{ textAlign: "center" }}>
            Get Started
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
