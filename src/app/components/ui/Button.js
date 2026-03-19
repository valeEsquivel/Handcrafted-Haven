"use client";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/85",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/85",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
    ghost: "bg-transparent text-foreground hover:bg-muted",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/85",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2",
    icon: "w-9 h-9 p-0",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
