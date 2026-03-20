"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  StarIcon,
  ShieldCheckIcon,
  PackageIcon,
  CheckCircleIcon,
  MedalIcon,
  SwordsIcon,
  BanknoteIcon,
  TruckIcon,
} from "@/components/Icons";

/* ─── Icons ──────────────────────────────────────────────── */
function PlusIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function EditIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function EyeIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function ClockIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function AlertIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function DollarIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function XIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ─── Mock Data ───────────────────────────────────────────── */
const mockUser = { name: "GrimDarkGary", role: "host", kycStatus: "verified", payoutConnected: true, rating: 4.9, reviews: 23, memberSince: "March 2024" };

const mockListings = [
  { id: 1, title: "Ultramarines 2,000pt Assault Force", faction: "Space Marines", dailyRate: 18, status: "active" as const, views: 142, bookings: 3, rating: 4.9 },
  { id: 2, title: "Salamanders Siege Breakers", faction: "Space Marines", dailyRate: 20, status: "rented" as const, views: 88, bookings: 1, rating: 5.0 },
  { id: 3, title: "Chaos Undivided Warband", faction: "Chaos Space Marines", dailyRate: 16, status: "draft" as const, views: 0, bookings: 0, rating: 0 },
];

const mockBookings = [
  {
    id: "BK-0041",
    army: "Ultramarines 2,000pt Assault Force",
    renter: "WarbossWendy",
    renterVerified: true,
    from: "Mar 22",
    to: "Mar 29",
    days: 7,
    daily: 18,
    total: 126,
    deposit: 650,
    status: "pending" as const,
    message: "Looking to use these at a local RTT. Very experienced player, 23 previous rentals on other platforms.",
  },
  {
    id: "BK-0038",
    army: "Salamanders Siege Breakers",
    renter: "Mordecai_40K",
    renterVerified: true,
    from: "Mar 15",
    to: "Mar 22",
    days: 7,
    daily: 20,
    total: 140,
    deposit: 720,
    status: "active" as const,
    message: "",
  },
  {
    id: "BK-0031",
    army: "Ultramarines 2,000pt Assault Force",
    renter: "PrimarchsNephew",
    renterVerified: true,
    from: "Feb 28",
    to: "Mar 7",
    days: 7,
    daily: 18,
    total: 126,
    deposit: 650,
    status: "complete" as const,
    message: "",
  },
];

const stats = [
  { label: "Total Earned", value: "$612", sub: "this month", Icon: DollarIcon, color: "#22c55e" },
  { label: "Active Rentals", value: "1", sub: "in the field", Icon: TruckIcon, color: "var(--on-primary-container)" },
  { label: "Avg. Rating", value: "4.9★", sub: "across 23 reviews", Icon: StarIcon, color: "var(--tertiary)" },
  { label: "Total Bookings", value: "27", sub: "all time", Icon: MedalIcon, color: "var(--on-secondary-container)" },
];

const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
  pending:  { bg: "rgba(249,115,22,0.12)", color: "#fb923c", label: "Pending Approval" },
  active:   { bg: "rgba(34,197,94,0.10)",  color: "#4ade80", label: "Active / In Field" },
  complete: { bg: "rgba(100,116,139,0.12)", color: "#94a3b8", label: "Completed" },
  rented:   { bg: "rgba(34,197,94,0.10)",  color: "#4ade80", label: "Currently Rented" },
  draft:    { bg: "rgba(100,116,139,0.12)", color: "#64748b", label: "Draft" },
};

type TabId = "overview" | "bookings" | "listings" | "payouts" | "settings";

/* ─── Booking Modal ───────────────────────────────────────── */
function BookingModal({ booking, onClose }: { booking: typeof mockBookings[0]; onClose: () => void }) {
  const [action, setAction] = useState<null | "accepted" | "declined">(null);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(12,13,16,0.85)", backdropFilter: "blur(8px)" }} onClick={onClose} />
      <div className="card" style={{ position: "relative", width: "100%", maxWidth: "520px", padding: "2rem", overflow: "visible", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <div>
            <div className="label-sm" style={{ color: "var(--on-primary-container)", marginBottom: "0.5rem" }}>{booking.id}</div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.25rem" }}>{booking.army}</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--outline)", padding: "0.25rem" }}>
            <XIcon size={20} />
          </button>
        </div>

        {/* Renter info */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", background: "var(--surface-container)", borderRadius: "0.25rem", padding: "1rem", marginBottom: "1.25rem" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(250,105,0,0.2), var(--surface-container-high))", border: "2px solid var(--on-primary-container)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--on-primary-container)", flexShrink: 0 }}>
            {booking.renter[0]}
          </div>
          <div>
            <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {booking.renter}
              {booking.renterVerified && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", fontSize: "0.7rem", color: "#4ade80", background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.15rem 0.5rem", borderRadius: "999px", fontWeight: 600 }}>
                  <CheckCircleIcon size={10} color="#4ade80" /> VERIFIED
                </span>
              )}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>Identity confirmed via Stripe Identity</div>
          </div>
        </div>

        {/* Booking details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.25rem" }}>
          {[
            { label: "Rental Period", val: `${booking.from} – ${booking.to}` },
            { label: "Duration", val: `${booking.days} days` },
            { label: "Rental Fee", val: `$${booking.total}` },
            { label: "Deposit Held", val: `$${booking.deposit}` },
          ].map(({ label, val }) => (
            <div key={label} style={{ background: "var(--surface-container)", borderRadius: "0.125rem", padding: "0.75rem 1rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--outline)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{label}</div>
              <div style={{ fontWeight: 700, color: "var(--on-surface)" }}>{val}</div>
            </div>
          ))}
        </div>

        {booking.message && (
          <div style={{ background: "var(--surface-container)", borderRadius: "0.125rem", padding: "1rem", marginBottom: "1.25rem", borderLeft: "3px solid var(--on-primary-container)" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--outline)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.375rem" }}>Renter's Note</div>
            <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{booking.message}</p>
          </div>
        )}

        {!action && booking.status === "pending" ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <button onClick={() => setAction("declined")} className="btn btn-ghost" style={{ width: "100%", borderColor: "rgba(239,68,68,0.3)", color: "#f87171" }}>
              Decline
            </button>
            <button onClick={() => setAction("accepted")} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Accept Booking
            </button>
          </div>
        ) : action ? (
          <div style={{
            padding: "1.25rem", borderRadius: "0.125rem", textAlign: "center",
            background: action === "accepted" ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
            border: `1px solid ${action === "accepted" ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
          }}>
            <p style={{ margin: 0, fontWeight: 600, color: action === "accepted" ? "#4ade80" : "#f87171" }}>
              {action === "accepted" ? "✓ Booking Accepted — Stripe will charge the renter." : "✗ Booking Declined — Renter has been notified."}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);
  const [kycModal, setKycModal] = useState(false);
  const [payoutModal, setPayoutModal] = useState(false);

  const tabs: { id: TabId; label: string; Icon: React.FC<{ size?: number; color?: string }> }[] = [
    { id: "overview",  label: "Overview",   Icon: SwordsIcon },
    { id: "bookings",  label: "Bookings",   Icon: ClockIcon },
    { id: "listings",  label: "Listings",   Icon: MedalIcon },
    { id: "payouts",   label: "Payouts",    Icon: BanknoteIcon },
    { id: "settings",  label: "Settings",   Icon: ShieldCheckIcon },
  ];

  return (
    <>
      {/* KYC Modal */}
      {kycModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(12,13,16,0.85)", backdropFilter: "blur(8px)" }} onClick={() => setKycModal(false)} />
          <div className="card" style={{ position: "relative", width: "100%", maxWidth: "480px", padding: "2.5rem", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(250,105,0,0.12)", border: "2px solid var(--on-primary-container)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                <ShieldCheckIcon size={28} color="var(--on-primary-container)" />
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Identity Verification</h3>
              <p style={{ fontSize: "0.925rem" }}>War-Rent uses Stripe Identity to verify all users. This protects hosts and renters alike.</p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {["Government-issued ID scan", "Quick selfie check", "Takes under 2 minutes", "Your data stays private"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <CheckCircleIcon size={16} color="var(--on-primary-container)" />
                  <span style={{ fontSize: "0.9rem", color: "var(--on-surface-variant)" }}>{item}</span>
                </li>
              ))}
            </ul>
            <button className="btn btn-primary btn-lg" style={{ width: "100%", marginBottom: "0.75rem" }} onClick={() => setKycModal(false)}>
              Start Verification (Stripe)
            </button>
            <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--outline)", margin: 0 }}>Requires real Stripe Identity API key to function.</p>
          </div>
        </div>
      )}

      {/* Payout Modal */}
      {payoutModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(12,13,16,0.85)", backdropFilter: "blur(8px)" }} onClick={() => setPayoutModal(false)} />
          <div className="card" style={{ position: "relative", width: "100%", maxWidth: "480px", padding: "2.5rem", zIndex: 1 }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(34,197,94,0.10)", border: "2px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                <BanknoteIcon size={28} color="#22c55e" />
              </div>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Connect Bank Account</h3>
              <p style={{ fontSize: "0.925rem" }}>Link your bank via Stripe Connect to receive payouts within 2-5 business days of each completed rental.</p>
            </div>
            <div style={{ background: "var(--surface-container)", borderRadius: "0.25rem", padding: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.8125rem", color: "var(--outline)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Payout Schedule</div>
              {[
                { label: "After return confirmed", val: "24 hours" },
                { label: "Bank transfer speed", val: "2–5 business days" },
                { label: "Platform fee", val: "15% per booking" },
                { label: "Minimum payout", val: "$10" },
              ].map(({ label, val }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", paddingBottom: "0.5rem", marginBottom: "0.5rem", borderBottom: "1px solid var(--ghost-border)" }}>
                  <span style={{ color: "var(--outline)" }}>{label}</span>
                  <span style={{ color: "var(--on-surface)", fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-lg" style={{ width: "100%", marginBottom: "0.75rem" }} onClick={() => setPayoutModal(false)}>
              Connect via Stripe Connect
            </button>
            <p style={{ textAlign: "center", fontSize: "0.8125rem", color: "var(--outline)", margin: 0 }}>Requires real Stripe Connect API key to function.</p>
          </div>
        </div>
      )}

      {/* Booking modal */}
      {selectedBooking && <BookingModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}

      {/* ── Page Layout ── */}
      <div style={{ paddingTop: "4.5rem", minHeight: "100vh", background: "var(--surface-dim)" }}>
        {/* Top bar */}
        <div style={{ background: "var(--surface-container-low)", borderBottom: "1px solid var(--ghost-border)", padding: "2rem 1.5rem 0" }}>
          <div className="container">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div className="label-sm" style={{ color: "var(--on-primary-container)", marginBottom: "0.5rem" }}>Host Command Center</div>
                <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "0.25rem" }}>
                  {mockUser.name}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8125rem", color: "#4ade80", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.25rem 0.75rem", borderRadius: "999px" }}>
                    <CheckCircleIcon size={12} color="#4ade80" /> Identity Verified
                  </span>
                  {mockUser.payoutConnected && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8125rem", color: "#4ade80", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", padding: "0.25rem 0.75rem", borderRadius: "999px" }}>
                      <BanknoteIcon size={12} color="#4ade80" /> Payouts Connected
                    </span>
                  )}
                  <span style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>Member since {mockUser.memberSince}</span>
                </div>
              </div>
              <Link href="/list" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <PlusIcon size={14} color="currentColor" /> New Listing
              </Link>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.875rem 1.25rem", background: "none", border: "none",
                    borderBottom: activeTab === tab.id ? "2px solid var(--on-primary-container)" : "2px solid transparent",
                    cursor: "pointer", whiteSpace: "nowrap", fontFamily: "var(--font-body)",
                    fontSize: "0.9rem", fontWeight: activeTab === tab.id ? 600 : 400,
                    color: activeTab === tab.id ? "var(--on-surface)" : "var(--outline)",
                    marginBottom: "-1px", transition: "all var(--t-fast)",
                  }}
                >
                  <tab.Icon size={14} color={activeTab === tab.id ? "var(--on-primary-container)" : "var(--outline)"} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="section" style={{ paddingTop: "2.5rem" }}>
          <div className="container">

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div>
                {/* Pending booking alert */}
                {mockBookings.some((b) => b.status === "pending") && (
                  <div style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: "0.25rem", padding: "1rem 1.25rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <AlertIcon size={18} color="var(--on-primary-container)" />
                      <span style={{ fontWeight: 600, color: "var(--on-primary-container)" }}>
                        You have {mockBookings.filter((b) => b.status === "pending").length} pending booking request
                        {mockBookings.filter((b) => b.status === "pending").length > 1 ? "s" : ""} awaiting your response.
                      </span>
                    </div>
                    <button onClick={() => setActiveTab("bookings")} className="btn btn-sm" style={{ background: "rgba(250,105,0,0.15)", border: "1px solid var(--on-primary-container)", color: "var(--on-primary-container)" }}>
                      Review Now →
                    </button>
                  </div>
                )}

                {/* Stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }} className="dash-stats-grid">
                  {stats.map(({ label, value, sub, Icon, color }) => (
                    <div key={label} className="card" style={{ padding: "1.5rem", overflow: "visible" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "0.125rem", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={20} color={color} />
                        </div>
                      </div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--on-surface-variant)", marginTop: "0.375rem" }}>{label}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--outline)", marginTop: "0.2rem" }}>{sub}</div>
                    </div>
                  ))}
                </div>

                {/* Recent bookings */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem", alignItems: "start" }} className="dash-main-grid">
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                      <h2 style={{ fontSize: "1.25rem" }}>Recent Bookings</h2>
                      <button onClick={() => setActiveTab("bookings")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--on-primary-container)", fontSize: "0.875rem", fontWeight: 600 }}>View all →</button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {mockBookings.map((booking) => (
                        <div key={booking.id} className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", cursor: "pointer" }} onClick={() => setSelectedBooking(booking)}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                              <span className="label-sm" style={{ color: "var(--outline)" }}>{booking.id}</span>
                              <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: statusStyles[booking.status].bg, color: statusStyles[booking.status].color }}>
                                {statusStyles[booking.status].label}
                              </span>
                            </div>
                            <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--on-surface)", marginBottom: "0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{booking.army}</div>
                            <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>
                              by <span style={{ color: "var(--on-surface-variant)" }}>{booking.renter}</span> · {booking.from} – {booking.to}
                            </div>
                          </div>
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 700, color: "var(--on-surface)" }}>${booking.total}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>{booking.days} days</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--outline)", marginBottom: "1.25rem" }}>Quick Actions</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <Link href="/list" className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.875rem", textDecoration: "none" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "0.125rem", background: "rgba(250,105,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <PlusIcon size={16} color="var(--on-primary-container)" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--on-surface)" }}>List New Army</div>
                          <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>Add to your arsenal</div>
                        </div>
                      </Link>
                      <button onClick={() => setKycModal(true)} className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.875rem", textAlign: "left", border: "none", cursor: "pointer", width: "100%" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "0.125rem", background: "rgba(34,197,94,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <ShieldCheckIcon size={16} color="#4ade80" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#4ade80" }}>Identity Verified ✓</div>
                          <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>Stripe Identity</div>
                        </div>
                      </button>
                      <button onClick={() => setPayoutModal(true)} className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "0.875rem", textAlign: "left", border: "none", cursor: "pointer", width: "100%" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "0.125rem", background: "rgba(34,197,94,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <BanknoteIcon size={16} color="#4ade80" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#4ade80" }}>Payouts Connected ✓</div>
                          <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>Stripe Connect</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── BOOKINGS ── */}
            {activeTab === "bookings" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>All Bookings</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="card" style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.5rem" }}>
                            <span className="label-sm" style={{ color: "var(--outline)" }}>{booking.id}</span>
                            <span style={{ padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: statusStyles[booking.status].bg, color: statusStyles[booking.status].color }}>
                              {statusStyles[booking.status].label}
                            </span>
                          </div>
                          <h3 style={{ fontSize: "1.125rem", marginBottom: "0.375rem" }}>{booking.army}</h3>
                          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "0.875rem", color: "var(--outline)" }}>Renter: <span style={{ color: "var(--on-surface-variant)", fontWeight: 600 }}>{booking.renter}</span></span>
                            <span style={{ fontSize: "0.875rem", color: "var(--outline)" }}>{booking.from} – {booking.to} ({booking.days} days)</span>
                            <span style={{ fontSize: "0.875rem", color: "var(--on-surface)", fontWeight: 700 }}>${booking.total} + ${booking.deposit} deposit</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "0.625rem" }}>
                          <button onClick={() => setSelectedBooking(booking)} className="btn btn-secondary btn-sm">
                            <EyeIcon size={13} color="currentColor" /> Details
                          </button>
                          {booking.status === "pending" && (
                            <button onClick={() => setSelectedBooking(booking)} className="btn btn-primary btn-sm">
                              Respond →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── LISTINGS ── */}
            {activeTab === "listings" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "1.5rem" }}>Your Listings</h2>
                  <Link href="/list" className="btn btn-primary btn-sm">
                    <PlusIcon size={13} color="currentColor" /> New Listing
                  </Link>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {mockListings.map((listing) => (
                    <div key={listing.id} className="card" style={{ padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.375rem" }}>
                          <span style={{ padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: statusStyles[listing.status].bg, color: statusStyles[listing.status].color }}>
                            {statusStyles[listing.status].label}
                          </span>
                        </div>
                        <h3 style={{ fontSize: "1.125rem", marginBottom: "0.25rem" }}>{listing.title}</h3>
                        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.875rem", color: "var(--outline)" }}>{listing.faction}</span>
                          <span style={{ fontSize: "0.875rem", color: "var(--outline)" }}><strong style={{ color: "var(--on-surface)" }}>{listing.views}</strong> views</span>
                          <span style={{ fontSize: "0.875rem", color: "var(--outline)" }}><strong style={{ color: "var(--on-surface)" }}>{listing.bookings}</strong> bookings</span>
                          {listing.rating > 0 && <span style={{ fontSize: "0.875rem", color: "var(--tertiary)" }}>★ {listing.rating}</span>}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700 }}>${listing.dailyRate}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>/ day</div>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Link href={`/listing/${listing.id}`} className="btn btn-ghost btn-sm">
                            <EyeIcon size={13} />
                          </Link>
                          <button className="btn btn-secondary btn-sm">
                            <EditIcon size={13} color="currentColor" /> Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── PAYOUTS ── */}
            {activeTab === "payouts" && (
              <div>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Payout History</h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem", alignItems: "start" }} className="dash-main-grid">
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { date: "Mar 10, 2026", army: "Ultramarines Assault Force", amount: 107, fee: 19, status: "paid" },
                      { date: "Feb 18, 2026", army: "Ultramarines Assault Force", amount: 107, fee: 19, status: "paid" },
                      { date: "Feb 2, 2026",  army: "Salamanders Siege Breakers", amount: 119, fee: 21, status: "paid" },
                      { date: "Mar 22, 2026", army: "Ultramarines Assault Force", amount: 107, fee: 19, status: "pending" },
                    ].map((p, i) => (
                      <div key={i} className="card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                        <div>
                          <div style={{ fontWeight: 600, marginBottom: "0.2rem" }}>{p.army}</div>
                          <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>{p.date}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontWeight: 700, color: "var(--on-surface)" }}>${p.amount}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--outline)" }}>after ${p.fee} fee</div>
                          </div>
                          <span style={{ padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 600, background: p.status === "paid" ? "rgba(34,197,94,0.10)" : "rgba(249,115,22,0.10)", color: p.status === "paid" ? "#4ade80" : "#fb923c" }}>
                            {p.status === "paid" ? "Paid" : "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="card" style={{ padding: "1.5rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--outline)", marginBottom: "1.25rem" }}>Payout Summary</div>
                    {[
                      { label: "This month", val: "$612" },
                      { label: "Last month", val: "$340" },
                      { label: "All time", val: "$2,814" },
                      { label: "Platform fees paid", val: "$498" },
                    ].map(({ label, val }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", padding: "0.5rem 0", borderBottom: "1px solid var(--ghost-border)" }}>
                        <span style={{ color: "var(--outline)" }}>{label}</span>
                        <span style={{ fontWeight: 700, color: "var(--on-surface)" }}>{val}</span>
                      </div>
                    ))}
                    <button onClick={() => setPayoutModal(true)} className="btn btn-primary" style={{ width: "100%", marginTop: "1.25rem" }}>
                      Manage Bank Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── SETTINGS ── */}
            {activeTab === "settings" && (
              <div style={{ maxWidth: "640px" }}>
                <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Account Settings</h2>
                <div className="card" style={{ padding: "1.75rem", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "1.25rem" }}>Profile</h3>
                  {["Display Name", "Email", "Location"].map((field, i) => (
                    <div key={field} style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--on-surface-variant)", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>{field.toUpperCase()}</label>
                      <input className="input" type={field === "Email" ? "email" : "text"} defaultValue={field === "Display Name" ? "GrimDarkGary" : field === "Email" ? "gary@warrent.gg" : "Austin, TX"} />
                    </div>
                  ))}
                  <button className="btn btn-primary" style={{ marginTop: "0.5rem" }}>Save Changes</button>
                </div>

                <div className="card" style={{ padding: "1.75rem", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "1.25rem" }}>Notifications</h3>
                  {[
                    { label: "New booking requests", sub: "Get notified immediately by email" },
                    { label: "Booking confirmations", sub: "When a renter accepts or declines" },
                    { label: "Payout processed", sub: "When funds hit your bank account" },
                    { label: "Dispute updates", sub: "If a renter raises a condition issue" },
                  ].map((item, i) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid var(--ghost-border)" }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--on-surface)" }}>{item.label}</div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--outline)" }}>{item.sub}</div>
                      </div>
                      <ToggleSwitch defaultOn={i < 3} />
                    </div>
                  ))}
                </div>

                <div className="card" style={{ padding: "1.75rem", borderTop: "3px solid rgba(239,68,68,0.3)" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#f87171" }}>Danger Zone</h3>
                  <p style={{ fontSize: "0.9rem", marginBottom: "1.25rem" }}>Deleting your account will remove all listings and cannot be undone.</p>
                  <button className="btn btn-ghost" style={{ color: "#f87171", borderColor: "rgba(239,68,68,0.3)" }}>Delete Account</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dash-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dash-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .dash-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}

function ToggleSwitch({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div onClick={() => setOn(!on)} style={{
      width: "44px", height: "24px", borderRadius: "999px",
      background: on ? "var(--on-primary-container)" : "var(--surface-container-highest)",
      position: "relative", cursor: "pointer", transition: "background var(--t-fast)", flexShrink: 0,
      border: "1px solid rgba(70,70,75,0.4)",
    }}>
      <div style={{
        position: "absolute", top: "3px", left: on ? "calc(100% - 19px)" : "3px",
        width: "16px", height: "16px", borderRadius: "50%", background: "white",
        transition: "left var(--t-fast)", boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
      }} />
    </div>
  );
}
