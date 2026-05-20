interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}

export function GlowCard({ children, className = "", featured = false }: GlowCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-px ${
        featured
          ? "bg-gradient-to-b from-jva-accent/60 to-jva-purple/30"
          : "bg-jva-purple/30 hover:bg-jva-purple/50 transition-colors duration-300"
      } ${className}`}
    >
      <div
        className={`rounded-2xl h-full ${
          featured
            ? "bg-gradient-to-b from-jva-mid to-jva-dark"
            : "bg-jva-dark"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
