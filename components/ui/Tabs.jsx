export default function Tabs({
  tabs,
  activeValue,
  onChange,
  ariaLabel = "Opțiuni",
  className = "",
}) {
  return (
    <div
      className={`inline-flex w-full flex-wrap items-center gap-2 rounded-[0.95rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-2 sm:w-auto ${className}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === activeValue;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`focus-ring font-body text-sm leading-[1.65] rounded-[0.95rem] px-4 py-2 font-medium transition-colors ${
              isActive
                ? "bg-[var(--color-accent)] text-[var(--color-surface)]"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-strong)] hover:text-[var(--color-text)]"
            }`}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
