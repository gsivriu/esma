import Link from "next/link";

const baseClass =
  "focus-ring font-body text-sm leading-[1.65] inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold tracking-[0.01em] transition-colors";

const variants = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-surface)] hover:bg-[var(--color-accent-hover)]",
  secondary:
    "border border-[var(--color-accent)] bg-transparent text-[var(--color-accent)] hover:bg-[rgba(255,150,68,0.12)]",
  ghost:
    "text-[var(--color-accent)] underline-offset-4 hover:underline",
  brown:
    "border border-[#562F00] bg-[#562F00] text-[var(--color-text-inverse)] hover:bg-[var(--color-bg)] hover:text-[#2C2015] hover:border-[rgba(44,32,21,0.35)]",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const classes = `${baseClass} ${variants[variant] ?? variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
