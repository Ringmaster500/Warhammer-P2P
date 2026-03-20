"use client";

import Link from "next/link";
import { LogoSwordIcon } from "@/components/Icons";

const footerLinks = {
  Product: [
    { label: "Browse Armies", href: "/browse" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "List Your Army", href: "/list" },
    { label: "Trust & Safety", href: "/trust" },
  ],
  Account: [
    { label: "Sign Up", href: "/register" },
    { label: "Log In", href: "/login" },
    { label: "Host Dashboard", href: "/dashboard" },
    { label: "Admin Panel", href: "/admin" },
  ],
  Support: [
    { label: "FAQ", href: "/trust" },
    { label: "Dispute Info", href: "/trust" },
    { label: "Shipping Info", href: "/trust" },
    { label: "Contact Us", href: "mailto:support@warrent.gg" },
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
        /* Level 1 — tonal step, no border needed */
        backgroundColor: "var(--surface-container-low)",
        padding: "4.5rem 1.5rem 2.5rem",
      }}
    >
      <div className="container">
        {/* Top row */}
        <div className="footer-grid" style={{ marginBottom: "3.5rem" }}>
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  background: "linear-gradient(135deg, var(--primary), var(--on-primary-container))",
                  borderRadius: "0.125rem",
                }}
              >
                <LogoSwordIcon size={13} color="white" />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  letterSpacing: "-0.025em",
                  color: "var(--on-surface)",
                }}
              >
                War<span style={{ color: "var(--on-primary-container)" }}>-Rent</span>
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--outline)",
                lineHeight: 1.75,
                maxWidth: "240px",
              }}
            >
              The peer-to-peer marketplace for renting beautifully painted Warhammer armies. Safe, insured, built for the community.
            </p>

            {/* Social links as tactical chips */}
            <div style={{ display: "flex", gap: "0.375rem", marginTop: "1.5rem" }}>
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="chip"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "var(--surface-container-highest)";
                    (e.target as HTMLAnchorElement).style.color = "var(--on-surface)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLAnchorElement).style.background = "var(--surface-container-highest)";
                    (e.target as HTMLAnchorElement).style.color = "var(--on-surface-variant)";
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="label-sm"
                style={{
                  color: "var(--on-primary-container)",
                  marginBottom: "1.25rem",
                }}
              >
                {category}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                }}
              >
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--outline)",
                        transition: "color var(--t-fast)",
                        letterSpacing: "0.01em",
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLAnchorElement).style.color = "var(--on-surface)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLAnchorElement).style.color = "var(--outline)")
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

        {/* Bottom row — separated by ghost border */}
        <div
          style={{
            borderTop: "1px solid rgba(70,70,75,0.25)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            className="label-sm"
            style={{ color: "var(--outline)", margin: 0, textTransform: "none", letterSpacing: "0.01em", fontSize: "0.8125rem" }}
          >
            © {new Date().getFullYear()} War-Rent. All rights reserved. Not affiliated with Games Workshop.
          </p>
          <p
            className="label-sm"
            style={{ color: "var(--outline)", margin: 0, textTransform: "none", letterSpacing: "0.01em", fontSize: "0.8125rem" }}
          >
            Built by the community, for the community.
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr repeat(3, 1fr);
          gap: 3rem;
        }
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
