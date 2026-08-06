"use client";

import { useState } from "react";
import FTCDisclosure from "@/components/FTCDisclosure";
import AffiliateButton from "@/components/AffiliateButton";
import LumenCalculator from "@/components/LumenCalculator";
import { AffiliateSlug } from "@/lib/affiliates";

interface Product {
  id: string;
  name: string;
  category: "pendants" | "sconces" | "lamps" | "flush";
  slug: AffiliateSlug;
  price: string;
  specs: string;
  description: string;
  svgIcon: React.ReactNode;
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Zenith Oatmeal Linen Pendant",
    category: "pendants",
    slug: "pendant",
    price: "$390",
    specs: "32\" Diameter • Dimmable LED",
    description: "An organic drum shade covered in hand-loomed Belgian linen. Creates a quiet, diffused ambient volume ideal for centering dining rooms.",
    svgIcon: (
      <svg className="w-full h-full text-stone-900/10 dark:text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <line x1="50" y1="10" x2="50" y2="35" strokeWidth="1.5" />
        <rect x="20" y="35" width="60" height="28" fill="currentColor" opacity="0.05" rx="2" />
        <rect x="20" y="35" width="60" height="28" strokeWidth="1.5" rx="2" />
        <line x1="20" y1="42" x2="80" y2="42" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="20" y1="49" x2="80" y2="49" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="20" y1="56" x2="80" y2="56" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    )
  },
  {
    id: "p2",
    name: "Kino Alabaster Wall Sconce",
    category: "sconces",
    slug: "sconces",
    price: "$240",
    specs: "4.5\" W x 14\" H • Dual Wash",
    description: "Chiselled blocks of natural Spanish alabaster stone. Directs bidirectional light washes upward and downward to highlight room texture.",
    svgIcon: (
      <svg className="w-full h-full text-stone-900/10 dark:text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <rect x="42" y="25" width="16" height="50" rx="1" fill="currentColor" opacity="0.05" />
        <rect x="42" y="25" width="16" height="50" rx="1" strokeWidth="1.5" />
        <line x1="42" y1="35" x2="58" y2="35" strokeWidth="0.75" />
        <line x1="42" y1="45" x2="58" y2="45" strokeWidth="0.75" />
        <line x1="42" y1="55" x2="58" y2="55" strokeWidth="0.75" />
        <line x1="42" y1="65" x2="58" y2="65" strokeWidth="0.75" />
        <path d="M42 25 L 20 5 L 80 5 L 58 25 Z" fill="currentColor" opacity="0.03" />
        <path d="M42 75 L 20 95 L 80 95 L 58 75 Z" fill="currentColor" opacity="0.03" />
      </svg>
    )
  },
  {
    id: "p3",
    name: "Akari Washi Lantern Lamp",
    category: "lamps",
    slug: "table",
    price: "$180",
    specs: "12\" H • Frosted E26 Socket",
    description: "Inspired by traditional Japanese paper lanterns. The hand-structured mulberry paper shade filters raw bulb glow into warm room vibes.",
    svgIcon: (
      <svg className="w-full h-full text-stone-900/10 dark:text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <path d="M25 60 C 25 30, 75 30, 75 60 C 75 75, 25 75, 25 60 Z" fill="currentColor" opacity="0.05" />
        <path d="M25 60 C 25 30, 75 30, 75 60 C 75 75, 25 75, 25 60 Z" strokeWidth="1.5" />
        <line x1="50" y1="30" x2="50" y2="75" strokeWidth="0.75" />
        <line x1="37" y1="35" x2="37" y2="72" strokeWidth="0.5" strokeDasharray="1 1" />
        <line x1="63" y1="35" x2="63" y2="72" strokeWidth="0.5" strokeDasharray="1 1" />
        <line x1="33" y1="75" x2="25" y2="88" strokeWidth="1.5" />
        <line x1="67" y1="75" x2="75" y2="88" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    id: "p4",
    name: "Vessel Travertine Table Lamp",
    category: "lamps",
    slug: "table",
    price: "$320",
    specs: "8\" W x 16\" H • Solid Travertine",
    description: "A solid cylindrical base of honed Italian travertine stone, carrying a clean linen dome shade. Perfect for low sideboards and consoles.",
    svgIcon: (
      <svg className="w-full h-full text-stone-900/10 dark:text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <path d="M25 50 C 25 25, 75 25, 75 50 Z" fill="currentColor" opacity="0.05" />
        <path d="M25 50 C 25 25, 75 25, 75 50 L 25 50" strokeWidth="1.5" />
        <rect x="42" y="50" width="16" height="35" fill="currentColor" opacity="0.1" />
        <rect x="42" y="50" width="16" height="35" strokeWidth="1.5" />
        <line x1="42" y1="62" x2="58" y2="62" strokeWidth="0.5" />
        <line x1="42" y1="74" x2="58" y2="74" strokeWidth="0.5" />
      </svg>
    )
  },
  {
    id: "p5",
    name: "Kora Ribbed Brass Dome Pendant",
    category: "pendants",
    slug: "pendant",
    price: "$450",
    specs: "18\" Diameter • Matte Charcoal Hanger",
    description: "Hand-spun brass dome detailing a precision-ribbed golden interior. Focuses warm directional task light over dining boards or counter zones.",
    svgIcon: (
      <svg className="w-full h-full text-stone-900/10 dark:text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <line x1="50" y1="10" x2="50" y2="45" strokeWidth="1.5" />
        <path d="M20 65 C 20 40, 80 40, 80 65 Z" fill="currentColor" opacity="0.05" />
        <path d="M20 65 C 20 40, 80 40, 80 65 L 20 65" strokeWidth="1.5" />
        <line x1="30" y1="65" x2="50" y2="45" strokeWidth="0.5" />
        <line x1="40" y1="65" x2="50" y2="45" strokeWidth="0.5" />
        <line x1="60" y1="65" x2="50" y2="45" strokeWidth="0.5" />
        <line x1="70" y1="65" x2="50" y2="45" strokeWidth="0.5" />
      </svg>
    )
  },
  {
    id: "p6",
    name: "Aura Minimalist Flush Mount",
    category: "flush",
    slug: "flush",
    price: "$195",
    specs: "12\" W x 3\" H • Recessed Bronze Band",
    description: "A sleek, low-profile ceiling disc designed to disappear. Solves illumination in compact entry corridors or low ceilings without glare.",
    svgIcon: (
      <svg className="w-full h-full text-stone-900/10 dark:text-white/10" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <rect x="25" y="30" width="50" height="12" rx="2" fill="currentColor" opacity="0.05" />
        <rect x="25" y="30" width="50" height="12" rx="2" strokeWidth="1.5" />
        <rect x="30" y="42" width="40" height="4" rx="1" fill="currentColor" />
        <path d="M30 46 L 15 70 L 85 70 L 70 46 Z" fill="currentColor" opacity="0.03" />
      </svg>
    )
  }
];

const FILTER_TAGS = [
  { id: "all", label: "Show All Curation" },
  { id: "pendants", label: "Sculptural Pendants" },
  { id: "sconces", label: "Wall Sconces" },
  { id: "lamps", label: "Table Lamps" },
  { id: "flush", label: "Flush Mounts" }
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProducts = activeFilter === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <div className="flex flex-col min-h-screen">
      {/* FTC Disclosure header */}
      <FTCDisclosure />

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 dark:bg-stone-950/90 dark:border-stone-850 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <a href="#" className="flex flex-col items-start gap-0.5 group">
            <span className="font-serif text-2xl font-black uppercase tracking-widest text-stone-900 dark:text-stone-50 group-hover:text-amber-600 transition-colors">
              Aura & Angle
            </span>
            <span className="text-[9px] font-sans font-bold tracking-widest text-stone-400 uppercase">ARCHITECTURAL LIGHTING</span>
          </a>

          <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            <a href="#philosophy" className="hover:text-stone-950 dark:hover:text-stone-50 transition-colors">Philosophy</a>
            <a href="#calculator" className="hover:text-stone-950 dark:hover:text-stone-50 transition-colors">Calculator</a>
            <a href="#curation" className="hover:text-stone-950 dark:hover:text-stone-50 transition-colors">The Curation</a>
            <a href="#guides" className="hover:text-stone-950 dark:hover:text-stone-50 transition-colors">Design Logs</a>
          </nav>

          <div>
            <AffiliateButton slug="store" variant="primary">
              Enter Store
            </AffiliateButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-stone-50 text-stone-900 py-24 md:py-36 px-8 dark:bg-stone-950 dark:text-stone-100 border-b border-stone-200 dark:border-stone-850 overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8 flex flex-col items-start gap-8">
            <div className="text-[10px] font-sans font-black tracking-widest text-amber-600 dark:text-amber-400 uppercase border-b border-amber-600/35 pb-1">
              CURATED DESIGN STUDIO
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl text-stone-900 dark:text-stone-50">
              Light as an <br />
              <span className="text-amber-600 dark:text-amber-500 italic font-medium">Architectural Medium</span>
            </h1>
            
            <p className="text-stone-500 dark:text-stone-400 text-sm md:text-base max-w-2xl leading-relaxed font-sans">
              We catalog spaces based on volume, shadow, and architectural placement. No generic light grids. We teach the rules of layering and route you to masterfully crafted fixtures to illuminate your lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <AffiliateButton slug="store" variant="primary" className="px-8 py-4">
                Shop Curated Showroom
              </AffiliateButton>
              <a 
                href="#calculator" 
                className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest text-[10px] transition-all duration-300 border border-stone-300 hover:border-stone-900 text-stone-600 hover:text-stone-900 px-8 py-4 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-400 dark:hover:text-stone-100"
              >
                Determine Lumen Needs
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 relative flex items-center justify-center">
            {/* Minimalist framing structure to represent architectural geometry */}
            <div className="w-full aspect-[4/5] border border-stone-200 dark:border-stone-800 rounded-3xl p-8 flex flex-col justify-between bg-stone-100/50 dark:bg-stone-900/30 backdrop-blur shadow-sm">
              <div className="flex justify-between items-start text-stone-400 text-[10px] font-mono tracking-widest">
                <span>VOL. 01 / ED. 02</span>
                <span>A&A STUDIO</span>
              </div>
              
              <div className="my-auto flex items-center justify-center">
                {/* Visual geometric illustration representing a balanced lamp ray */}
                <svg className="w-32 h-32 text-amber-500/30" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <path d="M15 80 L 50 15 L 85 80 Z" strokeWidth="0.75" />
                  <ellipse cx="50" cy="80" rx="35" ry="8" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="50" y1="15" x2="50" y2="80" strokeWidth="0.5" strokeDasharray="1 1" />
                </svg>
              </div>

              <div className="text-left flex flex-col gap-2">
                <span className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">The 3-Layer Concept</span>
                <p className="text-[11px] text-stone-400 leading-relaxed font-sans">
                  Proper illumination relies on balancing Ambient volume, Task focus, and Accent texture. Explore the math behind this below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy Section */}
      <section id="philosophy" className="py-24 md:py-32 px-8 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850 text-left transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">The Lighting Hierarchy</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mt-1 max-w-sm">
                Mastering the Three Layers
              </h2>
              <p className="text-stone-500 dark:text-stone-400 text-xs md:text-sm mt-3 leading-relaxed max-w-sm font-sans">
                A thoughtfully illuminated space is not created with one bright ceiling fixture. It is built by layering light to carve shadows and define room purpose.
              </p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8">
              <div className="bg-white border border-stone-200 dark:bg-stone-950 dark:border-stone-800 p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400">01 / AMBIENT</span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-3 mb-2">Volume</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                    General overhead illumination replacing natural daylight. Provided by centered **Sculptural Pendants** or discrete **Flush Mounts** that cast wide, balanced washes.
                  </p>
                </div>
                <AffiliateButton slug="pendant" variant="text" className="mt-4 self-start">
                  Browse Ambient
                </AffiliateButton>
              </div>

              <div className="bg-white border border-stone-200 dark:bg-stone-950 dark:border-stone-800 p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400">02 / TASK</span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-3 mb-2">Focus</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                    Concentrated beams targeted for specific activities like reading, cooking, or working. Achieved with bedside **Table Lamps** or direction-focused island hangers.
                  </p>
                </div>
                <AffiliateButton slug="table" variant="text" className="mt-4 self-start">
                  Browse Task
                </AffiliateButton>
              </div>

              <div className="bg-white border border-stone-200 dark:bg-stone-950 dark:border-stone-800 p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400">03 / ACCENT</span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-3 mb-2">Shadow</h3>
                  <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                    Indirect glow highlighting textured brick, fireplace mantles, or art collections. Provided by bidirectional **Wall Sconces** creating dramatic contrast.
                  </p>
                </div>
                <AffiliateButton slug="sconces" variant="text" className="mt-4 self-start">
                  Browse Accent
                </AffiliateButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section id="calculator" className="py-24 md:py-32 px-8 bg-stone-50 dark:bg-stone-950 transition-all duration-300">
        <LumenCalculator />
      </section>

      {/* Product Showcase Section */}
      <section id="curation" className="py-24 md:py-32 px-8 bg-stone-100 dark:bg-stone-900 border-y border-stone-200 dark:border-stone-850 text-left transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 border-b border-stone-200 dark:border-stone-800 pb-8">
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Modern Curation</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mt-1">
                The Architectural Edit
              </h2>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {FILTER_TAGS.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setActiveFilter(tag.id)}
                  className={`px-4 py-2 rounded text-[10px] font-sans font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === tag.id
                      ? "bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900"
                      : "bg-white border border-stone-200 text-stone-500 hover:text-stone-900 dark:bg-stone-950 dark:border-stone-800 dark:text-stone-400 dark:hover:text-stone-100"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                className="bg-white border border-stone-200 dark:bg-stone-950 dark:border-stone-800 p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="flex flex-col gap-4">
                  {/* Decorative product frame */}
                  <div className="w-full aspect-[4/3] rounded bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-850 flex items-center justify-center p-6 overflow-hidden relative">
                    {product.svgIcon}
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono tracking-widest text-stone-400 uppercase">{product.specs}</span>
                    <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-50 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed font-sans">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-stone-150 dark:border-stone-850">
                  <span className="text-base font-bold font-serif text-stone-950 dark:text-stone-50">{product.price}</span>
                  <AffiliateButton slug={product.slug} variant="outline" className="text-[9px] px-4 py-2">
                    Review Fixture
                  </AffiliateButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Styling Guides (Design Logs) */}
      <section id="guides" className="py-24 md:py-32 px-8 bg-stone-50 dark:bg-stone-950 text-left transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">DESIGN LOGS</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mt-1">
              Styling & Pro Placement Guides
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-xs mt-2 font-sans">
              Read our step-by-step guides on choosing heights, spacing fixtures, and Kelvin colors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-stone-200 dark:border-stone-850 p-8 rounded-xl bg-white dark:bg-stone-900 flex flex-col justify-between">
              <div>
                <span className="text-amber-600 dark:text-amber-400 font-bold font-serif text-2xl">01.</span>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-4 mb-2">The 30-Inch Rule</h3>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-sans">
                  Hanging island pendant lighting incorrectly can cut off sightlines across open kitchen plans. Learn how to measure the exact clearance between counter and shade bottom.
                </p>
              </div>
              <AffiliateButton slug="pendant" variant="text" className="mt-6 self-start text-[10px]">
                Read Article
              </AffiliateButton>
            </div>
            
            <div className="border border-stone-200 dark:border-stone-850 p-8 rounded-xl bg-white dark:bg-stone-900 flex flex-col justify-between">
              <div>
                <span className="text-amber-600 dark:text-amber-400 font-bold font-serif text-2xl">02.</span>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-4 mb-2">Kelvin & Circadian</h3>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-sans">
                  Selecting 4000K in a bedroom ruins relaxation, while 2200K in an office induces sluggishness. We break down standard color temperatures for each active room zone.
                </p>
              </div>
              <AffiliateButton slug="table" variant="text" className="mt-6 self-start text-[10px]">
                Read Article
              </AffiliateButton>
            </div>

            <div className="border border-stone-200 dark:border-stone-850 p-8 rounded-xl bg-white dark:bg-stone-900 flex flex-col justify-between">
              <div>
                <span className="text-amber-600 dark:text-amber-400 font-bold font-serif text-2xl">03.</span>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50 mt-4 mb-2">Low Ceiling Solutions</h3>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-sans">
                  Standard chandeliers require at least 8-foot clearance. If your ceilings are lower, learn how architectural flush mounts can distribute light without looking bulky.
                </p>
              </div>
              <AffiliateButton slug="flush" variant="text" className="mt-6 self-start text-[10px]">
                Read Article
              </AffiliateButton>
            </div>
          </div>
        </div>
      </section>

      {/* Gilded Footer CTA */}
      <section className="bg-stone-900 text-stone-50 py-20 px-8 relative overflow-hidden text-center dark:bg-stone-950 border-t border-stone-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10">
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-500">Curated Partnership</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-stone-100 max-w-2xl leading-tight">
            Ready to Structure <br />Your Home's Lighting?
          </h2>
          <p className="text-stone-300 text-xs md:text-sm max-w-xl leading-relaxed font-sans">
            Explore the handpicked catalogs at our partner stores to bring premium shapes, organic textures, and warm temperatures to your rooms.
          </p>
          <AffiliateButton slug="store" variant="accent" className="px-8 py-4 mt-2">
            View Partner Catalogs
          </AffiliateButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-16 px-8 dark:bg-stone-950 dark:border-stone-850 text-xs text-stone-500 dark:text-stone-400 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-stone-200 dark:border-stone-850 pb-12 mb-12 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <span className="font-serif text-lg font-black uppercase tracking-widest text-stone-950 dark:text-stone-50">Aura & Angle</span>
            <p className="max-w-xs leading-relaxed font-sans text-stone-400">
              Architectural styling guidance & handpicked luxury light curations. Bridging spatial volumes with elegant illumination.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 font-sans font-bold uppercase tracking-wider text-[10px] text-stone-600 dark:text-stone-300">
            <a href="#philosophy" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">Philosophy</a>
            <a href="#calculator" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">Calculator</a>
            <a href="#curation" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">The Curation</a>
            <a href="#guides" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">Design Logs</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="font-sans">&copy; {new Date().getFullYear()} Aura & Angle. All rights reserved.</p>
          <p className="text-[10px] leading-relaxed max-w-xl text-stone-400 dark:text-stone-500 text-center lg:text-right font-sans">
            Aura & Angle participates in select affiliate programs. Clicking products or custom redirection shortcuts (such as `/go/*`) may result in commission earnings that support this design studio, at no added cost to you.
          </p>
        </div>
      </footer>
    </div>
  );
}
