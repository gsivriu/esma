"use client";

import { useEffect, useState } from "react";

export default function TopBrandTab({ href = "#acasa" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-3 z-[80]">
      <div className="mx-auto flex w-full max-w-[1200px] justify-center px-4">
        <a
          href={href}
          aria-label="ESME"
          className={[
            "pointer-events-auto inline-flex items-center justify-center",
            "rounded-[18px] border px-6 py-2",
            "backdrop-blur-md transition",
            "shadow-[0_8px_30px_rgba(20,16,12,0.12)]",
            scrolled
              ? "bg-[rgba(245,239,232,0.92)] border-[rgba(190,173,156,0.55)]"
              : "bg-[rgba(245,239,232,0.70)] border-[rgba(190,173,156,0.45)]",
            "text-[rgba(45,35,26,0.92)] hover:bg-[rgba(245,239,232,0.96)]",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(45,35,26,0.25)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          ].join(" ")}
        >
          <span
            className="leading-none tracking-[0.28em]"
            style={{
              fontFamily:
                'var(--font-logo), "Cormorant Garamond", "Times New Roman", serif',
              fontWeight: 400,
              fontSize: "18px",
            }}
          >
            esme
          </span>
        </a>
      </div>
    </div>
  );
}
