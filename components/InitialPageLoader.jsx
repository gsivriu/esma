"use client";

import { useEffect, useMemo, useState } from "react";
import LogoESME from "./LogoESME";

const MIN_VISIBLE_MS = 2400;
const EXIT_DURATION_MS = 320;
const LOADER_LOGO_FILL = "#2C2015";

export default function InitialPageLoader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const clipTop = useMemo(() => `${Math.max(0, 100 - progress).toFixed(2)}%`, [progress]);

  useEffect(() => {
    let loadFinished = document.readyState === "complete";
    const startedAt = Date.now();
    let intervalId = null;
    let exitTimeoutId = null;

    const onWindowLoad = () => {
      loadFinished = true;
    };

    const finish = () => {
      setProgress(100);
      setIsExiting(true);
      exitTimeoutId = window.setTimeout(() => {
        setIsVisible(false);
      }, EXIT_DURATION_MS);
    };

    intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;

      setProgress((prev) => {
        if (loadFinished && elapsed >= MIN_VISIBLE_MS) {
          const next = Math.min(100, prev + 6);
          if (next >= 100) {
            window.clearInterval(intervalId);
            finish();
          }
          return next;
        }

        return Math.min(92, prev + Math.max(0.7, (92 - prev) * 0.06));
      });
    }, 48);

    window.addEventListener("load", onWindowLoad, { once: true });

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(exitTimeoutId);
      window.removeEventListener("load", onWindowLoad);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-[var(--color-bg)] transition-opacity duration-300 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="relative">
        <LogoESME className="block h-40 w-auto text-white md:h-48" />
        <div className="absolute inset-0" style={{ clipPath: `inset(${clipTop} 0 0 0)` }}>
          <LogoESME className="block h-40 w-auto md:h-48" style={{ color: LOADER_LOGO_FILL }} />
        </div>
      </div>
    </div>
  );
}
