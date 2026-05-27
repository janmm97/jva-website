"use client";

import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "heroCta";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantClasses = {
  primary:
    "bg-jva-accent hover:bg-jva-bright text-white font-medium transition-all duration-200 shadow-lg shadow-jva-accent/20 hover:shadow-jva-bright/30",
  ghost:
    "text-jva-lavender hover:text-white font-medium transition-all duration-200",
  outline:
    "border border-jva-purple/60 text-jva-lavender hover:border-jva-bright/60 hover:text-white font-medium transition-all duration-200",
  heroCta:
    "bg-jva-accent text-white font-medium transition-all duration-300 shadow-[0_0_18px_rgba(255,255,255,0.35)] hover:bg-white hover:text-purple-500 hover:shadow-[0_0_24px_rgba(192,132,252,0.6)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", href, target, rel, children, className = "", ...props },
    ref
  ) => {
    const classes = `inline-flex items-center justify-center gap-2 rounded-full cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

    if (href) {
      return (
        <a href={href} target={target} rel={rel} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
