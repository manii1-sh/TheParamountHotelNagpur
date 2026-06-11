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
  { label: "6 Hours", duration: "Half day · 6 hrs", price: 999 },
  { label: "12 Hours", duration: "Day use · 12 hrs", price: 1299 },
  { label: "Full Day", duration: "Overnight · 12 PM to 11 AM", price: 1499 },
];

export const SUPER_DELUXE_PRICING: PricingSlot[] = [
  { label: "6 Hours", duration: "Half day · 6 hrs", price: 1199 },
  { label: "12 Hours", duration: "Day use · 12 hrs", price: 1499 },
  { label: "Full Day", duration: "Overnight · 12 PM to 11 AM", price: 1699 },
];

export const PREMIUM_PRICING: PricingSlot[] = [
  { label: "6 Hours", duration: "Half day · 6 hrs", price: 1799 },
  { label: "12 Hours", duration: "Day use · 12 hrs", price: 1999 },
  { label: "Full Day", duration: "Overnight · 12 PM to 11 AM", price: 2599 },
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
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getTomorrowDateString = (startDateStr?: string) => {
    const baseDate = startDateStr ? new Date(startDateStr) : new Date();
    const tomorrow = new Date(baseDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const [selectedSlot, setSelectedSlot] = useState<number>(room.pricing.length - 1);
  const [activeBookingSlot, setActiveBookingSlot] = useState<PricingSlot | null>(null);
  const [name, setName] = useState(() => localStorage.getItem("paramount_guest_name") || "");
  const [mobile, setMobile] = useState(() => localStorage.getItem("paramount_guest_mobile") || "");
  const [checkIn, setCheckIn] = useState(getTodayDateString());
  const [checkOut, setCheckOut] = useState(getTomorrowDateString());
  const [checkInTime, setCheckInTime] = useState("12:00");
  const [guests, setGuests] = useState("2 Guests");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    if (checkOut <= val) {
      setCheckOut(getTomorrowDateString(val));
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      setValidationError("Please enter your name.");
      return false;
    }
    if (!mobile.trim()) {
      setValidationError("Please enter your mobile number.");
      return false;
    }
    if (!checkIn) {
      setValidationError("Please select check-in date.");
      return false;
    }

    const isHourly = activeBookingSlot?.label === "6 Hours" || activeBookingSlot?.label === "12 Hours";

    if (isHourly) {
      if (!checkInTime) {
        setValidationError("Please select check-in time.");
        return false;
      }
    } else {
      if (!checkOut) {
        setValidationError("Please select check-out date.");
        return false;
      }
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkInDate < today) {
        setValidationError("Check-In date cannot be in the past.");
        return false;
      }

      if (checkOutDate <= checkInDate) {
        setValidationError("Check-Out date must be after Check-In.");
        return false;
      }
    }

    setValidationError("");
    return true;
  };

  const triggerWhatsApp = (slot: PricingSlot) => {
    localStorage.setItem("paramount_guest_name", name);
    localStorage.setItem("paramount_guest_mobile", mobile);

    const isHourly = slot.label === "6 Hours" || slot.label === "12 Hours";

    let dateDetails = `Check-In Date: ${checkIn}`;
    if (isHourly) {
      dateDetails += `\nCheck-In Time: ${checkInTime}`;
    } else {
      dateDetails += `\nCheck-Out Date: ${checkOut}`;
    }

    const msg = `Hello The Paramount Hotel,

I would like to book a stay:
Room Type: *${room.title}*
Rate Selected: ${slot.label} (${slot.duration})
Price: ₹${slot.price}

Guest Name: ${name}
Mobile Number: ${mobile}
${dateDetails}
Guests: ${guests}

Please confirm availability.`;

    window.open(`https://wa.me/${HOTEL_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
    setActiveBookingSlot(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && activeBookingSlot) {
      triggerWhatsApp(activeBookingSlot);
    }
  };

  const isHourly = activeBookingSlot?.label === "6 Hours" || activeBookingSlot?.label === "12 Hours";

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
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
        <div className="relative h-44 sm:h-56 shrink-0 overflow-hidden">
          <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040E21]/80 via-[#040E21]/20 to-transparent" />
          <div className="absolute bottom-4 left-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#E5B83E] font-bold mb-1">
              The Paramount Hotel
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">{room.title}</h2>
            <div className="flex items-center gap-4 mt-1.5 text-white/80 text-xs">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#E5B83E]" />
                {room.guests}
              </span>
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-[#E5B83E]" />
                {room.bed}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-6">
          <p className="text-sm text-[#040E21]/70 font-sans leading-relaxed">{room.description}</p>

          {/* Amenities */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#040E21]/50 mb-3">
              Room Includes
            </h4>
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
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#040E21]/50">
                Flexible Pricing
              </h4>
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
                      <p
                        className={`font-serif font-bold text-base leading-tight ${
                          isSelected ? "text-[#E5B83E]" : "text-[#040E21]"
                        }`}
                      >
                        {slot.label}
                      </p>
                      <p
                        className={`text-[11px] font-sans mt-0.5 ${
                          isSelected ? "text-white/50" : "text-[#040E21]/45"
                        }`}
                      >
                        {slot.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-baseline gap-px ${
                          isSelected ? "text-white" : "text-[#040E21]"
                        }`}
                      >
                        <span
                          className={`text-sm font-bold leading-none ${
                            isSelected ? "text-[#E5B83E]" : "text-[#040E21]/60"
                          }`}
                        >
                          ₹
                        </span>
                        <span className="font-sans font-black text-2xl tracking-tight leading-none">
                          {slot.price}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSlot(i);
                          setActiveBookingSlot(slot);
                        }}
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

        {/* Quick Booking Popup Overlay inside the Modal */}
        {activeBookingSlot && (
          <div className="absolute inset-0 bg-[#040E21]/95 z-50 flex flex-col justify-center p-5 sm:p-8 rounded-t-2xl sm:rounded-2xl animate-fade-in text-[#040E21]">
            <div className="bg-[#FDFBF7] rounded-xl p-5 border border-[#E5B83E]/30 space-y-4 shadow-2xl relative max-w-md mx-auto w-full max-h-[95%] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-[#E5B83E]/10 pb-3">
                <div className="text-left space-y-1">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E5B83E]">
                    Confirm Room Booking
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#040E21]">{room.title}</h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#040E21] text-white rounded-md text-[10px] font-semibold">
                    <span className="text-[#E5B83E]">{activeBookingSlot.label}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-white/80">{activeBookingSlot.duration}</span>
                    <span className="text-white/40">·</span>
                    <span className="text-[#E5B83E] font-bold">₹{activeBookingSlot.price}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveBookingSlot(null)}
                  className="text-[#040E21]/60 hover:text-[#040E21] p-1 transition-colors cursor-pointer"
                  aria-label="Close booking form"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Validation Message */}
              {validationError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-700 text-xs rounded-lg text-left">
                  {validationError}
                </div>
              )}

              {/* Booking Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-2 px-3 text-xs font-semibold text-[#040E21] outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-2 px-3 text-xs font-semibold text-[#040E21] outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => handleCheckInChange(e.target.value)}
                      min={getTodayDateString()}
                      className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-2 px-3 text-xs font-semibold text-[#040E21] outline-none cursor-pointer"
                      required
                    />
                  </div>
                  {isHourly ? (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                        Check-In Time *
                      </label>
                      <input
                        type="time"
                        value={checkInTime}
                        onChange={(e) => setCheckInTime(e.target.value)}
                        className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-2 px-3 text-xs font-semibold text-[#040E21] outline-none cursor-pointer"
                        required
                      />
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                        Check-Out Date *
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || getTodayDateString()}
                        className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-2 px-3 text-xs font-semibold text-[#040E21] outline-none cursor-pointer"
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                    Guests *
                  </label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-2 pl-3 pr-8 text-xs font-semibold text-[#040E21] outline-none cursor-pointer appearance-none font-sans"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="5+ Guests">5+ Guests</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#040E21]/40 text-xs">
                      ▾
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveBookingSlot(null)}
                    className="flex-1 py-2.5 border border-gray-200 hover:border-gray-300 text-gray-500 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-2.5 bg-[#E5B83E] hover:bg-[#F2C953] active:scale-[0.98] text-[#040E21] font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current text-[#040E21]" viewBox="0 0 24 24">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z" />
                    </svg>
                    Book Stay
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
