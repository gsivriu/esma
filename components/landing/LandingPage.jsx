"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LandingAnimations from "./LandingAnimations";
import LogoESME from "../LogoESME";
import viziuneImage from "../viziune.jpg";
import womanStatsImage from "../interior.jpeg";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";
import PillButton from "../ui/PillButton";
import Card from "../ui/Card";
import StatCard from "../ui/StatCard";

const NAV_LINKS = [
  { label: "Acasă", href: "#acasa" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Cere ajutor", href: "/cere-ajutor" },
  { label: "Implică-te", href: "/implica-te" },
];

const WORDMARK_FONT_SIZE = 96;
const WORDMARK_TRACKING_RATIO = 0.06;

const OFFER_PILLARS = [
  {
    title: "Sprijin psihologic, social și judiciar",
    text: "Consiliere psihologică specializată, suport practic integrat și asistență juridică pentru persoanele care aleg să iasă din mediul violent.",
    tags: ["Consiliere psihologică", "Asistență juridică", "Suport social"],
  },
  {
    title: "Psihoeducație pentru comunitate",
    text: "Programe de informare care cresc capacitatea comunității de a recunoaște, semnala și preveni violența domestică.",
    tags: ["Educație publică", "Prevenire", "Schimbare de mentalitate"],
  },
  {
    title: "Dezvoltarea unui adăpost integrat",
    text: "Construim un adăpost care oferă siguranță imediată, plus cadrul terapeutic și social pentru reconstruirea autonomiei.",
    tags: ["Siguranță imediată", "Cadrul terapeutic", "Reintegrare"],
  },
];

const STATS = [
  {
    value: "108.000+",
    label: "Intervenții în 2023",
    detail:
      "Poliția a intervenit în peste 108.000 de situații de violență domestică la nivel național.",
  },
  {
    value: "61.000+",
    label: "Primele 6 luni din 2025",
    detail:
      "În primele șase luni din 2025 au fost raportate peste 61.000 de cazuri, cu tendință de creștere.",
  },
  {
    value: "70% vs 4%",
    label: "Între realitate și tăcere",
    detail:
      "Aproximativ 70% dintre români cunosc cazuri, dar doar 4% sesizează autoritățile.",
  },
];

const TEAM = [
  {
    name: "Silviana Adam",
    role: "Psiholog",
    photo: "/team/Silviana.jpeg?v=20260219-1",
    story:
      "Silviana creează un spațiu calm în care fiecare femeie poate vorbi fără teamă, în propriul ritm, și poate începe reconstrucția cu pași clari.",
  },
  {
    name: "Mihaela Cima",
    role: "Psiholog",
    photo: "/team/Mihaela.jpeg?v=20260219-1",
    story:
      "Mihaela combină empatia cu orientarea practică, transformând momentele de blocaj în opțiuni concrete și decizii asumate.",
  },
  {
    name: "Vlad Diaconu",
    role: "Asistent Social",
    photo: "/team/Vlad.jpeg?v=20260219-1",
    story:
      "Vlad susține procesele de stabilizare și direcționare către resursele potrivite, astfel încât fiecare persoană să știe ce urmează și unde găsește sprijin real.",
  },
];

const PRESS = [
  {
    source: "Santa Solana Post",
    text: "ESME pune în centru siguranța emoțională și accesul la sprijin concret, fără presiune asupra victimelor.",
  },
  {
    source: "Mariana's Luxe Travels",
    text: "Un model comunitar care transformă implicarea constantă în sprijin real pentru femeile afectate de violență.",
  },
  {
    source: "Fairhill Journal",
    text: "Un demers local cu impact social major: claritate, prezență și intervenție orientată spre demnitate.",
  },
];

const FOOTER_LINK_GROUPS = [
  {
    title: "Navigare",
    mobileHidden: true,
    links: [
      { label: "Acasă", href: "#acasa" },
      { label: "Despre noi", href: "/despre-noi" },
      { label: "Implică-te", href: "/implica-te" },
    ],
  },
  {
    title: "Resurse",
    mobileHidden: true,
    links: [
      { label: "Ce oferim", href: "#ce-oferim" },
      { label: "Amploarea fenomenului", href: "#amploare-fenomen" },
      { label: "Echipa", href: "#echipa" },
      { label: "În presă", href: "#presa" },
    ],
  },
  {
    title: "Conectare",
    links: [
      { label: "Email", href: "mailto:asociatia.esme@gmail.com" },
      {
        label: "Instagram",
        href: "https://instagram.com/esme.asociatia",
        external: true,
      },
      { label: "Contact", href: "#contact" },
      { label: "Donează", href: "/implica-te#doneaza" },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Politică de confidențialitate",
        href: "mailto:asociatia.esme@gmail.com?subject=Politic%C4%83%20de%20confiden%C8%9Bialitate",
      },
      {
        label: "Termeni și condiții",
        href: "mailto:asociatia.esme@gmail.com?subject=Termeni%20%C8%99i%20condi%C8%9Bii",
      },
      {
        label: "Politica cookie",
        href: "mailto:asociatia.esme@gmail.com?subject=Politica%20cookie",
      },
      {
        label: "Accesibilitate",
        href: "mailto:asociatia.esme@gmail.com?subject=Accesibilitate",
      },
    ],
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [statsCountRunId, setStatsCountRunId] = useState(0);
  const [pressIndex, setPressIndex] = useState(0);
  const [wordmarkLayout, setWordmarkLayout] = useState({
    sX: 0,
    mX: 0,
    rightEX: 0,
    ready: false,
  });
  const heroSectionRef = useRef(null);
  const statsSectionRef = useRef(null);
  const statsGridRef = useRef(null);
  const statsGridWasVisibleRef = useRef(false);
  const eLeftMeasureRef = useRef(null);
  const sMeasureRef = useRef(null);
  const mMeasureRef = useRef(null);
  const eRightMeasureRef = useRef(null);
  const wordmarkTracking = WORDMARK_FONT_SIZE * WORDMARK_TRACKING_RATIO;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const removeSnapClasses = () => {
    document.documentElement.classList.remove("landing-snap");
    document.body.classList.remove("landing-snap");
  };

  useEffect(() => {
    document.documentElement.classList.add("landing-snap");
    document.body.classList.add("landing-snap");

    return () => {
      document.documentElement.classList.remove("landing-snap");
      document.body.classList.remove("landing-snap");
    };
  }, []);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia("(min-width: 1024px)");

    const handleBreakpointChange = (event) => {
      if (event.matches) {
        setMobileMenuOpen(false);
      }
    };

    if (desktopBreakpoint.matches) {
      setMobileMenuOpen(false);
    }

    if (desktopBreakpoint.addEventListener) {
      desktopBreakpoint.addEventListener("change", handleBreakpointChange);
      return () => desktopBreakpoint.removeEventListener("change", handleBreakpointChange);
    }

    desktopBreakpoint.addListener(handleBreakpointChange);
    return () => desktopBreakpoint.removeListener(handleBreakpointChange);
  }, []);

  useEffect(() => {
    const heroSection = heroSectionRef.current;
    if (!heroSection) {
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const nextVisible = !entry.isIntersecting;
          setShowHeader((prev) => (prev === nextVisible ? prev : nextVisible));
        },
        {
          root: null,
          threshold: 0,
        }
      );

      observer.observe(heroSection);
      return () => observer.disconnect();
    }

    const updateHeaderVisibility = () => {
      const nextVisible = heroSection.getBoundingClientRect().bottom <= 0;
      setShowHeader((prev) => (prev === nextVisible ? prev : nextVisible));
    };

    updateHeaderVisibility();
    window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
    window.addEventListener("resize", updateHeaderVisibility);

    return () => {
      window.removeEventListener("scroll", updateHeaderVisibility);
      window.removeEventListener("resize", updateHeaderVisibility);
    };
  }, []);

  useEffect(() => {
    const statsGrid = statsGridRef.current;
    if (!statsGrid) {
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          const isVisible = entry.isIntersecting;

          if (isVisible && !statsGridWasVisibleRef.current) {
            statsGridWasVisibleRef.current = true;
            setStatsCountRunId((prev) => prev + 1);
            return;
          }

          if (!isVisible) {
            statsGridWasVisibleRef.current = false;
          }
        },
        {
          root: null,
          threshold: 0,
          rootMargin: "0px 0px 0px 0px",
        }
      );

      observer.observe(statsGrid);
      return () => observer.disconnect();
    }

    const onScroll = () => {
      const rect = statsGrid.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;

      if (isVisible && !statsGridWasVisibleRef.current) {
        statsGridWasVisibleRef.current = true;
        setStatsCountRunId((prev) => prev + 1);
      } else if (!isVisible) {
        statsGridWasVisibleRef.current = false;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    let cancelled = false;

    const measureWordmark = () => {
      if (
        !eLeftMeasureRef.current ||
        !sMeasureRef.current ||
        !mMeasureRef.current ||
        !eRightMeasureRef.current
      ) {
        return;
      }

      const eLeftWidth = eLeftMeasureRef.current.getBBox().width;
      const sWidth = sMeasureRef.current.getBBox().width;
      const mWidth = mMeasureRef.current.getBBox().width;
      const eRightWidth = eRightMeasureRef.current.getBBox().width;
      if (!eLeftWidth || !sWidth || !mWidth || !eRightWidth) {
        return;
      }

      const sX = eLeftWidth + wordmarkTracking;
      const mX = sX + sWidth + wordmarkTracking;
      const rightEX = mX + mWidth + wordmarkTracking;

      setWordmarkLayout((prev) => {
        if (
          prev.ready &&
          Math.abs(prev.sX - sX) < 0.01 &&
          Math.abs(prev.mX - mX) < 0.01 &&
          Math.abs(prev.rightEX - rightEX) < 0.01
        ) {
          return prev;
        }

        return { sX, mX, rightEX, ready: true };
      });
    };

    const runMeasurement = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      if (cancelled) {
        return;
      }

      requestAnimationFrame(() => {
        if (!cancelled) {
          measureWordmark();
        }
      });
    };

    runMeasurement();

    const handleResize = () => {
      measureWordmark();
    };
    window.addEventListener("resize", handleResize);

    let handleFontsLoadingDone;
    if (document.fonts?.addEventListener) {
      handleFontsLoadingDone = () => {
        measureWordmark();
      };
      document.fonts.addEventListener("loadingdone", handleFontsLoadingDone);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      if (handleFontsLoadingDone && document.fonts?.removeEventListener) {
        document.fonts.removeEventListener("loadingdone", handleFontsLoadingDone);
      }
    };
  }, [wordmarkTracking]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPressIndex((prev) => (prev + 1) % PRESS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const wordmarkTextStyle = {
    fontFamily:
      'var(--font-logo), "Cormorant Garamond", "Times New Roman", serif',
    fontSize: `${WORDMARK_FONT_SIZE}px`,
    fontWeight: 300,
    letterSpacing: "0",
    fill: "#5a4540",
    fontKerning: "normal",
  };

  const wordmarkMeasureTextStyle = {
    ...wordmarkTextStyle,
    fill: "transparent",
    filter: "none",
  };

  const wordmarkVisibleTextStyle = {
    ...wordmarkTextStyle,
    filter: "none",
  };

  const wordmarkTiltTextStyle = {
    ...wordmarkVisibleTextStyle,
    transformBox: "fill-box",
    transformOrigin: "center",
    transform: "none",
  };

  return (
    <div className="relative isolate overflow-x-clip">
      <LandingAnimations />

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-28 top-20 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,_rgba(213,193,172,0.45)_0%,_rgba(213,193,172,0)_72%)]" />
        <div
          data-parallax="dots"
          className="dot-grid absolute -bottom-16 left-[-120px] h-[340px] w-[640px] opacity-35"
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-glass)] backdrop-blur-[2px] transition-[opacity,transform] duration-300 ${
          showHeader
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <Container className="py-3">
          <div className="flex min-h-[4.5rem] items-center justify-between gap-4">
            <a
              href="#acasa"
              className="focus-ring font-display text-4xl md:text-5xl font-medium inline-flex items-center gap-1 leading-none text-[var(--color-text)]"
              onClick={closeMobileMenu}
            >
              <LogoESME className="h-[0.94em] w-auto shrink-0 [height:1.5cap]" aria-hidden="true" />
              <svg
                role="img"
                viewBox="0 0 320 120"
                className="h-[1.24em] w-auto shrink-0 overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="ESME"
              >
                <g transform="translate(40 78)">
                  <g opacity="0" aria-hidden="true">
                    <text ref={eLeftMeasureRef} dominantBaseline="alphabetic" style={wordmarkMeasureTextStyle}>
                      e
                    </text>
                    <text ref={sMeasureRef} dominantBaseline="alphabetic" style={wordmarkMeasureTextStyle}>
                      s
                    </text>
                    <text ref={mMeasureRef} dominantBaseline="alphabetic" style={wordmarkMeasureTextStyle}>
                      m
                    </text>
                    <text
                      ref={eRightMeasureRef}
                      dominantBaseline="alphabetic"
                      style={wordmarkMeasureTextStyle}
                    >
                      e
                    </text>
                  </g>

                  <g opacity={wordmarkLayout.ready ? 1 : 0}>
                    <text
                      x={0}
                      dominantBaseline="alphabetic"
                      textRendering="geometricPrecision"
                      style={wordmarkTiltTextStyle}
                    >
                      e
                    </text>

                    <text
                      x={wordmarkLayout.sX}
                      dominantBaseline="alphabetic"
                      textRendering="geometricPrecision"
                      style={wordmarkVisibleTextStyle}
                    >
                      s
                    </text>

                    <text
                      x={wordmarkLayout.mX}
                      dominantBaseline="alphabetic"
                      textRendering="geometricPrecision"
                      style={wordmarkVisibleTextStyle}
                    >
                      m
                    </text>

                    <text
                      x={wordmarkLayout.rightEX}
                      dominantBaseline="alphabetic"
                      textRendering="geometricPrecision"
                      style={wordmarkTiltTextStyle}
                    >
                      e
                    </text>
                  </g>
                </g>
              </svg>
            </a>

            <nav className="font-body text-sm leading-[1.65] hidden items-center gap-6 text-[var(--color-text-muted)] lg:flex">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring transition-colors hover:text-[var(--color-text)]"
                  onClick={() => { if (item.href.startsWith('/')) removeSnapClasses(); }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button href="/implica-te" variant="primary" className="hidden sm:inline-flex !rounded-full h-10" onClick={removeSnapClasses}>
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

      {/* ── Full-screen mobile menu ── */}
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
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5">
              <a
                href="#acasa"
                onClick={closeMobileMenu}
                className="font-display text-4xl font-medium inline-flex items-center gap-2 leading-none text-[var(--color-text)]"
              >
                <LogoESME className="h-[0.94em] w-auto shrink-0 [height:1.5cap]" aria-hidden="true" />
                <span className="tracking-[0.06em]">ESME</span>
              </a>
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Închide meniul"
                className="focus-ring -mr-1 p-2 text-[var(--color-text)]"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path d="M2 2l18 18M20 2L2 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col flex-1 justify-center gap-8 px-6">
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => { closeMobileMenu(); if (item.href.startsWith("/")) removeSnapClasses(); }}
                    className="group flex items-baseline gap-4"
                  >
                    <span className="w-5 shrink-0 select-none font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A6A5A]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative font-display text-[clamp(2.5rem,10vw,4rem)] font-light leading-none text-[var(--color-text)] group-hover:italic">
                      {item.label}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-0 bg-[#C17F3E] transition-all duration-300 group-hover:w-full"
                      />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom */}
            <div className="flex flex-col items-start gap-3 px-6 pb-10">
              <Button
                href="/implica-te"
                variant="primary"
                className="!rounded-full h-10"
                onClick={() => { closeMobileMenu(); removeSnapClasses(); }}
              >
                Donează
              </Button>
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7A6A5A]">
                Sprijin · Siguranță · Speranță
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="text-center">
        <section ref={heroSectionRef} id="acasa" className="snap-section hero-snap py-0">
          <div className="relative w-full min-h-[100svh] overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center brightness-[0.82] contrast-[0.9] saturate-[0.84]"
            >
              <source src="/homevideo.mov" type="video/quicktime" />
            </video>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,rgba(17,12,8,0.08)_18%,rgba(17,12,8,0.22)_60%,rgba(17,12,8,0.38)_100%)]"
            />

            <div className="relative z-10 grid min-h-[100svh] grid-rows-[0.8fr_auto_1.2fr] bg-[linear-gradient(180deg,rgba(39,27,18,0.62)_0%,rgba(39,27,18,0.38)_30%,rgba(39,27,18,0.24)_52%,rgba(39,27,18,0.41)_74%,rgba(39,27,18,0.64)_100%)] pt-[43px] md:pt-[47px] xl:pt-[43px]">
                <div />

                <div className="mx-auto w-full max-w-5xl space-y-7 px-[clamp(1rem,3vw,2.5rem)] text-center sm:space-y-9">
                  <p
                    data-reveal
                    className="font-body text-lg leading-[1.68] mx-auto max-w-[62ch] !text-[clamp(1.35rem,1.8vw,1.75rem)] leading-[1.7] text-[var(--color-text-inverse)] [text-shadow:0_1px_3px_rgba(17,12,8,0.4)]"
                  >
                    Schimbarea începe cu cei care aleg să nu rămână spectatori.
                  </p>

                  <h1
                    data-reveal
                    className="mx-auto text-[clamp(3.4rem,12vw,7.25rem)] font-light leading-[0.92] tracking-[0.08em] text-[var(--color-text-inverse)] [text-shadow:0_2px_7px_rgba(17,12,8,0.38)]"
                    style={{
                      fontFamily:
                        'var(--font-logo), "Cormorant Garamond", "Times New Roman", serif',
                    }}
                  >
                    ESME
                  </h1>

                  <p
                    data-reveal
                    className="font-body text-lg leading-[1.68] mx-auto max-w-[62ch] !text-[clamp(1.35rem,1.8vw,1.75rem)] leading-[1.7] text-[var(--color-text-inverse)] [text-shadow:0_1px_3px_rgba(17,12,8,0.4)]"
                  >
                    O asociație dedicată sprijinirii victimelor abuzului domestic prin implicarea activă
                    a comunității: oameni, profesioniști și organizații care aleg să acționeze.
                  </p>
              </div>

                <div />
            </div>

            <div
              data-reveal
              className="pointer-events-none absolute inset-x-0 bottom-[clamp(1.25rem,5.5vh,4.25rem)] z-20 flex justify-center"
            >
              <a
                href="#despre-noi"
                className="focus-ring pointer-events-auto inline-flex flex-col items-center gap-2 text-[1.05rem] font-medium leading-none text-[var(--color-text-inverse)] opacity-75 transition-opacity duration-200 hover:opacity-95 focus-visible:opacity-95 [text-shadow:0_1px_3px_rgba(17,12,8,0.42)]"
              >
                <span aria-hidden="true" className="inline-flex flex-col items-center">
                  <span className="scrolldown" />
                  <span className="chevrons">
                    <span className="chevrondown" />
                    <span className="chevrondown" />
                    <span className="chevrondown" />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section id="despre-noi" className="snap-section section-space">
          <Container className="pt-[var(--section-pt-inner)]">
            <div className="grid-vision">
              <div className="space-y-8 text-left" data-stagger-group>
                <div data-reveal data-vision-title>
                  <SectionHeader align="left" title="Viziunea noastra" />
                </div>

                <div
                  data-stagger-item
                  data-vision-description
                  className="mt-8 max-w-[58ch] space-y-6 text-left"
                >
                  <p className="font-body text-base leading-[1.7] text-[#2C2015]">
                    Într-o lume în care tăcerea nu mai este o formă de supraviețuire, vedem un
                    viitor în care nicio femeie nu este nevoită să aleagă între abuz și stradă un viitor în care comunitatea devine scut, iar siguranța este un drept, nu un lux.
                  </p>

                  <p className="font-body text-base leading-[1.7] text-[#2C2015]">
                    Construim o rețea de sprijin care transformă{"\u00A0"}
                    <em className="font-serif italic text-[#A56930]">„nu am unde să plec"</em>
                    {"\u00A0"}în{"\u00A0"}
                    <em className="font-serif italic text-[#A56930]">„am un loc sigur"</em>.
                    Oferim consiliere psihologică, asistență juridică și suport medical pentru a
                    reclădi încrederea, a recâștiga drepturile și a vindeca rănile vizibile și invizibile.
                  </p>

                  <p className="font-body text-base leading-[1.7] text-[#2C2015]">
                    Misiunea noastră nu este să salvăm, ci să împuternicim. Să fim vocea care
                    spune:{"\u00A0"}
                    <strong className="font-medium text-[#1C1611]">nu ești singură</strong>.
                  </p>
                </div>
              </div>

              <div
                data-viziune-card-source-wrap
                className="hidden md:flex relative z-20 w-full justify-center [contain:layout_paint_style] [transform:translateZ(0)] [backface-visibility:hidden] [will-change:transform,opacity] lg:justify-end"
              >
                <div
                  data-viziune-card-source
                  className="relative ml-auto aspect-[4/5] w-full max-w-[25.5rem] overflow-hidden rounded-[2.5rem] border border-[var(--color-border)] [transform:translateZ(0)] [backface-visibility:hidden] [will-change:transform]"
                >
                  <Image
                    data-viziune-image
                    src={viziuneImage}
                    alt="Portret simbolic pentru secțiunea Viziune și Misiune"
                    fill
                    className="object-cover object-[58%_center]"
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 62vw, 88vw"
                    placeholder="blur"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section
          ref={statsSectionRef}
          id="amploare-fenomen"
          className="snap-section relative overflow-hidden"
          style={{ minHeight: "100svh", flexDirection: "column", justifyContent: "center", paddingTop: "var(--header-h)" }}
        >
          <Image
            src={womanStatsImage}
            alt=""
            fill
            className="object-cover object-[center_30%]"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-[rgba(18,12,6,0.45)]" />

          <Container className="relative z-10 space-y-10 py-16 sm:space-y-12 sm:py-20">
            <div data-reveal className="w-full">
              <SectionHeader
                align="center"
                title="Violența domestică este un fenomen social extins, nu o excepție."
                className="[&_h2]:mx-auto [&_h2]:max-w-[30ch] [&_h2]:[text-wrap:balance] [&_h2]:leading-[1.12]"
                titleClassName="!text-[var(--color-text-inverse)]"
              />
            </div>

            <div ref={statsGridRef} className="grid-stats" data-stagger-group>
              {STATS.map((item) => (
                <div key={item.value} data-stagger-item className="text-center">
                  <StatCard
                    value={item.value}
                    label={item.label}
                    detail={item.detail}
                    countRunId={statsCountRunId}
                    glass
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section
          id="servicii-esentiale"
          className="snap-section"
          style={{ minHeight: "100svh", flexDirection: "column", justifyContent: "center", paddingTop: "var(--header-h)" }}
        >
          <Container className="overflow-visible">
            <div
              id="ce-oferim"
              data-servicii-card
              className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 sm:gap-10 md:gap-12 [transform:translateZ(0)] [backface-visibility:hidden] [will-change:transform,opacity]"
              data-stagger-group
            >
              <div data-reveal className="w-full">
                <SectionHeader
                  align="center"
                  title="Oferim sprijin specializat, educație și infrastructură de siguranță."
                  description="Structurăm intervenția ESME pe trei direcții clare, complementare și sustenabile."
                  className="[&_p]:text-[var(--color-text-muted)]"
                  titleClassName="!text-3xl md:!text-5xl !font-medium !leading-tight [text-wrap:balance] !max-w-3xl !mx-auto"
                  descriptionClassName="!text-base !text-center !max-w-2xl !mx-auto mb-16"
                />
              </div>

              <div data-offer-stack data-stagger-group className="grid grid-cols-3 gap-3 md:gap-6 w-full">
                {OFFER_PILLARS.map((item) => (
                  <Card
                    key={item.title}
                    data-offer-card
                    data-stagger-item
                    tabIndex={0}
                    className="!rounded-2xl !p-3 md:!p-10 h-full transition-shadow duration-300 hover:shadow-lg flex flex-col items-center justify-center gap-2 md:gap-4 text-center"
                  >
                    <h3 className="font-display text-[0.7rem] md:text-2xl font-medium leading-snug mb-1 md:mb-4 text-[var(--color-text)]">
                      {item.title}
                    </h3>
                    <p className="font-[var(--font-body)] text-[0.55rem] md:text-sm leading-relaxed text-[var(--color-text-muted)] hidden md:block">
                      {item.text}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section
          id="implicare-cta"
          className="snap-section relative"
          style={{ minHeight: "100svh", flexDirection: "column", justifyContent: "center", paddingTop: "var(--header-h)" }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[160px]" style={{ background: "linear-gradient(to bottom, var(--color-bg), transparent)" }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[160px]" style={{ background: "linear-gradient(to top, var(--color-bg), transparent)" }} />
          <Container className="relative z-[3] max-w-[1200px] space-y-10 sm:space-y-14 md:space-y-16">
            <div data-reveal className="w-full text-center">
              <p className="font-display text-3xl md:text-5xl font-medium leading-tight mx-auto max-w-[44ch] [text-wrap:balance] leading-[1.12] text-[var(--color-text)] text-[clamp(1.4rem,2.6vw,2rem)]">
                Abuzul domestic este o problemă socială care afectează generații, relații și comunități întregi.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4" data-stagger-group>
              <PillButton href="/implica-te#fii-voluntar" onClick={removeSnapClasses} data-stagger-item variant="light">
                Fii voluntar
              </PillButton>
              <a
                href="/implica-te#doneaza"
                onClick={removeSnapClasses}
                data-stagger-item
                className="focus-ring inline-flex w-full max-w-[220px] min-h-[3.25rem] items-center justify-center rounded-full px-8 py-3.5 text-center text-[0.9375rem] font-medium leading-none shadow-[0_8px_20px_rgba(17,12,8,0.08)] transition-all duration-200 ease-out hover:shadow-[0_12px_26px_rgba(17,12,8,0.14)] sm:min-h-[3.5rem] sm:px-8 sm:py-3.5 border border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-surface)] hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]"
              >
                Donează
              </a>
              <PillButton href="/implica-te#devino-partener" onClick={removeSnapClasses} data-stagger-item variant="light">
                Devino partener
              </PillButton>
            </div>

            <div data-reveal className="w-full text-center">
              <p className="font-body text-lg leading-[1.68] mx-auto max-w-[52ch] text-center text-[var(--color-text-muted)] [text-wrap:balance]">
                Nu e nevoie să fii erou. E suficient să fii prezent.
              </p>
            </div>

            <div
              data-reveal
              className="w-full pt-6 text-center"
            >
              <p className="font-display text-3xl md:text-5xl font-medium leading-tight mx-auto max-w-[44ch] [text-wrap:balance] not-italic leading-[1.12] text-[var(--color-text)] text-[clamp(1.4rem,2.6vw,2rem)]">
                Schimbarea nu vine dintr-o singură voce, ci din oamenii care aleg să nu mai tacă.
              </p>
            </div>
          </Container>
        </section>

        <section id="echipa" className="snap-section section-space">
          <Container className="space-y-10">
            <div data-reveal>
              <SectionHeader
                align="center"
                title="Echipa ESME"
                description="O echipă interdisciplinară dedicată sprijinului constant pentru femeile afectate de abuz domestic."
              />
            </div>

            <div className="grid-team" data-stagger-group>
              {TEAM.map((member) => (
                <article
                  key={member.name}
                  data-stagger-item
                  className="group relative isolate min-h-[460px] [perspective:1400px]"
                >
                  <div className="relative h-full min-h-[460px] w-full [transform:translateZ(0)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d] will-change-transform group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 z-[2] overflow-hidden rounded-[2rem] border border-[var(--color-border)] opacity-100 transition-opacity duration-180 ease-out group-hover:opacity-0 [transform:rotateY(0deg)_translateZ(0.1px)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover object-center [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                      <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-[linear-gradient(180deg,rgba(20,16,12,0.08)_38%,rgba(20,16,12,0.62)_78%,rgba(20,16,12,0.86)_100%)]" />
                      <div className="absolute inset-x-0 bottom-0 px-6 pb-7 pt-0 text-left [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                        <p className="font-body text-xs font-medium tracking-[0.12em] uppercase mb-1.5 text-[rgba(247,239,230,0.55)]">{member.role}</p>
                        <h3 className="font-body text-lg leading-[1.68] font-medium leading-tight text-[var(--color-text-inverse)]">{member.name}</h3>
                      </div>
                    </div>

                    <div className="absolute inset-0 z-[3] flex h-full flex-col justify-center rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-10 text-left opacity-0 transition-opacity duration-180 ease-out group-hover:opacity-100 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(0.1px)]">
                      <div>
                        <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] leading-[1.75]">
                          {member.story}
                        </p>
                        <div
                          aria-hidden="true"
                          className="mt-[22px] h-px w-[176px]"
                          style={{ background: "linear-gradient(to right, #C17F3E, transparent)" }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
        <section id="presa" className="snap-section section-space-tight">
          <Container className="space-y-10">
            <div data-reveal>
              <SectionHeader
                align="center"
                title="Menționări și testimoniale"
                description="Reacții din presă și din comunitate despre impactul inițiativei ESME."
              />
            </div>

            {/* Mobile: carousel */}
            <div className="md:hidden">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${pressIndex * 100}%)` }}
                >
                  {PRESS.map((item) => (
                    <div key={item.source} className="w-full flex-shrink-0">
                      <Card className="space-y-5 text-center">
                        <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">&ldquo;{item.text}&rdquo;</p>
                        <p className="font-body text-xs font-medium tracking-[0.12em] uppercase font-semibold text-[var(--color-text)]">
                          {item.source}
                        </p>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-5">
                {PRESS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPressIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={['h-1.5 rounded-full transition-all duration-300', i === pressIndex ? 'w-6 bg-[var(--color-accent)]' : 'w-1.5 bg-[var(--color-border)]'].join(' ')}
                  />
                ))}
              </div>
            </div>

            {/* Desktop: grid */}
            <div className="hidden md:grid grid-stats" data-stagger-group>
              {PRESS.map((item) => (
                <Card key={item.source} data-stagger-item className="space-y-5 text-center">
                  <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">&ldquo;{item.text}&rdquo;</p>
                  <p className="font-body text-xs font-medium tracking-[0.12em] uppercase font-semibold text-[var(--color-text)]">
                    {item.source}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <footer id="contact" className="py-14">
        <Container className="space-y-10">
          <div className="border-t border-[var(--color-border)] pt-8">
            <div className="mx-auto grid max-w-6xl gap-x-14 gap-y-10 text-left grid-cols-2 lg:grid-cols-4">
              {FOOTER_LINK_GROUPS.map((group) => (
                <div key={group.title} className={`space-y-4${group.mobileHidden ? " hidden lg:block" : ""}`}>
                  <h3 className="font-body text-base leading-[1.7] font-display font-medium text-[var(--color-text)]">
                    {group.title}
                  </h3>
                  <div className="space-y-3">
                    {group.links.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => { if (item.href.startsWith('/')) removeSnapClasses(); }}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        className="focus-ring font-body text-sm leading-[1.65] block text-[var(--color-text-muted)] transition-colors duration-200 hover:text-[var(--color-text)]"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
