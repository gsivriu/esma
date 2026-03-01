"use client";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../../components/ui/Container";
import PillButton from "../../components/ui/PillButton";
import EsmeLocationToggle from "../../components/ui/EsmeLocationToggle";
import ScrollReveal from "../../components/ui/ScrollReveal";

const HELP_OPTIONS = {
  constanta: {
    title: "Întâlnire fizică cu un voluntar ESME",
    description:
      "Ne putem vedea în Constanța, într-un cadru sigur, calm și confidențial, în ritmul tău.",
    formTitle: "Solicită o întâlnire fizică",
  },
  "alt-oras": {
    title: "Întâlnire online cu un voluntar ESME",
    description:
      "Discutăm online, în condiții de confidențialitate, ca să înțelegi ce opțiuni ai acum.",
    formTitle: "Solicită o întâlnire online",
  },
};

const EMPTY_FORM = { nume: "", prenume: "", email: "", telefon: "", mesaj: "" };

const inputClass =
  "w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text)] placeholder-[rgba(44,32,21,0.28)] outline-none focus:border-[#562F00] focus:ring-2 focus:ring-[rgba(86,47,0,0.15)] transition-colors";

const labelClass = "block text-xs font-semibold tracking-wide text-[var(--color-text-muted)] uppercase mb-1.5";

export default function CereAjutor() {
  const [activeTab, setActiveTab] = useState("constanta");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const helpCard = useMemo(() => HELP_OPTIONS[activeTab], [activeTab]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openModal = () => {
    setSubmitSuccess(false);
    setSubmitError("");
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm(EMPTY_FORM);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optiune: helpCard.formTitle, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare necunoscută.");
      setSubmitSuccess(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      setSubmitError(err.message || "A apărut o eroare. Încearcă din nou.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* ── Content ── */}
      <main className="pt-[var(--header-h)]">
        <section>
          <Container>
            <div
              className="flex min-h-[calc(100svh-var(--header-h))] flex-col justify-start gap-10 pb-16"
              style={{ paddingTop: "calc((100svh - var(--header-h)) / 19)" }}
            >
              <ScrollReveal delay={0}>
                <div className="space-y-5 text-center">
                  <h1 className="font-display text-3xl md:text-5xl font-medium leading-tight mx-auto max-w-[22ch] text-[var(--color-text)]">
                    Suntem aici pentru tine
                  </h1>
                  <p className="font-body text-lg leading-[1.68] mx-auto max-w-[64ch] text-[var(--color-text-muted)]">
                    Alege varianta care ți se potrivește
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="space-y-8">
                  <div className="flex justify-center">
                    <EsmeLocationToggle
                      value={activeTab}
                      onChange={setActiveTab}
                      ariaLabel="Selectează localitatea"
                      offLabel="Sunt din Constanța"
                      onLabel="Sunt din alt oraș"
                    />
                  </div>

                  <div className="mx-auto max-w-2xl">
                    <div className="section-shell flex flex-col items-center gap-6 text-center">
                      <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                        {helpCard.title}
                      </h2>
                      <p className="font-body text-lg leading-[1.68] text-[var(--color-text-muted)]">
                        {helpCard.description}
                      </p>
                      <PillButton onClick={openModal} className="!max-w-none sm:!max-w-[220px]">
                        Solicită o discuție
                      </PillButton>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </Container>
        </section>
      </main>

      {/* ── Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-[rgba(17,12,8,0.45)] backdrop-blur-[3px]"
              onClick={closeModal}
              aria-hidden="true"
            />

            {/* Modal card */}
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-label={helpCard.formTitle}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="section-shell relative w-full max-w-xl max-h-[90svh] overflow-y-auto pointer-events-auto flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Închide"
                  className="focus-ring absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[#562F00] hover:text-[#562F00]"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Title */}
                <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)] pr-8">
                  {helpCard.formTitle}
                </h2>

                {submitSuccess ? (
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
                      onClick={closeModal}
                      className="focus-ring mt-2 font-body text-sm font-semibold text-[#562F00] underline-offset-4 hover:underline"
                    >
                      Închide
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="nume" className={labelClass}>Nume</label>
                        <input
                          id="nume"
                          name="nume"
                          type="text"
                          autoComplete="family-name"
                          required
                          value={form.nume}
                          onChange={handleField}
                          className={inputClass}
                          placeholder="Popescu"
                        />
                      </div>
                      <div>
                        <label htmlFor="prenume" className={labelClass}>Prenume</label>
                        <input
                          id="prenume"
                          name="prenume"
                          type="text"
                          autoComplete="given-name"
                          required
                          value={form.prenume}
                          onChange={handleField}
                          className={inputClass}
                          placeholder="Maria"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className={labelClass}>Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={form.email}
                          onChange={handleField}
                          className={inputClass}
                          placeholder="exemplu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="telefon" className={labelClass}>Număr de telefon</label>
                        <input
                          id="telefon"
                          name="telefon"
                          type="tel"
                          autoComplete="tel"
                          required
                          value={form.telefon}
                          onChange={handleField}
                          className={inputClass}
                          placeholder="07XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="mesaj" className={labelClass}>
                        Descrie problema ta pe scurt
                      </label>
                      <textarea
                        id="mesaj"
                        name="mesaj"
                        rows={4}
                        maxLength={500}
                        required
                        value={form.mesaj}
                        onChange={handleField}
                        className={`${inputClass} resize-none`}
                        placeholder="Câteva cuvinte despre situația ta..."
                      />
                    </div>

                    {submitError && (
                      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="focus-ring mt-1 flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-[0.9375rem] font-semibold text-[var(--color-surface)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
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
    </div>
  );
}
