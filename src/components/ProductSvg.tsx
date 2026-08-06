import React from "react";

export default function ProductSvg({ 
  path, 
  className = "w-full h-full text-stone-900/10 dark:text-white/10" 
}: { 
  path: string; 
  className?: string;
}) {
  switch (path) {
    case "pendant":
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <line x1="50" y1="10" x2="50" y2="35" strokeWidth="1.5" />
          <rect x="20" y="35" width="60" height="28" fill="currentColor" opacity="0.05" rx="2" />
          <rect x="20" y="35" width="60" height="28" strokeWidth="1.5" rx="2" />
          <line x1="20" y1="42" x2="80" y2="42" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="20" y1="49" x2="80" y2="49" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="20" y1="56" x2="80" y2="56" strokeWidth="0.5" strokeDasharray="2 2" />
        </svg>
      );
    case "sconce":
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <rect x="42" y="25" width="16" height="50" rx="1" fill="currentColor" opacity="0.05" />
          <rect x="42" y="25" width="16" height="50" rx="1" strokeWidth="1.5" />
          <line x1="42" y1="35" x2="58" y2="35" strokeWidth="0.75" />
          <line x1="42" y1="45" x2="58" y2="45" strokeWidth="0.75" />
          <line x1="42" y1="55" x2="58" y2="55" strokeWidth="0.75" />
          <line x1="42" y1="65" x2="58" y2="65" strokeWidth="0.75" />
          <path d="M42 25 L 20 5 L 80 5 L 58 25 Z" fill="currentColor" opacity="0.03" />
          <path d="M42 75 L 20 95 L 80 95 L 58 75 Z" fill="currentColor" opacity="0.03" />
        </svg>
      );
    case "lantern":
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M25 60 C 25 30, 75 30, 75 60 C 75 75, 25 75, 25 60 Z" fill="currentColor" opacity="0.05" />
          <path d="M25 60 C 25 30, 75 30, 75 60 C 75 75, 25 75, 25 60 Z" strokeWidth="1.5" />
          <line x1="50" y1="30" x2="50" y2="75" strokeWidth="0.75" />
          <line x1="37" y1="35" x2="37" y2="72" strokeWidth="0.5" strokeDasharray="1 1" />
          <line x1="63" y1="35" x2="63" y2="72" strokeWidth="0.5" strokeDasharray="1 1" />
          <line x1="33" y1="75" x2="25" y2="88" strokeWidth="1.5" />
          <line x1="67" y1="75" x2="75" y2="88" strokeWidth="1.5" />
        </svg>
      );
    case "travertine":
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M25 50 C 25 25, 75 25, 75 50 Z" fill="currentColor" opacity="0.05" />
          <path d="M25 50 C 25 25, 75 25, 75 50 L 25 50" strokeWidth="1.5" />
          <rect x="42" y="50" width="16" height="35" fill="currentColor" opacity="0.1" />
          <rect x="42" y="50" width="16" height="35" strokeWidth="1.5" />
          <line x1="42" y1="62" x2="58" y2="62" strokeWidth="0.5" />
          <line x1="42" y1="74" x2="58" y2="74" strokeWidth="0.5" />
        </svg>
      );
    case "ribbed-dome":
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <line x1="50" y1="10" x2="50" y2="45" strokeWidth="1.5" />
          <path d="M20 65 C 20 40, 80 40, 80 65 Z" fill="currentColor" opacity="0.05" />
          <path d="M20 65 C 20 40, 80 40, 80 65 L 20 65" strokeWidth="1.5" />
          <line x1="30" y1="65" x2="50" y2="45" strokeWidth="0.5" />
          <line x1="40" y1="65" x2="50" y2="45" strokeWidth="0.5" />
          <line x1="60" y1="65" x2="50" y2="45" strokeWidth="0.5" />
          <line x1="70" y1="65" x2="50" y2="45" strokeWidth="0.5" />
        </svg>
      );
    case "flush-mount":
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <rect x="25" y="30" width="50" height="12" rx="2" fill="currentColor" opacity="0.05" />
          <rect x="25" y="30" width="50" height="12" rx="2" strokeWidth="1.5" />
          <rect x="30" y="42" width="40" height="4" rx="1" fill="currentColor" />
          <path d="M30 46 L 15 70 L 85 70 L 70 46 Z" fill="currentColor" opacity="0.03" />
        </svg>
      );
    default:
      return null;
  }
}
