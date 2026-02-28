export default function SectionHeader({
  badge,
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <header className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {badge ? (
        <span className="font-body text-xs font-medium tracking-[0.12em] uppercase inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-2 font-medium text-[var(--color-text-muted)]">
          {badge}
        </span>
      ) : null}
      <h2 className={`font-display text-3xl md:text-5xl font-medium leading-tight max-w-[22ch] text-[var(--color-text)] ${titleClassName}`}>{title}</h2>
      {description ? (
        <p className={`type-body max-w-[64ch] text-[var(--color-text-muted)] ${descriptionClassName}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
