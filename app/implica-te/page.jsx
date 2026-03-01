"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import PillButton from "../../components/ui/PillButton";
import ScrollReveal from "../../components/ui/ScrollReveal";
import LogoESME from "../../components/LogoESME";

const NAV_LINKS = [
  { label: "Acasă", href: "/" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Cere ajutor", href: "/cere-ajutor" },
  { label: "Implică-te", href: "/implica-te" },
];

const DONATION_AMOUNTS = {
  RON: [35, 50, 75, 100],
  EUR: [10, 20, 35, 50],
};

const CAMPANII = [
  "Sprijin psihologic",
  "Consiliere juridică",
  "Adăpost integrat",
  "Psihoeducație",
];

const PARTENERIAT_TYPES = [
  "Donație financiară (unică sau recurentă)",
  "Sponsorizare prin redirecționare — până la 20% din impozit, conform legislației fiscale",
  "Servicii sau produse pro bono",
  "Parteneriat de campanie",
  "Implicarea echipei",
];

export default function ImplicaTe() {
  const [currency, setCurrency] = useState("RON");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [useCustom, setUseCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [campanie, setCampanie] = useState("");

  const handleCurrencyChange = (c) => {
    setCurrency(c);
    setSelectedAmount(DONATION_AMOUNTS[c][1]);
    setUseCustom(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-glass)] backdrop-blur-[2px]">
        <Container className="py-2 md:py-3">
          <div className="flex min-h-[var(--header-h)] items-center justify-between gap-4">
            <Link
              href="/"
              className="focus-ring font-display text-4xl md:text-5xl font-medium inline-flex items-center gap-2 leading-none min-h-[44px] text-[var(--color-text)]"
            >
              <LogoESME className="h-[0.72em] w-auto shrink-0 [height:1.5cap]" aria-hidden="true" />
              <span className="inline-block tracking-[0.06em]">ESME</span>
            </Link>

            <nav className="font-body text-sm leading-[1.65] hidden items-center gap-6 text-[var(--color-text-muted)] lg:flex">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring transition-colors hover:text-[var(--color-text)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button href="/implica-te#doneaza" variant="primary" className="hidden sm:inline-flex !rounded-full h-10">
              Donează
            </Button>
          </div>
        </Container>
      </header>

      <main>
        {/* ── Fii Voluntar ── */}
        <section
          id="fii-voluntar"
          className="flex min-h-[calc(100svh-var(--header-h))] scroll-mt-[var(--header-h)] items-center border-t border-[var(--color-border)] py-10"
        >
          <Container>
            <div className="mx-auto max-w-2xl">
              <ScrollReveal delay={0}>
                <p className="font-body text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)] text-center mb-6">
                  Implică-te
                </p>
                <h1 className="font-display text-4xl md:text-5xl font-medium leading-tight text-[var(--color-text)] text-center mb-8">
                  Fii Voluntar
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)] text-left sm:text-center mb-5">
                  Ești psiholog/psihoterapeut sau consilier juridic/avocat?
                </h2>
                <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] text-left sm:text-center mb-6">
                  Te poți alătura unei echipe care pune în centru siguranța, demnitatea și
                  reconstrucția după experiențe de violență.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] text-left sm:text-center mb-3">
                  Dacă alegi să fii parte din echipă, vei putea:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Să oferi sprijin psihologic persoanelor care au nevoie de un spațiu stabil, predictibil și fără judecată.",
                    "Să sprijini beneficiari și prin consiliere juridică, astfel încât să înțeleagă opțiunile și pașii următori.",
                    "Să lucrezi alături de profesioniști care împărtășesc valori comune: respectul pentru ritmul fiecărei persoane și responsabilitate în practică.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--color-accent-soft)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] text-left sm:text-center mb-8">
                  Indiferent că ești la început de drum sau ai ani de practică, prezența ta poate
                  conta enorm. Completează formularul sau scrie-ne — ne vom reveni pentru a
                  discuta pașii următori, în funcție de disponibilitate și aria ta de expertiză.
                </p>
                <div className="flex justify-center">
                  <PillButton href="mailto:asociatia.esme@gmail.com?subject=Voluntariat%20ESME">
                    Mă implic
                  </PillButton>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* ── Donează ── */}
        <section
          id="doneaza"
          className="flex min-h-[calc(100svh-var(--header-h))] scroll-mt-[var(--header-h)] items-center border-t border-[var(--color-border)] py-10"
        >
          <Container>
            <div className="mx-auto max-w-2xl">
              <ScrollReveal delay={0}>
                <p className="font-body text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)] text-center mb-6">
                  Susține cauza
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight text-[var(--color-text)] text-center mb-5">
                  Donează
                </h2>
                <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] text-center mb-7">
                  Fiecare donație susține direct sprijinul pentru femeile care aleg să iasă din mediul violent.
                </p>
              </ScrollReveal>

              {/* ── Donation card ── */}
              <ScrollReveal delay={0.15}>
                <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_1px_0_rgba(58,36,18,0.04)]">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <p className="font-body text-xs font-medium tracking-[0.12em] uppercase text-[var(--color-text-muted)]">Suma donației</p>

                      {/* Currency tabs */}
                      <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-1">
                        {["RON", "EUR"].map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => handleCurrencyChange(c)}
                            className={`focus-ring rounded-full px-5 py-1 text-sm font-semibold tracking-wide transition-colors ${
                              currency === c
                                ? "bg-[var(--color-accent)] text-[var(--color-surface)]"
                                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>

                      {/* Amount buttons */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {DONATION_AMOUNTS[currency].map((amount) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amount);
                              setUseCustom(false);
                            }}
                            className={`focus-ring rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                              !useCustom && selectedAmount === amount
                                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-surface)]"
                                : "border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent-soft)] hover:bg-[var(--color-surface-strong)]"
                            }`}
                          >
                            {amount} {currency}
                          </button>
                        ))}
                      </div>

                      {/* Custom amount */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setUseCustom(true)}
                          className={`focus-ring whitespace-nowrap rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                            useCustom
                              ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-surface)]"
                              : "border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent-soft)]"
                          }`}
                        >
                          ALTĂ SUMĂ {currency}
                        </button>
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder={`0 ${currency}`}
                          disabled={!useCustom}
                          className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-text-muted)] disabled:opacity-40"
                        />
                      </div>
                    </div>

                    <hr className="border-[var(--color-border)]" />

                    {/* Form */}
                    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { id: "prenume", label: "Prenume", type: "text", value: prenume, setter: setPrenume },
                          { id: "email", label: "Adresă email", type: "email", value: email, setter: setEmail },
                          { id: "telefon", label: "Telefon", type: "tel", value: telefon, setter: setTelefon },
                        ].map(({ id, label, type, value, setter }) => (
                          <div key={id}>
                            <label
                              htmlFor={id}
                              className="font-body text-xs font-medium tracking-[0.12em] uppercase mb-1 block text-[var(--color-text-muted)]"
                            >
                              {label}
                            </label>
                            <input
                              id={id}
                              type={type}
                              value={value}
                              onChange={(e) => setter(e.target.value)}
                              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-text-muted)]"
                            />
                          </div>
                        ))}

                        <div>
                          <label
                            htmlFor="campanie"
                            className="font-body text-xs font-medium tracking-[0.12em] uppercase mb-1 block text-[var(--color-text-muted)]"
                          >
                            Selectați campania
                          </label>
                          <div className="relative">
                            <select
                              id="campanie"
                              value={campanie}
                              onChange={(e) => setCampanie(e.target.value)}
                              className="w-full appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-text-muted)]"
                            >
                              <option value="">Selectați...</option>
                              {CAMPANII.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                            <svg
                              className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M4 6l4 4 4-4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* reCAPTCHA placeholder */}
                      <div className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-2.5">
                        <div className="h-5 w-5 shrink-0 rounded border-2 border-[var(--color-border)] bg-[var(--color-surface)]" />
                        <span className="font-body text-sm leading-[1.65] text-[var(--color-text-muted)]">
                          Nu sunt un robot
                        </span>
                        <div className="ml-auto flex flex-col items-center gap-0.5 text-center">
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 64 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M32 4C16.536 4 4 16.536 4 32s12.536 28 28 28 28-12.536 28-28S47.464 4 32 4zm0 6c4.56 0 8.784 1.4 12.24 3.78L13.78 44.24A21.88 21.88 0 0 1 10 32c0-12.15 9.85-22 22-22zm0 44c-4.56 0-8.784-1.4-12.24-3.78l30.46-30.46A21.88 21.88 0 0 1 54 32c0 12.15-9.85 22-22 22z"
                              fill="#4A8CF7"
                              opacity="0.55"
                            />
                          </svg>
                          <span className="text-[0.55rem] leading-tight text-[var(--color-text-muted)]">
                            reCAPTCHA
                          </span>
                          <span className="text-[0.5rem] leading-tight text-[var(--color-text-muted)] opacity-60">
                            Privacy · Terms
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="focus-ring w-full rounded-full bg-[var(--color-accent)] py-3.5 text-sm font-semibold tracking-[0.01em] text-[var(--color-surface)] transition-colors hover:bg-[var(--color-accent-hover)]"
                      >
                        Donează online
                      </button>
                    </form>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {/* ── Devino Partener ── */}
        <section
          id="devino-partener"
          className="flex min-h-[calc(100svh-var(--header-h))] scroll-mt-[var(--header-h)] items-center border-t border-[var(--color-border)] py-10"
        >
          <Container>
            <div className="mx-auto max-w-2xl">
              <ScrollReveal delay={0}>
                <p className="font-body text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)] text-center mb-6">
                  Construim împreună acolo unde contează.
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight text-[var(--color-text)] text-center mb-8">
                  Devino partener
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] text-left sm:text-center mb-6">
                  Schimbarea reală se construiește împreună — dintr-o comunitate care alege
                  să fie consecventă, prin sprijin specializat și pași concreți prin care oamenii
                  își pot recăpăta siguranța și puterea de a decide pentru propria viață.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="font-body text-base leading-[1.7] font-semibold text-[var(--color-text)] mb-3">
                  Donațiile partenerilor acoperă:
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "pachete de psihoterapie și consiliere psihologică gratuită, pentru persoane care altfel nu ar avea acces;",
                    "consiliere juridică, astfel încât beneficiarii să înțeleagă opțiunile și pașii posibili;",
                    "costuri operaționale esențiale (coordonare, administrare, spații, materiale);",
                    "dezvoltarea programelor și a rețelei de specialiști.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--color-accent-soft)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="font-body text-base leading-[1.7] font-semibold text-[var(--color-text)] mb-3">
                  Cum poți contribui
                </p>
                <ul className="grid gap-2 sm:grid-cols-2 mb-7">
                  {PARTENERIAT_TYPES.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-[0.35em] flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-tag-bg)]">
                        <span className="h-1 w-1 rounded-full bg-[var(--color-text-muted)]" />
                      </span>
                      <span className="font-body text-sm leading-[1.65] text-[var(--color-text-muted)]">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <PillButton href="mailto:asociatia.esme@gmail.com?subject=Parteneriat%20ESME">
                    Mă implic ca partener!
                  </PillButton>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--color-border)] py-10">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <Link
              href="/"
              className="focus-ring font-body text-sm leading-[1.65] inline-flex items-center gap-1.5 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <LogoESME className="h-[0.72em] w-auto shrink-0 [height:1.5cap]" aria-hidden="true" />
              <span className="tracking-[0.06em]">ESME</span>
            </Link>
            <p className="font-body text-sm leading-[1.65] text-[var(--color-text-muted)]">
              © {new Date().getFullYear()} Asociația ESME. Toate drepturile rezervate.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
