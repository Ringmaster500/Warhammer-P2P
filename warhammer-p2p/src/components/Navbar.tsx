"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoSwordIcon, MenuIcon, XIcon } from "@/components/Icons";

const navLinks = [
  { label: "Browse Armies", href: "/browse" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "List Your Army", href: "/list" },
];

function ChevronIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check sessionStorage for mock auth state
    try {
      const stored = sessionStorage.getItem("wr_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    // Re-check on storage events (other tab logins)
    const onStorage = () => {
      try {
        const stored = sessionStorage.getItem("wr_user");
        setUser(stored ? JSON.parse(stored) : null);
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function logout() {
    sessionStorage.removeItem("wr_user");
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = "/";
  }

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "background 300ms ease, border-color 300ms ease",
        background: scrolled ? "rgba(31, 32, 37, 0.70)" : "rgba(14, 15, 18, 0.0)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid rgba(70, 70, 75, 0.35)" : "1px solid transparent",
      }}
    >
      <div
        className="container"
        style={{ padding: "0 1.5rem", height: "4.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "2.25rem", height: "2.25rem",
            background: "linear-gradient(135deg, var(--primary), var(--on-primary-container))",
            borderRadius: "0.125rem", boxShadow: "0 0 16px var(--glow-orange)",
          }}>
            <LogoSwordIcon size={15} color="white" />
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "-0.025em", color: "var(--on-surface)" }}>
            War<span style={{ color: "var(--on-primary-container)" }}>-Rent</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.125rem" }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ padding: "0.5rem 0.875rem", borderRadius: "0.125rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--outline)", letterSpacing: "0.01em", transition: "color var(--t-fast), background var(--t-fast)" }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = "var(--on-surface)"; (e.target as HTMLAnchorElement).style.backgroundColor = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = "var(--outline)"; (e.target as HTMLAnchorElement).style.backgroundColor = ""; }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA / User menu */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.375rem 0.75rem 0.375rem 0.375rem",
                  background: "var(--surface-container)", borderRadius: "999px",
                  border: "1px solid var(--ghost-border)", cursor: "pointer",
                  transition: "border-color var(--t-fast)",
                }}
                id="user-menu-btn"
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, var(--on-primary-container), var(--primary-container))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "white", flexShrink: 0 }}>
                  {user.name[0]}
                </div>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--on-surface-variant)", maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user.name}
                </span>
                <ChevronIcon size={14} color="var(--outline)" />
              </button>
              {userMenuOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 98 }} onClick={() => setUserMenuOpen(false)} />
                  <div className="glass" style={{
                    position: "absolute", top: "calc(100% + 0.5rem)", right: 0,
                    width: "220px", borderRadius: "0.25rem", border: "1px solid var(--ghost-border)",
                    padding: "0.5rem", zIndex: 99,
                    boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
                  }}>
                    <div style={{ padding: "0.5rem 0.875rem 0.75rem", borderBottom: "1px solid var(--ghost-border)", marginBottom: "0.375rem" }}>
                      <div style={{ fontWeight: 700, color: "var(--on-surface)", fontSize: "0.9rem" }}>{user.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--outline)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
                    </div>
                    {[
                      { label: "Dashboard", href: "/dashboard" },
                      { label: "My Listings", href: "/dashboard" },
                      { label: "Bookings", href: "/dashboard" },
                      { label: "Browse Armies", href: "/browse" },
                    ].map((item) => (
                      <Link key={item.label} href={item.href} onClick={() => setUserMenuOpen(false)} style={{
                        display: "block", padding: "0.5rem 0.875rem", fontSize: "0.875rem", fontWeight: 500,
                        color: "var(--on-surface-variant)", borderRadius: "0.125rem",
                        transition: "background var(--t-fast), color var(--t-fast)",
                      }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.target as HTMLElement).style.color = "var(--on-surface)"; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.background = ""; (e.target as HTMLElement).style.color = "var(--on-surface-variant)"; }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div style={{ borderTop: "1px solid var(--ghost-border)", marginTop: "0.375rem", paddingTop: "0.375rem" }}>
                      <button onClick={logout} style={{
                        display: "block", width: "100%", padding: "0.5rem 0.875rem", fontSize: "0.875rem",
                        fontWeight: 500, color: "#f87171", background: "none", border: "none",
                        borderRadius: "0.125rem", cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)",
                      }}>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">Log In</Link>
              <Link href="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ display: "none", background: "none", border: "1px solid rgba(70,70,75,0.5)", borderRadius: "0.125rem", color: "var(--on-surface)", cursor: "pointer", padding: "0.5rem", lineHeight: 0 }}
        >
          {menuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="glass" style={{ borderTop: "1px solid rgba(70,70,75,0.3)", padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ padding: "0.75rem 1rem", borderRadius: "0.125rem", fontSize: "0.9375rem", fontWeight: 500, color: "var(--on-surface-variant)", display: "block", letterSpacing: "0.01em" }}>
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {user ? (
              <>
                <Link href="/dashboard" className="btn btn-ghost" style={{ textAlign: "center" }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <button className="btn btn-primary" style={{ textAlign: "center", width: "100%" }} onClick={() => { logout(); setMenuOpen(false); }}>Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost" style={{ textAlign: "center" }}>Log In</Link>
                <Link href="/register" className="btn btn-primary" style={{ textAlign: "center" }}>Get Started</Link>
              </>
            )}
          </div>
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
