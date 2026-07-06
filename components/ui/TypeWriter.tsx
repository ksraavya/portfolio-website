"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypeWriter({
  lines,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseDuration = 2000,
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(t);
    }

    const currentLine = lines[lineIndex];

    if (!isDeleting) {
      if (displayed.length < currentLine.length) {
        const t = setTimeout(() => {
          setDisplayed(currentLine.slice(0, displayed.length + 1));
        }, typingSpeed);
        return () => clearTimeout(t);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, deletingSpeed);
        return () => clearTimeout(t);
      } else {
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % lines.length);
      }
    }
  }, [displayed, isDeleting, isPaused, lineIndex, lines, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "1.1em",
          background: "var(--accent-bright)",
          marginLeft: "2px",
          verticalAlign: "text-bottom",
          animation: "blink 1s step-end infinite",
        }}
      />
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}