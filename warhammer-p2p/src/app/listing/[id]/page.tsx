"use client";

import { useState } from "react";
import Link from "next/link";
import {
  StarIcon, ShieldCheckIcon, PackageIcon, CheckCircleIcon, ArrowRightIcon, SwordsIcon,
} from "@/components/Icons";

/* ─── Local icons ──────────────────────────────────────────── */
function MapPinIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}
function CalendarIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
}
function InfoIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}
function XIcon({ size = 20, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
function ChevronLeft({ size = 20, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
}
function ChevronRight({ size = 20, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
}

/* ─── Mock listing data ────────────────────────────────────── */
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
  description: `A complete, table-ready 2,000pt Ultramarines force built around the Gladius Task Force detachment. Every model has been professionally painted to an extreme highlight standard — chapter markings, squad numbers, and battle damage all included.\n\nThe list includes a Marneus Calgar warlord, two Intercessor squads, Terminator Assault squad, Gladiator Lancer, drop pod, and support characters. Ships double-boxed with foam padding.\n\nThis army has been rented 23 times with zero damage incidents. Perfect for tournament practice, convention play, or trying out Space Marines before committing to a purchase.`,
  includes: ["Marneus Calgar (Primaris) — Warlord","Chief Librarian Tigurius","2× Intercessor Squad (10 models each)","Terminator Assault Squad (5 models)","Sternguard Veteran Squad (5 models)","Gladiator Lancer","Drop Pod","Invictor Tactical Warsuit","2× Repulsor Transport"],
  rules: ["Models must be returned in the same foam slots they arrived in.","No repainting, conversions, or modifications of any kind.","Renter covers any damage beyond normal play wear.","Army must be returned within the booked window or an extra day rate applies."],
};
const reviews = [
  { author: "WarbossWendy", rating: 5, date: "2 weeks ago", text: "Incredible army. Packed perfectly, every model arrived immaculate. Won my first RTT with it!" },
  { author: "Mordecai_40K", rating: 5, date: "1 month ago", text: "Rented for a 3-day local GT. Paint quality is unreal in person. Shipping was fast both ways." },
  { author: "PrimarchsNephew", rating: 4, date: "2 months ago", text: "Great army, very well painted. Minor pre-existing chip noted in condition photos. No deposit issues." },
];

/* ─── Calendar mini-component ─────────────────────────────── */
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const BLOCKED = [5, 6, 7, 19, 20, 21, 22]; // blocked dates in active month

function MiniCalendar({ startDay, endDay, onSelect }: { startDay: number | null; endDay: number | null; onSelect: (d: number) => void }) {
  const daysInMonth = 31; // March 2026
  const firstDow = 0; // March 1 = Sunday

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "6px" }}>
        {DAYS.map((d) => <div key={d} style={{ textAlign: "center", fontSize: "0.7rem", fontWeight: 700, color: "var(--outline)", padding: "4px 0" }}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const blocked = BLOCKED.includes(day);
          const isStart = startDay === day;
          const isEnd = endDay === day;
          const inRange = startDay && endDay && day > startDay && day < endDay;
          const isPast = day < 20; // "today" = 20

          return (
            <button
              key={day}
              onClick={() => !blocked && !isPast && onSelect(day)}
              style={{
                aspectRatio: "1",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.8rem", fontWeight: isStart || isEnd ? 700 : 400,
                borderRadius: "0.125rem",
                background: isStart || isEnd ? "var(--on-primary-container)" : inRange ? "rgba(250,105,0,0.10)" : "transparent",
                color: isStart || isEnd ? "white" : blocked || isPast ? "var(--outline-variant)" : inRange ? "var(--on-primary-container)" : "var(--on-surface-variant)",
                border: "none", cursor: blocked || isPast ? "not-allowed" : "pointer",
                opacity: blocked || isPast ? 0.4 : 1,
                textDecoration: blocked ? "line-through" : "none",
                transition: "all var(--t-fast)",
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── KYC Gate Modal ───────────────────────────────────────── */
function KYCModal({ onClose, onVerified }: { onClose: () => void; onVerified: () => void }) {
  const [step, setStep] = useState<"info" | "scanning" | "done">("info");

  function startScan() {
    setStep("scanning");
    setTimeout(() => { setStep("done"); }, 2000);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(12,13,16,0.88)", backdropFilter: "blur(10px)" }} onClick={onClose} />
      <div className="card" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "480px", padding: "2.5rem", textAlign: "center" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--outline)" }}><XIcon size={18} /></button>

        {step === "info" && (
          <>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(250,105,0,0.12)", border: "2px solid var(--on-primary-container)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <ShieldCheckIcon size={32} color="var(--on-primary-container)" />
            </div>
            <div className="section-tag" style={{ margin: "0 auto 1.25rem", display: "inline-flex" }}>Identity Checkpoint</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Verify your identity to book</h3>
            <p style={{ fontSize: "0.9375rem", marginBottom: "2rem", maxWidth: "360px", margin: "0 auto 2rem" }}>
              War-Rent requires identity verification before booking to protect hosts. It takes under 2 minutes.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.75rem", textAlign: "left" }}>
              {["Government-issued photo ID required","Quick liveness selfie check","Your data is encrypted and never shared","Only needs to be done once"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <CheckCircleIcon size={15} color="var(--on-primary-container)" />
                  <span style={{ fontSize: "0.9rem", color: "var(--on-surface-variant)" }}>{item}</span>
                </li>
              ))}
            </ul>
            <button className="btn btn-primary btn-lg" style={{ width: "100%", marginBottom: "0.75rem" }} onClick={startScan}>
              Start Identity Check (Stripe)
            </button>
            <p style={{ fontSize: "0.8125rem", color: "var(--outline)", margin: 0 }}>
              Powered by Stripe Identity · <Link href="/privacy" style={{ color: "var(--outline)", textDecoration: "underline" }}>Privacy Policy</Link>
            </p>
          </>
        )}

        {step === "scanning" && (
          <>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(1,92,185,0.12)", border: "2px solid var(--secondary-container)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", animation: "pulse 1.5s ease-in-out infinite" }}>
              <ShieldCheckIcon size={32} color="var(--on-secondary-container)" />
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Verifying identity…</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--outline)" }}>Please don't close this window.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
              {[0,1,2].map((i) => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--secondary-container)", animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
            </div>
          </>
        )}

        {step === "done" && (
          <>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <CheckCircleIcon size={32} color="#22c55e" />
            </div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", color: "#4ade80" }}>Identity Verified ✓</h3>
            <p style={{ fontSize: "0.9375rem", marginBottom: "2rem" }}>
              You're cleared to book. Your verification is permanent — no need to redo this.
            </p>
            <button className="btn btn-primary btn-lg" style={{ width: "100%" }} onClick={onVerified}>
              Continue to Booking →
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Booking Confirmation Modal ───────────────────────────── */
function BookingModal({ days, total, fee, deposit, startDay, onClose }: {
  days: number; total: number; fee: number; deposit: number; startDay: number | null; onClose: () => void;
}) {
  const [step, setStep] = useState<"review" | "processing" | "confirmed">("review");
  const grandTotal = total + fee + deposit;
  const endDay = startDay ? startDay + days : null;

  function confirm() {
    setStep("processing");
    setTimeout(() => setStep("confirmed"), 2000);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(12,13,16,0.88)", backdropFilter: "blur(10px)" }} onClick={step !== "processing" ? onClose : undefined} />
      <div className="card" style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "520px", padding: "2.5rem" }}>
        {step !== "confirmed" && (
          <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", cursor: "pointer", color: "var(--outline)" }}><XIcon size={18} /></button>
        )}

        {step === "review" && (
          <>
            <div className="section-tag" style={{ marginBottom: "1.25rem" }}>Booking Review</div>
            <h3 style={{ fontSize: "1.375rem", marginBottom: "0.375rem" }}>{listing.title}</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--outline)", marginBottom: "1.75rem" }}>
              Review your order below. You won't be charged until the host accepts.
            </p>
            <div style={{ background: "var(--surface-container)", borderRadius: "0.25rem", padding: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", paddingBottom: "0.625rem", marginBottom: "0.625rem", borderBottom: "1px solid var(--ghost-border)" }}>
                <span style={{ color: "var(--outline)" }}>Rental Period</span>
                <span style={{ color: "var(--on-surface)", fontWeight: 600 }}>
                  {startDay ? `Mar ${startDay} – Mar ${endDay}` : `${days} days`}
                </span>
              </div>
              {[
                { label: `$${listing.dailyRate} × ${days} days`, val: `$${total}` },
                { label: "Service fee (12%)", val: `$${fee}` },
                { label: "Deposit hold (refundable)", val: `$${deposit}` },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.625rem" }}>
                  <span style={{ color: "var(--outline)" }}>{label}</span>
                  <span style={{ color: "var(--on-surface-variant)" }}>{val}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "1.0625rem", paddingTop: "0.75rem", borderTop: "1px solid var(--ghost-border)" }}>
                <span>Total charged today</span>
                <span style={{ color: "var(--on-primary-container)" }}>${grandTotal}</span>
              </div>
            </div>
            <div style={{ background: "rgba(1,92,185,0.08)", border: "1px solid rgba(1,92,185,0.25)", borderRadius: "0.125rem", padding: "0.875rem 1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem" }}>
              <InfoIcon size={16} color="var(--on-secondary-container)" />
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--on-secondary-container)", lineHeight: 1.6 }}>
                The ${deposit} deposit is held — not charged — until return. If everything comes back intact, it's released within 24 hours.
              </p>
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: "100%", marginBottom: "0.75rem" }} onClick={confirm}>
              Confirm Request (${grandTotal})
            </button>
            <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--outline)", margin: 0 }}>
              Powered by Stripe · Encrypted & secure
            </p>
          </>
        )}

        {step === "processing" && (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", border: "3px solid var(--surface-container-highest)", borderTopColor: "var(--on-primary-container)", margin: "0 auto 1.5rem", animation: "spin 0.8s linear infinite" }} />
            <h3 style={{ fontSize: "1.375rem", marginBottom: "0.5rem" }}>Processing…</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--outline)" }}>Sending your request to the host.</p>
          </div>
        )}

        {step === "confirmed" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "2px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <CheckCircleIcon size={32} color="#22c55e" />
            </div>
            <div className="section-tag" style={{ margin: "0 auto 1.25rem", display: "inline-flex" }}>Booking Sent</div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Request submitted!</h3>
            <p style={{ fontSize: "0.9375rem", marginBottom: "2rem" }}>
              <strong style={{ color: "var(--on-surface)" }}>{listing.host}</strong> has 24 hours to accept. You'll get an email the moment they respond.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/dashboard" className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                My Bookings
              </Link>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function ListingPage() {
  const [rentalDays, setRentalDays] = useState(7);
  const [activeTab, setActiveTab] = useState<"description" | "includes" | "rules">("description");
  const [imgIdx, setImgIdx] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [startDay, setStartDay] = useState<number | null>(null);
  const [pickingStart, setPickingStart] = useState(true);
  const [endDay, setEndDay] = useState<number | null>(null);
  const [showKYC, setShowKYC] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  const totalCost = rentalDays * listing.dailyRate;
  const serviceFee = Math.round(totalCost * 0.12);

  function handleDaySelect(day: number) {
    if (pickingStart || day <= (startDay ?? 0)) {
      setStartDay(day);
      setEndDay(null);
      setRentalDays(7);
      setPickingStart(false);
    } else {
      setEndDay(day);
      setRentalDays(day - (startDay ?? 0));
      setPickingStart(true);
      setCalendarOpen(false);
    }
  }

  function handleBookNow() {
    if (!isVerified) {
      setShowKYC(true);
    } else {
      setShowBooking(true);
    }
  }

  const fromLabel = startDay ? `Mar ${startDay}, 2026` : "Select date";
  const toLabel = endDay ? `Mar ${endDay}, 2026` : startDay ? "Select end" : "Select date";

  return (
    <>
      {showKYC && (
        <KYCModal
          onClose={() => setShowKYC(false)}
          onVerified={() => { setIsVerified(true); setShowKYC(false); setShowBooking(true); }}
        />
      )}
      {showBooking && (
        <BookingModal
          days={rentalDays}
          total={totalCost}
          fee={serviceFee}
          deposit={listing.replacementValue}
          startDay={startDay}
          onClose={() => setShowBooking(false)}
        />
      )}

      {/* Breadcrumb */}
      <div style={{ backgroundColor: "var(--surface-container-low)", borderBottom: "1px solid var(--ghost-border)", padding: "5rem 1.5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--outline)", paddingBottom: "1rem" }}>
            <Link href="/" style={{ color: "var(--outline)" }}>Home</Link>
            <ArrowRightIcon size={12} />
            <Link href="/browse" style={{ color: "var(--outline)" }}>Browse</Link>
            <ArrowRightIcon size={12} />
            <span style={{ color: "var(--on-surface-variant)" }}>{listing.faction}</span>
          </div>
        </div>
      </div>

      <section className="section" style={{ paddingTop: "2.5rem" }}>
        <div className="container">
          <div className="listing-layout">
            {/* ── LEFT COLUMN ── */}
            <div>
              {/* Image carousel */}
              <div className="card" style={{ overflow: "hidden", marginBottom: "2rem", padding: 0 }}>
                <div style={{ height: "360px", background: `linear-gradient(135deg, ${listing.accentColor}, rgba(12,10,9,0.9) 60%)`, borderBottom: `1px solid ${listing.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <svg width={imgIdx === 0 ? 200 : 140} height={imgIdx === 0 ? 200 : 140} viewBox="0 0 64 64" fill="none" stroke={listing.iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, transition: "all 0.3s" }}>
                    {imgIdx === 0 && <><circle cx="32" cy="14" r="6"/><path d="M20 38 C20 28 44 28 44 38 L44 48 L20 48 Z"/><line x1="20" y1="44" x2="10" y2="54"/><line x1="44" y1="44" x2="54" y2="54"/></>}
                    {imgIdx === 1 && <><rect x="10" y="20" width="44" height="28" rx="2"/><circle cx="32" cy="10" r="6"/><line x1="10" y1="32" x2="54" y2="32"/></>}
                    {imgIdx === 2 && <><path d="M16 12 L32 4 L48 12 L48 36 L32 44 L16 36 Z"/><circle cx="32" cy="24" r="6"/></>}
                    {imgIdx === 3 && <><path d="M8 32 L32 8 L56 32 L50 56 L14 56 Z"/><line x1="32" y1="8" x2="32" y2="56"/><line x1="8" y1="32" x2="56" y2="32"/></>}
                    {imgIdx === 4 && <><circle cx="32" cy="32" r="20"/><circle cx="32" cy="32" r="8"/><line x1="32" y1="12" x2="32" y2="24"/><line x1="32" y1="40" x2="32" y2="52"/><line x1="12" y1="32" x2="24" y2="32"/><line x1="40" y1="32" x2="52" y2="32"/></>}
                  </svg>
                  {/* Nav arrows */}
                  <button onClick={() => setImgIdx(Math.max(0, imgIdx - 1))} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "rgba(18,19,23,0.75)", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: imgIdx === 0 ? 0.3 : 1, transition: "opacity var(--t-fast)" }}>
                    <ChevronLeft size={18} color="white" />
                  </button>
                  <button onClick={() => setImgIdx(Math.min(4, imgIdx + 1))} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "rgba(18,19,23,0.75)", border: "none", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: imgIdx === 4 ? 0.3 : 1, transition: "opacity var(--t-fast)" }}>
                    <ChevronRight size={18} color="white" />
                  </button>
                  <span className="badge badge-orange" style={{ position: "absolute", top: "1rem", left: "1rem" }}>{listing.painted}</span>
                  <span style={{ position: "absolute", top: "1rem", right: "1rem", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)", color: "#4ade80", padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600 }}>● Available Now</span>
                  {/* Dot indicators */}
                  <div style={{ position: "absolute", bottom: "0.875rem", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "0.375rem" }}>
                    {[0,1,2,3,4].map((i) => <div key={i} onClick={() => setImgIdx(i)} style={{ width: i === imgIdx ? "20px" : "6px", height: "6px", borderRadius: "999px", background: i === imgIdx ? "var(--on-primary-container)" : "rgba(255,255,255,0.3)", cursor: "pointer", transition: "all var(--t-fast)" }} />)}
                  </div>
                </div>
                {/* Thumbnail strip */}
                <div style={{ display: "flex", gap: "0.5rem", padding: "0.875rem" }}>
                  {[0,1,2,3,4].map((i) => (
                    <div key={i} onClick={() => setImgIdx(i)} style={{ width: "72px", height: "56px", borderRadius: "0.125rem", background: `linear-gradient(135deg, ${listing.accentColor}, var(--surface-container))`, border: i === imgIdx ? "2px solid var(--on-primary-container)" : "2px solid var(--ghost-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "border-color var(--t-fast)" }}>
                      <svg width={22} height={22} viewBox="0 0 64 64" fill="none" stroke={listing.iconColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.55 }}>
                        <circle cx="32" cy="14" r="6"/><path d="M20 38 C20 28 44 28 44 38 L44 48 L20 48 Z"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              {/* Title block */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div className="label-sm" style={{ color: "var(--on-primary-container)", marginBottom: "0.375rem" }}>{listing.faction} · {listing.subfaction}</div>
                <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.75rem" }}>{listing.title}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                  <span style={{ color: "var(--tertiary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <StarIcon size={14} color="var(--tertiary)" /> {listing.rating} <span style={{ color: "var(--outline)", fontWeight: 400 }}>({listing.reviews} reviews)</span>
                  </span>
                  <span style={{ color: "var(--outline)", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <MapPinIcon size={14} color="var(--outline)" />{listing.location}
                  </span>
                  <span style={{ color: "var(--outline)", fontSize: "0.875rem" }}>{listing.system}</span>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.875rem", marginBottom: "2rem" }}>
                {[{ label: "Points", value: `${listing.points}pts` },{ label: "Models", value: listing.models },{ label: "Ship", value: `${listing.turnaroundDays}d turn` },{ label: "Rentals", value: listing.hostRentals }].map(({ label, value }) => (
                  <div key={label} className="card" style={{ padding: "0.875rem", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--on-surface)" }}>{value}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--outline)", marginTop: "0.2rem" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: 0, borderBottom: "1px solid var(--ghost-border)", marginBottom: "1.5rem" }}>
                  {(["description", "includes", "rules"] as const).map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "0.625rem 1.25rem", background: "none", border: "none", borderBottom: activeTab === tab ? "2px solid var(--on-primary-container)" : "2px solid transparent", color: activeTab === tab ? "var(--on-surface)" : "var(--outline)", fontFamily: "var(--font-body)", fontSize: "0.9375rem", fontWeight: activeTab === tab ? 600 : 400, cursor: "pointer", textTransform: "capitalize", transition: "all var(--t-fast)", marginBottom: "-1px" }}>
                      {tab}
                    </button>
                  ))}
                </div>
                {activeTab === "description" && <div>{listing.description.split("\n\n").map((para, i) => <p key={i} style={{ marginBottom: "1rem", lineHeight: 1.8 }}>{para}</p>)}</div>}
                {activeTab === "includes" && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {listing.includes.map((unit) => (
                      <div key={unit} style={{ background: "var(--surface-container)", border: "1px solid var(--ghost-border)", borderRadius: "0.125rem", padding: "0.5rem 0.875rem", fontSize: "0.875rem", color: "var(--on-surface-variant)" }}>{unit}</div>
                    ))}
                  </div>
                )}
                {activeTab === "rules" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {listing.rules.map((rule, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.875rem", background: "var(--surface-container)", borderRadius: "0.125rem", borderLeft: "3px solid var(--on-primary-container)" }}>
                        <InfoIcon size={16} color="var(--on-primary-container)" />
                        <p style={{ margin: 0, fontSize: "0.9rem" }}>{rule}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviews */}
              <div>
                <h2 style={{ fontSize: "1.375rem", marginBottom: "1.5rem" }}>Reviews <span style={{ color: "var(--outline)", fontSize: "1rem", fontWeight: 400 }}>({listing.reviews})</span></h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {reviews.map((review) => (
                    <div key={review.author} className="card" style={{ padding: "1.25rem" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(250,105,0,0.2), var(--surface-container-highest))", border: "1px solid var(--ghost-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: 700, color: "var(--on-primary-container)" }}>
                            {review.author[0]}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--on-surface)" }}>{review.author}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>{review.date}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "2px" }}>{Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} size={13} color={i < review.rating ? "var(--tertiary)" : "var(--outline-variant)"} />)}</div>
                      </div>
                      <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.7 }}>{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Booking Panel ── */}
            <div style={{ position: "sticky", top: "5.5rem" }}>
              <div className="card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.375rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--on-surface)" }}>${listing.dailyRate}</span>
                  <span style={{ color: "var(--outline)" }}>/ day</span>
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--outline)", marginBottom: "1.25rem" }}>
                  ${listing.weeklyRate}/week · ${listing.replacementValue} deposit held
                </div>
                <div style={{ height: "1px", background: "var(--ghost-border)", marginBottom: "1.25rem" }} />

                {/* Date picker */}
                <div style={{ marginBottom: "1rem" }}>
                  <label className="label-sm" style={{ display: "block", marginBottom: "0.625rem" }}>Rental Period</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    {[{ label: "From", val: fromLabel }, { label: "To", val: toLabel }].map(({ label, val }) => (
                      <div key={label} onClick={() => { setCalendarOpen(!calendarOpen); if (label === "From") { setPickingStart(true); } }}>
                        <div className="label-sm" style={{ color: "var(--outline)", marginBottom: "0.25rem" }}>{label}</div>
                        <div style={{ padding: "0.625rem 0.875rem", background: "var(--surface-container)", border: "1.5px solid var(--ghost-border)", borderRadius: "0.125rem", fontSize: "0.875rem", color: val.includes("Select") ? "var(--outline)" : "var(--on-surface)", display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", transition: "border-color var(--t-fast)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--outline)")}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--ghost-border)")}
                        >
                          <CalendarIcon size={13} color="var(--outline)" />{val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calendar dropdown */}
                  {calendarOpen && (
                    <div style={{ background: "var(--surface-container)", border: "1px solid var(--ghost-border)", borderRadius: "0.25rem", padding: "1rem", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.875rem" }}>
                        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>March 2026</span>
                        <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>
                          {pickingStart ? "Select start date" : "Select end date"}
                        </div>
                      </div>
                      <MiniCalendar startDay={startDay} endDay={endDay} onSelect={handleDaySelect} />
                    </div>
                  )}
                </div>

                {/* Duration stepper */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--on-surface-variant)" }}>Duration</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button onClick={() => setRentalDays(Math.max(1, rentalDays - 1))} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--surface-container)", border: "1px solid var(--ghost-border)", color: "var(--on-surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontFamily: "var(--font-body)" }}>−</button>
                    <span style={{ fontWeight: 700, color: "var(--on-surface)", minWidth: "4ch", textAlign: "center" }}>{rentalDays}d</span>
                    <button onClick={() => setRentalDays(Math.min(30, rentalDays + 1))} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--surface-container)", border: "1px solid var(--ghost-border)", color: "var(--on-surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontFamily: "var(--font-body)" }}>+</button>
                  </div>
                </div>

                {/* Price breakdown */}
                <div style={{ background: "var(--surface-container)", borderRadius: "0.125rem", padding: "1rem", marginBottom: "1.25rem" }}>
                  {[
                    { label: `$${listing.dailyRate} × ${rentalDays} days`, val: `$${totalCost}` },
                    { label: "Service fee (12%)", val: `$${serviceFee}` },
                    { label: "Deposit hold (refundable)", val: `$${listing.replacementValue}` },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                      <span style={{ color: "var(--outline)" }}>{label}</span>
                      <span style={{ color: "var(--on-surface-variant)" }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ height: "1px", background: "var(--ghost-border)", margin: "0.75rem 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                    <span>Total charged today</span>
                    <span style={{ color: "var(--on-primary-container)" }}>${totalCost + serviceFee + listing.replacementValue}</span>
                  </div>
                </div>

                {/* KYC gate CTA */}
                {isVerified ? (
                  <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "0.125rem", padding: "0.5rem 0.875rem", marginBottom: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "#4ade80" }}>
                    <CheckCircleIcon size={14} color="#4ade80" /> Identity verified — ready to book
                  </div>
                ) : (
                  <div style={{ background: "rgba(250,105,0,0.06)", border: "1px solid rgba(250,105,0,0.2)", borderRadius: "0.125rem", padding: "0.5rem 0.875rem", marginBottom: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--on-primary-container)" }}>
                    <ShieldCheckIcon size={14} color="var(--on-primary-container)" /> Identity check required to book
                  </div>
                )}

                <button className="btn btn-primary btn-lg" style={{ width: "100%", marginBottom: "0.75rem" }} onClick={handleBookNow}>
                  {isVerified ? "Request to Book" : "Verify & Book"}
                </button>
                <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--outline)", margin: "0 0 0.5rem" }}>You won't be charged until the host accepts</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", marginTop: "1rem" }}>
                  {[{ label: "ID Verified", Icon: CheckCircleIcon },{ label: "Insured Ship", Icon: PackageIcon },{ label: "Deposit Safe", Icon: ShieldCheckIcon }].map(({ label, Icon }) => (
                    <span key={label} style={{ fontSize: "0.7rem", color: "var(--outline)", display: "flex", alignItems: "center", gap: "0.3rem", flexDirection: "column", textAlign: "center" }}>
                      <Icon size={16} color="var(--on-primary-container)" />{label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Host card */}
              <div className="card" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1rem" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(250,105,0,0.2), var(--surface-container-highest))", border: "2px solid var(--on-primary-container)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontWeight: 700, color: "var(--on-primary-container)", flexShrink: 0 }}>G</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--on-surface)" }}>{listing.host}</div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>Host since {listing.hostSince}</div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "var(--tertiary)" }}>{listing.rating}</div>
                    <div style={{ display: "flex", gap: "1px" }}>{Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} size={10} color="var(--tertiary)" />)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.875rem", fontSize: "0.8125rem", color: "var(--outline)", marginBottom: "0.875rem" }}>
                  <span><strong style={{ color: "var(--on-surface-variant)" }}>{listing.hostListings}</strong> listings</span>
                  <span><strong style={{ color: "var(--on-surface-variant)" }}>{listing.hostRentals}</strong> rentals</span>
                </div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8125rem", color: "#4ade80", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.3rem 0.75rem", borderRadius: "999px" }}>
                  <CheckCircleIcon size={13} color="#4ade80" /> Identity Verified
                </span>
                <Link href={`/profile/${listing.host}`} className="btn btn-ghost btn-sm" style={{ display: "block", textAlign: "center", marginTop: "0.875rem", width: "100%" }}>
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .listing-layout { display: grid; grid-template-columns: 1fr 360px; gap: 3rem; align-items: start; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes bounce { 0%,80%,100% { transform: scale(0); } 40% { transform: scale(1); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
        @media (max-width: 1024px) { .listing-layout { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
