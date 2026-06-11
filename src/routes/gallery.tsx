import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — The Paramount Hotel Nagpur" },
      {
        name: "description",
        content:
          "Browse photos of rooms, bathrooms, common areas and the exterior of The Paramount Hotel, Besa, Nagpur.",
      },
      { property: "og:title", content: "Gallery — The Paramount Hotel Nagpur" },
    ],
  }),
  component: GalleryPage,
});

// ─── Photo data ───────────────────────────────────────────────────────────────
type Photo = { src: string; alt: string; span?: "wide" | "tall" | "normal" };

const TABS = ["All", "Rooms", "Bathroom", "Common Area", "Exterior"] as const;
type Tab = (typeof TABS)[number];

const PHOTOS: Record<Exclude<Tab, "All">, Photo[]> = {
  Rooms: [
    { src: "/dulex-room.webp",    alt: "Deluxe Room — King Bed",         span: "wide" },
    { src: "/super-duplex.webp",  alt: "Super Deluxe Room — King Bed",   span: "tall" },
    { src: "/premium-room.png",   alt: "Premium Room — Bathtub Suite"               },
    { src: "/extraspace.webp",   alt: "Room — Extra Space & Comfort"               },
    { src: "/decoration.webp",    alt: "Room — Premium Décor",           span: "wide" },
    { src: "/room3.webp",         alt: "Room — Cosy Interior"                        },
    { src: "/room4.webp",         alt: "Room — Comfortable Stay"                     },
    { src: "/room5.webp",         alt: "Room — Modern Layout & Design"               },
    { src: "/room6.webp",         alt: "Room — Sleek Executive Setup",   span: "tall" },
    { src: "/room7.webp",         alt: "Room — Warm and Elegant Vibe"                },
    { src: "/room8.webp",         alt: "Room — Deluxe Double Bed Setup", span: "wide" },
    { src: "/room9.webp",         alt: "Room — Contemporary Comfort Design"          },
  ],
  Bathroom: [
    { src: "/bathtub.webp",       alt: "Premium Room — Private Bathtub", span: "wide" },
    { src: "/rosetub.webp",       alt: "Bathroom — Rose Bath Experience", span: "tall" },
    { src: "/washroom.webp",      alt: "Bathroom — Clean & Hygienic"                },
    { src: "/washrooom2.webp",    alt: "Bathroom — Hot Water & Amenities"           },
    { src: "/bathtub3.webp",      alt: "Bathroom — Luxury Bathtub Suite", span: "wide" },
    { src: "/bathtub4.webp",      alt: "Bathroom — Premium Shower Design"            },
    { src: "/washroom4.webp",     alt: "Bathroom — Modern Layout & Fittings"         },
    { src: "/bathtub6.webp",      alt: "Bathroom — Private Bathtub & Spa", span: "tall" },
  ],
  "Common Area": [
    { src: "/stairs.webp",        alt: "Hotel — Staircase & Corridors",  span: "wide" },
  ],
  Exterior: [
    { src: "/hotel-exterior.webp",   alt: "The Paramount Hotel — Exterior View", span: "wide" },
    { src: "/hotel2.webp",          alt: "The Paramount Hotel — Building View",  span: "wide" },
    { src: "/parking.webp",          alt: "Free & Secure Parking"                            },
  ],
};

// Flatten all for the "All" tab
const ALL_PHOTOS: Photo[] = [
  ...PHOTOS["Rooms"],
  ...PHOTOS["Bathroom"],
  ...PHOTOS["Common Area"],
  ...PHOTOS["Exterior"],
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  photos,
  index,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = () => setCurrent((c) => (c === 0 ? photos.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === photos.length - 1 ? 0 : c + 1));

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs font-sans tracking-widest">
        {current + 1} / {photos.length}
      </span>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E5B83E]/80 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Image */}
      <div
        className="max-w-4xl w-full max-h-[80vh] flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current}
          src={photos[current].src}
          alt={photos[current].alt}
          className="max-h-[72vh] w-full object-contain rounded-sm animate-fade-in"
        />
        <p className="text-white/50 font-sans text-xs tracking-wide text-center">
          {photos[current].alt}
        </p>
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-[#E5B83E]/80 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

// ─── Gallery grid ─────────────────────────────────────────────────────────────
function GalleryGrid({
  photos,
  onOpen,
}: {
  photos: Photo[];
  onOpen: (i: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-3">
      {photos.map((photo, i) => (
        <div
          key={i}
          onClick={() => onOpen(i)}
          className={`relative overflow-hidden rounded-sm cursor-pointer group border border-[#E5B83E]/10 hover:border-[#E5B83E]/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(229,184,62,0.15)]
            ${photo.span === "wide" ? "col-span-2" : ""}
            ${photo.span === "tall" ? "row-span-2" : ""}
          `}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#040E21]/0 group-hover:bg-[#040E21]/40 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
              <ZoomIn className="w-6 h-6 text-white drop-shadow-lg" />
              <span className="text-white text-[10px] font-bold uppercase tracking-widest font-sans drop-shadow-lg text-center px-2">
                {photo.alt}
              </span>
            </div>
          </div>
          {/* Gold corner accent */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[20px] border-l-[#E5B83E]/70 border-b-[20px] border-b-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}

// ─── Exported section (used in index.tsx) ────────────────────────────────────
export function GalleryPeekStrip() {
  const peekPhotos = [
    { src: "/dulex-room.webp",       alt: "Deluxe Room"        },
    { src: "/super-duplex.webp",     alt: "Super Deluxe Room"  },
    { src: "/premium-room.png",      alt: "Premium Room"       },
    { src: "/bathtub.webp",          alt: "Bathtub Suite"      },
    { src: "/hotel-exterior.webp",   alt: "Hotel Exterior"     },
  ];

  return (
    <section className="bg-[#FDFBF7] py-10 px-6 border-t border-b border-[#E5B83E]/15">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
              Photo Gallery
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#040E21]">
              See It For Yourself
            </h2>
          </div>
          <a
            href="/gallery"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#040E21] hover:bg-[#E5B83E] text-white hover:text-[#040E21] font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-[0_4px_15px_rgba(4,14,33,0.15)] hover:-translate-y-0.5 group"
          >
            View Full Gallery
            <ArrowRight className="w-3.5 h-3.5 text-[#E5B83E] group-hover:text-[#040E21] transition-colors" />
          </a>
        </div>

        {/* Peek strip — scrollable on mobile, fixed layout on md+ */}
        <div className="flex gap-3 overflow-x-auto md:overflow-hidden pb-2 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-none">
          {peekPhotos.map((photo, i) => (
            <a
              key={i}
              href="/gallery"
              className={`relative flex-shrink-0 h-[200px] md:h-[220px] overflow-hidden rounded-sm group border border-[#040E21]/8 hover:border-[#E5B83E]/60 transition-all duration-300 shadow-[0_4px_20px_rgba(4,14,33,0.08)] hover:shadow-[0_8px_30px_rgba(229,184,62,0.15)] snap-start
                w-[75vw] sm:w-[45vw]
                ${i === 0 ? "md:w-[32%]" : i === 1 ? "md:w-[24%]" : i === 2 ? "md:w-[20%]" : i === 3 ? "md:w-[14%]" : "md:w-[10%]"}
              `}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-[#040E21]/0 group-hover:bg-[#040E21]/40 transition-all duration-300" />
              {/* Label — only on wider cards */}
              {i < 3 && (
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#040E21]/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest font-sans">
                    {photo.alt}
                  </p>
                </div>
              )}
            </a>
          ))}

          {/* +X more tile */}
          <a
            href="/gallery"
            className="relative flex-shrink-0 w-[40vw] sm:w-[25vw] md:w-[10%] h-[200px] md:h-[220px] overflow-hidden rounded-sm bg-[#040E21] border border-[#040E21] hover:border-[#E5B83E] hover:bg-[#040E21]/90 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 group shadow-[0_4px_20px_rgba(4,14,33,0.12)] snap-start"
          >
            <span className="font-serif font-bold text-[#E5B83E] text-lg leading-none">+{ALL_PHOTOS.length - peekPhotos.length}</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#E5B83E]/70 font-sans text-center px-1">More<br/>Photos</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E5B83E] mt-1 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}

// ─── Full gallery section (used on /gallery page only) ───────────────────────
export function GallerySection() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = activeTab === "All" ? ALL_PHOTOS : PHOTOS[activeTab];

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <section className="bg-[#040E21] py-16 px-6 border-t border-b border-[#E5B83E]/15">
        <div className="max-w-7xl mx-auto space-y-10">

          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
              Photo Gallery
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">
              See It For Yourself
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="w-16 h-[1px] bg-[#E5B83E]/30"></span>
              <div className="w-2 h-2 bg-[#E5B83E] rotate-45"></div>
              <span className="w-16 h-[1px] bg-[#E5B83E]/30"></span>
            </div>
            <p className="text-white/45 font-sans text-sm max-w-md mx-auto">
              Browse through our rooms, amenities and hotel spaces before you book.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest font-sans rounded-sm border transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#E5B83E] text-[#040E21] border-[#E5B83E] shadow-[0_4px_15px_rgba(229,184,62,0.3)]"
                    : "bg-transparent text-white/50 border-white/15 hover:border-[#E5B83E]/50 hover:text-[#E5B83E]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <GalleryGrid photos={photos} onOpen={setLightboxIndex} />
        </div>
      </section>
    </>
  );
}

// ─── Full /gallery page ───────────────────────────────────────────────────────
function GalleryPage() {
  return (
    <SiteLayout>
      <GallerySection />
    </SiteLayout>
  );
}
