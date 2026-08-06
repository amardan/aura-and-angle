import React from "react";
import { AffiliateSlug } from "./affiliates";

export interface Product {
  id: string;
  name: string;
  category: "pendants" | "sconces" | "lamps" | "flush";
  slug: AffiliateSlug;
  price: string;
  specs: string;
  description: string;
  longDescription: string;
  placementGuide: string;
  kelvinGuide: string;
  svgPath: string; // We'll store a descriptor to render the correct SVG icon dynamically
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Zenith Oatmeal Linen Pendant",
    category: "pendants",
    slug: "pendant",
    price: "$390",
    specs: "32\" Diameter • Dimmable LED",
    description: "An organic drum shade covered in hand-loomed Belgian linen. Creates a quiet, diffused ambient volume ideal for centering dining rooms.",
    longDescription: "Crafted from hand-selected organic flax fibers, the Zenith Pendant features a double-layered linen diffuser that entirely eliminates bulb glare. The minimalist suspension hardware is finished in an elegant matte black powder coat, making it suitable for both high vaulted structures and standard ceiling heights.",
    placementGuide: "Hang centered 30 to 36 inches above dining surfaces or kitchen islands. For rooms with ceilings exceeding 9 feet, drop the fixture 3 additional inches per foot of height.",
    kelvinGuide: "We recommend pairing with a 2700K (Warm White) dimmable LED bulb to accentuate the amber tones of the natural linen weave.",
    svgPath: "pendant"
  },
  {
    id: "p2",
    name: "Kino Alabaster Wall Sconce",
    category: "sconces",
    slug: "sconces",
    price: "$240",
    specs: "4.5\" W x 14\" H • Dual Wash",
    description: "Chiselled blocks of natural Spanish alabaster stone. Directs bidirectional light washes upward and downward to highlight room texture.",
    longDescription: "Milled from solid blocks of genuine Spanish alabaster, each Kino Sconce exhibits unique, organic vein structures. The stone naturally diffuses light, while the open top and bottom channels wash your wall surfaces with soft architectural light shapes.",
    placementGuide: "Install in flanking pairs alongside fireplace mantles, master beds, or entry corridors. Mount at a height of 60 to 66 inches from the floor to align with standard sightlines.",
    kelvinGuide: "Utilize a 2400K to 2700K bulb. The natural stone becomes highly translucent, highlighting details without throwing harsh blue tones.",
    svgPath: "sconce"
  },
  {
    id: "p3",
    name: "Akari Washi Lantern Lamp",
    category: "lamps",
    slug: "table",
    price: "$180",
    specs: "12\" H • Frosted E26 Socket",
    description: "Inspired by traditional Japanese paper lanterns. The hand-structured mulberry paper shade filters raw bulb glow into warm room vibes.",
    longDescription: "The Akari Table Lamp utilizes premium Washi paper, handmade from mulberry bark fibers. The frame is built from lightweight coated steel wires, culminating in three slender legs that raise the fixture slightly above sideboards or desks.",
    placementGuide: "Place on dark oak credenzas, bedroom side tables, or cozy reading corners. Best positioned against a solid wall to capitalize on silhouette casting.",
    kelvinGuide: "Pair strictly with a 2200K to 2700K frosted bulb. A clear bulb will cast harsh internal wire shadows; frosted glass ensures a smooth, uniform glow.",
    svgPath: "lantern"
  },
  {
    id: "p4",
    name: "Vessel Travertine Table Lamp",
    category: "lamps",
    slug: "table",
    price: "$320",
    specs: "8\" W x 16\" H • Solid Travertine",
    description: "A solid cylinder of honed Italian travertine stone, carrying a clean linen dome shade. Perfect for low sideboards and consoles.",
    longDescription: "Cut from a single column of raw Italian travertine, the Vessel Table Lamp is honed to a smooth matte finish while preserving the stone's organic pits and holes. It is balanced by a wide-dome Belgian linen shade in warm ivory.",
    placementGuide: "Position on entry tables, living room sidebars, or bedside tables. Its heavy limestone weight makes it highly stable in high-traffic corridors.",
    kelvinGuide: "We suggest a warm 2700K bulb. The stone base responds beautifully to lower, warmer light casting from the bottom of the linen shade.",
    svgPath: "travertine"
  },
  {
    id: "p5",
    name: "Kora Ribbed Brass Dome Pendant",
    category: "pendants",
    slug: "pendant",
    price: "$450",
    specs: "18\" Diameter • Matte Charcoal Hanger",
    description: "Hand-spun brass dome detailing a precision-ribbed golden interior. Focuses warm directional task light over dining boards or counter zones.",
    longDescription: "Spun from raw brass, the Kora Dome features a smooth, darkened outer shell contrasted by a bright, precision-ribbed interior surface that amplifies the warm gold tones of the light source. It is suspended by a heavy, matte-charcoal cord.",
    placementGuide: "Ideal in groups of two or three over kitchen islands. Hang at 32 inches of clearance from the countertop. Suitable for task focus areas.",
    kelvinGuide: "A 3000K (Soft White) bulb is recommended if placed over work surfaces (kitchen counters), or 2700K if hung over dining tables.",
    svgPath: "ribbed-dome"
  },
  {
    id: "p6",
    name: "Aura Minimalist Flush Mount",
    category: "flush",
    slug: "flush",
    price: "$195",
    specs: "12\" W x 3\" H • Recessed Bronze Band",
    description: "A sleek, low-profile ceiling disc designed to disappear. Solves illumination in compact entry corridors or low ceilings without glare.",
    longDescription: "Engineered for spaces with low clearance, the Aura Flush Mount features an ultra-slim spun steel profile with a recessed satin-bronze collar. The integrated diffuser spreads light outward at a wide 120-degree angle to prevent dark ceiling corners.",
    placementGuide: "Mount directly to standard ceiling junction boxes in corridors, laundry suites, or bedrooms with ceilings under 8 feet.",
    kelvinGuide: "A 3000K dimmable light source provides crisp utility, while dimming down to 10% drops the temperature feeling to a cozy warm ambiance.",
    svgPath: "flush-mount"
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id);
}
