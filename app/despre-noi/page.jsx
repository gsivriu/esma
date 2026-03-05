import Link from "next/link";
import Image from "next/image";
import Container from "../../components/ui/Container";
import LogoESME from "../../components/LogoESME";
import ScrollReveal from "../../components/ui/ScrollReveal";

export const metadata = {
  title: "Despre noi | esme",
  description:
    "Povestea noastră: cum s-a născut ESME și ce ne propunem să facem pentru victimele violenței domestice.",
};

const TEAM = [
  {
    name: "Silviana Adam",
    role: "Psiholog",
    photo: "/team/Silviana.jpeg?v=20260219-1",
    story:
      "Sunt Silviana Adam, psihoterapeut și femeie. În practica mea, cred în puterea unui spațiu sigur, un loc în care nu trebuie să demonstrezi nimic și nu trebuie să fii altfel decât ești. Un spațiu în care poți să încetinești, să respiri și să te auzi cu adevărat. Consider că vindecarea nu înseamnă să devii mai puternic/ă, ci să te simți suficient de în siguranță încât să fii tu. Să îți recapeți treptat încrederea în propriile trăiri, în propriile limite, în propria voce.",
  },
  {
    name: "Mihaela Cima",
    role: "Psiholog",
    photo: "/team/Mihaela.jpeg?v=20260219-1",
    story:
      "'Fă tot ce îți stă în putință și asta va fi de-ajuns' este credința care îmi așază pașii, zi de zi. În practica mea, aleg să fiu prezentă cu tot ceea ce sunt, să sprijin, să ghidez, să fac loc. Cred în puterea unui spațiu sigur, în care oamenii pot să respire, să se așeze și să crească în ritmul lor. Fac tot ce îmi stă în putință, cu blândețe și responsabilitate, iar apoi am încredere că acest „destul” este, de fapt, începutul transformării.",
  },
  {
    name: "Vlad Diaconu",
    role: "Asistent Social",
    photo: "/team/Vlad.jpeg?v=20260219-1",
    story:
      "Vlad susține procesele de stabilizare și direcționare către resursele potrivite, astfel încât fiecare persoană să știe ce urmează și unde găsește sprijin real.",
  },
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
      <main className="pt-[var(--header-h)]">
        <section className="pt-16 md:pt-24 pb-7 md:pb-10">
          <Container>
            {/* ── Povestea noastră ── */}
            <div className="mx-auto max-w-4xl text-left sm:text-center">
              <ScrollReveal delay={0}>
                <p className="hidden md:block font-body text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-6">
                  Despre noi
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-[var(--color-text)]">
                  Povestea noastră
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <blockquote className="mt-8 md:mt-16 mx-auto max-w-2xl">
                  <p className="font-display text-[clamp(1.3rem,5.5vw,2rem)] italic font-light leading-snug text-[var(--color-text)]">
                    „Nu am crescut într-o casă cu violență. Am crescut cu poveștile
                    ei, spuse târziu. Cu rușinea mamei mele. Cu fraze ca
                    «nu spune nimănui»."
                  </p>
                </blockquote>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="mt-8 md:mt-16 space-y-5 mx-auto max-w-2xl">
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

            {/* ── Ce își propune ESME ── */}
            <div className="mt-16 md:mt-40">
              <ScrollReveal delay={0}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-left sm:text-center text-[var(--color-text)]">
                  Ce își propune<br className="hidden md:block" /> ESME
                </h2>
              </ScrollReveal>

              <div className="grid-services mt-10 sm:mt-20">
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
            {/* ── Echipa noastră ── */}
            <div className="mt-20 md:mt-40 pb-16 md:pb-28">
              <ScrollReveal delay={0}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-left sm:text-center text-[var(--color-text)]">
                  Echipa noastră
                </h2>
                <p className="mt-4 font-body text-base leading-[1.7] text-[var(--color-text-muted)] text-left sm:text-center max-w-[52ch] sm:mx-auto">
                  O echipă interdisciplinară dedicată sprijinului constant pentru femeile afectate de abuz domestic.
                </p>
              </ScrollReveal>

              <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {TEAM.map((member, i) => (
                  <ScrollReveal key={member.name} delay={i * 0.1}>
                    <article className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)]">
                      {/* Poza */}
                      <div className="relative aspect-[1/1] w-full overflow-hidden">
                        <Image
                          src={member.photo}
                          alt={member.name}
                          fill
                          className="object-cover object-[50%_40%]"
                          sizes="(min-width: 768px) 33vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,12,0.08)_38%,rgba(20,16,12,0.62)_78%,rgba(20,16,12,0.86)_100%)]" />
                      </div>
                      {/* Continut */}
                      <div className="p-6 md:p-8 space-y-4">
                        <div>
                          <p className="font-body text-xs font-medium tracking-[0.15em] uppercase text-[var(--color-text-muted)] mb-1.5">
                            {member.role}
                          </p>
                          <h3 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                            {member.name}
                          </h3>
                        </div>
                        <div
                          aria-hidden="true"
                          className="h-px w-10"
                          style={{ background: "linear-gradient(to right, #C17F3E, transparent)" }}
                        />
                        <p className="font-body text-sm leading-[1.8] text-[var(--color-text-muted)]">
                          {member.story}
                        </p>
                      </div>
                    </article>
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
