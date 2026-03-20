import Link from "next/link";
import { SwordsIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "var(--surface-dim)", padding: "2rem 1.5rem", textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(250,105,0,0.04), transparent 70%)", pointerEvents: "none" }} />

      <div className="section-tag" style={{ margin: "0 auto 2rem", display: "inline-flex" }}>
        <SwordsIcon size={11} color="var(--outline)" />
        <span>Error 404</span>
      </div>

      <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(6rem, 20vw, 14rem)", fontWeight: 900, lineHeight: 0.85, letterSpacing: "-0.05em", marginBottom: "2rem" }}>
        <span className="gradient-text">404</span>
      </div>

      <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", marginBottom: "1rem" }}>
        Army Not Found
      </h1>
      <p style={{ fontSize: "1.0625rem", maxWidth: "440px", marginBottom: "3rem" }}>
        The unit you're looking for has been recalled. Either this page doesn't exist, or it's been deployed elsewhere.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/" className="btn btn-primary btn-lg">Back to Command ↗</Link>
        <Link href="/browse" className="btn btn-secondary btn-lg">Browse Armies</Link>
      </div>
    </div>
  );
}
