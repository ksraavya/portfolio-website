"use client";

import { useEffect, useState } from "react";
import TypeWriter from "@/components/ui/TypeWriter";
import Terminal from "@/components/ui/Terminal";
import { siteConfig, typewriterLines } from "@/lib/portfolio-data";

export default function Hero() {
    const [showHackerOverlay, setShowHackerOverlay] = useState(false);

    useEffect(() => {
        const sequence = [
            "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
            "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
            "b", "a",
        ];
        let progress = 0;

        const handleKey = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement).tagName === "INPUT") return;
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
        }, 3500);
    };

    const scrollToProjects = () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    };

    const openChat = () => {
        window.dispatchEvent(new CustomEvent("open-chat"));
    };

    const downloadCV = () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Sraavya_Kochhar_Resume.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section
            style={{
                position: "relative",
                zIndex: 1,
                padding: "0 1.5rem",
                paddingTop: "clamp(5rem, 12vh, 8rem)",
                paddingBottom: "3rem",
            }}
        >
            {/* Hacker overlay */}
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
                        animation: "fadeOverlay 4s forwards",
                    }}
                >
                    <style>{`
            @keyframes fadeOverlay { 0%{opacity:0} 10%{opacity:1} 80%{opacity:1} 100%{opacity:0} }
          `}</style>
                    <div style={{ border: "1px solid #ff2222", padding: "2.5rem 3rem", maxWidth: "480px", width: "90%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <p style={{ color: "#ff2222", fontSize: "0.75rem", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>⚠ SYSTEM BREACH DETECTED</p>
                        <p style={{ color: "#ff4444", fontSize: "0.8rem", letterSpacing: "0.1em" }}>UNAUTHORIZED INPUT SEQUENCE</p>
                        <p style={{ color: "#fff", fontSize: "0.8rem" }}>Identity: <span style={{ color: "#ff4444" }}>VERIFIED</span></p>
                        <p style={{ color: "#fff", fontSize: "0.8rem" }}>Threat Level: <span style={{ color: "#00ff88" }}>NONE</span></p>
                        <p style={{ color: "#fff", fontSize: "0.8rem" }}>Curiosity Score: <span style={{ color: "#00ff88" }}>100%</span></p>
                        <p style={{ color: "#aaa", fontSize: "0.8rem", marginTop: "0.5rem" }}>Welcome, fellow nerd.</p>
                    </div>
                </div>
            )}

            {/* Two column layout */}
            <div
                className="container hero-grid"
                style={{
                    maxWidth: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "6rem",
                    alignItems: "center",
                    marginLeft: "2rem",
                    paddingRight: "0",
                }}
            >
                {/* LEFT */}
                <div>
                    <p className="section-label" style={{ marginBottom: "1.5rem", fontSize: "1rem" }}>
                        hey, i&apos;m
                    </p>

                    <h1
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(3rem, 8vw, 6rem)",
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

                    <div
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                            fontWeight: 500,
                            color: "var(--text-secondary)",
                            marginBottom: "2rem",
                            minHeight: "2.2rem",
                        }}
                    >
                        <TypeWriter lines={typewriterLines} />
                    </div>

                    <p
                        style={{
                            color: "var(--text-secondary)",
                            fontSize: "0.95rem",
                            maxWidth: "480px",
                            lineHeight: 1.7,
                            marginBottom: "2.5rem",
                        }}
                    >
                        CS (Data Science) student · Building at the intersection of AI,
                        data intelligence, and security · Currently:{" "}
                        <span style={{ color: "var(--accent-bright)" }}>
                            {siteConfig.currentlyBuilding}
                        </span>
                    </p>

                    {/* CTAs */}
                    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                        <button
                            onClick={scrollToProjects}
                            style={{ padding: "0.7rem 1.5rem", borderRadius: "8px", background: "var(--accent)", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9rem", border: "none", cursor: "pointer", transition: "opacity 0.2s, transform 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            View my work
                        </button>

                        <button
                            onClick={openChat}
                            style={{ padding: "0.7rem 1.5rem", borderRadius: "8px", background: "transparent", color: "var(--accent-bright)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9rem", border: "1px solid rgba(139, 92, 246, 0.4)", cursor: "pointer", transition: "border-color 0.2s, background 0.2s, transform 0.2s", backdropFilter: "blur(8px)" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.4)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            Ask my AI twin ✦
                        </button>

                        <button
                            onClick={downloadCV}
                            style={{ padding: "0.7rem 1.5rem", borderRadius: "8px", background: "transparent", color: "var(--text-secondary)", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9rem", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", transition: "border-color 0.2s, color 0.2s, transform 0.2s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            Resume ↓
                        </button>
                    </div>
                </div>

                {/* RIGHT — terminal */}
                <div style={{
                    position: "absolute",
                    right: "1.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    paddingTop: "15rem",
                    paddingRight: "5rem"
                }}>
                    <Terminal />
                </div>
            </div>

            {/* Mobile: stack columns */}
            <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
        </section>
    );
}