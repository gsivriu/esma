"use client";

export default function TopBanner({ brand = "ESME", label = "", href = "#acasa" }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80]">
      <div className="relative w-full">
        <svg
          className="block h-[43px] w-full md:h-[47px] xl:h-[43px]"
          viewBox="0 0 1440 43"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
  d="
    M 0 0
    H 1440
    V 9
    H 781
    A 8 8 0 0 0 773 17
    V 25
    A 8 8 0 0 1 765 33
    H 675
    A 8 8 0 0 1 667 25
    V 17
    A 8 8 0 0 0 659 9
    H 0
    Z
  "
  fill="#F5EFE8"
/>
          <rect x="0" y="0" width="1440" height="1.5" fill="rgba(255,255,255,0.55)" />
        </svg>

        <div className="absolute left-1/2 top-[2px] -translate-x-1/2 text-center md:top-[3px] xl:top-[2px]">
          {label ? (
            <div className="text-[9px] tracking-[0.28em] text-[#6b544f]/80 md:text-[10px]">{label}</div>
          ) : null}

          <a
            href={href}
            className="focus-ring pointer-events-auto inline-flex items-center justify-center px-3 py-0 md:px-4 md:py-0"
            aria-label={brand}
          >
            <span
              className="text-[29px] font-light leading-none tracking-[0.24em] text-[#5a4540] md:text-[31px] xl:text-[29px]"
              style={{
                fontFamily:
                  'var(--font-logo), "Cormorant Garamond", "Times New Roman", serif',
              }}
            >
              {brand}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
