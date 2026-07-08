"use client";

import React, { useState, useEffect } from "react";
import { projects } from "@/lib/portfolio-data";

// ─── Devicon CDN map ────────────────────────────────────────────────────────
const DEVICON_MAP: Record<string, string> = {
  "Python":         "python",
  "RAG":           "openai",
  "Open AI API":   "openai",
  "OpenAI":        "openai",
  "LLM Evaluation":"fastapi",
  "PyTorch":       "pytorch",
  "Gymnasium":     "python",
  "NumPy":         "numpy",
  "NetworkX":      "python",
  "Gephi":         "python",
  "spaCy":         "python",
  "React":         "react",
  "Next.js":       "nextjs",
  "TypeScript":    "typescript",
  "JavaScript":    "javascript",
  "Node.js":       "nodejs",
  "FastAPI":       "fastapi",
  "Docker":        "docker",
  "Scikit-learn":  "scikitlearn",
  "TensorFlow":    "tensorflow",
  "Pandas":        "pandas",
  "Jupyter":       "jupyter",
  "Git":           "git",
  "AWS":           "amazonwebservices",
  "GCP":           "googlecloud",
  "PostgreSQL":    "postgresql",
  "MongoDB":       "mongodb",
  "Redis":         "redis",
  "Streamlit":     "streamlit",
};

// Project images mapped from /public/projects/
const PROJECT_IMAGES: Record<string, string> = {
  pipeline: "/projects/rag.png",
  rl:       "/projects/content-integrity.png",
  graph:    "/projects/blueorbit.png",
  anomaly:  "/projects/streamsentry.png",
};

const ACCENTS: Record<string, string> = {
  pipeline: "#06b6d4",
  rl:       "#818cf8",
  graph:    "#06b6d4",
  anomaly:  "#818cf8",
};

// ─── Tech Badge with devicon ────────────────────────────────────────────────
function TechBadge({ tech, accent }: { tech: string; accent: string }) {
  const icon = DEVICON_MAP[tech];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.35rem",
      fontFamily: "var(--font-mono)", fontSize: "0.7rem",
      padding: "0.3rem 0.7rem", borderRadius: "6px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.6)",
      transition: "all 0.2s",
    }}>
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
          alt={tech}
          width={13}
          height={13}
          style={{ objectFit: "contain", flexShrink: 0 }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      )}
      {tech}
    </span>
  );
}

// ─── Circular Project Emblem ────────────────────────────────────────────────
function ProjectScreen({ src, accent, label }: { src: string; accent: string; label: string }) {
  return (
    <div style={{
      position: "relative",
      borderRadius: "50%",
      overflow: "hidden",
      border: `2px solid ${accent}44`,
      background: "#05080f",
      boxShadow: `0 0 35px ${accent}22, inset 0 0 20px rgba(0,0,0,0.6)`,
      width: "220px",
      height: "220px",
      margin: "0 auto", // Centers it inside the right-hand column panel
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}>
      {/* Screenshot / Logo Graphic */}
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", 
            display: "block",
            filter: "brightness(0.9) saturate(1.05)",
          }}
        />
        {/* Scanline overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
          pointerEvents: "none",
        }}/>
        {/* Accent vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(circle at 50% 50%, transparent 50%, rgba(5,8,15,0.4) 100%)`,
          pointerEvents: "none",
        }}/>
      </div>
    </div>
  );
}

// ─── Inline visuals (for modal) ─────────────────────────────────────────────
function PipelineVisual() {
  const [active, setActive] = useState(0);
  const steps = ["Input", "Retrieve", "Generate", "Judge"];
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % steps.length), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" }}>
      {steps.map((step, i) => (
        <div key={step} style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{
            fontFamily:"var(--font-mono)", fontSize:"0.8rem",
            padding:"0.4rem 1rem", borderRadius:"6px",
            border:`1px solid ${active===i ? "#06b6d4" : "rgba(6,182,212,0.2)"}`,
            color: active===i ? "#06b6d4" : "rgba(255,255,255,0.3)",
            background: active===i ? "rgba(6,182,212,0.12)" : "transparent",
            transition:"all 0.3s ease",
          }}>{step}</span>
          {i < steps.length-1 && <span style={{ color:"rgba(255,255,255,0.25)" }}>→</span>}
        </div>
      ))}
    </div>
  );
}

function GraphVisual() {
  const nodes = [
    { label:"India", x:50, y:15 },{ label:"NATO", x:12, y:58 },
    { label:"China", x:85, y:52 },{ label:"UN", x:50, y:90 },{ label:"EU", x:15, y:22 },
  ];
  const edges = [[0,1],[0,2],[0,3],[1,3],[2,3],[1,4],[0,4]];
  return (
    <svg width="100%" height="140" viewBox="0 0 100 100">
      {edges.map(([a,b],i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(129,140,248,0.4)" strokeWidth="0.8"/>
      ))}
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="4.5" fill="#818cf8" opacity="0.9"/>
          <text x={n.x} y={n.y-8} textAnchor="middle"
            style={{ fontSize:"5.5px", fill:"rgba(255,255,255,0.7)", fontFamily:"monospace" }}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function AnomalyVisual() {
  const pts = [10,12,11,13,10,12,11,10,42,11,12,10,13,11,10];
  const max = Math.max(...pts);
  const w = 100/(pts.length-1);
  const d = pts.map((p,i) => `${i===0?"M":"L"} ${i*w} ${55-(p/max)*48}`).join(" ");
  return (
    <div>
      <svg width="100%" height="70" viewBox="0 0 100 60" preserveAspectRatio="none">
        <path d={d} fill="none" stroke="rgba(129,140,248,0.8)" strokeWidth="1.2"/>
        <circle cx={8*w} cy={55-(42/max)*48} r="3" fill="#f87171">
          <animate attributeName="opacity" values="1;0.1;1" dur="1.2s" repeatCount="indefinite"/>
        </circle>
        <line x1={8*w} y1="0" x2={8*w} y2="60"
          stroke="rgba(248,113,113,0.3)" strokeWidth="1" strokeDasharray="3 2"/>
      </svg>
      <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"#f87171", marginTop:"0.3rem" }}>
        ↑ anomaly detected — ~3% adversarial injection rate
      </p>
    </div>
  );
}

function AgentVisual({ active }: { active: boolean }) {
  const [text, setText] = useState("");
  const full = "evaluating agent reasoning policy...";
  useEffect(() => {
    if (!active) { setText(""); return; }
    let i = 0;
    const t = setInterval(() => { i++; setText(full.slice(0,i)); if(i>=full.length) clearInterval(t); }, 55);
    return () => clearInterval(t);
  }, [active]);
  if (!active) return null;
  return (
    <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.8rem" }}>
      <p style={{ color:"rgba(255,255,255,0.35)", marginBottom:"0.5rem" }}>{">"} state_machine.run()</p>
      <p style={{ color:"#06b6d4" }}>{">"} {text}<span style={{ animation:"blink 1s step-end infinite" }}>_</span></p>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  );
}

const VISUALS: Record<string, (active: boolean) => React.ReactElement | null> = {
  pipeline: () => <PipelineVisual />,
  graph:    () => <GraphVisual />,
  anomaly:  () => <AnomalyVisual />,
  rl:       (a) => <AgentVisual active={a} />,
};

// ─── Modal (Clean Text & Visual Layout) ──────────────────────────────────────
function ProjectModal({ project, accent, onClose }: {
  project: typeof projects[0]; accent: string; onClose: () => void;
}) {
  const Visual = VISUALS[project.visual];

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key==="Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(0,0,0,0.85)", backdropFilter:"blur(16px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"2rem", animation:"fadeIn 0.2s ease",
    }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>
      <div onClick={(e) => e.stopPropagation()} style={{
        width:"100%", maxWidth:"900px", maxHeight:"85vh",
        background:"rgba(8,10,20,0.98)",
        border:`1px solid ${accent}44`,
        borderRadius:"20px", overflow:"hidden",
        display:"flex", flexDirection:"column",
        boxShadow:`0 0 120px ${accent}18, 0 40px 80px rgba(0,0,0,0.8)`,
        animation:"slideUp 0.25s ease",
      }}>
        {/* Accent top border bar */}
        <div style={{ height:"3px", background:`linear-gradient(90deg, ${accent}, ${accent}55, transparent)`, flexShrink:0 }}/>

        {/* Header Section */}
        <div style={{
          padding:"2.5rem 2.5rem 1.5rem",
          borderBottom:"1px solid rgba(255,255,255,0.06)",
          flexShrink:0, display:"flex", justifyContent:"space-between", alignItems:"flex-start",
        }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.5rem" }}>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.72rem", color:accent, opacity:0.7 }}>
                // {project.visual}
              </span>
              {project.featured && (
                <span style={{
                  fontFamily:"var(--font-mono)", fontSize:"0.62rem",
                  padding:"0.15rem 0.6rem", borderRadius:"999px",
                  background:`${accent}18`, border:`1px solid ${accent}44`,
                  color:accent, letterSpacing:"0.08em",
                }}>featured</span>
              )}
            </div>
            <h2 style={{
              fontFamily:"var(--font-display)",
              fontSize:"clamp(1.5rem, 3vw, 2rem)",
              fontWeight:800, color:"#fff", margin:0, lineHeight:1.2,
            }}>{project.title}</h2>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.8rem", color:"rgba(255,255,255,0.4)", marginTop:"0.5rem" }}>
              {project.subtitle}
            </p>
          </div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)",
            color:"rgba(255,255,255,0.5)", borderRadius:"10px",
            width:"40px", height:"40px", cursor:"pointer", fontSize:"1rem",
            display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
            marginLeft:"1.5rem", transition:"all 0.2s",
          }}
          onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color="#fff";}}
          onMouseLeave={(e)=>{e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>
            ✕
          </button>
        </div>

        {/* Content Body — Smoothly handles split columns right out of the gate */}
        <div style={{ overflowY:"auto", flex:1, padding: "2.5rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:"3rem" }}>
            
            {/* Left Column: Project Documentation & Details */}
            <div>
              <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"0.98rem", lineHeight:1.8, marginBottom:"2rem" }}>
                {project.description}
              </p>
              <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"rgba(255,255,255,0.3)", letterSpacing:"0.15em", marginBottom:"1rem" }}>
                KEY HIGHLIGHTS
              </p>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 2.5rem", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
                {project.highlights.map((h,i) => (
                  <li key={i} style={{ display:"flex", gap:"0.75rem", fontSize:"0.9rem", color:"rgba(255,255,255,0.65)", lineHeight:1.6 }}>
                    <span style={{ color:accent, flexShrink:0 }}>▸</span>{h}
                  </li>
                ))}
              </ul>
              
              {/* Action Buttons */}
              <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                {project.github && !project.github.includes("TODO") && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontFamily:"var(--font-mono)", fontSize:"0.82rem",
                      padding:"0.6rem 1.4rem", borderRadius:"10px",
                      background:`${accent}18`, border:`1px solid ${accent}55`,
                      color:accent, textDecoration:"none", transition:"background 0.2s",
                    }}
                    onMouseEnter={(e)=>e.currentTarget.style.background=`${accent}30`}
                    onMouseLeave={(e)=>e.currentTarget.style.background=`${accent}18`}
                  >↗ GitHub</a>
                )}
                {project.demo && !project.demo.includes("TODO") && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    style={{
                      fontFamily:"var(--font-mono)", fontSize:"0.82rem",
                      padding:"0.6rem 1.4rem", borderRadius:"10px",
                      background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)",
                      color:"#fff", textDecoration:"none",
                    }}
                  >↗ Live Demo</a>
                )}
              </div>
            </div>

            {/* Right Column: Live Data Visuals & Stack Information */}
            <div style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
              {/* The Live Supporting Graphic Component */}
              <div style={{
                padding:"1.75rem", borderRadius:"12px",
                background:"rgba(0,0,0,0.4)",
                border:"1px solid rgba(255,255,255,0.06)",
                boxShadow: `0 10px 30px rgba(0,0,0,0.2)`
              }}>
                <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"rgba(255,255,255,0.2)", marginBottom:"1.25rem", letterSpacing:"0.12em" }}>
                  // LIVE COMPONENT VISUAL
                </p>
                {Visual && Visual(true)}
              </div>
              
              {/* Tech Stack Matrix */}
              <div>
                <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"rgba(255,255,255,0.25)", letterSpacing:"0.15em", marginBottom:"0.85rem" }}>
                  TECH STACK
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                  {project.stack.map((tech) => (
                    <TechBadge key={tech} tech={tech} accent={accent} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Projects Section ───────────────────────────────────────────────────
export default function Projects() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="projects" style={{ position:"relative", zIndex:1, padding:"0 0 6rem" }}>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px currentColor; }
          50% { opacity: 0.5; box-shadow: 0 0 20px currentColor; }
        }
      `}</style>

      {/* Timeline line — Shifted way closer right beside the cards */}
      <div style={{
        position:"absolute", left:"5rem", top:0, bottom:0,
        width:"3px",
        background:"linear-gradient(to bottom, rgba(129,92,246,0.8) 0%, rgba(6,182,212,0.8) 50%, transparent 100%)",
        boxShadow:"0 0 14px rgba(129,92,246,0.4)",
      }}/>

      {/* Tight container wrapper padding to flush line against card boundaries */}
      <div style={{ maxWidth:"1240px", margin:"0 auto", padding:"0 1.5rem 0 2rem" }}>
        {projects.map((project, i) => {
          const accent = ACCENTS[project.visual] ?? "#818cf8";
          const imageSrc = PROJECT_IMAGES[project.visual];
          const isHovered = hoveredCard === i;

          return (
            <div key={project.title} style={{ position:"relative", marginBottom:"2rem" }}>
              {/* Timeline dot — Recalibrated precisely to line up over the new tight position */}
              <div style={{
                position:"absolute", left:"-1.42rem", top:"2.3rem",
                width:"14px", height:"14px", borderRadius:"50%",
                background: isHovered ? accent : `${accent}88`,
                boxShadow: isHovered ? `0 0 0 5px ${accent}22, 0 0 18px ${accent}` : `0 0 8px ${accent}66`,
                border:`3px solid var(--bg-primary, #060810)`,
                transition:"all 0.3s ease",
                zIndex:2,
              }}/>

              {/* ── Card ── */}
              <div
                onClick={() => setActiveModal(i)}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius:"16px",
                  border:`1px solid ${isHovered ? `${accent}55` : "rgba(255,255,255,0.07)"}`,
                  background: isHovered
                    ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(${accent === "#06b6d4" ? "6,182,212" : "129,140,248"},0.04) 100%)`
                    : "rgba(255,255,255,0.025)",
                  backdropFilter:"blur(16px)",
                  overflow:"hidden",
                  transition:"border-color 0.3s, transform 0.3s, box-shadow 0.3s, background 0.3s",
                  transform: isHovered ? "translateX(6px)" : "translateX(0)",
                  boxShadow: isHovered
                    ? `0 16px 60px rgba(0,0,0,0.6), 0 0 0 1px ${accent}22, 0 0 60px ${accent}0a`
                    : "0 4px 20px rgba(0,0,0,0.2)",
                  cursor:"pointer",
                }}
              >
                {/* Accent top bar */}
                <div style={{
                  height:"2px",
                  background:`linear-gradient(90deg, ${accent}, ${accent}44, transparent)`,
                  transition:"opacity 0.3s",
                  opacity: isHovered ? 1 : 0.6,
                }}/>

                {/* Card body */}
                <div style={{ padding:"2rem 2.25rem", display:"flex", gap:"2.5rem", alignItems:"stretch" }}>

                  {/* ── Left: text ── */}
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                    {/* Number + featured */}
                    <div style={{ display:"flex", alignItems:"center", gap:"0.9rem" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.72rem", color:accent, opacity:0.65 }}>
                        {String(i+1).padStart(2,"0")}
                      </span>
                      {project.featured && (
                        <span style={{
                          fontFamily:"var(--font-mono)", fontSize:"0.6rem",
                          padding:"0.18rem 0.6rem", borderRadius:"999px",
                          background:`${accent}18`, border:`1px solid ${accent}44`,
                          color:accent, letterSpacing:"0.1em",
                        }}>featured</span>
                      )}
                    </div>

                    {/* Title + subtitle */}
                    <div>
                      <h3 style={{
                        fontFamily:"var(--font-display)",
                        fontSize:"clamp(1.3rem, 2.5vw, 1.65rem)",
                        fontWeight:800, color:"#ffffff",
                        margin:"0 0 0.4rem", lineHeight:1.2,
                        textShadow: "0 2px 10px rgba(255,255,255,0.05)"
                      }}>{project.title}</h3>
                      <p style={{
                        fontFamily:"var(--font-mono)", fontSize:"0.76rem",
                        color:"rgba(255,255,255,0.45)", margin:0,
                      }}>{project.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize:"0.9rem", color:"rgba(255,255,255,0.6)",
                      lineHeight:1.75, margin:0,
                    }}>{project.description}</p>

                    {/* Tech stack */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", marginTop:"auto", paddingTop:"0.5rem" }}>
                      {project.stack.map((tech) => (
                        <TechBadge key={tech} tech={tech} accent={accent} />
                      ))}
                    </div>
                  </div>

                  {/* ── Right: Image container ── */}
                  <div style={{ width: "340px", display: "flex", flexDirection: "column", gap: "1rem", flexShrink: 0, justifyContent: "space-between" }}>
                    <ProjectScreen src={imageSrc} accent={accent} label={`${project.title.toLowerCase().split(" ").slice(0,2).join("-")}.demo`} />

                    {/* Action links */}
                    <div style={{ display:"flex", gap:"0.5rem", justifyContent:"flex-end" }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveModal(i); }}
                        style={{
                          fontFamily:"var(--font-body)", fontSize:"0.82rem", fontWeight:500,
                          padding:"0.55rem 1.2rem", borderRadius:"8px",
                          background:`${accent}22`, border:`1px solid ${accent}55`,
                          color:accent, cursor:"pointer",
                          transition:"all 0.2s",
                          whiteSpace:"nowrap",
                        }}
                        onMouseEnter={(e)=>{e.currentTarget.style.background=`${accent}38`; e.currentTarget.style.borderColor=accent;}}
                        onMouseLeave={(e)=>{e.currentTarget.style.background=`${accent}22`; e.currentTarget.style.borderColor=`${accent}55`;}}
                      >
                        View Details →
                      </button>
                      {project.github && !project.github.includes("TODO") && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontFamily:"var(--font-mono)", fontSize:"0.75rem",
                            padding:"0.55rem 1rem", borderRadius:"8px",
                            background:"rgba(255,255,255,0.06)",
                            border:"1px solid rgba(255,255,255,0.12)",
                            color:"rgba(255,255,255,0.5)", textDecoration:"none",
                            transition:"all 0.2s",
                            display:"flex", alignItems:"center",
                          }}
                          onMouseEnter={(e)=>{e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.color="#fff";}}
                          onMouseLeave={(e)=>{e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="rgba(255,255,255,0.5)";}}
                        >↗ GitHub</a>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeModal !== null && (
        <ProjectModal
          project={projects[activeModal]}
          accent={ACCENTS[projects[activeModal].visual] ?? "#818cf8"}
          onClose={() => setActiveModal(null)}
        />
      )}
    </section>
  );
}