interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="block w-4 h-px bg-jva-accent" />
      <span className="text-xs font-medium tracking-widest uppercase text-jva-accent font-body">
        {children}
      </span>
    </div>
  );
}
