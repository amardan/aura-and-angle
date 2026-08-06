"use client";

import { useState } from "react";

export default function FTCDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px] uppercase tracking-wider py-2.5 px-6 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-400 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          <p className="font-sans font-medium">
            Aura & Angle is an independent styling & curation guide.{" "}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="underline text-stone-900 font-bold hover:text-amber-600 dark:text-stone-100 dark:hover:text-amber-400 focus:outline-none cursor-pointer"
            >
              {isOpen ? "Close Disclosure" : "Partner Disclosure"}
            </button>
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-stone-200 dark:border-stone-800 text-[10px] leading-relaxed text-stone-500 dark:text-stone-400 uppercase-none tracking-normal font-sans">
          <p className="normal-case">
            In the spirit of complete transparency: Aura & Angle curates products from premium design brands. Links on this site—including our direct `/go/*` redirection shortcuts—are affiliate links. If you make a purchase after clicking these links, we receive a small commission from the retailer at no extra cost to you. This support helps us write editorial guides and maintain this design resource.
          </p>
        </div>
      )}
    </div>
  );
}
