"use client";

import { useState } from "react";
import AffiliateButton from "./AffiliateButton";

type RoomType = "living" | "bedroom" | "dining" | "kitchen" | "office";

interface RoomConfig {
  label: string;
  fcMin: number;
  fcMax: number;
  description: string;
  layoutDescription: string;
}

const ROOMS: Record<RoomType, RoomConfig> = {
  living: {
    label: "Living Room",
    fcMin: 15,
    fcMax: 20,
    description: "Requires soft, layered light to accommodate relaxation and entertaining.",
    layoutDescription: "Combine 1 large pendant/chandelier for center volume + 2 ambient table lamps in seating corners + 2 wall sconces to wash texture."
  },
  bedroom: {
    label: "Bedroom",
    fcMin: 10,
    fcMax: 15,
    description: "Requires low-level, warm light to respect circadian rhythm.",
    layoutDescription: "We recommend a warm, fabric-covered flush mount for ambient ceiling light + 2 low-glare bedside table lamps for task reading."
  },
  dining: {
    label: "Dining Room",
    fcMin: 30,
    fcMax: 40,
    description: "Requires medium focus concentrated around the dining table surface.",
    layoutDescription: "Hang 1 focal sculptural pendant centered 30-36 inches above the table + flanking task candles or a low sideboard lamp."
  },
  kitchen: {
    label: "Kitchen",
    fcMin: 40,
    fcMax: 50,
    description: "Requires high-intensity task light for food preparation safety.",
    layoutDescription: "A multi-pendant island array (spaced 30 inches apart) + recessed low-profile flush mounts + under-cabinet accent LED bars."
  },
  office: {
    label: "Home Office",
    fcMin: 30,
    fcMax: 50,
    description: "Requires structured, glare-free task light to preserve optical focus.",
    layoutDescription: "Install 1 diffused flush ceiling mount to prevent shadows + 1 adjustable task desk lamp targeting your primary workspace."
  }
};

export default function LumenCalculator() {
  const [roomType, setRoomType] = useState<RoomType>("living");
  const [length, setLength] = useState<number | "">(12);
  const [width, setWidth] = useState<number | "">(10);

  const calculateLighting = () => {
    if (!length || !width) return null;
    
    const sqFt = Number(length) * Number(width);
    const config = ROOMS[roomType];
    
    const lumensMin = Math.round(sqFt * config.fcMin);
    const lumensMax = Math.round(sqFt * config.fcMax);
    const lumensAvg = Math.round((lumensMin + lumensMax) / 2);
    
    // Light layering distribution: 60% ambient, 25% task, 15% accent
    const ambientLumens = Math.round(lumensAvg * 0.6);
    const taskLumens = Math.round(lumensAvg * 0.25);
    const accentLumens = Math.round(lumensAvg * 0.15);

    // Chandelier diameter rule: length + width in inches
    const recommendedDiameter = Number(length) + Number(width);

    return {
      sqFt,
      lumensMin,
      lumensMax,
      lumensAvg,
      ambientLumens,
      taskLumens,
      accentLumens,
      recommendedDiameter
    };
  };

  const results = calculateLighting();

  return (
    <div className="bg-white border border-stone-200 dark:bg-stone-900 dark:border-stone-850 rounded-2xl p-8 shadow-xl max-w-5xl mx-auto text-left relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col gap-8">
        <div>
          <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Layering Calculator</span>
          <h3 className="font-serif text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mt-1">
            Smart Lumen & Layout Designer
          </h3>
          <p className="text-stone-500 dark:text-stone-400 text-xs md:text-sm mt-2 max-w-xl leading-relaxed">
            Input your room type and dimensions. Our calculator determines target lumen output and guides you through the proper balance of lighting fixtures.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start border-t border-stone-150 dark:border-stone-800 pt-8">
          {/* Inputs Panel */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <div>
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Select Space Type</label>
              <select 
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as RoomType)}
                className="w-full bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {Object.entries(ROOMS).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1.5 italic">
                {ROOMS[roomType].description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Length (Feet)</label>
                <input 
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value === "" ? "" : Math.abs(Number(e.target.value)))}
                  placeholder="12"
                  className="w-full bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Width (Feet)</label>
                <input 
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value === "" ? "" : Math.abs(Number(e.target.value)))}
                  placeholder="10"
                  className="w-full bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="md:col-span-7 bg-stone-50 dark:bg-stone-950 border border-stone-200/50 dark:border-stone-850/50 rounded-xl p-6 flex flex-col justify-between min-h-[300px]">
            {results ? (
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-end border-b border-stone-200/60 dark:border-stone-850 pb-4">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-bold">TOTAL AREA</span>
                    <span className="font-serif text-xl font-semibold text-stone-900 dark:text-stone-50">{results.sqFt} Sq. Ft.</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-bold">LUMEN RANGE SUGGESTION</span>
                    <span className="font-serif text-xl font-semibold text-amber-600 dark:text-amber-400">
                      {results.lumensMin} – {results.lumensMax} lm
                    </span>
                  </div>
                </div>

                {/* Layer Suggestions */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-sans text-[10px] font-bold text-stone-400 uppercase tracking-widest">Calculated Layers Breakdown</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white border border-stone-200/50 dark:bg-stone-900 dark:border-stone-850 p-3 rounded">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Ambient (60%)</span>
                      <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 block mt-1">{results.ambientLumens} lm</span>
                      <AffiliateButton slug="pendant" variant="text" className="mt-1 text-[9px] tracking-wide">
                        Shop Pendants
                      </AffiliateButton>
                    </div>

                    <div className="bg-white border border-stone-200/50 dark:bg-stone-900 dark:border-stone-850 p-3 rounded">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Task (25%)</span>
                      <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 block mt-1">{results.taskLumens} lm</span>
                      <AffiliateButton slug="table" variant="text" className="mt-1 text-[9px] tracking-wide">
                        Shop Lamps
                      </AffiliateButton>
                    </div>

                    <div className="bg-white border border-stone-200/50 dark:bg-stone-900 dark:border-stone-850 p-3 rounded">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Accent (15%)</span>
                      <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 block mt-1">{results.accentLumens} lm</span>
                      <AffiliateButton slug="sconces" variant="text" className="mt-1 text-[9px] tracking-wide">
                        Shop Sconces
                      </AffiliateButton>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-lg text-xs leading-relaxed text-stone-600 dark:text-stone-300">
                  <span className="font-bold text-stone-900 dark:text-stone-100 block mb-1">Curation Design Note:</span>
                  <p className="mb-2">
                    {ROOMS[roomType].layoutDescription}
                  </p>
                  <p>
                    For a centered chandelier or pendant, look for a fixture with a diameter near{" "}
                    <strong className="text-amber-600 dark:text-amber-400">{results.recommendedDiameter} inches</strong>.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-stone-400 text-xs text-center">
                Please enter valid dimensions above to compute layer specifications.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
