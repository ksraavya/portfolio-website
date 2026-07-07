"use client";

import React, { useState, useEffect } from "react";
import { projects } from "@/lib/portfolio-data";

const ACCENTS: Record<string, string> = {
  pipeline: "#06b6d4",
  rl:       "#818cf8",
  graph:    "#06b6d4",
  anomaly:  "#818cf8",
};

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
      background:"rgba(0,0,0,0.8)", backdropFilter:"blur(12px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"2rem", animation:"fadeIn 0.2s ease",
    }}>
      <style>{`
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(30px);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>
      <div onClick={(e) => e.stopPropagation()} style={{
        width:"100%", maxWidth:"860px", maxHeight:"90vh",
        background:"rgba(10,12,20,0.97)",
        border:`1px solid ${accent}55`,
        borderRadius:"20px", overflow:"hidden",
        display:"flex", flexDirection:"column",
        boxShadow:`0 0 100px ${accent}18, 0 40px 80px rgba(0,0,0,0.7)`,
        animation:"slideUp 0.25s ease",
      }}>
        {/* Accent bar */}
        <div style={{ height:"3px", background:`linear-gradient(90deg, ${accent}, ${accent}44, transparent)`, flexShrink:0 }}/>

        {/* Header */}
        <div style={{
          padding:"2rem 2.5rem 1.5rem",
          borderBottom:"1px solid rgba(255,255,255,0.07)",
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
              fontSize:"clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight:700, color:"#fff", margin:0, lineHeight:1.2,
            }}>{project.title}</h2>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.78rem", color:"rgba(255,255,255,0.35)", marginTop:"0.5rem" }}>
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

        {/* Body */}
        <div style={{ overflowY:"auto", flex:1, padding:"2rem 2.5rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2.5rem" }}>
            {/* Left */}
            <div>
              <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.95rem", lineHeight:1.8, marginBottom:"2rem" }}>
                {project.description}
              </p>
              <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"rgba(255,255,255,0.3)", letterSpacing:"0.15em", marginBottom:"1rem" }}>
                KEY HIGHLIGHTS
              </p>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 2rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                {project.highlights.map((h,i) => (
                  <li key={i} style={{ display:"flex", gap:"0.75rem", fontSize:"0.88rem", color:"rgba(255,255,255,0.6)", lineHeight:1.6 }}>
                    <span style={{ color:accent, flexShrink:0 }}>▸</span>{h}
                  </li>
                ))}
              </ul>
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

            {/* Right */}
            <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem" }}>
              <div style={{
                padding:"1.5rem", borderRadius:"12px",
                background:"rgba(0,0,0,0.5)",
                border:"1px solid rgba(255,255,255,0.07)",
              }}>
                <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"rgba(255,255,255,0.2)", marginBottom:"1rem", letterSpacing:"0.12em" }}>
                  // {project.visual === "pipeline" ? "rag pipeline" : project.visual === "graph" ? "entity graph" : project.visual === "anomaly" ? "anomaly stream" : "rl agent"}
                </p>
                {Visual && Visual(true)}
              </div>
              <div>
                <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", color:"rgba(255,255,255,0.25)", letterSpacing:"0.15em", marginBottom:"0.75rem" }}>
                  TECH STACK
                </p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                  {project.stack.map((tech) => (
                    <span key={tech} style={{
                      fontFamily:"var(--font-mono)", fontSize:"0.72rem",
                      padding:"0.3rem 0.75rem", borderRadius:"999px",
                      background:"rgba(255,255,255,0.07)",
                      border:"1px solid rgba(255,255,255,0.12)",
                      color:"rgba(255,255,255,0.65)",
                    }}>{tech}</span>
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

export default function Projects() {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <section id="projects" style={{ position:"relative", zIndex:1, padding:"0 0 5rem" }}>
      {/* Left timeline line */}
      <div style={{
        position:"absolute", left:"2rem", top:0, bottom:0,
        width:"1px",
        background:"linear-gradient(to bottom, rgba(139,92,246,0.4), rgba(6,182,212,0.4), transparent)",
      }}/>

      <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"0 4rem 0 5rem" }}>
        {projects.map((project, i) => {
          const accent = ACCENTS[project.visual] ?? "#818cf8";
          return (
            <div key={project.title} style={{ position:"relative", marginBottom:"1.5rem" }}>
              {/* Timeline dot */}
              <div style={{
                position:"absolute", left:"-3.35rem", top:"2rem",
                width:"10px", height:"10px", borderRadius:"50%",
                background:accent, boxShadow:`0 0 12px ${accent}`,
                border:"2px solid var(--bg-primary)",
              }}/>

              {/* Card */}
              <div
                style={{
                  borderRadius:"16px",
                  border:"1px solid rgba(255,255,255,0.08)",
                  background:"rgba(255,255,255,0.03)",
                  backdropFilter:"blur(16px)",
                  overflow:"hidden",
                  transition:"border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                  cursor:"pointer",
                }}
                onMouseEnter={(e)=>{
                  e.currentTarget.style.borderColor=`${accent}66`;
                  e.currentTarget.style.transform="translateX(6px)";
                  e.currentTarget.style.boxShadow=`0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px ${accent}22`;
                }}
                onMouseLeave={(e)=>{
                  e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";
                  e.currentTarget.style.transform="translateX(0)";
                  e.currentTarget.style.boxShadow="none";
                }}
              >
                {/* Accent top bar */}
                <div style={{ height:"3px", background:`linear-gradient(90deg, ${accent}, ${accent}44, transparent)` }}/>

                <div style={{ padding:"2rem 2.5rem", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"2rem" }}>
                  {/* Left */}
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"0.75rem" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem", color:accent, opacity:0.7 }}>
                        {String(i+1).padStart(2,"0")}
                      </span>
                      {project.featured && (
                        <span style={{
                          fontFamily:"var(--font-mono)", fontSize:"0.62rem",
                          padding:"0.2rem 0.65rem", borderRadius:"999px",
                          background:`${accent}18`, border:`1px solid ${accent}44`,
                          color:accent, letterSpacing:"0.08em",
                        }}>featured</span>
                      )}
                    </div>

                    <h3 style={{
                      fontFamily:"var(--font-display)",
                      fontSize:"clamp(1.2rem, 2.5vw, 1.6rem)",
                      fontWeight:700, color:"#fff",
                      margin:"0 0 0.4rem", lineHeight:1.2,
                    }}>{project.title}</h3>

                    <p style={{
                      fontFamily:"var(--font-mono)", fontSize:"0.78rem",
                      color:"rgba(255,255,255,0.4)", margin:"0 0 1.25rem",
                    }}>{project.subtitle}</p>

                    <p style={{
                      fontSize:"0.9rem", color:"rgba(255,255,255,0.6)",
                      lineHeight:1.7, margin:"0 0 1.5rem", maxWidth:"520px",
                    }}>{project.description}</p>

                    <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                      {project.stack.map((tech) => (
                        <span key={tech} style={{
                          fontFamily:"var(--font-mono)", fontSize:"0.68rem",
                          padding:"0.25rem 0.65rem", borderRadius:"999px",
                          background:"rgba(255,255,255,0.06)",
                          border:"1px solid rgba(255,255,255,0.1)",
                          color:"rgba(255,255,255,0.5)",
                        }}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right: button */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"1rem", flexShrink:0 }}>
                    <button
                      onClick={() => setActiveModal(i)}
                      style={{
                        fontFamily:"var(--font-body)", fontSize:"0.88rem", fontWeight:500,
                        padding:"0.7rem 1.6rem", borderRadius:"10px",
                        background:`${accent}20`, border:`1px solid ${accent}55`,
                        color:accent, cursor:"pointer",
                        transition:"all 0.2s",
                        display:"flex", alignItems:"center", gap:"0.5rem",
                        whiteSpace:"nowrap",
                      }}
                      onMouseEnter={(e)=>{e.currentTarget.style.background=`${accent}35`; e.currentTarget.style.borderColor=accent;}}
                      onMouseLeave={(e)=>{e.currentTarget.style.background=`${accent}20`; e.currentTarget.style.borderColor=`${accent}55`;}}
                    >
                      View Details →
                    </button>
                    {project.github && !project.github.includes("TODO") && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        style={{
                          fontFamily:"var(--font-mono)", fontSize:"0.75rem",
                          color:"rgba(255,255,255,0.35)", textDecoration:"none",
                          transition:"color 0.2s",
                        }}
                        onMouseEnter={(e)=>e.currentTarget.style.color="#fff"}
                        onMouseLeave={(e)=>e.currentTarget.style.color="rgba(255,255,255,0.35)"}
                      >↗ GitHub</a>
                    )}
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