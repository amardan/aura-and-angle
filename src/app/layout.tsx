import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura & Angle | Architectural Lighting Curation & Styling Studio",
  description: "Explore clean lighting geometry, Japandi fixtures, and custom placement guides. Aura & Angle bridges modern room volume with elegant, layered illumination.",
  metadataBase: new URL("https://aura-and-angle.vercel.app"),
  openGraph: {
    title: "Aura & Angle | Architectural Lighting Curation",
    description: "Modern room volume meets elegant, layered illumination.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura & Angle | Architectural Lighting Curation",
    description: "Modern room volume meets elegant, layered illumination.",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
