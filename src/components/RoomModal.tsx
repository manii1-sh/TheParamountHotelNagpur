import { useState, useEffect } from "react";
import { X, User, BedDouble, Check, Timer } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type PricingSlot = { label: string; duration: string; price: number };
export type RoomData = {
  title: string;
  image: string;
  guests: string;
  bed: string;
  description: string;
  amenities: string[];
  pricing: PricingSlot[];
  whatsappMessage: string;
};

// ─── Shared pricing & room data ───────────────────────────────────────────────
export const HOTEL_PHONE = "919322520682";

export const DELUXE_PRICING: PricingSlot[] = [
  { label: "6 Hours",  duration: "Half day · 6 hrs",               price: 999  },
  { label: "12 Hours", duration: "Day use · 12 hrs",               price: 1299 },
  { label: "Full Day", duration: "Overnight · 12 PM to 11 AM",     price: 1499 },
];

export const SUPER_DELUXE_PRICING: PricingSlot[] = [
  { label: "6 Hours",  duration: "Half day · 6 hrs",               price: 1199 },
  { label: "12 Hours", duration: "Day use · 12 hrs",               price: 1499 },
  { label: "Full Day", duration: "Overnight · 12 PM to 11 AM",     price: 1699 },
];

export const PREMIUM_PRICING: PricingSlot[] = [
  { label: "6 Hours",  duration: "Half day · 6 hrs",               price: 1799 },
  { label: "12 Hours", duration: "Day use · 12 hrs",               price: 1999 },
  { label: "Full Day", duration: "Overnight · 12 PM to 11 AM",     price: 2599 },
];

// Keep SHARED_PRICING as alias for backward compat
export const SHARED_PRICING = DELUXE_PRICING;

export const ROOMS: RoomData[] = [
  {
    title: "Deluxe Room",
    image: "/dulex-room.webp",
    guests: "2 Guests",
    bed: "King Bed",
    description: "A spacious and well-appointed room featuring plush bedding, modern furnishings, and a calm ambiance — perfect for business travelers or couples seeking comfort.",
    amenities: ["Free Wi-Fi", "Air Conditioning", "LED TV", "Room Service", "Hot Water", "Daily Housekeeping", "Free Parking", "24/7 Reception"],
    pricing: DELUXE_PRICING,
    whatsappMessage: "Hello The Paramount Hotel, I am interested in booking the Deluxe Room. Please share availability.",
  },
  {
    title: "Super Deluxe Room",
    image: "/super-duplex.webp",
    guests: "2 Guests",
    bed: "King Bed",
    description: "Step up your stay with our Super Deluxe Room — a perfect blend of style and comfort, featuring upgraded furnishings, enhanced décor, and a premium feel that goes beyond the standard experience.",
    amenities: ["Free Wi-Fi", "Air Conditioning", "Smart LED TV", "Room Service", "Hot Water", "Daily Housekeeping", "Free Parking", "24/7 Reception", "Work Desk", "Wardrobe"],
    pricing: SUPER_DELUXE_PRICING,
    whatsappMessage: "Hello The Paramount Hotel, I am interested in booking the Super Deluxe Room. Please share availability.",
  },
  {
    title: "Premium Room",
    image: "/premium-room.webp",
    guests: "2 Guests",
    bed: "King Bed",
    description: "Our Premium Room offers an elevated experience with a private bathtub, extra space, superior interiors, and premium touches — ideal for guests who want the finest luxury.",
    amenities: ["Free Wi-Fi", "Air Conditioning", "Smart TV", "Private Bathtub", "Mini Fridge", "Room Service", "Hot Water", "Daily Housekeeping", "Free Parking", "24/7 Reception"],
    pricing: PREMIUM_PRICING,
    whatsappMessage: "Hello The Paramount Hotel, I am interested in booking the Premium Room (Bathtub). Please share availability.",
  },
];

// ─── Modal Component ──────────────────────────────────────────────────────────
export function RoomModal({
  room,
  onClose,
}: {
  room: RoomData;
  onClose: () => void;
}) {
  const [selectedSlot, setSelectedSlot] = useState<number>(room.pricing.length - 1);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const buildWhatsApp = (slot: PricingSlot) => {
    const msg = `Hello The Paramount Hotel,\n\nI would like to book the *${room.title}*.\n\nDuration: ${slot.label} (${slot.duration})\nPrice: ₹${slot.price}\n\nPlease confirm availability.`;
    return `https://wa.me/${HOTEL_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] bg-[#FDFBF7] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.5)] animate-slide-up sm:animate-scale-up">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero image */}
        <div className="relative h-52 sm:h-64 shrink-0 overflow-hidden">
          <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040E21]/80 via-[#040E21]/20 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5B83E] font-bold mb-1">The Paramount Hotel</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">{room.title}</h2>
            <div className="flex items-center gap-4 mt-1.5 text-white/80 text-xs">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#E5B83E]" />{room.guests}</span>
              <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-[#E5B83E]" />{room.bed}</span>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          <p className="text-sm text-[#040E21]/70 font-sans leading-relaxed">{room.description}</p>

          {/* Amenities */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#040E21]/50 mb-3">Room Includes</h4>
            <div className="grid grid-cols-2 gap-2">
              {room.amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#040E21]/80 font-medium">
                  <Check className="w-3.5 h-3.5 text-[#E5B83E] shrink-0" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Timer className="w-4 h-4 text-[#E5B83E]" />
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#040E21]/50">Flexible Pricing</h4>
            </div>
            <div className="space-y-2.5">
              {room.pricing.map((slot, i) => {
                const isSelected = i === selectedSlot;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedSlot(i)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-[#040E21] border-[#E5B83E]/50 shadow-[0_4px_20px_rgba(4,14,33,0.2)]"
                        : "bg-white border-gray-100 hover:border-[#E5B83E]/40 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      <p className={`font-serif font-bold text-base leading-tight ${isSelected ? "text-[#E5B83E]" : "text-[#040E21]"}`}>
                        {slot.label}
                      </p>
                      <p className={`text-[11px] font-sans mt-0.5 ${isSelected ? "text-white/50" : "text-[#040E21]/45"}`}>
                        {slot.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`flex items-baseline gap-px ${isSelected ? "text-white" : "text-[#040E21]"}`}>
                        <span className={`text-sm font-bold leading-none ${isSelected ? "text-[#E5B83E]" : "text-[#040E21]/60"}`}>₹</span>
                        <span className="font-sans font-black text-2xl tracking-tight leading-none">{slot.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); window.open(buildWhatsApp(slot), "_blank"); }}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E5B83E] hover:bg-[#F2C953] active:scale-95 text-[#040E21] font-bold text-[10px] uppercase tracking-wider rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer select-none shadow-sm"
                      >
                        <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z" />
                        </svg>
                        Book
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center text-[10px] text-[#040E21]/40 font-sans pb-1">
            Prices are per room · Taxes included · Instant WhatsApp confirmation
          </p>
        </div>
      </div>
    </div>
  );
}
