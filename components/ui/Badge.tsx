interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "featured";
  className?: string;
}

const variantClasses = {
  default: "bg-jva-purple/40 border border-jva-accent/50 text-jva-lavender",
  success: "bg-green-500/15 border border-green-500/40 text-green-400",
  warning: "bg-amber-500/15 border border-amber-500/40 text-amber-400",
  featured: "bg-jva-accent text-white border border-jva-bright/30",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
