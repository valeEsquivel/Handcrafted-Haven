export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors ${className}`}
      {...props}
    />
  );
}
