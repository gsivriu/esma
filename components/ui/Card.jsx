export default function Card({ className = "", children, ...props }) {
  return (
    <article className={`section-shell ${className}`} {...props}>
      {children}
    </article>
  );
}
