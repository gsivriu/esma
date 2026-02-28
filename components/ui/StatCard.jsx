"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Card from "./Card";

const COUNT_DURATION_MS = 1500;

function parseAnimatedValueTemplate(value) {
  const regex = /\d[\d.,]*/g;
  let lastIndex = 0;
  const parts = [];
  let hasNumbers = false;

  for (const match of value.matchAll(regex)) {
    const raw = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      parts.push({ type: "text", value: value.slice(lastIndex, start) });
    }

    const numericTarget = Number(raw.replace(/[^\d]/g, ""));
    if (Number.isFinite(numericTarget)) {
      hasNumbers = true;
      parts.push({
        type: "number",
        raw,
        target: numericTarget,
        usesThousandsSeparator: raw.includes("."),
      });
    } else {
      parts.push({ type: "text", value: raw });
    }

    lastIndex = start + raw.length;
  }

  if (lastIndex < value.length) {
    parts.push({ type: "text", value: value.slice(lastIndex) });
  }

  return { parts, hasNumbers };
}

function formatAnimatedValue(parts, progress) {
  return parts
    .map((part) => {
      if (part.type !== "number") {
        return part.value;
      }

      const nextValue = Math.round(part.target * progress);
      if (part.usesThousandsSeparator) {
        return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(nextValue);
      }

      return String(nextValue);
    })
    .join("");
}

function initialAnimatedValue(value) {
  const parsed = parseAnimatedValueTemplate(value);
  if (!parsed.hasNumbers) {
    return value;
  }

  return formatAnimatedValue(parsed.parts, 0);
}

export default function StatCard({ value, label, detail, countRunId = 0, glass = false }) {
  const [displayValue, setDisplayValue] = useState(() => initialAnimatedValue(value));
  const rafRef = useRef(null);
  const reducedMotionRef = useRef(false);

  const parsedValue = useMemo(() => parseAnimatedValueTemplate(value), [value]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    reducedMotionRef.current = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (!parsedValue.hasNumbers) {
      setDisplayValue(value);
      return;
    }

    if (!countRunId) {
      return;
    }

    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    setDisplayValue(initialAnimatedValue(value));

    if (reducedMotionRef.current) {
      setDisplayValue(value);
      return;
    }

    const startedAt = performance.now();

    const tick = (now) => {
      const elapsed = now - startedAt;
      const linear = Math.min(1, elapsed / COUNT_DURATION_MS);
      const eased = 1 - Math.pow(1 - linear, 3);

      setDisplayValue(formatAnimatedValue(parsedValue.parts, eased));

      if (linear < 1) {
        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
      }
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [countRunId, parsedValue, value]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <Card className={`h-full${glass ? " card-glass" : ""}`}>
      <p className={`stat-number font-numbers text-base md:text-5xl font-medium leading-tight ${glass ? "text-[var(--color-text-inverse)]" : "text-[var(--color-text)]"}`}>{displayValue}</p>
      <p className={`stat-label font-body text-[0.5rem] md:text-xs font-medium tracking-[0.06em] md:tracking-[0.12em] uppercase mt-1 md:mt-4 font-medium ${glass ? "text-[var(--color-text-inverse)]" : "text-[var(--color-text-muted)]"}`}>{label}</p>
      {detail ? <p className={`stat-description type-body mt-2 hidden md:block ${glass ? "text-[var(--color-text-inverse)]" : "text-[var(--color-text-muted)]"}`}>{detail}</p> : null}
    </Card>
  );
}
