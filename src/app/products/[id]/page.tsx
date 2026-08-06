import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FTCDisclosure from "@/components/FTCDisclosure";
import AffiliateButton from "@/components/AffiliateButton";
import ProductSvg from "@/components/ProductSvg";
import { PRODUCTS, getProductById } from "@/lib/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Aura & Angle",
    };
  }

  return {
    title: `${product.name} | Aura & Angle Curation`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300">
      {/* FTC Disclosure */}
      <FTCDisclosure />

      {/* Navigation */}
      <header className="bg-stone-50 border-b border-stone-200 dark:bg-stone-950 dark:border-stone-850 transition-colors">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <a href="/" className="flex flex-col items-start gap-0.5 group">
            <span className="font-serif text-2xl font-black uppercase tracking-widest text-stone-900 dark:text-stone-50 group-hover:text-amber-600 transition-colors">
              Aura & Angle
            </span>
            <span className="text-[9px] font-sans font-bold tracking-widest text-stone-400 uppercase">ARCHITECTURAL LIGHTING</span>
          </a>

          <div className="flex items-center gap-6">
            <a 
              href="/" 
              className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-500 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-50 transition-colors"
            >
              Back to Catalog
            </a>
            <AffiliateButton slug="store" variant="primary">
              Enter Store
            </AffiliateButton>
          </div>
        </div>
      </header>

      {/* Main product showcase */}
      <main className="flex-1 max-w-7xl mx-auto px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
        {/* Left Column: Visual Illustration Frame */}
        <div className="lg:col-span-6 w-full aspect-[4/3] sm:aspect-square bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl flex items-center justify-center p-8 md:p-12 relative overflow-hidden shadow-inner">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent opacity-60 pointer-events-none" />
          <ProductSvg path={product.svgPath} className="w-56 h-56 md:w-64 md:h-64 text-stone-900 dark:text-stone-50 animate-pulse-slow" />
          <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest text-amber-700 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 dark:text-amber-400">
            {product.category}
          </span>
        </div>

        {/* Right Column: Spec Sheets & Redirection */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono tracking-widest text-stone-400 dark:text-stone-500 uppercase">{product.specs}</span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
              {product.name}
            </h1>
            <span className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">{product.price}</span>
          </div>

          <div className="flex flex-col gap-4 border-t border-stone-200 dark:border-stone-800 pt-6">
            <h3 className="text-[10px] font-sans font-black tracking-widest text-stone-400 uppercase">Design Concept</h3>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-sans">
              {product.longDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 border-t border-stone-200 dark:border-stone-800 pt-6">
            <div className="flex flex-col gap-1.5">
              <h4 className="text-[9px] font-sans font-black tracking-widest text-stone-400 uppercase">01. Sizing & Placement</h4>
              <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-sans">
                {product.placementGuide}
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <h4 className="text-[9px] font-sans font-black tracking-widest text-stone-400 uppercase">02. Kelvin Suggestion</h4>
              <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-sans">
                {product.kelvinGuide}
              </p>
            </div>
          </div>

          <div className="border-t border-stone-200 dark:border-stone-800 pt-8 flex flex-col sm:flex-row items-center gap-4">
            <AffiliateButton slug={product.slug} variant="primary" className="w-full sm:w-auto px-10 py-4.5">
              Shop this Fixture
            </AffiliateButton>
            <a 
              href="/#calculator" 
              className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 underline underline-offset-4"
            >
              Verify Room Fit
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-stone-200 py-16 px-8 dark:bg-stone-950 dark:border-stone-850 text-xs text-stone-500 dark:text-stone-400 transition-colors mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-stone-200 dark:border-stone-850 pb-12 mb-12 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <span className="font-serif text-lg font-black uppercase tracking-widest text-stone-950 dark:text-stone-50">Aura & Angle</span>
            <p className="max-w-xs leading-relaxed font-sans text-stone-400">
              Architectural styling guidance & handpicked luxury light curations. Bridging spatial volumes with elegant illumination.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 font-sans font-bold uppercase tracking-wider text-[10px] text-stone-600 dark:text-stone-300">
            <a href="/#philosophy" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">Philosophy</a>
            <a href="/#calculator" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">Calculator</a>
            <a href="/#curation" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">The Curation</a>
            <a href="/#guides" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">Design Logs</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="font-sans">&copy; {new Date().getFullYear()} Aura & Angle. All rights reserved.</p>
          <p className="text-[10px] leading-relaxed max-w-xl text-stone-400 dark:text-stone-500 text-center lg:text-right font-sans">
            Disclaimer: Aura & Angle is a curated review guide. Purchases made through affiliate buttons support our styling logs.
          </p>
        </div>
      </footer>
    </div>
  );
}
