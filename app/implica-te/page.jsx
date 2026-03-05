"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Container from "../../components/ui/Container";
import PillButton from "../../components/ui/PillButton";
import ScrollReveal from "../../components/ui/ScrollReveal";
import LogoESME from "../../components/LogoESME";

const EMPTY_VOLUNTAR = { nume: "", prenume: "", email: "", telefon: "", mesaj: "" };

const inputClass =
  "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder-[rgba(44,32,21,0.28)] outline-none focus:border-[#562F00] focus:ring-2 focus:ring-[rgba(86,47,0,0.15)] transition-colors";

const labelClass = "block text-xs font-semibold tracking-wide text-[var(--color-text-muted)] uppercase mb-1.5";

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
  const [voluntarModalOpen, setVoluntarModalOpen] = useState(false);
  const [voluntarForm, setVoluntarForm] = useState(EMPTY_VOLUNTAR);
  const [voluntarSubmitting, setVoluntarSubmitting] = useState(false);
  const [voluntarSuccess, setVoluntarSuccess] = useState(false);
  const [voluntarError, setVoluntarError] = useState("");

  const [currency, setCurrency] = useState("RON");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [useCustom, setUseCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [prenume, setPrenume] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [campanie, setCampanie] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#doneaza" || hash === "#fii-voluntar" || hash === "#devino-partener") {
      setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  // Volunteer modal handlers
  useEffect(() => {
    if (voluntarModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [voluntarModalOpen]);

  const openVoluntarModal = () => {
    setVoluntarSuccess(false);
    setVoluntarError("");
    setVoluntarForm(EMPTY_VOLUNTAR);
    setVoluntarModalOpen(true);
  };

  const closeVoluntarModal = () => {
    setVoluntarModalOpen(false);
    setVoluntarForm(EMPTY_VOLUNTAR);
    setVoluntarSuccess(false);
    setVoluntarError("");
  };

  const handleVoluntarField = (e) => {
    const { name, value } = e.target;
    setVoluntarForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVoluntarSubmit = async (e) => {
    e.preventDefault();
    setVoluntarSubmitting(true);
    setVoluntarError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optiune: "Voluntariat ESME", ...voluntarForm }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare necunoscută.");
      setVoluntarSuccess(true);
      setVoluntarForm(EMPTY_VOLUNTAR);
    } catch (err) {
      setVoluntarError(err.message || "A apărut o eroare. Încearcă din nou.");
    } finally {
      setVoluntarSubmitting(false);
    }
  };

  const handleCurrencyChange = (c) => {
    setCurrency(c);
    setSelectedAmount(DONATION_AMOUNTS[c][1]);
    setUseCustom(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <main className="pt-[var(--header-h)]">
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
                      className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--color-accent)]"
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
                  <PillButton onClick={openVoluntarModal}>
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
                      className="font-body text-base leading-[1.7] text-[var(--color-text-muted)] relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--color-accent)]"
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
                      <span className="mt-[0.35em] flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-tag-bg)]">
                        <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
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

      {/* ── Voluntar Modal ── */}
      <AnimatePresence>
        {voluntarModalOpen && (
          <>
            <motion.div
              key="voluntar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-[rgba(17,12,8,0.45)] backdrop-blur-[3px]"
              onClick={closeVoluntarModal}
              aria-hidden="true"
            />

            <motion.div
              key="voluntar-modal"
              role="dialog"
              aria-modal="true"
              aria-label="Fii Voluntar!"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[61] flex items-center justify-center p-3 sm:p-6 pointer-events-none"
            >
              <div
                className="section-shell relative w-full max-w-4xl max-h-[94svh] overflow-y-auto pointer-events-auto flex flex-col gap-3 sm:gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={closeVoluntarModal}
                  aria-label="Închide"
                  className="focus-ring absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[#562F00] hover:text-[#562F00]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Title */}
                <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)] pr-8">
                  Fii Voluntar!
                </h2>

                {voluntarSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-4 py-6 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(86,47,0,0.08)]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="#562F00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="font-display text-lg font-medium text-[var(--color-text)]">
                      Mesajul a fost trimis!
                    </p>
                    <p className="font-body text-sm leading-[1.65] text-[var(--color-text-muted)]">
                      Te vom contacta în cel mai scurt timp posibil.
                    </p>
                    <button
                      type="button"
                      onClick={closeVoluntarModal}
                      className="focus-ring mt-2 font-body text-sm font-semibold text-[#562F00] underline-offset-4 hover:underline"
                    >
                      Închide
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleVoluntarSubmit} className="flex flex-col gap-2.5 sm:gap-5" noValidate>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-5">
                      <div>
                        <label htmlFor="v-nume" className={labelClass}>Nume *</label>
                        <input
                          id="v-nume"
                          name="nume"
                          type="text"
                          autoComplete="family-name"
                          required
                          value={voluntarForm.nume}
                          onChange={handleVoluntarField}
                          className={inputClass}
                          placeholder="Popescu"
                        />
                      </div>
                      <div>
                        <label htmlFor="v-prenume" className={labelClass}>Prenume *</label>
                        <input
                          id="v-prenume"
                          name="prenume"
                          type="text"
                          autoComplete="given-name"
                          required
                          value={voluntarForm.prenume}
                          onChange={handleVoluntarField}
                          className={inputClass}
                          placeholder="Maria"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-5">
                      <div>
                        <label htmlFor="v-email" className={labelClass}>Email *</label>
                        <input
                          id="v-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={voluntarForm.email}
                          onChange={handleVoluntarField}
                          className={inputClass}
                          placeholder="exemplu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="v-telefon" className={labelClass}>Telefon *</label>
                        <input
                          id="v-telefon"
                          name="telefon"
                          type="tel"
                          autoComplete="tel"
                          required
                          value={voluntarForm.telefon}
                          onChange={handleVoluntarField}
                          className={inputClass}
                          placeholder="07XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="v-mesaj" className={labelClass}>Cum vrei să te implici? *</label>
                      <textarea
                        id="v-mesaj"
                        name="mesaj"
                        rows={4}
                        maxLength={500}
                        required
                        value={voluntarForm.mesaj}
                        onChange={handleVoluntarField}
                        className={`${inputClass} resize-none`}
                        placeholder="Câteva cuvinte despre disponibilitatea ta..."
                      />
                      <p className="mt-1.5 font-body text-xs leading-[1.6] text-[var(--color-text-muted)]">
                        Completează detalii despre disponibilitatea ta (zile și interval orar), tipurile de terapie oferite (individuală, cuplu, grup), specializarea ta și orice alte informații relevante (limbi străine, experiență specifică).
                      </p>
                    </div>

                    {voluntarError && (
                      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {voluntarError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={voluntarSubmitting}
                      className="focus-ring mt-1 flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-[0.9375rem] font-semibold text-[var(--color-surface)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {voluntarSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Se trimite...
                        </span>
                      ) : (
                        "Trimite"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
