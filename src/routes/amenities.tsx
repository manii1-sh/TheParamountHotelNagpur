import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  Car,
  Wifi,
  Wind,
  Bath,
  Bell,
  Sparkles,
  Shirt,
  ConciergeBell,
  Accessibility,
  PawPrint,
  CigaretteOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Amenities — The Paramount Hotel Nagpur" },
      {
        name: "description",
        content:
          "Explore the amenities at The Paramount Hotel, Besa, Nagpur — Free Parking, WiFi, Air Conditioning, Room Service and more.",
      },
      { property: "og:title", content: "Amenities — The Paramount Hotel Nagpur" },
    ],
  }),
  component: AmenitiesPage,
});

function AmenitiesPage() {
  return (
    <SiteLayout>
      <AmenitiesSection />
    </SiteLayout>
  );
}

const AMENITIES = [
  { icon: Car,           label: "Free Parking" },
  { icon: Wifi,          label: "Free WiFi" },
  { icon: Wind,          label: "Air Conditioning" },
  { icon: Bath,          label: "Hot Tub" },
  { icon: Bell,          label: "Room Service" },
  { icon: Sparkles,      label: "Daily Housekeeping" },
  { icon: Shirt,         label: "Laundry Service" },
  { icon: ConciergeBell, label: "24/7 Front Desk" },
  { icon: Accessibility, label: "Accessible Rooms" },
  { icon: PawPrint,      label: "Pet Friendly" },
  { icon: CigaretteOff,  label: "Smoke Free Property" },
];

// ─── Exported so index.tsx can reuse it ──────────────────────────────────────
export function AmenitiesSection() {
  const [expanded, setExpanded] = useState(false);

  // On lg screens the grid is 6 cols → first row = first 6 items
  // We always show the first 6; the rest are in the collapsible area
  const firstRow = AMENITIES.slice(0, 6);
  const remaining = AMENITIES.slice(6);

  return (
    <section className="bg-[#040E21] text-white py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
            Amenities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
            Everything You Need For A Perfect Stay
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-16 h-[1px] bg-[#E5B83E]/30"></span>
            <div className="w-2.5 h-2.5 bg-[#E5B83E] rotate-45"></div>
            <span className="w-16 h-[1px] bg-[#E5B83E]/30"></span>
          </div>
        </div>

        {/* Amenities grid wrapper — relative so the fade overlay sits on top */}
        <div className="relative">

          {/* Always-visible first row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 pt-4 justify-items-center">
            {firstRow.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center text-center space-y-3 group cursor-default"
              >
                <div className="w-14 h-14 rounded-full border border-[#E5B83E]/20 flex items-center justify-center text-[#E5B83E] transition-all duration-300 group-hover:bg-[#E5B83E]/10 group-hover:border-[#E5B83E] group-hover:scale-105">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider text-white/80 font-sans font-semibold">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Expandable second row — smooth height transition */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center overflow-hidden transition-all duration-500 ease-in-out ${
              expanded ? "max-h-96 opacity-100 mt-6 md:mt-8 pt-4" : "max-h-0 opacity-0"
            }`}
          >
            {remaining.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center text-center space-y-3 group cursor-default"
              >
                <div className="w-14 h-14 rounded-full border border-[#E5B83E]/20 flex items-center justify-center text-[#E5B83E] transition-all duration-300 group-hover:bg-[#E5B83E]/10 group-hover:border-[#E5B83E] group-hover:scale-105">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider text-white/80 font-sans font-semibold">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Gradient fade overlay — only visible when collapsed */}
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#040E21] to-transparent pointer-events-none" />
          )}
        </div>

        {/* Toggle button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-7 py-3 border border-[#E5B83E]/60 hover:border-[#E5B83E] text-[#E5B83E] hover:bg-[#E5B83E]/10 font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 hover:shadow-[0_4px_15px_rgba(229,184,62,0.15)] cursor-pointer group"
          >
            {expanded ? (
              <>
                Show Less
                <ChevronUp className="w-4 h-4 transition-transform duration-300" />
              </>
            ) : (
              <>
                View All Amenities
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}
