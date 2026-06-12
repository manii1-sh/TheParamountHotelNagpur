import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, BedDouble, ArrowRight, Eye } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { RoomModal, RoomPreviewModal, ROOMS, type RoomData } from "@/components/RoomModal";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Rooms & Suites — The Paramount Hotel Nagpur" },
      {
        name: "description",
        content:
          "Explore Deluxe, Executive, Premium and Family rooms at The Paramount Hotel, Besa, Nagpur. Flexible pricing starting ₹699.",
      },
      { property: "og:title", content: "Rooms & Suites — The Paramount Hotel Nagpur" },
      { property: "og:description", content: "Flexible stays starting ₹699. Book directly on WhatsApp." },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <SiteLayout>
      <RoomsSection />
    </SiteLayout>
  );
}

// ─── Exported so index.tsx can reuse it ──────────────────────────────────────
export function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [previewRoom, setPreviewRoom] = useState<RoomData | null>(null);
  const rooms = ROOMS;

  return (
    <>
      {selectedRoom && (
        <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}
      {previewRoom && (
        <RoomPreviewModal room={previewRoom} onClose={() => setPreviewRoom(null)} />
      )}

      {/* Rooms Showcase Section */}
      <section className="bg-[#FDFBF7] py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
              Our Rooms
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#040E21]">
              Designed For Your Comfort
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E5B83E]"></span>
              <span className="w-16 h-[1px] bg-[#E5B83E]"></span>
              <span className="w-2 h-2 rounded-full bg-[#E5B83E]"></span>
            </div>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {rooms.map((room, index) => (
              <div
                key={index}
                onClick={() => setSelectedRoom(room)}
                className="bg-[#040E21] rounded-sm overflow-hidden shadow-[0_12px_35px_rgba(4,14,33,0.2)] flex flex-col group border border-white/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#E5B83E]/30 cursor-pointer"
              >
                {/* Room Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden shrink-0">
                  <img
                    src={room.image}
                    alt={`${room.title} - The Paramount Hotel Nagpur`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#040E21]/15 group-hover:bg-transparent transition-colors duration-300"></div>
                  
                  {/* Special Pizza Promo Badge for Premium Room */}
                  {room.title === "Premium Room" && (
                    <div className="absolute top-3 left-3 z-10 bg-[#E5B83E] text-[#040E21] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <span>🍕 Special Offer</span>
                    </div>
                  )}

                  {/* View Details badge */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-[#E5B83E] text-[#040E21] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-serif text-lg md:text-xl font-bold text-white tracking-wide">
                      {room.title}
                    </h3>

                    {/* Capacity and Bed Info */}
                    <div className="flex items-center gap-4 text-white/80 text-xs">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#E5B83E]" />
                        <span>{room.guests}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-[#E5B83E]" />
                        <span>{room.bed}</span>
                      </div>
                    </div>

                    {/* Promo Offer Banner */}
                    {room.title === "Premium Room" && (
                      <div className="mt-2.5 p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[#F2C953] text-[11px] leading-relaxed flex items-start gap-2">
                        <span className="text-sm shrink-0 leading-none select-none">🍕</span>
                        <span>
                          Get <strong>2 complimentary pizzas</strong> on 6 & 24 hr stays!
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-2 border-t border-white/10">
                    {/* Price starting from */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#FAFAFA]/40 font-sans">From</span>
                      <span className="font-serif font-bold text-[#E5B83E] text-base">₹{room.pricing[0].price}</span>
                      <span className="text-[10px] text-[#FAFAFA]/40">/ 6 hrs</span>
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedRoom(room); }}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E5B83E] hover:text-[#F2C953] group/btn transition-colors cursor-pointer"
                      >
                        View Pricing & Book
                        <ArrowRight className="w-3.5 h-3.5 text-[#E5B83E] transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>

                      <button
                        onClick={(e) => { e.stopPropagation(); setPreviewRoom(room); }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white group transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
