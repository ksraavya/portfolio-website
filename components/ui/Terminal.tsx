"use client";

import { useEffect, useRef, useState } from "react";
import { skills, experiences, projects, siteConfig } from "@/lib/portfolio-data";

interface Line {
    type: "input" | "output" | "error" | "boot" | "blank";
    content: string;
}

const BOOT_SEQUENCE = [
    { text: "> initializing portfolio...", delay: 0 },
    { text: "> loading Sraavya.exe...", delay: 400 },
    { text: "", delay: 700 },
    { text: "  Name    : Sraavya Kochhar", delay: 900 },
    { text: "  Role    : AI/ML Engineer", delay: 1050 },
    { text: "  CGPA    : 9.2 / 10", delay: 1200 },
    { text: "  Status  : open to work ✦", delay: 1350 },
    { text: "", delay: 1500 },
    { text: "> ready. try 'help' for available commands.", delay: 1700 },
    { text: "", delay: 1800 },
];

const HELP_OUTPUT = `  available commands:
  
  skills      → tech stack & tools
  experience  → internships & roles
  projects    → things she's built
  contact     → let's connect
  clear       → clear terminal
  whoami      → you already know`;

const SKILLS_OUTPUT = () => {
    const lines: string[] = ["  tech stack:\n"];
    Object.entries(skills).forEach(([category, items]) => {
        lines.push(`  ${category}`);
        lines.push(`  └─ ${items.join(" · ")}`);
        lines.push("");
    });
    return lines.join("\n");
};

const EXPERIENCE_OUTPUT = () => {
    const lines: string[] = ["  experience:\n"];
    experiences.forEach((exp) => {
        lines.push(`  ${exp.role}`);
        lines.push(`  └─ ${exp.shortName} · ${exp.period}`);
        lines.push(`     ${exp.impactNumber} ${exp.impactLabel}`);
        lines.push("");
    });
    return lines.join("\n");
};

const PROJECTS_OUTPUT = () => {
    const lines: string[] = ["  projects:\n"];
    projects.forEach((p) => {
        lines.push(`  ${p.title}`);
        lines.push(`  └─ ${p.subtitle}`);
        lines.push(`     stack: ${p.stack.join(" · ")}`);
        lines.push("");
    });
    return lines.join("\n");
};

const CONTACT_OUTPUT = `  let's connect:

  email     → ${"ksraavya05@gmail.com"}
  github    → github.com/ksraavya
  linkedin  → linkedin.com/in/sraavya-kochhar/
  
  or just ask my AI twin ✦`;

const WHOAMI_OUTPUT = `  nice try. i'm just a terminal.
  but between us — she's pretty great. 😄`;

const COMMANDS: Record<string, () => string> = {
    help: () => HELP_OUTPUT,
    skills: SKILLS_OUTPUT,
    experience: EXPERIENCE_OUTPUT,
    projects: PROJECTS_OUTPUT,
    contact: () => CONTACT_OUTPUT,
    whoami: () => WHOAMI_OUTPUT,
};

const HIDDEN_COMMANDS: Record<string, () => string> = {
    hack: () => `  nice try. access denied. 🙂`,
    coffee: () => `  Error: developer currently running on caffeine.\n  performance may vary.`,
    sudo: () => `  oh you think you're slick.\n  nice try though. 😄`,
};

export default function Terminal() {
    const [lines, setLines] = useState<Line[]>([]);
    const [input, setInput] = useState("");
    const [booted, setBooted] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Boot sequence
    useEffect(() => {
        let mounted = true;
        const bootLines: Line[] = [];

        BOOT_SEQUENCE.forEach(({ text, delay }) => {
            setTimeout(() => {
                if (!mounted) return;
                setLines((prev) => [
                    ...prev,
                    { type: text === "" ? "blank" : "boot", content: text },
                ]);
                if (delay === BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1].delay) {
                    setBooted(true);
                }
            }, delay);
        });

        return () => { mounted = false; };
    }, []);

    // Auto scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [lines]);

    const runCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();

        setLines((prev) => [
            ...prev,
            { type: "input", content: `> ${cmd}` },
        ]);

        if (trimmed === "") {
            setLines((prev) => [...prev, { type: "blank", content: "" }]);
            return;
        }

        if (trimmed === "clear") {
            setLines([]);
            return;
        }

        const handler = COMMANDS[trimmed];
        if (handler) {
            const output = handler();
            setLines((prev) => [
                ...prev,
                { type: "output", content: output },
                { type: "blank", content: "" },
            ]);
        }
        const hidden = HIDDEN_COMMANDS[trimmed];
        if (hidden) {
            setLines((prev) => [
                ...prev,
                { type: "output", content: hidden() },
                { type: "blank", content: "" },
            ]);
        } else {
            setLines((prev) => [
                ...prev,
                {
                    type: "output", // change from "error" to "output"
                    content: `  hmm, '${trimmed}' isn't a thing — try 'help' to see what is 🙂`,
                },
                { type: "blank", content: "" },
            ]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            runCommand(input);
            if (input.trim()) {
                setHistory((prev) => [input, ...prev]);
            }
            setHistoryIndex(-1);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            const next = Math.min(historyIndex + 1, history.length - 1);
            setHistoryIndex(next);
            setInput(history[next] ?? "");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            const next = Math.max(historyIndex - 1, -1);
            setHistoryIndex(next);
            setInput(next === -1 ? "" : history[next]);
        }
    };

    return (
        <div
            onClick={() => inputRef.current?.focus()}
            style={{
                width: "650px",
                height: "500px",
                background: "rgba(0, 0, 0, 0.7)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "12px",
                backdropFilter: "blur(16px)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                cursor: "text",
                boxShadow: "0 0 40px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
        >
            {/* Terminal title bar */}
            <div
                style={{
                    padding: "0.65rem 1rem",
                    borderBottom: "1px solid rgba(139, 92, 246, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(139, 92, 246, 0.05)",
                    flexShrink: 0,
                }}
            >
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        color: "var(--text-muted)",
                        marginLeft: "auto",
                        marginRight: "auto",
                        transform: "translateX(-20px)",
                    }}
                >
                    sraavya@portfolio ~ %
                </span>
            </div>

            {/* Terminal output */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "1rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    lineHeight: 1.7,
                    color: "#a0aec0",
                }}
            >
                {lines.map((line, i) => (
                    <div
                        key={i}
                        style={{
                            whiteSpace: "pre-wrap",
                            color:
                                line.type === "input"
                                    ? "var(--accent-bright)"
                                    : line.type === "error"
                                        ? "#fc8181"
                                        : line.type === "boot"
                                            ? "#68d391"
                                            : "#a0aec0",
                        }}
                    >
                        {line.content}
                    </div>
                ))}

                {/* Input line */}
                {booted && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span style={{ color: "var(--accent-bright)", flexShrink: 0 }}>{">"}</span>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                            style={{
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                color: "var(--accent-bright)",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.72rem",
                                flex: 1,
                                caretColor: "var(--accent-bright)",
                            }}
                        />
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
        </div>
    );
}