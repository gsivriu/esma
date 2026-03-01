"use client";
import { useRef } from "react";
import Link from "next/link";

// variant="dark"  → #562F00 bg, off-white text  | hover: cream bg, brown text  (default)
// variant="light" → cream bg, brown text        | hover: #562F00 bg, off-white text

const VARIANTS = {
  dark: {
    container: "border-[#562F00] bg-[#562F00] text-[var(--color-text-inverse)]",
    rippleBg: "var(--color-bg)",
    hoverText: "group-hover:text-[#2C2015]",
  },
  light: {
    container: "border-[rgba(44,32,21,0.35)] bg-[var(--color-bg)] text-[#2C2015]",
    rippleBg: "#562F00",
    hoverText: "group-hover:text-[var(--color-text-inverse)]",
  },
};

const BASE =
  "focus-ring group relative inline-flex w-full max-w-[220px] min-h-[3.25rem] items-center justify-center rounded-full border px-8 py-3.5 text-center text-[0.9375rem] font-medium leading-none overflow-hidden shadow-[0_8px_20px_rgba(17,12,8,0.08)] transition-all duration-200 ease-out hover:shadow-[0_12px_26px_rgba(17,12,8,0.14)] active:opacity-[0.85] active:scale-[0.97] sm:min-h-[3.5rem]";

export default function PillButton({ href, children, className = "", onClick, variant = "dark" }) {
  const rippleRef = useRef(null);
  const containerRef = useRef(null);
  const v = VARIANTS[variant] ?? VARIANTS.dark;

  const handleMouseEnter = (e) => {
    const btn = containerRef.current;
    const ripple = rippleRef.current;
    if (!btn || !ripple) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const maxRadius = Math.sqrt(
      Math.max(x, rect.width - x) ** 2 + Math.max(y, rect.height - y) ** 2
    );

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = `${maxRadius * 2}px`;
    ripple.style.height = `${maxRadius * 2}px`;
    ripple.style.transform = "translate(-50%, -50%) scale(0)";
    ripple.style.opacity = "1";

    requestAnimationFrame(() => {
      ripple.style.transform = "translate(-50%, -50%) scale(1)";
    });
  };

  const handleMouseLeave = () => {
    const ripple = rippleRef.current;
    if (!ripple) return;
    ripple.style.opacity = "0";
    ripple.style.transform = "translate(-50%, -50%) scale(0)";
  };

  const commonProps = {
    ref: containerRef,
    onClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: `${BASE} ${v.container} ${className}`,
  };

  const content = (
    <>
      <span
        ref={rippleRef}
        className="pointer-events-none absolute rounded-full"
        style={{
          backgroundColor: v.rippleBg,
          transition: "transform 0.55s cubic-bezier(0.65,0,0.35,1), opacity 0.4s ease",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0)",
        }}
      />
      <span className={`relative z-10 transition-colors duration-500 ${v.hoverText}`}>
        {children}
      </span>
    </>
  );

  if (!href) {
    return (
      <button type="button" {...commonProps}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} {...commonProps}>
      {content}
    </Link>
  );
}
