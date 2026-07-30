"use client";

import { useRef, useState } from "react";
import { experiences } from "@/lib/portfolio-data";

// Match accents used in Projects for consistent branding
const EXPERIENCE_ACCENTS: Record<string, string> = {
  "I4C, Ministry of Home Affairs": "#06b6d4", // Cyan
  "SentinelOne": "#818cf8",                  // Indigo
  "Infosys Springboard": "#a78bfa",          // Bright Violet
};

export default function Experience() {
  const [activeId, setActiveId] = useState<string | null>(experiences[0]?.company || null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 1, padding: "0 0 6rem" }}
    >
      {/* Full section timeline spine */}
      <div
        style={{
          position: "absolute",
          left: "5rem",
          top: 0,
          bottom: 0,
          width: "3px",
          background:
            "linear-gradient(to bottom, rgba(6,182,212,0.8) 0%, rgba(129,140,248,0.8) 50%, transparent 100%)",
          boxShadow: "0 0 14px rgba(129,92,246,0.3)",
        }}
      />

      {/* Main Container aligned with Projects section */}
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 1.5rem 0 2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {experiences.map((exp) => {
            const isActive = activeId === exp.company;
            const isHovered = hoveredCard === exp.company;
            const accent = EXPERIENCE_ACCENTS[exp.shortName] ?? "#818cf8";

            return (
              <div
                key={exp.company}
                style={{ position: "relative" }}
              >
                {/* Glow Timeline Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.42rem",
                    top: "2.3rem",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: isHovered || isActive ? accent : `${accent}88`,
                    boxShadow:
                      isHovered || isActive
                        ? `0 0 0 5px ${accent}22, 0 0 18px ${accent}`
                        : `0 0 8px ${accent}66`,
                    border: `3px solid var(--bg-primary, #060810)`,
                    transition: "all 0.3s ease",
                    zIndex: 2,
                  }}
                />

                {/* Card Container */}
                <div
                  onClick={() => setActiveId(isActive ? null : exp.company)}
                  onMouseEnter={() => setHoveredCard(exp.company)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    borderRadius: "16px",
                    border: `1px solid ${
                      isActive || isHovered ? `${accent}55` : "rgba(255,255,255,0.07)"
                    }`,
                    background:
                      isActive || isHovered
                        ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(${
                            accent === "#06b6d4" ? "6,182,212" : "129,140,248"
                          },0.05) 100%)`
                        : "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(16px)",
                    overflow: "hidden",
                    transition:
                      "border-color 0.3s, transform 0.3s, box-shadow 0.3s, background 0.3s",
                    transform: isHovered ? "translateX(6px)" : "translateX(0)",
                    boxShadow:
                      isActive || isHovered
                        ? `0 16px 60px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22, 0 0 60px ${accent}0a`
                        : "0 4px 20px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    padding: "2rem 2.25rem",
                  }}
                >
                  {/* Top Accent Gradient Bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)`,
                      opacity: isActive || isHovered ? 1 : 0.4,
                      transition: "opacity 0.3s",
                    }}
                  />

                  {/* Header Row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "1.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: "260px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "0.4rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            fontFamily: "var(--font-display, sans-serif)",
                            margin: 0,
                          }}
                        >
                          {exp.role}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.65rem",
                            fontFamily: "var(--font-mono, monospace)",
                            color: accent,
                            background: `${accent}18`,
                            border: `1px solid ${accent}44`,
                            borderRadius: "999px",
                            padding: "0.15rem 0.6rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          Internship
                        </span>
                      </div>

                      <div
                        style={{
                          fontSize: "0.95rem",
                          color: "rgba(255,255,255,0.65)",
                          fontFamily: "var(--font-body, sans-serif)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span>{exp.company}</span>
                        {exp.govTooltip && (
                          <span
                            title={exp.govTooltip}
                            style={{
                              cursor: "help",
                              fontSize: "0.85rem",
                            }}
                          >
                            🇮🇳
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stat Badge & Period */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1.5rem",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          textAlign: "right",
                          padding: "0.5rem 1rem",
                          borderRadius: "10px",
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: accent,
                            lineHeight: 1,
                          }}
                        >
                          {exp.impactNumber}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "0.62rem",
                            color: "rgba(255,255,255,0.4)",
                            marginTop: "3px",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {exp.impactLabel}
                        </div>
                      </div>

                      <div
                        style={{
                          fontFamily: "var(--font-mono, monospace)",
                          fontSize: "0.78rem",
                          color: "rgba(255,255,255,0.45)",
                          textAlign: "right",
                        }}
                      >
                        {exp.period}
                        <div
                          style={{
                            fontSize: "0.7rem",
                            color: "rgba(255,255,255,0.25)",
                            marginTop: "2px",
                          }}
                        >
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  {isActive && (
                    <ul
                      style={{
                        marginTop: "1.5rem",
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.85rem",
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                        paddingTop: "1.25rem",
                        listStyle: "none",
                      }}
                    >
                      {exp.highlights.map((bullet, i) => (
                        <li
                          key={i}
                          style={{
                            display: "flex",
                            gap: "0.75rem",
                            fontSize: "0.9rem",
                            color: "rgba(255,255,255,0.7)",
                            lineHeight: 1.65,
                            fontFamily: "var(--font-body, sans-serif)",
                          }}
                        >
                          <span style={{ color: accent, flexShrink: 0 }}>▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Toggle Indicator Hint */}
                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "0.72rem",
                      color: isActive ? accent : "rgba(255,255,255,0.3)",
                      fontFamily: "var(--font-mono, monospace)",
                      userSelect: "none",
                    }}
                  >
                    <span>{isActive ? "— Click to collapse details" : "+ Click to expand details"}</span>
                    <span style={{ fontSize: "0.85rem" }}>{isActive ? "↑" : "↓"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}