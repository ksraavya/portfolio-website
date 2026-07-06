"use client";

import { useEffect, useState } from "react";
import TypeWriter from "@/components/ui/TypeWriter";
import { siteConfig, typewriterLines } from "@/lib/portfolio-data";

export default function Hero() {
  const [hackerMode, setHackerMode] = useState(false);
  const [showHackerOverlay, setShowHackerOverlay] = useState(false);

  // Konami code easter egg: ↑↑↓↓←→←→BA
  useEffect(() => {
    const sequence = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let progress = 0;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === sequence[progress]) {
        progress++;
        if (progress === sequence.length) {
          progress = 0;
          triggerHackerMode();
        }
      } else {
        progress = e.key === sequence[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const triggerHackerMode = () => {
    setShowHackerOverlay(true);
    document.body.classList.add("hacker-mode");
    setTimeout(() => {
      setShowHackerOverlay(false);
      document.body.classList.remove("hacker-mode");
    }, 3000);
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const openChat = () => {
    // Dispatches a custom event that ChatWidget listens to
    window.dispatchEvent(new CustomEvent("open-chat"));
  };

  return (
    <section
      id="home"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "0 1.5rem",
        paddingTop: "clamp(5rem, 12vh, 8rem)",
        paddingBottom: "3rem",
      }}
    >
      {/* Hacker mode overlay */}
      {showHackerOverlay && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            animation: "fadeOverlay 3s forwards",
          }}
        >
          <style>{`
            @keyframes fadeOverlay {
              0% { opacity: 0; }
              10% { opacity: 1; }
              80% { opacity: 1; }
              100% { opacity: 0; }
            }
            @keyframes glitch {
              0%, 100% { transform: translate(0); }
              20% { transform: translate(-4px, 2px); }
              40% { transform: translate(4px, -2px); }
              60% { transform: translate(-2px, 4px); }
              80% { transform: translate(2px, -4px); }
            }
          `}</style>
          <p style={{ color: "#ff2222", fontSize: "0.85rem", letterSpacing: "0.2em", marginBottom: "1rem" }}>
            ⚠ SYSTEM BREACH DETECTED ⚠
          </p>
          <p
            style={{
              color: "#ff4444",
              fontSize: "clamp(2rem, 8vw, 5rem)",
              fontWeight: 700,
              letterSpacing: "0.05em",
              animation: "glitch 0.3s infinite",
            }}
          >
            SRAAVYA
          </p>
          <p style={{ color: "#ff2222", fontSize: "0.85rem", marginTop: "1rem", letterSpacing: "0.15em" }}>
            nice try. she already knows. 😄
          </p>
        </div>
      )}

      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Eyebrow */}
        <p
          className="section-label"
          style={{ marginBottom: "1.5rem" , fontSize: "1.5rem" }}
        >
          hey, I&apos;m
        </p>

        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 10vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
            color: "var(--text-primary)",
          }}
        >
          {siteConfig.name}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>

        {/* Typewriter */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
            fontWeight: 500,
            color: "var(--text-secondary)",
            marginBottom: "2.5rem",
            minHeight: "2.5rem",
          }}
        >
          <TypeWriter lines={typewriterLines} />
        </div>

        {/* Sub-description */}
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1rem",
            maxWidth: "540px",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          CS (Data Science) student · Building at the intersection of
          AI, data intelligence, and security · Currently:{" "}
          <span style={{ color: "var(--accent-bright)" }}>
            {siteConfig.currentlyBuilding}
          </span>
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={scrollToProjects}
            style={{
              padding: "0.75rem 1.75rem",
              borderRadius: "8px",
              background: "var(--accent)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View my work
          </button>

          <button
            onClick={openChat}
            style={{
              padding: "0.75rem 1.75rem",
              borderRadius: "8px",
              background: "transparent",
              color: "var(--accent-bright)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "0.95rem",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s, transform 0.2s",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.4)";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Ask my AI twin ✦
          </button>
        </div>        
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, transparent, var(--accent))",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
        <style>{`@keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }`}</style>
      </div>
    </section>
  );
}