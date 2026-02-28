export default function Container({ className = "", children }) {
  return <div className={`page-container ${className}`}>{children}</div>;
}
