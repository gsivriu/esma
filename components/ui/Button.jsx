import Link from "next/link";

const baseClass =
  "focus-ring font-body text-sm leading-[1.65] inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold tracking-[0.01em] transition-all duration-100 active:opacity-[0.85] active:scale-[0.97]";

const variants = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-surface)] hover:bg-[var(--color-accent-hover)]",
  secondary:
    "border border-[var(--color-accent)] bg-transparent text-[var(--color-accent)]",
  ghost:
    "text-[var(--color-accent)] underline-offset-4",
  brown:
    "border border-[#562F00] bg-[#562F00] text-[var(--color-text-inverse)]",
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
