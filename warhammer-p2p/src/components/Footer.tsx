"use client";

import Link from "next/link";
import { LogoSwordIcon } from "@/components/Icons";

const footerLinks = {
  Product: [
    { label: "Browse Armies", href: "/browse" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "List Your Army", href: "/list" },
    { label: "Pricing", href: "/pricing" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Damage & Disputes", href: "/disputes" },
    { label: "Shipping Info", href: "/shipping" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Rental Agreement", href: "/agreement" },
  ],
};

const socials = [
  { label: "X", href: "https://x.com" },
  { label: "Discord", href: "#" },
  { label: "Reddit", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "4rem 1.5rem 2rem",
      }}
    >
      <div className="container">
        {/* Top row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr repeat(3, 1fr)",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  borderRadius: "0.4rem",
                }}
              >
                <LogoSwordIcon size={14} color="white" />
              </span>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "1.125rem",
                  color: "var(--text-primary)",
                }}
              >
                War<span style={{ color: "var(--accent-primary)" }}>-Rent</span>
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: "260px",
              }}
            >
              The peer-to-peer marketplace for renting beautifully painted Warhammer armies. Safe, insured, and built for the community.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "1rem",
                }}
              >
                {category}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        transition: "color 150ms ease",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLAnchorElement).style.color = "var(--text-primary)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLAnchorElement).style.color = "var(--text-secondary)")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>
            © {new Date().getFullYear()} War-Rent. All rights reserved. Not affiliated with Games Workshop.
          </p>
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "var(--accent-primary)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = "var(--text-muted)")
                }
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
