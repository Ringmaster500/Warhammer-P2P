import Link from "next/link";
import { ShieldCheckIcon, PackageIcon, CheckCircleIcon, BanknoteIcon } from "@/components/Icons";

function ChevronIcon({ size = 16, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
}

const faqs = [
  {
    category: "For Renters",
    color: "rgba(1,92,185,0.12)",
    accent: "var(--on-secondary-container)",
    items: [
      { q: "What is War-Rent?", a: "War-Rent is a peer-to-peer marketplace where verified collectors lend their professionally painted Warhammer armies to other players who want to play without owning or painting their own force. Think of it as Airbnb, but for miniature armies." },
      { q: "How do I book an army?", a: "Browse the marketplace, pick an army, select your dates using the calendar picker, and click 'Request to Book.' The host has 24 hours to accept or decline. You're only charged once they accept." },
      { q: "Do I need to verify my identity?", a: "Yes. All renters must complete a one-time identity check via Stripe Identity before booking their first army. This protects hosts and keeps bad actors off the platform. The process takes under 2 minutes and only needs to be done once." },
      { q: "What happens if a model breaks during my rental?", a: "Minor wear (small chips, loose bases that pop off) is expected and covered. Significant damage — broken weapons, lost models, structural cracks — is deducted from your deposit. The host documents every model's condition pre-ship so there's no guesswork." },
      { q: "How does the deposit work?", a: "When you book, we authorize a hold on your card equal to the army's replacement value. This is NOT a charge — it's just held. When the army returns intact, the hold is released within 24 hours. You never see the money leave." },
      { q: "What if the army arrives damaged?", a: "Document everything immediately with photos. Open a dispute within 24 hours of receiving the army. Our admin team reviews condition photos from both sides and resolves fairly. If the host shipped damaged goods, your deposit is fully protected." },
      { q: "What armies are available?", a: "We currently have 40K (all editions), Age of Sigmar, The Old World, and Horus Heresy armies available from verified hosts across the US. Use the browse page to filter by faction, paint quality, and game system." },
    ],
  },
  {
    category: "For Hosts",
    color: "rgba(250,105,0,0.10)",
    accent: "var(--on-primary-container)",
    items: [
      { q: "How much can I earn?", a: "Hosts typically set rates of $12–$30/day depending on army quality and size. A well-painted 2,000pt army renting 8 days per month at $18/day generates ~$122/month after fees. High-demand factions can earn significantly more." },
      { q: "What is the platform fee?", a: "War-Rent takes 15% of each booking total. This covers payment processing, insurance, dispute resolution, and the Shippo shipping label generation. You keep 85%." },
      { q: "What if a renter damages my army?", a: "Every renter passes identity verification and has a deposit held equal to your declared replacement value. If damage occurs, you raise a dispute, submit your condition photos, and our admin team reviews. Verified damage is paid from the renter's held deposit." },
      { q: "How do payouts work?", a: "Payouts are processed via Stripe Connect directly to your bank account. Once a rental completes (army returned and 24-hour review window passes), funds are transferred within 2–5 business days." },
      { q: "Can I block out dates?", a: "Yes. Every listing has a built-in availability calendar. Block out any dates you need the army for yourself — conventions, your own games, maintenance windows. Renters can only book within your open availability." },
      { q: "What if I need to cancel a booking?", a: "Hosts can cancel accepted bookings up to 72 hours before the ship date without penalty. Cancellations inside 72 hours incur a small fee (5% of the booking value) to compensate the renter for last-minute inconvenience." },
    ],
  },
  {
    category: "Shipping & Logistics",
    color: "rgba(244,191,63,0.08)",
    accent: "var(--tertiary)",
    items: [
      { q: "Who pays for shipping?", a: "Shipping is included in the rental fee and managed by War-Rent. We generate pre-paid Shippo labels for both legs of the trip — outbound (host to renter) and return (renter to host)." },
      { q: "Are armies insured during shipping?", a: "All packages are shipped with carrier liability coverage. For high-value armies, we recommend hosts declare the full replacement value when we generate the label — this costs a small premium but covers loss or damage in transit." },
      { q: "How long does shipping take?", a: "Most hosts use USPS Priority Mail (2–3 days) or UPS Ground depending on distance. The listing specifies the host's turnaround window — typically 1–2 days to pack and ship after acceptance." },
      { q: "What packaging standard is required?", a: "All armies must ship in foam-padded cases or double-boxed with foam inserts. Hosts must photograph every model and the full packed case before sealing. These photos become the condition baseline and protect both parties." },
    ],
  },
];

export const metadata = {
  title: "FAQ & Trust — War-Rent",
  description: "Everything you need to know about renting and hosting on War-Rent. How identity verification, deposits, shipping, and dispute resolution work.",
};

export default function TrustFAQPage() {
  return (
    <>
      {/* Header */}
      <section style={{ background: "linear-gradient(160deg, rgba(250,105,0,0.06) 0%, var(--surface-dim) 50%)", borderBottom: "1px solid var(--ghost-border)", padding: "8rem 1.5rem 4rem" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>Trust & Safety</div>
          <h1 style={{ marginBottom: "1rem" }}>
            How War-Rent <span className="gradient-text">protects everyone</span>
          </h1>
          <p style={{ fontSize: "1.125rem", maxWidth: "560px" }}>
            Every rental is built on three pillars: verified identity, held deposits, and insured shipping. Here's exactly how it works.
          </p>
        </div>
      </section>

      {/* Trust pillars */}
      <section className="section bg-shift" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }} className="trust-pillars">
            {[
              { Icon: CheckCircleIcon, title: "Identity Verified", desc: "Every renter passes Stripe Identity before their first booking. ID + liveness check.", color: "#4ade80", bg: "rgba(34,197,94,0.10)", border: "rgba(34,197,94,0.25)" },
              { Icon: ShieldCheckIcon, title: "Deposit Protected", desc: "A refundable hold equal to replacement value is authorized — not charged — before shipping.", color: "var(--on-primary-container)", bg: "rgba(250,105,0,0.10)", border: "rgba(250,105,0,0.25)" },
              { Icon: PackageIcon, title: "Insured Shipping", desc: "Pre-paid Shippo labels both ways. Packages tracked and covered against transit damage.", color: "var(--tertiary)", bg: "rgba(244,191,63,0.10)", border: "rgba(244,191,63,0.25)" },
              { Icon: BanknoteIcon, title: "Auto Payouts", desc: "Host receives payment via Stripe Connect within 2–5 days of completed, undisputed return.", color: "var(--on-secondary-container)", bg: "rgba(1,92,185,0.10)", border: "rgba(1,92,185,0.25)" },
            ].map(({ Icon, title, desc, color, bg, border }) => (
              <div key={title} className="card" style={{ padding: "1.5rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "0.125rem", background: bg, border: `1px solid ${border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <Icon size={24} color={color} />
                </div>
                <h3 style={{ fontSize: "1.0625rem", marginBottom: "0.5rem" }}>{title}</h3>
                <p style={{ fontSize: "0.875rem", margin: 0, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Rental Lifecycle */}
      <section className="section bg-floor">
        <div className="container" style={{ maxWidth: "860px" }}>
          <div className="section-tag" style={{ marginBottom: "1.25rem" }}>The Full Journey</div>
          <h2 style={{ marginBottom: "2.5rem" }}>Lifecycle of a rental</h2>
          <div style={{ position: "relative" }}>
            {[
              { step: "01", title: "Browse & Book", desc: "Renter picks an army, selects dates, and submits a request. Host has 24 hours to accept.", color: "var(--on-primary-container)" },
              { step: "02", title: "Identity Check", desc: "First-time renters complete Stripe Identity. Takes 2 minutes. Done once, applies forever.", color: "var(--on-primary-container)" },
              { step: "03", title: "Payment Authorized", desc: "Rental fee + service fee charged. Replacement value authorized as a hold (not charged).", color: "var(--on-secondary-container)" },
              { step: "04", title: "Condition Photos", desc: "Host photographs every model and the packed case. Photos uploaded to the booking record.", color: "var(--tertiary)" },
              { step: "05", title: "Outbound Ship", desc: "Pre-paid Shippo label revealed. Host ships double-boxed with foam. Tracking shared automatically.", color: "var(--tertiary)" },
              { step: "06", title: "Army Deployed", desc: "Renter receives the army. Booking status moves to Active. The game is on.", color: "#4ade80" },
              { step: "07", title: "Return Ship", desc: "Renter photographs army and packs it identically. Return label revealed. Ships back.", color: "#4ade80" },
              { step: "08", title: "Host Confirms", desc: "Host receives army, compares against pre-ship photos. Confirms condition or opens a dispute.", color: "#4ade80" },
              { step: "09", title: "Funds Released", desc: "After 24-hour window with no dispute, deposit hold is released and host receives payout.", color: "var(--on-primary-container)" },
            ].map((item, i) => (
              <div key={item.step} style={{ display: "flex", gap: "1.5rem", marginBottom: "1.75rem" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `${item.color}18`, border: `1.5px solid ${item.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.8125rem", color: item.color }}>
                    {item.step}
                  </div>
                  {i < 8 && <div style={{ width: "1px", flex: 1, background: "var(--ghost-border)", marginTop: "4px", minHeight: "24px" }} />}
                </div>
                <div style={{ paddingTop: "0.625rem", paddingBottom: "1rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--on-surface)", marginBottom: "0.25rem" }}>{item.title}</div>
                  <p style={{ fontSize: "0.9rem", margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-shift">
        <div className="container" style={{ maxWidth: "860px" }}>
          <div className="section-tag" style={{ marginBottom: "1.25rem" }}>Common Questions</div>
          <h2 style={{ marginBottom: "2.5rem" }}>Frequently asked questions</h2>
          {faqs.map((category) => (
            <div key={category.category} style={{ marginBottom: "3rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "0.125rem", background: category.color, marginBottom: "1.5rem" }}>
                <span style={{ fontWeight: 700, fontSize: "0.875rem", color: category.accent, letterSpacing: "0.05em" }}>{category.category}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {category.items.map((item, i) => (
                  <details key={i} style={{ borderBottom: "1px solid var(--ghost-border)" }}>
                    <summary style={{ padding: "1.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", listStyle: "none", fontWeight: 600, fontSize: "1rem", color: "var(--on-surface)", gap: "1rem" }}>
                      {item.q}
                      <span style={{ flexShrink: 0, color: "var(--outline)" }}><ChevronIcon size={16} /></span>
                    </summary>
                    <p style={{ paddingBottom: "1.25rem", margin: 0, lineHeight: 1.8, fontSize: "0.9375rem" }}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-floor">
        <div className="container" style={{ maxWidth: "640px", textAlign: "center" }}>
          <div className="section-tag" style={{ margin: "0 auto 1.5rem", display: "inline-flex" }}>Ready to Deploy?</div>
          <h2 style={{ marginBottom: "1rem" }}>Still have questions?</h2>
          <p style={{ marginBottom: "2.5rem" }}>
            Reach out to us directly. We're a small team and we actually respond.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/browse" className="btn btn-primary btn-lg">Browse Armies →</Link>
            <a href="mailto:support@warrent.gg" className="btn btn-secondary btn-lg">Email Support</a>
          </div>
        </div>
      </section>

      <style>{`
        .trust-pillars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        @media (max-width: 900px) { .trust-pillars { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .trust-pillars { grid-template-columns: 1fr !important; } }
        details[open] > summary span { transform: rotate(90deg); }
        details > summary span { transition: transform 200ms ease; display: inline-block; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>
    </>
  );
}
