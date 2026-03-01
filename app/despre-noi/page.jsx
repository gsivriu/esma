import Link from "next/link";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import LogoESME from "../../components/LogoESME";
import ScrollReveal from "../../components/ui/ScrollReveal";

export const metadata = {
  title: "Despre noi | ESME",
  description:
    "Povestea noastră: cum s-a născut ESME și ce ne propunem să facem pentru victimele violenței domestice.",
};

const NAV_LINKS = [
  { label: "Acasă", href: "/" },
  { label: "Despre noi", href: "/despre-noi" },
  { label: "Cere ajutor", href: "/cere-ajutor" },
  { label: "Implică-te", href: "/implica-te" },
];

const PILLARS = [
  {
    title: "Sprijin psihologic, social și judiciar",
    body: "Oferim consiliere psihologică, suport practic integrat și asistență juridică persoanelor care aleg să iasă din mediul violent, sprijinindu-le în reducerea impactului traumei și reconstruirea autonomiei.",
  },
  {
    title: "Psihoeducație pentru comunitate",
    body: "Dezvoltăm programe de informare publică despre dinamica violenței domestice, contribuind la schimbarea mentalităților și la creșterea capacității comunității de a recunoaște și semnala abuzul.",
  },
  {
    title: "Dezvoltarea unui adăpost integrat",
    body: "Construim un adăpost care oferă nu doar siguranță fizică imediată, ci și un cadru terapeutic și social pentru reconstruirea stabilității, încrederii și perspectivelor de viitor.",
  },
];

export default function DespreNoi() {
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

            <Button href="/implica-te" variant="primary" className="hidden sm:inline-flex !rounded-full h-10">
              Donează
            </Button>
          </div>
        </Container>
      </header>

      <main>
        <section className="pt-24 pb-7 md:pb-10">
          <Container>
            {/* ── Povestea noastră ── */}
            <div className="mx-auto max-w-4xl text-left sm:text-center">
              <ScrollReveal delay={0}>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-6">
                  Despre noi
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-[var(--color-text)]">
                  Povestea noastră
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <blockquote className="mt-14 md:mt-16 mx-auto max-w-2xl">
                  <p className="font-display text-[clamp(1.3rem,5.5vw,2rem)] italic font-light leading-snug text-[var(--color-text)]">
                    „Nu am crescut într-o casă cu violență. Am crescut cu poveștile
                    ei, spuse târziu. Cu rușinea mamei mele. Cu fraze ca
                    «nu spune nimănui»."
                  </p>
                </blockquote>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-14 md:mt-16 space-y-5 mx-auto max-w-2xl">
                  <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                    Așa s-a născut ESME.
                  </h2>
                  <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                    Din nevoia de a crea opțiuni reale. Un spațiu sigur unde o
                    femeie poate vorbi fără presiune și fără a fi forțată să decidă.
                    ESME oferă sprijin psihologic, juridic și medical. Nu promite
                    salvare. Promite prezență și claritate. Și lucrează, pas cu pas,
                    pentru ca „nu aveai unde să pleci" să nu mai fie o realitate.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* ── Ce își propune esme ── */}
            <div className="mt-28 md:mt-40">
              <ScrollReveal delay={0}>
                <h2 className="font-display text-3xl md:text-5xl font-medium leading-tight text-left sm:text-center text-[var(--color-text)]">
                  Ce își propune
                  <br />
                  esme
                </h2>
              </ScrollReveal>

              <div className="grid-services mt-16 sm:mt-20">
                {PILLARS.map((pillar, i) => (
                  <ScrollReveal key={pillar.title} delay={i * 0.1}>
                    <div className="space-y-4 pt-6">
                      <h3 className="font-display text-xl md:text-2xl font-medium leading-snug font-semibold text-[var(--color-text)]">
                        {pillar.title}
                      </h3>
                      <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                        {pillar.body}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
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
