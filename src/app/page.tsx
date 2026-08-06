"use client";

import { useState } from "react";
import FTCDisclosure from "@/components/FTCDisclosure";

interface ShippingForm {
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

interface PaymentForm {
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
}

export default function Home() {
  // Hang Height Calculator State
  const [ceilingHeight, setCeilingHeight] = useState<number | "">(9);
  const [hangPlacement, setHangPlacement] = useState<"table" | "walkway">("table");

  // Checkout State
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [shipping, setShipping] = useState<ShippingForm>({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: ""
  });
  const [shippingErrors, setShippingErrors] = useState<Partial<ShippingForm>>({});
  
  const [payment, setPayment] = useState<PaymentForm>({
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: ""
  });
  const [paymentErrors, setPaymentErrors] = useState<Partial<PaymentForm>>({});

  // Spacing & Height Calculation
  const getCalculatedHeights = () => {
    if (!ceilingHeight) return null;
    const heightFt = Number(ceilingHeight);
    
    // Hanging rules:
    // If hung over a table/island, bottom of shade sits 30-36 inches (30" avg) from surface, i.e., 60" from floor.
    // Cord length = Ceiling Height (in) - Shade Height (12") - Table Height (30") - Table Clearance (30")
    // If walkway, bottom of shade sits at 80" from floor.
    // Cord length = Ceiling Height (in) - Shade Height (12") - Walkway Clearance (80")
    
    const shadeHeight = 12; // Shade is 12 inches tall
    const ceilingIn = heightFt * 12;
    
    let cordLength = 0;
    let floorClearance = 0;
    let note = "";

    if (hangPlacement === "table") {
      const tableHeight = 30;
      const tableClearance = 32;
      cordLength = ceilingIn - shadeHeight - tableHeight - tableClearance;
      floorClearance = tableHeight + tableClearance;
      note = `This positions the bottom of the pendant exactly ${tableClearance} inches above your dining table (or island counter), preserving eye contact across the space.`;
    } else {
      const walkwayClearance = 80;
      cordLength = ceilingIn - shadeHeight - walkwayClearance;
      floorClearance = walkwayClearance;
      note = `This leaves a high ${Math.round(floorClearance / 12)}'${floorClearance % 12}" head clearance for walking zones, preventing visual clutter in high-traffic hallways.`;
    }

    // Guard against low ceilings
    if (cordLength < 4) {
      cordLength = 4;
      floorClearance = ceilingIn - shadeHeight - cordLength;
      note = `Your ceiling is relatively low for this pendant scale. We have set a minimum cord drop of 4 inches (flush style) to maximize your floor clearance to ${Math.round(floorClearance / 12)}'${floorClearance % 12}".`;
    }

    return {
      cordLength: Math.round(cordLength),
      floorClearance: Math.round(floorClearance),
      note
    };
  };

  const calc = getCalculatedHeights();

  // Handlers
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
    if (shippingErrors[name as keyof ShippingForm]) {
      setShippingErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      value = value.replace(/\s?/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (value.length > 19) return;
    }

    if (name === "cardExpiry") {
      value = value.replace(/\D/g, "");
      if (value.length > 2) {
        value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
      }
      if (value.length > 5) return;
    }

    if (name === "cardCvv") {
      value = value.replace(/\D/g, "");
      if (value.length > 4) return;
    }

    setPayment(prev => ({ ...prev, [name]: value }));
    if (paymentErrors[name as keyof PaymentForm]) {
      setPaymentErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validations
  const validateForm = () => {
    const sErrors: Partial<ShippingForm> = {};
    if (!shipping.name.trim()) sErrors.name = "Full name is required";
    if (!shipping.email.trim() || !/\S+@\S+\.\S+/.test(shipping.email)) sErrors.email = "Valid email is required";
    if (!shipping.address.trim()) sErrors.address = "Address is required";
    if (!shipping.city.trim()) sErrors.city = "City is required";
    if (!shipping.zip.trim()) sErrors.zip = "Zip code is required";
    setShippingErrors(sErrors);

    const pErrors: Partial<PaymentForm> = {};
    const cardDigits = payment.cardNumber.replace(/\s/g, "");
    if (cardDigits.length < 15) pErrors.cardNumber = "Valid card is required";
    if (payment.cardExpiry.length < 5) pErrors.cardExpiry = "Expiry MM/YY required";
    if (payment.cardCvv.length < 3) pErrors.cardCvv = "CVV required";
    if (!payment.cardName.trim()) pErrors.cardName = "Cardholder name is required";
    setPaymentErrors(pErrors);

    return Object.keys(sErrors).length === 0 && Object.keys(pErrors).length === 0;
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const code = Math.random().toString(36).substring(2, 7).toUpperCase();
      const generatedId = `AA-ZENITH-${code}`;
      setOrderId(generatedId);
      
      // Save order locally
      const orderRecord = {
        orderId: generatedId,
        date: new Date().toISOString(),
        shipping,
        productName: "The Zenith Pendant",
        total: 390
      };
      
      const prevOrders = JSON.parse(localStorage.getItem("aura_orders") || "[]");
      localStorage.setItem("aura_orders", JSON.stringify([...prevOrders, orderRecord]));

      setIsOrdered(true);
    }
  };

  const getCardLogo = () => {
    const num = payment.cardNumber.charAt(0);
    if (num === "4") return "VISA";
    if (num === "5") return "MC";
    return "";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* FTC Disclosure */}
      <FTCDisclosure />

      {/* Simplified Header */}
      <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 dark:bg-stone-950/90 dark:border-stone-850 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <a href="#" className="flex flex-col items-start gap-0.5 group">
            <span className="font-serif text-2xl font-black uppercase tracking-widest text-stone-900 dark:text-stone-50 group-hover:text-amber-600 transition-colors">
              Aura & Angle
            </span>
            <span className="text-[9px] font-sans font-bold tracking-widest text-stone-400 uppercase">ARCHITECTURAL LIGHTING</span>
          </a>

          <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            <a href="#spotlight" className="hover:text-stone-950 dark:hover:text-stone-50 transition-colors">The Zenith</a>
            <a href="#calculator" className="hover:text-stone-950 dark:hover:text-stone-50 transition-colors">Height Helper</a>
            <a href="#guides" className="hover:text-stone-950 dark:hover:text-stone-50 transition-colors">Styling Guide</a>
            <a href="#checkout" className="hover:text-stone-950 dark:hover:text-stone-50 transition-colors">Secure Order</a>
          </nav>

          <div>
            <a 
              href="#checkout" 
              className="inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest text-[10px] bg-stone-900 text-stone-50 hover:bg-stone-850 px-6 py-3.5 border border-stone-900 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 dark:border-stone-100 transition-all cursor-pointer"
            >
              Order Zenith
            </a>
          </div>
        </div>
      </header>

      {/* Main Single-Product Showcase */}
      <main className="flex-1">
        
        {/* Spotlight Section */}
        <section id="spotlight" className="max-w-7xl mx-auto px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
          
          {/* Left: Pendant Silhouette Frame */}
          <div className="lg:col-span-6 w-full aspect-[4/3] sm:aspect-square bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl flex items-center justify-center p-8 md:p-12 relative overflow-hidden shadow-inner">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent opacity-60 pointer-events-none" />
            
            {/* Hand-loomed Oatmeal Linen Pendant SVG drawing */}
            <svg className="w-56 h-56 md:w-64 md:h-64 text-stone-900 dark:text-stone-50 animate-pulse-slow" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <line x1="50" y1="5" x2="50" y2="35" strokeWidth="1.5" />
              <rect x="20" y="35" width="60" height="28" fill="currentColor" opacity="0.05" rx="2" />
              <rect x="20" y="35" width="60" height="28" strokeWidth="1.5" rx="2" />
              <line x1="20" y1="42" x2="80" y2="42" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="20" y1="49" x2="80" y2="49" strokeWidth="0.5" strokeDasharray="2 2" />
              <line x1="20" y1="56" x2="80" y2="56" strokeWidth="0.5" strokeDasharray="2 2" />
            </svg>

            <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-widest text-amber-700 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 dark:text-amber-400">
              Flagship Curation
            </span>
          </div>

          {/* Right: Spec Description */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono tracking-widest text-stone-400 dark:text-stone-500 uppercase">32&quot; Diameter • Dimmable LED • Natural Flax</span>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-tight">
                The Zenith Pendant
              </h1>
              <span className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400 mt-2">$390</span>
            </div>

            <div className="flex flex-col gap-4 border-t border-stone-200 dark:border-stone-800 pt-6">
              <h3 className="text-[10px] font-sans font-black tracking-widest text-stone-400 uppercase font-bold">Design Concept</h3>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-sans">
                Woven from hand-selected organic Belgian flax fibers, the Zenith Pendant features a double-layered oatmeal linen drum shade that diffuses raw light and completely eliminates bulb glare. The resulting ambient volume creates a calm, floating centerpiece that anchors dining tables and kitchen islands.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 border-t border-stone-200 dark:border-stone-800 pt-6">
              <div className="flex flex-col gap-1">
                <h4 className="text-[9px] font-sans font-black tracking-widest text-stone-400 uppercase">Premium Build</h4>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-sans">
                  Suspended from a matte charcoal steel collar. Includes a matching canopy and 8 feet of adjustable woven cord.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-[9px] font-sans font-black tracking-widest text-stone-400 uppercase">Optimal Bulb</h4>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed font-sans">
                  Pair with a 2700K (Warm White) E26 dimmable LED bulb to highlight the organic amber fibers of the flax weave.
                </p>
              </div>
            </div>

            <div className="border-t border-stone-200 dark:border-stone-800 pt-8 flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="#checkout" 
                className="w-full sm:w-auto inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest text-[10px] bg-stone-900 text-stone-50 hover:bg-stone-850 px-10 py-4.5 border border-stone-900 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 dark:border-stone-100 transition-all cursor-pointer text-center"
              >
                Order This Fixture
              </a>
              <a 
                href="#calculator" 
                className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 underline underline-offset-4"
              >
                Calculate Hanging Clearance
              </a>
            </div>
          </div>
        </section>

        {/* Cord Hang Sizing calculator */}
        <section id="calculator" className="py-20 md:py-24 px-8 bg-stone-100 dark:bg-stone-900 border-y border-stone-200 dark:border-stone-850 text-left transition-colors">
          <div className="max-w-4xl mx-auto bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400">Styling Sizer Tool</span>
            </div>

            <h2 className="font-serif text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mb-3">
              Hang Clearance Calculator
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-xs md:text-sm max-w-xl leading-relaxed mb-8">
              Pendant cord drop lengths dictate structural balance. Input your room ceiling height to calculate the perfect cord length and floor clearance for the Zenith Pendant.
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-center border-t border-stone-150 dark:border-stone-850 pt-8">
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Ceiling Height (Feet)</label>
                  <input 
                    type="number"
                    value={ceilingHeight}
                    onChange={(e) => setCeilingHeight(e.target.value === "" ? "" : Math.abs(Number(e.target.value)))}
                    placeholder="e.g. 9"
                    className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Placement Context</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => setHangPlacement("table")}
                      className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded border ${
                        hangPlacement === "table"
                          ? "bg-stone-900 border-stone-900 text-stone-50 dark:bg-stone-100 dark:border-stone-100 dark:text-stone-950"
                          : "border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900 text-stone-500"
                      }`}
                    >
                      Over Table / Island
                    </button>
                    <button
                      onClick={() => setHangPlacement("walkway")}
                      className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider rounded border ${
                        hangPlacement === "walkway"
                          ? "bg-stone-900 border-stone-900 text-stone-50 dark:bg-stone-100 dark:border-stone-100 dark:text-stone-950"
                          : "border-stone-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900 text-stone-500"
                      }`}
                    >
                      Open Walkway
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 dark:bg-stone-900 rounded-xl p-6 border border-stone-200/50 dark:border-stone-850 flex flex-col justify-center items-center gap-4 min-h-[170px]">
                {calc ? (
                  <>
                    <div className="grid grid-cols-2 gap-6 w-full text-center border-b border-stone-200 dark:border-stone-850 pb-3">
                      <div>
                        <span className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold">Cord Hang Drop</span>
                        <span className="text-xl font-serif font-black text-amber-600 dark:text-amber-400 mt-1 block">
                          {calc.cordLength} Inches
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-stone-400 uppercase tracking-wider block font-bold">Floor Clearance</span>
                        <span className="text-xl font-serif font-black text-stone-800 dark:text-stone-200 mt-1 block">
                          {calc.floorClearance} Inches
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-relaxed text-center font-sans max-w-xs">
                      {calc.note}
                    </p>
                  </>
                ) : (
                  <span className="text-stone-400 text-xs">Enter ceiling dimensions to generate specs.</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Styling and Kelvin logs */}
        <section id="guides" className="py-24 md:py-32 px-8 bg-stone-50 dark:bg-stone-950 text-left transition-colors">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">DESIGN SPECIFICATIONS</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mt-1">
                The Anatomy of Zenith
              </h2>
              <p className="text-stone-500 dark:text-stone-400 text-xs mt-2">
                Learn the spacing, dimming, and styling guidelines curated specifically for this flagship pendant.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border border-stone-200 dark:border-stone-850 p-8 rounded-xl bg-white dark:bg-stone-900 flex flex-col gap-4">
                <span className="text-amber-600 dark:text-amber-400 font-bold font-serif text-2xl">01.</span>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">Spacing islands</h3>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                  If hanging multiple Zenith Pendants side by side over kitchen islands, always space the fixtures <strong>30 inches apart</strong> center-to-center. This prevents overlapping ambient halos.
                </p>
              </div>
              
              <div className="border border-stone-200 dark:border-stone-850 p-8 rounded-xl bg-white dark:bg-stone-900 flex flex-col gap-4">
                <span className="text-amber-600 dark:text-amber-400 font-bold font-serif text-2xl">02.</span>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">Warmth Selection</h3>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                  We highly suggest dimmable bulbs operating between <strong>2200K and 2700K</strong>. Higher kelvin counts (like 4000K daylight) cast cold blue tones that clash with organic linen fibers.
                </p>
              </div>

              <div className="border border-stone-200 dark:border-stone-850 p-8 rounded-xl bg-white dark:bg-stone-900 flex flex-col gap-4">
                <span className="text-amber-600 dark:text-amber-400 font-bold font-serif text-2xl">03.</span>
                <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">Organic Diffuser</h3>
                <p className="text-stone-500 dark:text-stone-400 text-[11px] leading-relaxed">
                  The integrated acrylic bottom diffuser floats centered within the shade. It protects eyes from bare bulbs, redirecting intense beams into a soothing ceiling bounce.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Embedded Secure Checkout Form */}
        <section id="checkout" className="py-24 md:py-32 px-8 bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-850 text-left transition-colors">
          <div className="max-w-5xl mx-auto bg-white border border-stone-200 dark:bg-stone-950 dark:border-stone-800 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            
            {!isOrdered ? (
              <form onSubmit={handleOrderSubmit} className="flex flex-col gap-8">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">Order System</span>
                  <h3 className="font-serif text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 mt-1">
                    Secure In-Site Checkout
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 text-xs md:text-sm mt-2 leading-relaxed max-w-xl">
                    Secure your Zenith Oatmeal Linen Pendant ($390). Fill out your shipping details and simulated secure payment card directly below.
                  </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start border-t border-stone-150 dark:border-stone-850 pt-8">
                  {/* Shipping Section */}
                  <div className="md:col-span-6 flex flex-col gap-4">
                    <h4 className="text-[10px] font-sans font-black tracking-widest text-stone-400 uppercase mb-2">Shipping Information</h4>
                    <div>
                      <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Full Name</label>
                      <input 
                        type="text"
                        name="name"
                        value={shipping.name}
                        onChange={handleShippingChange}
                        placeholder="John Doe"
                        className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      {shippingErrors.name && <span className="text-[10px] text-red-500 mt-1 block font-medium">{shippingErrors.name}</span>}
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Email Address</label>
                      <input 
                        type="email"
                        name="email"
                        value={shipping.email}
                        onChange={handleShippingChange}
                        placeholder="john@example.com"
                        className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      {shippingErrors.email && <span className="text-[10px] text-red-500 mt-1 block font-medium">{shippingErrors.email}</span>}
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Delivery Address</label>
                      <input 
                        type="text"
                        name="address"
                        value={shipping.address}
                        onChange={handleShippingChange}
                        placeholder="120 Architectural Way"
                        className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      {shippingErrors.address && <span className="text-[10px] text-red-500 mt-1 block font-medium">{shippingErrors.address}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">City</label>
                        <input 
                          type="text"
                          name="city"
                          value={shipping.city}
                          onChange={handleShippingChange}
                          placeholder="New York"
                          className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        {shippingErrors.city && <span className="text-[10px] text-red-500 mt-1 block font-medium">{shippingErrors.city}</span>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Zip/Postal Code</label>
                        <input 
                          type="text"
                          name="zip"
                          value={shipping.zip}
                          onChange={handleShippingChange}
                          placeholder="10001"
                          className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        {shippingErrors.zip && <span className="text-[10px] text-red-500 mt-1 block font-medium">{shippingErrors.zip}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="md:col-span-6 flex flex-col gap-5">
                    <h4 className="text-[10px] font-sans font-black tracking-widest text-stone-400 uppercase mb-2">Secure Card Payment</h4>
                    
                    {/* Glass Card Display */}
                    <div className="bg-gradient-to-br from-stone-800 via-stone-850 to-stone-900 text-stone-50 rounded-xl p-5 border border-stone-700/60 shadow-lg relative flex flex-col justify-between aspect-[1.58/1] overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-stone-400">PAYMENT RECEIVER NODE</span>
                        <span className="text-amber-500 font-mono text-xs font-black italic">{getCardLogo()}</span>
                      </div>
                      
                      <div className="my-auto font-mono text-sm tracking-widest text-left mt-4 text-stone-100">
                        {payment.cardNumber || "•••• •••• •••• ••••"}
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="text-left">
                          <span className="text-[8px] text-stone-400 block uppercase tracking-wider">Cardholder</span>
                          <span className="text-xs uppercase font-serif tracking-wide">{payment.cardName || "YOUR NAME"}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[8px] text-stone-400 block uppercase tracking-wider">Expires</span>
                          <span className="text-xs font-mono">{payment.cardExpiry || "MM/YY"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Cardholder Name</label>
                      <input 
                        type="text"
                        name="cardName"
                        value={payment.cardName}
                        onChange={handlePaymentChange}
                        placeholder="John Doe"
                        className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      {paymentErrors.cardName && <span className="text-[10px] text-red-500 mt-1 block font-medium">{paymentErrors.cardName}</span>}
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Card Number</label>
                      <input 
                        type="text"
                        name="cardNumber"
                        value={payment.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="4000 1234 5678 9010"
                        className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      {paymentErrors.cardNumber && <span className="text-[10px] text-red-500 mt-1 block font-medium">{paymentErrors.cardNumber}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Expiry Date</label>
                        <input 
                          type="text"
                          name="cardExpiry"
                          value={payment.cardExpiry}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        {paymentErrors.cardExpiry && <span className="text-[10px] text-red-500 mt-1 block font-medium">{paymentErrors.cardExpiry}</span>}
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">Security Code (CVV)</label>
                        <input 
                          type="password"
                          name="cardCvv"
                          value={payment.cardCvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className="w-full bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                        {paymentErrors.cardCvv && <span className="text-[10px] text-red-500 mt-1 block font-medium">{paymentErrors.cardCvv}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-150 dark:border-stone-850 pt-6 text-right flex justify-between items-baseline">
                  <div className="text-left">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-bold">TOTAL PRICE (DELIVERED)</span>
                    <span className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-50">$390.00</span>
                  </div>
                  <button 
                    type="submit"
                    className="bg-stone-900 text-stone-50 hover:bg-stone-850 py-4.5 px-12 font-sans font-bold uppercase tracking-widest text-[10px] border border-stone-900 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 transition-all cursor-pointer text-center"
                  >
                    Place Order Now
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10 gap-6">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                  <svg className="w-8 h-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-sans font-black tracking-widest text-green-600 dark:text-green-400 uppercase">ORDER COMPLETED</span>
                  <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-50">The Zenith is yours.</h2>
                  <p className="text-stone-400 text-xs">Your shipment details have been secured.</p>
                </div>

                <div className="bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/60 p-5 rounded-xl w-full max-w-md text-left flex flex-col gap-2.5">
                  <div className="flex justify-between text-xs font-sans font-bold border-b border-stone-200/50 dark:border-stone-800 pb-2">
                    <span className="text-stone-400">Order ID:</span>
                    <span className="text-stone-900 dark:text-stone-50">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans font-bold border-b border-stone-200/50 dark:border-stone-800 pb-2">
                    <span className="text-stone-400">Delivery Address:</span>
                    <span className="text-stone-900 dark:text-stone-50 truncate max-w-xs">{shipping.address}, {shipping.city}</span>
                  </div>
                  <div className="flex justify-between text-xs font-sans font-bold">
                    <span className="text-stone-400">Delivery Est:</span>
                    <span className="text-stone-900 dark:text-stone-50">7–10 Business Days</span>
                  </div>
                </div>

                <p className="text-[10px] text-stone-400 leading-normal max-w-sm mt-2">
                  A receipt record has been logged in browser Local Storage. We will prepare your hand-woven flax pendant for immediate routing.
                </p>

                <button 
                  onClick={() => setIsOrdered(false)}
                  className="w-full max-w-xs bg-stone-900 text-stone-50 hover:bg-stone-850 py-4 mt-4 font-sans font-bold uppercase tracking-widest text-[10px] border border-stone-900 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-stone-200 transition-all cursor-pointer text-center"
                >
                  Return to Details
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 py-16 px-8 dark:bg-stone-950 dark:border-stone-850 text-xs text-stone-500 dark:text-stone-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-stone-200 dark:border-stone-850 pb-12 mb-12 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <span className="font-serif text-lg font-black uppercase tracking-widest text-stone-950 dark:text-stone-50">Aura & Angle</span>
            <p className="max-w-xs leading-relaxed font-sans text-stone-400">
              Architectural styling guidance & handpicked luxury light curations. Bridging spatial volumes with elegant illumination.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 font-sans font-bold uppercase tracking-wider text-[10px] text-stone-600 dark:text-stone-300">
            <a href="#spotlight" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">The Zenith</a>
            <a href="#calculator" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">Height Helper</a>
            <a href="#guides" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">Styling Guide</a>
            <a href="#checkout" className="hover:text-stone-900 dark:hover:text-stone-50 transition-colors">Secure Order</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="font-sans">&copy; {new Date().getFullYear()} Aura & Angle. All rights reserved.</p>
          <p className="text-[10px] leading-relaxed max-w-xl text-stone-400 dark:text-stone-500 text-center lg:text-right font-sans">
            Disclaimer: Aura & Angle is an architectural lighting review guide. Order routing, card validations, and checkout completion displays are simulated locally on this domain.
          </p>
        </div>
      </footer>
    </div>
  );
}
