import { Cormorant_Garamond, DM_Sans, Fraunces } from "next/font/google";
import InitialPageLoader from "../components/InitialPageLoader";
import GlobalNavbar from "../components/GlobalNavbar";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const logoWordmarkFont = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--font-logo",
  display: "swap",
});

const numbersFont = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-numbers",
  display: "swap",
});

export const metadata = {
  title: "esme | Sprijin, siguranță, comunitate",
  description:
    "ESME este o asociație dedicată sprijinirii victimelor abuzului domestic prin implicarea activă a comunității.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={`${headingFont.variable} ${bodyFont.variable} ${logoWordmarkFont.variable} ${numbersFont.variable}`}>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <InitialPageLoader />
        <GlobalNavbar />
        {children}
      </body>
    </html>
  );
}
