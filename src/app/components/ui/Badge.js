export function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-accent text-accent-foreground",
    outline: "border border-border text-muted-foreground",
    success: "bg-green-100 text-green-800",
    danger: "bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
