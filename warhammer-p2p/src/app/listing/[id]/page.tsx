"use client";

import Link from "next/link";
import { useState } from "react";
import {
  StarIcon,
  ShieldCheckIcon,
  PackageIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SwordsIcon,
} from "@/components/Icons";

function MapPinIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function InfoIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

const listing = {
  id: 1,
  title: "Ultramarines 2,000pt Assault Force",
  faction: "Space Marines",
  subfaction: "Ultramarines — 2nd Company",
  system: "Warhammer 40,000 (10th Edition)",
  dailyRate: 18,
  weeklyRate: 105,
  replacementValue: 650,
  points: 2000,
  painted: "Pro Painted",
  host: "GrimDarkGary",
  hostSince: "March 2024",
  hostListings: 3,
  hostRentals: 27,
  rating: 4.9,
  reviews: 23,
  models: 42,
  location: "Austin, TX",
  turnaroundDays: 2,
  accentColor: "rgba(59,130,246,0.12)",
  accentBorder: "rgba(59,130,246,0.25)",
  iconColor: "#60a5fa",
  description: `A complete, table-ready 2,000pt Ultramarines force built around the Gladius Task Force detachment. Every model has been professionally painted to an extreme highlight standard — chapter markings, squad numbers, and battle damage all included.

The list includes a Marneus Calgar warlord, two Intercessor squads, Terminator Assault squad, Gladiator Lancer, drop pod, and support characters. Ships double-boxed with foam padding.

This army has been rented 23 times with zero damage incidents. Perfect for tournament practice, convention play, or trying out Space Marines before committing to a purchase.`,
  includes: [
    "Marneus Calgar (Primaris) — Warlord",
    "Chief Librarian Tigurius",
    "2× Intercessor Squad (10 models each)",
    "Terminator Assault Squad (5 models)",
    "Sternguard Veteran Squad (5 models)",
    "Gladiator Lancer",
    "Drop Pod",
    "Invictor Tactical Warsuit",
    "2× Repulsor Transport",
  ],
  rules: [
    "Models must be returned in the same foam slots they arrived in.",
    "No repainting, conversions, or modifications of any kind.",
    "Renter covers any damage beyond normal play wear.",
    "Army must be returned within the booked window or an extra day rate applies.",
  ],
};

const reviews = [
  { author: "WarbossWendy", rating: 5, date: "2 weeks ago", text: "Incredible army. Packed perfectly, every model arrived immaculate. Won my first RTT with it!" },
  { author: "Mordecai_40K", rating: 5, date: "1 month ago", text: "Rented for a 3-day local GT. Paint quality is unreal in person. Shipping was fast both ways." },
  { author: "PrimarchsNephew", rating: 4, date: "2 months ago", text: "Great army, very well painted. Minor pre-existing chip noted in condition photos. No deposit issues." },
];

export default function ListingPage() {
  const [rentalDays, setRentalDays] = useState(7);
  const [activeTab, setActiveTab] = useState<"description" | "includes" | "rules">("description");

  const totalCost = rentalDays * listing.dailyRate;
  const serviceFee = Math.round(totalCost * 0.12);
  const grandTotal = totalCost + serviceFee + listing.replacementValue;

  return (
    <>
      {/* Breadcrumb header strip */}
      <div style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border-subtle)", padding: "5rem 1.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--text-muted)", paddingBottom: "1rem" }}>
            <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
            <ArrowRightIcon size={12} />
            <Link href="/browse" style={{ color: "var(--text-muted)" }}>Browse</Link>
            <ArrowRightIcon size={12} />
            <span style={{ color: "var(--text-secondary)" }}>{listing.faction}</span>
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: "2.5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "start" }}>

            {/* LEFT COLUMN */}
            <div>
              {/* Image area */}
              <div className="card" style={{ overflow: "hidden", marginBottom: "2rem", padding: 0 }}>
                <div style={{ height: "360px", background: `linear-gradient(135deg, ${listing.accentColor}, rgba(12,10,9,0.9) 60%)`, borderBottom: `1px solid ${listing.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <svg width={200} height={200} viewBox="0 0 64 64" fill="none" stroke={listing.iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                    <circle cx="32" cy="14" r="6" />
                    <path d="M20 38 C20 28 44 28 44 38 L44 48 L20 48 Z" />
                    <line x1="20" y1="44" x2="10" y2="54" />
                    <line x1="44" y1="44" x2="54" y2="54" />
                  </svg>
                  <span className="badge badge-orange" style={{ position: "absolute", top: "1rem", left: "1rem" }}>{listing.painted}</span>
                  <span style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600 }}>
                    ● Available Now
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", padding: "0.875rem" }}>
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} style={{ width: "72px", height: "56px", borderRadius: "0.5rem", background: `linear-gradient(135deg, ${listing.accentColor}, var(--bg-card))`, border: i === 1 ? "2px solid var(--accent-primary)" : "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                      <svg width={24} height={24} viewBox="0 0 64 64" fill="none" stroke={listing.iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                        <circle cx="32" cy="14" r="6" />
                        <path d="M20 38 C20 28 44 28 44 38 L44 48 L20 48 Z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-accent)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                  {listing.faction} · {listing.subfaction}
                </div>
                <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>{listing.title}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                  <span style={{ color: "var(--color-orange-400)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <StarIcon size={14} color="var(--color-orange-400)" />
                    {listing.rating} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({listing.reviews} reviews)</span>
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <MapPinIcon size={14} color="var(--text-muted)" />{listing.location}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{listing.system}</span>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
                {[
                  { label: "Points", value: `${listing.points}pts` },
                  { label: "Models", value: listing.models },
                  { label: "Ship", value: `${listing.turnaroundDays}d turn` },
                  { label: "Rentals", value: listing.hostRentals },
                ].map(({ label, value }) => (
                  <div key={label} className="card" style={{ padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{value}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "0.25rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
                  {(["description", "includes", "rules"] as const).map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "0.625rem 1.25rem", background: "none", border: "none", borderBottom: activeTab === tab ? "2px solid var(--accent-primary)" : "2px solid transparent", color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: activeTab === tab ? 600 : 400, cursor: "pointer", textTransform: "capitalize", transition: "all var(--transition-fast)", marginBottom: "-1px" }}>
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "description" && (
                  <div>{listing.description.split("\n\n").map((para, i) => <p key={i} style={{ marginBottom: "1rem", lineHeight: 1.8 }}>{para}</p>)}</div>
                )}
                {activeTab === "includes" && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {listing.includes.map((unit) => (
                      <div key={unit} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: "0.5rem", padding: "0.5rem 0.875rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                        {unit}
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "rules" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {listing.rules.map((rule, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.875rem", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", borderRadius: "0.625rem" }}>
                        <InfoIcon size={16} color="var(--color-orange-400)" />
                        <p style={{ margin: 0, fontSize: "0.9rem" }}>{rule}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviews */}
              <div>
                <h2 style={{ fontSize: "1.375rem", marginBottom: "1.5rem" }}>Reviews <span style={{ color: "var(--text-muted)", fontSize: "1rem", fontWeight: 400 }}>({listing.reviews})</span></h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {reviews.map((review) => (
                    <div key={review.author} className="card" style={{ padding: "1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, var(--accent-glow), var(--bg-card-hover))", border: "1px solid var(--border-card)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: 700, color: "var(--color-orange-300)" }}>
                            {review.author[0]}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>{review.author}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{review.date}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "2px" }}>
                          {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} size={13} color={i < review.rating ? "var(--color-orange-400)" : "var(--color-stone-700)"} />)}
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.7 }}>{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Booking Panel */}
            <div style={{ position: "sticky", top: "5.5rem" }}>
              <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)" }}>${listing.dailyRate}</span>
                  <span style={{ color: "var(--text-muted)" }}>/ day</span>
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  ${listing.weeklyRate}/week · ${listing.replacementValue} deposit held
                </div>
                <hr className="divider" style={{ marginBottom: "1.25rem" }} />

                <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>Rental Period</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
                  {[{ label: "From", val: "Mar 22, 2026" }, { label: "To", val: "Mar 29, 2026" }].map(({ label, val }) => (
                    <div key={label}>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                      <div style={{ padding: "0.625rem 0.875rem", background: "var(--bg-secondary)", border: "1.5px solid var(--border-card)", borderRadius: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                        <CalendarIcon size={14} color="var(--text-muted)" />{val}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Duration</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button onClick={() => setRentalDays(Math.max(1, rentalDays - 1))} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--bg-secondary)", border: "1px solid var(--border-card)", color: "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontFamily: "var(--font-sans)" }}>−</button>
                    <span style={{ fontWeight: 700, color: "var(--text-primary)", minWidth: "4ch", textAlign: "center" }}>{rentalDays}d</span>
                    <button onClick={() => setRentalDays(Math.min(30, rentalDays + 1))} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--bg-secondary)", border: "1px solid var(--border-card)", color: "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontFamily: "var(--font-sans)" }}>+</button>
                  </div>
                </div>

                <div style={{ background: "var(--bg-secondary)", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1.25rem", border: "1px solid var(--border-subtle)" }}>
                  {[
                    { label: `$${listing.dailyRate} × ${rentalDays} days`, val: `$${totalCost}` },
                    { label: "Service fee (12%)", val: `$${serviceFee}` },
                    { label: "Deposit hold (refundable)", val: `$${listing.replacementValue}` },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                      <span style={{ color: "var(--text-muted)" }}>{label}</span>
                      <span style={{ color: "var(--text-secondary)" }}>{val}</span>
                    </div>
                  ))}
                  <hr className="divider" style={{ margin: "0.75rem 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                    <span style={{ color: "var(--text-primary)" }}>Total charged today</span>
                    <span style={{ color: "var(--text-primary)" }}>${grandTotal}</span>
                  </div>
                </div>

                <button className="btn btn-primary btn-lg" style={{ width: "100%", marginBottom: "0.75rem" }}>Request to Book</button>
                <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--text-muted)", margin: "0 0 0.5rem" }}>You won't be charged until the host accepts</p>

                <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", marginTop: "1rem" }}>
                  {[{ label: "ID Verified", Icon: CheckCircleIcon }, { label: "Insured Ship", Icon: PackageIcon }, { label: "Deposit Safe", Icon: ShieldCheckIcon }].map(({ label, Icon }) => (
                    <span key={label} style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.3rem", flexDirection: "column", textAlign: "center" }}>
                      <Icon size={18} color="var(--color-orange-400)" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Host card */}
              <div className="card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.875rem" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, var(--accent-glow), var(--bg-card-hover))", border: "2px solid var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-orange-300)", flexShrink: 0 }}>G</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{listing.host}</div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>Host since {listing.hostSince}</div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{listing.rating}</div>
                    <div style={{ display: "flex", gap: "1px" }}>
                      {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} size={10} color="var(--color-orange-400)" />)}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.875rem", fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: "0.875rem" }}>
                  <span><strong style={{ color: "var(--text-secondary)" }}>{listing.hostListings}</strong> listings</span>
                  <span><strong style={{ color: "var(--text-secondary)" }}>{listing.hostRentals}</strong> rentals</span>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8125rem", color: "#4ade80", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.3rem 0.75rem", borderRadius: "999px" }}>
                  <CheckCircleIcon size={13} color="#4ade80" />
                  Identity Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
