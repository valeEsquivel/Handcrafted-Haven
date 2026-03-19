export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-card border border-border rounded-xl shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
