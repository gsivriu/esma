import Link from "next/link";
import Container from "../../components/ui/Container";
import LogoESME from "../../components/LogoESME";
import ScrollReveal from "../../components/ui/ScrollReveal";

export const metadata = {
  title: "Politică de confidențialitate | esme",
  description:
    "Politica de confidențialitate a Asociației ESME privind prelucrarea datelor personale.",
};

const COLLECTED_DATA = [
  "nume și prenume",
  "adresă de email",
  "număr de telefon",
  "mesajul transmis de utilizator",
];

const PROCESSING_PURPOSES = [
  "analizarea solicitărilor de ajutor",
  "contactarea persoanei care a transmis solicitarea",
  "gestionarea activităților organizației",
];

const GDPR_RIGHTS = [
  "acces la datele personale",
  "rectificarea datelor",
  "ștergerea datelor",
  "restricționarea prelucrării",
  "opoziția la prelucrare",
];

export default function PoliticaDeConfidentialitatePage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      <main className="pt-[var(--header-h)]">
        <section className="pt-16 md:pt-24 pb-10 md:pb-14">
          <Container>
            <div className="mx-auto max-w-4xl text-left">
              <ScrollReveal delay={0}>
                <p className="hidden md:block font-body text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-6">
                  Legal
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-[var(--color-text)]">
                  Politica de Confidențialitate
                </h1>
              </ScrollReveal>

              <div className="mt-8 md:mt-12 space-y-10">
                <ScrollReveal delay={0.1}>
                  <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                    Asociația ESME respectă confidențialitatea datelor personale ale
                    utilizatorilor site-ului și se angajează să le protejeze în
                    conformitate cu Regulamentul (UE) 2016/679 privind protecția
                    datelor cu caracter personal (GDPR).
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.15}>
                  <section className="space-y-4">
                    <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                      Datele pe care le colectăm
                    </h2>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      Prin intermediul formularului de pe site putem colecta
                      următoarele informații:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      {COLLECTED_DATA.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      Aceste informații sunt furnizate voluntar atunci când
                      completați formularul de contact sau solicitare de ajutor.
                    </p>
                  </section>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <section className="space-y-4">
                    <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                      Scopul colectării datelor
                    </h2>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      Datele sunt utilizate exclusiv pentru:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      {PROCESSING_PURPOSES.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      Nu folosim datele personale în scopuri comerciale și nu le
                      vindem către terți.
                    </p>
                  </section>
                </ScrollReveal>

                <ScrollReveal delay={0.25}>
                  <section className="space-y-4">
                    <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                      Temeiul legal
                    </h2>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      Prelucrarea datelor se realizează în baza consimțământului
                      persoanei care transmite informațiile prin formularul de pe
                      site.
                    </p>
                  </section>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <section className="space-y-4">
                    <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                      Partajarea datelor
                    </h2>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      Datele pot fi accesate doar de către persoanele autorizate din
                      cadrul organizației sau de către furnizorii tehnici necesari
                      funcționării site-ului (ex: servicii de hosting).
                    </p>
                  </section>
                </ScrollReveal>

                <ScrollReveal delay={0.35}>
                  <section className="space-y-4">
                    <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                      Durata stocării
                    </h2>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      Datele sunt păstrate doar pe perioada necesară pentru
                      gestionarea solicitării sau pentru îndeplinirea obligațiilor
                      legale.
                    </p>
                  </section>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <section className="space-y-4">
                    <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                      Drepturile dumneavoastră
                    </h2>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      Conform GDPR aveți următoarele drepturi:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      {GDPR_RIGHTS.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      De asemenea, aveți dreptul de a depune o plângere la
                      Autoritatea Națională de Supraveghere a Prelucrării Datelor cu
                      Caracter Personal (ANSPDCP).
                    </p>
                  </section>
                </ScrollReveal>

                <ScrollReveal delay={0.45}>
                  <section className="space-y-4">
                    <h2 className="font-display text-xl md:text-2xl font-medium leading-snug text-[var(--color-text)]">
                      Contact
                    </h2>
                    <p className="font-body text-base leading-[1.7] text-[var(--color-text-muted)]">
                      Pentru orice solicitare privind datele personale ne puteți
                      contacta la:
                    </p>
                    <a
                      href="mailto:asociatia.esme@gmail.com"
                      className="focus-ring inline-flex font-body text-base leading-[1.7] text-[var(--color-text)] underline underline-offset-4 transition-colors hover:text-[var(--color-text-muted)]"
                    >
                      asociatia.esme@gmail.com
                    </a>
                  </section>
                </ScrollReveal>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-[var(--color-border)] py-10">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <Link
              href="/"
              className="focus-ring font-body text-sm leading-[1.65] inline-flex items-center gap-1.5 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <LogoESME
                className="h-[0.72em] w-auto shrink-0 [height:1.5cap]"
                aria-hidden="true"
              />
              <span className="tracking-[0.06em]">ESME</span>
            </Link>
            <p className="font-body text-sm leading-[1.65] text-[var(--color-text-muted)]">
              © {new Date().getFullYear()} Asociația ESME. Toate drepturile
              rezervate.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
