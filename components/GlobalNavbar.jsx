"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import LogoESME from "./LogoESME";
import Container from "./ui/Container";
import Button from "./ui/Button";

const NAV_LINKS = [
  { label: "Acasă", href: "/", landingHref: "#acasa" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Cere ajutor", href: "/cere-ajutor" },
  { label: "Implică-te", href: "/implica-te" },
];

export default function GlobalNavbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [visible, setVisible] = useState(!isLanding);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const removeSnapClasses = () => {
    document.documentElement.classList.remove("landing-snap");
    document.body.classList.remove("landing-snap");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  // On landing page: watch #acasa hero section visibility
  useEffect(() => {
    if (!isLanding) {
      setVisible(true);
      return;
    }

    setVisible(false);

    let observer;
    const setup = () => {
      const hero = document.getElementById("acasa");
      if (!hero) {
        requestAnimationFrame(setup);
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(hero);
    };
    setup();

    return () => observer?.disconnect();
  }, [isLanding]);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => {
      if (e.matches) setMobileMenuOpen(false);
    };
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const logoHref = isLanding ? "#acasa" : "/";
  const getNavHref = (item) =>
    isLanding && item.landingHref ? item.landingHref : item.href;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-glass)] backdrop-blur-[2px] transition-opacity duration-300 ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Container className="py-1 md:py-3">
          <div className="flex min-h-[3rem] md:min-h-[4.5rem] items-center justify-between gap-4">
            <Link
              href={logoHref}
              className="focus-ring font-display text-4xl md:text-5xl font-medium inline-flex items-center gap-2 leading-none min-h-[44px] text-[var(--color-text)]"
              onClick={closeMobileMenu}
            >
              <LogoESME
                className="h-[0.72em] w-auto shrink-0 [height:1.5cap]"
                aria-hidden="true"
              />
              <span className="inline-block tracking-[0.06em]">esme</span>
            </Link>

            <nav className="font-body text-sm leading-[1.65] hidden items-center gap-6 text-[var(--color-text-muted)] lg:flex">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={getNavHref(item)}
                  className="focus-ring transition-colors hover:text-[var(--color-text)]"
                  onClick={() => {
                    if (item.href.startsWith("/")) removeSnapClasses();
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                href="/implica-te#doneaza"
                variant="primary"
                className="hidden sm:inline-flex !rounded-full h-10"
                onClick={removeSnapClasses}
              >
                Donează
              </Button>
              <button
                type="button"
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-strong)] lg:hidden"
                aria-label="Deschide meniul"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="relative block h-4 w-5">
                  <span className="absolute left-0 top-0.5 h-[2px] w-5 rounded-full bg-current" />
                  <span className="absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current" />
                  <span className="absolute left-0 top-[13px] h-[2px] w-5 rounded-full bg-current" />
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-[#F5F0E8] lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 32px) 32px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 32px) 32px)" }}
            exit={{
              clipPath: "circle(0% at calc(100% - 32px) 32px)",
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link
                href={logoHref}
                onClick={closeMobileMenu}
                className="font-display text-4xl font-medium inline-flex items-center gap-2 leading-none text-[var(--color-text)]"
              >
                <LogoESME
                  className="h-[0.94em] w-auto shrink-0 [height:1.5cap]"
                  aria-hidden="true"
                />
                <span className="tracking-[0.06em]">esme</span>
              </Link>
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Închide meniul"
                className="focus-ring -mr-1 p-2 text-[var(--color-text)]"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2l18 18M20 2L2 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col flex-1 justify-center gap-8 px-6">
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={getNavHref(item)}
                    onClick={() => {
                      closeMobileMenu();
                      if (item.href.startsWith("/")) removeSnapClasses();
                    }}
                    className="group flex items-baseline gap-4"
                  >
                    <span className="w-5 shrink-0" aria-hidden="true" />
                    <span className="relative font-display text-[clamp(2.5rem,10vw,4rem)] font-light leading-none text-[var(--color-text)] ">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-0 bg-[#C17F3E] transition-all duration-300 group-hover:w-full"
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                key="doneaza"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + 4 * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href="/implica-te#doneaza"
                  onClick={() => {
                    closeMobileMenu();
                    removeSnapClasses();
                  }}
                  className="group flex items-baseline gap-4"
                >
                  <span className="w-5 shrink-0" aria-hidden="true" />
                  <span className="relative font-display text-[clamp(2.5rem,10vw,4rem)] font-light leading-none text-[#C17F3E] ">
                    Donează
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-0 bg-[#C17F3E] transition-all duration-300 group-hover:w-full"
                    />
                  </span>
                </Link>
              </motion.div>
            </nav>

            <div className="px-6 pb-10">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A6A5A]">
                Sprijin · Siguranță · Speranță
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
