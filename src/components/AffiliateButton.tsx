import React from "react";
import { AffiliateSlug } from "@/lib/affiliates";

interface AffiliateButtonProps {
  slug?: AffiliateSlug;
  href?: string;
  variant?: "primary" | "secondary" | "accent" | "outline" | "text";
  className?: string;
  children: React.ReactNode;
}

export default function AffiliateButton({
  slug = "default",
  href,
  variant = "primary",
  className = "",
  children,
}: AffiliateButtonProps) {
  const targetHref = href || `/go/${slug}`;

  const baseStyles = "inline-flex items-center justify-center font-sans font-medium uppercase tracking-widest text-[10px] transition-all duration-300 cursor-pointer";
  
  const variantStyles = {
    primary: "bg-stone-900 text-stone-50 hover:bg-stone-850 px-6 py-3.5 border border-stone-900 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 dark:border-stone-100",
    secondary: "bg-stone-100 text-stone-900 hover:bg-stone-200 px-6 py-3.5 border border-stone-100 dark:bg-stone-850 dark:text-stone-50 dark:hover:bg-stone-750 dark:border-stone-850",
    accent: "bg-amber-600 text-white hover:bg-amber-700 px-6 py-3.5 border border-amber-600",
    outline: "border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 px-6 py-3.5 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-400 dark:hover:text-stone-100",
    text: "text-stone-900 hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400 underline underline-offset-4 px-0 py-1 font-bold",
  };

  return (
    <a
      href={targetHref}
      target="_blank"
      rel="nofollow sponsored"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
