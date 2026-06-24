import { useState, useEffect } from "react";
import { X, User, BedDouble, Check, Timer, ChevronLeft, ChevronRight } from "lucide-react";

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
  previewImages?: string[]; // Array of images for the room preview
};

// ─── Shared pricing & room data ───────────────────────────────────────────────
export const HOTEL_PHONE = "917057300523";

export const DELUXE_PRICING: PricingSlot[] = [
  { label: "6 Hours", duration: "Half day · 6 hrs", price: 999 },
  { label: "12 Hours", duration: "Day use · 12 hrs", price: 1299 },
  { label: "Full Day", duration: "Overnight · 12 PM to 11 AM", price: 1499 },
];

export const SUPER_DELUXE_PRICING: PricingSlot[] = [
  { label: "6 Hours", duration: "Half day · 6 hrs", price: 1199 },
  { label: "12 Hours", duration: "Day use · 12 hrs", price: 1499 },
  { label: "Full Day", duration: "Overnight · 12 PM to 11 AM", price: 1799 },
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
    previewImages: [
      "/dulex-room.webp",
      "/room5.webp",
      "/room6.webp",
      "/room7.webp",
      "/washroom4.webp",
      "/washrooom2.webp"
    ],
  },
  {
    title: "Super Deluxe Room",
    image: "/super-duplex.webp",
    guests: "2 Guests",
    bed: "King Bed",
    description: "Step up your stay with our Super Deluxe Room — a perfect blend of style and comfort, featuring upgraded furnishings, enhanced décor, and a premium feel that goes beyond the standard experience.",
    amenities: ["Free Wi-Fi", "Air Conditioning", "Smart LED TV", "Room Service", "Hot Water", "Daily Housekeeping", "Free Parking", "24/7 Reception"],
    pricing: SUPER_DELUXE_PRICING,
    whatsappMessage: "Hello The Paramount Hotel, I am interested in booking the Super Deluxe Room. Please share availability.",
    previewImages: ["/super-duplex.webp"],
  },
  {
    title: "Premium Room",
    image: "/premium-room.webp",
    guests: "2 Guests",
    bed: "King Bed",
    description: "Our Premium Room offers an elevated experience with a private bathtub, extra space, superior interiors, and premium touches — ideal for guests who want the finest luxury.",
    amenities: ["Free Wi-Fi", "Air Conditioning", "Smart TV", "Private Bathtub", "Room Service", "Hot Water", "Daily Housekeeping", "Free Parking", "24/7 Reception"],
    pricing: PREMIUM_PRICING,
    whatsappMessage: "Hello The Paramount Hotel, I am interested in booking the Premium Room (Bathtub). Please share availability.",
    previewImages: [
      "/premium-room.webp",
      "/washroom.webp",
      "/bathtub 4.webp",
      "/bathtub.webp",
      "/bathtub3.webp",
      "/bathtub5.webp"
    ],
  },
];

// Helper to convert 24-hour time string (HH:MM) to 12-hour format with AM/PM (e.g. 12:00 PM, 1:30 PM)
const formatTimeTo12Hour = (time24: string): string => {
  if (!time24) return "";
  const [hoursStr, minutesStr] = time24.split(":");
  const hours = parseInt(hoursStr, 10);
  if (isNaN(hours)) return time24;
  const ampm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutesStr} ${ampm}`;
};

// Helper to calculate extra guest charge (₹300 per person above 2 guests)
const getExtraGuestCharge = (guestsStr: string): number => {
  if (guestsStr === "3 Guests") return 300;
  if (guestsStr === "4 Guests") return 600;
  if (guestsStr === "5 Guests") return 900; // Rate for 3 extra guests (5 guests total)
  return 0;
};

// Helper to calculate check-out time based on check-in time and hourly stay duration
const calculateCheckoutTime = (
  checkInTimeStr: string,
  durationLabel: string
): { time: string; nextDay: boolean } => {
  if (!checkInTimeStr) return { time: "", nextDay: false };
  const [hoursStr, minutesStr] = checkInTimeStr.split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (isNaN(hours) || isNaN(minutes)) return { time: "", nextDay: false };

  let hoursToAdd = 0;
  if (durationLabel === "6 Hours") {
    hoursToAdd = 6;
  } else if (durationLabel === "12 Hours") {
    hoursToAdd = 12;
  } else {
    return { time: "", nextDay: false };
  }

  hours += hoursToAdd;
  const nextDay = hours >= 24;
  hours = hours % 24;

  const hoursPad = String(hours).padStart(2, "0");
  const minutesPad = String(minutes).padStart(2, "0");
  return { time: `${hoursPad}:${minutesPad}`, nextDay };
};

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
      const todayStr = getTodayDateString();
      if (checkIn === todayStr) {
        const now = new Date();
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();

        const [selectedHoursStr, selectedMinutesStr] = checkInTime.split(":");
        const selectedHours = parseInt(selectedHoursStr, 10);
        const selectedMinutes = parseInt(selectedMinutesStr, 10);

        if (
          selectedHours < currentHours ||
          (selectedHours === currentHours && selectedMinutes < currentMinutes)
        ) {
          setValidationError("Check-In time cannot be in the past for today's booking.");
          return false;
        }
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
      const calc = calculateCheckoutTime(checkInTime, slot.label);
      const checkoutTimeFormatted = calc.time ? `${formatTimeTo12Hour(calc.time)}${calc.nextDay ? " (Next Day)" : ""}` : "";
      dateDetails += `\nCheck-In Time: ${formatTimeTo12Hour(checkInTime)}`;
      if (checkoutTimeFormatted) {
        dateDetails += `\nCheck-Out Time: ${checkoutTimeFormatted}`;
      }
    } else {
      dateDetails += `\nCheck-Out Date: ${checkOut}`;
    }

    const isPremiumPizzaOffer = room.title === "Premium Room" && (slot.label === "6 Hours" || slot.label === "Full Day");
    const pizzaNote = isPremiumPizzaOffer ? "\nPromo Selected: *2 Complimentary Pizzas Offer (6/24 Hr Stay)*" : "";

    const extraCharge = getExtraGuestCharge(guests);
    const totalPrice = slot.price + extraCharge;
    const extraChargeNote = extraCharge > 0 ? `\nExtra Guest Charge: ₹${extraCharge} (for ${guests})` : "";
    const totalPriceStr = extraCharge > 0 ? `₹${totalPrice} (₹${slot.price} base + ₹${extraCharge} extra)` : `₹${slot.price}`;

    const msg = `Hello The Paramount Hotel,

I would like to book a stay:
Room Type: *${room.title}*
Rate Selected: ${slot.label} (${slot.duration})
Price: ${totalPriceStr}${extraChargeNote}${pizzaNote}

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

          {/* Pizza Promo Offer */}
          {room.title === "Premium Room" && (
            <div className="p-3.5 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-start gap-3 text-left">
              <span className="text-xl leading-none select-none">🍕</span>
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-800">
                  Exclusive Room Offer
                </span>
                <p className="text-xs text-amber-900/90 font-medium font-sans">
                  Get <strong>2 complimentary pizzas</strong> on a 6-hour or 24-hour stay!
                </p>
              </div>
            </div>
          )}

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
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 border cursor-pointer transition-all duration-200 ${isSelected
                        ? "bg-[#040E21] border-[#E5B83E]/50 shadow-[0_4px_20px_rgba(4,14,33,0.2)]"
                        : "bg-white border-gray-100 hover:border-[#E5B83E]/40 hover:shadow-sm"
                      }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p
                          className={`font-serif font-bold text-base leading-tight ${isSelected ? "text-[#E5B83E]" : "text-[#040E21]"
                            }`}
                        >
                          {slot.label}
                        </p>
                        {room.title === "Premium Room" && (slot.label === "6 Hours" || slot.label === "Full Day") && (
                          <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded tracking-wider flex items-center gap-0.5 border ${isSelected
                              ? "bg-amber-500/20 text-[#E5B83E] border-amber-500/30"
                              : "bg-amber-500/10 text-amber-700 border-amber-500/20"
                            }`}>
                            🍕 2 Free Pizzas
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-[11px] font-sans mt-0.5 ${isSelected ? "text-white/50" : "text-[#040E21]/45"
                          }`}
                      >
                        {slot.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-baseline gap-px ${isSelected ? "text-white" : "text-[#040E21]"
                          }`}
                      >
                        <span
                          className={`text-sm font-bold leading-none ${isSelected ? "text-[#E5B83E]" : "text-[#040E21]/60"
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

          <div className="space-y-1.5 pb-1">
            <p className="text-center text-[10px] text-[#040E21]/40 font-sans">
              Prices are per room · Taxes included · Instant WhatsApp confirmation
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-amber-700 font-sans font-medium bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <span className="select-none">⚠️</span>
              <span><strong>Note:</strong> Booking confirmed only after advance payment.</span>
            </div>
          </div>
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
                    <span className="text-[#E5B83E] font-bold">
                      ₹{activeBookingSlot.price + getExtraGuestCharge(guests)}
                    </span>
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
                      {checkInTime && activeBookingSlot && (
                        <p className="text-[10px] text-[#040E21]/60 font-sans mt-1">
                          ⏰ Auto Check-Out:{" "}
                          <strong className="text-amber-600">
                            {(() => {
                              const calc = calculateCheckoutTime(checkInTime, activeBookingSlot.label);
                              return `${formatTimeTo12Hour(calc.time)}${calc.nextDay ? " (Next Day)" : ""}`;
                            })()}
                          </strong>
                        </p>
                      )}
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
                      <option value="5 Guests">5 Guests</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#040E21]/40 text-xs">
                      ▾
                    </div>
                  </div>
                  {getExtraGuestCharge(guests) > 0 && (
                    <p className="text-[10px] text-amber-600 font-sans font-medium mt-1">
                      * Extra guest charge: +₹{getExtraGuestCharge(guests)} (₹300/person above 2 guests)
                    </p>
                  )}
                </div>

                {/* Advance payment notice */}
                <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg">
                  <span className="text-amber-500 text-sm leading-none mt-px select-none">⚠️</span>
                  <p className="text-[11px] text-amber-800 font-sans font-medium leading-snug">
                    <strong>Note:</strong> Booking will be confirmed only after advance payment is received.
                  </p>
                </div>

                <div className="flex gap-2.5 pt-1">
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

// ─── Room Preview Lightbox Component ─────────────────────────────────────────
export function RoomPreviewModal({
  room,
  onClose,
}: {
  room: RoomData;
  onClose: () => void;
}) {
  const images = room.previewImages && room.previewImages.length > 0
    ? room.previewImages
    : [room.image];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Close Preview"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-4xl w-full flex flex-col items-center justify-center space-y-4">
        {/* Main image container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center bg-black">
          <img
            src={images[activeIndex]}
            alt={`${room.title} Preview ${activeIndex + 1}`}
            className="max-h-full max-w-full object-contain"
          />

          {/* Left Arrow */}
          {images.length > 1 && (
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-105 active:scale-95 transition-all select-none cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow */}
          {images.length > 1 && (
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-105 active:scale-95 transition-all select-none cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Image index counter badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 rounded-full text-white text-[11px] font-sans font-bold select-none">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {/* Room Title */}
        <div className="text-center text-white space-y-1">
          <h4 className="font-serif text-lg md:text-xl font-bold tracking-wide">{room.title} Preview</h4>
          <p className="text-xs text-white/50 font-sans">Use keyboard arrows to navigate</p>
        </div>

        {/* Thumbnails row */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 max-w-full overflow-x-auto py-2 px-4 scrollbar-none">
            {images.map((img, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-14 h-10 md:w-16 md:h-12 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${isActive ? "border-[#E5B83E] scale-105" : "border-transparent opacity-40 hover:opacity-80"
                    }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
