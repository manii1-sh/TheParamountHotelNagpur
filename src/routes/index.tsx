import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wifi,
  Car,
  MapPin,
  Shield,
  BedDouble,
  Star,
  Clock,
  ShieldCheck,
  BadgePercent,
  ArrowRight,
  ChevronDown,
  Calendar,
  X,
  AlertCircle,
  Zap,
  Smartphone,
  Users,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { HOTEL_PHONE } from "@/components/RoomModal";
import { RoomsSection } from "@/routes/rooms";
import { GalleryPeekStrip } from "@/routes/gallery";
import { AmenitiesSection } from "@/routes/amenities";
import { ReviewsSection } from "@/routes/reviews";
import { LocationSection } from "@/routes/location";
import { ContactSection } from "@/routes/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Paramount Hotel Nagpur — Luxury Hotel in Besa" },
      {
        name: "description",
        content:
          "Experience 5-star comfort at The Paramount Hotel near Besa, Nagpur Airport, and MIHAN. Book premium rooms directly via WhatsApp for the best prices.",
      },
      { property: "og:title", content: "The Paramount Hotel Nagpur — Luxury Hotel in Besa" },
      {
        property: "og:description",
        content:
          "Experience 5-star comfort at The Paramount Hotel near Besa, Nagpur Airport, and MIHAN. Book premium rooms directly via WhatsApp.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: Index,
});

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "🕐 Check-in & check-out times?",
    a: "Check-in is at 12:00 PM and check-out is at 11:00 AM.",
  },
  {
    q: "🚗 Is free parking available?",
    a: "Yes! Free parking is available for all our guests.",
  },
  {
    q: "✈️ Do you offer airport pickup?",
    a: "We don't offer airport pickup currently. However, the airport is just ~8 mins drive from the hotel.",
  },
  {
    q: "🍽️ Is room service available?",
    a: "Yes, room service is available 24/7. Just call the reception.",
  },
  {
    q: "📋 What amenities are included?",
    a: "Free Wi-Fi, Air Conditioning, LED/Smart TV, Hot Water, Room Service, Daily Housekeeping, Free Parking & 24/7 Reception.",
  },
  {
    q: "💑 Are couples welcome?",
    a: "Absolutely! Couples are warmly welcome at The Paramount Hotel.",
  },
  {
    q: "💳 What payment modes are accepted?",
    a: "We accept Cash, UPI, and all major Debit/Credit Cards.",
  },
];

function ConciergePanel({ onClose }: { onClose: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-72 md:w-80 bg-[#FDFBF7] border border-[#E5B83E]/35 rounded-md shadow-[0_15px_40px_rgba(0,0,0,0.15)] animate-scale-up text-[#040E21] max-h-[80vh] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-[#E5B83E]/20 px-5 pt-5 pb-3 shrink-0">
        <div className="space-y-1 text-left">
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E5B83E]">
            Paramount Concierge
          </span>
          <h4 className="font-serif text-sm font-bold text-[#040E21]">
            👋 Hello! How can we help you?
          </h4>
        </div>
        <button
          onClick={onClose}
          className="text-[#040E21]/60 hover:text-[#E5B83E] p-1 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* FAQ list — scrollable */}
      <div className="overflow-y-auto flex-1 px-5 py-4 space-y-2">


        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-sm border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-[#E5B83E]/50 bg-[#040E21]"
                  : "border-gray-200 bg-white hover:border-[#E5B83E]/40"
              }`}
            >
              {/* Question row */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full text-left px-3 py-2.5 flex items-center justify-between gap-2 cursor-pointer"
              >
                <span
                  className={`font-sans font-semibold text-xs leading-snug ${
                    isOpen ? "text-[#E5B83E]" : "text-[#040E21]"
                  }`}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#E5B83E]" : "text-[#040E21]/40"
                  }`}
                />
              </button>

              {/* Answer */}
              {isOpen && (
                <div className="px-3 pb-3">
                  <p className="text-xs text-white/70 font-sans leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5B83E]/15 px-5 py-3 shrink-0">
        <p className="text-[10px] text-[#040E21]/40 font-sans text-center">
          More questions?{" "}
          <a
            href={`tel:+919322520682`}
            className="text-[#E5B83E] font-bold hover:underline"
          >
            Call Reception
          </a>
        </p>
      </div>
    </div>
  );
}

function Index() {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Booking Form State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("Any Room Type");
  const [guests, setGuests] = useState("2 Guests");
  const [mobile, setMobile] = useState("");
  const [validationError, setValidationError] = useState("");

  const hotelPhoneNumber = HOTEL_PHONE;

  // Helper function to handle WhatsApp redirection for custom quick questions
  const openWhatsAppConcierge = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${hotelPhoneNumber}?text=${encoded}`, "_blank");
    setIsConciergeOpen(false);
  };

  // Quick Booking Form Submission Handler
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!checkIn || !checkOut || !mobile) {
      setValidationError("Please fill out all fields.");
      return;
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      setValidationError("Check-In date cannot be in the past.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setValidationError("Check-Out must be after Check-In.");
      return;
    }

    // Prepare WhatsApp Message
    const text = `Hello Paramount Hotel,

I would like to check room availability.
Check-In: ${checkIn}
Check-Out: ${checkOut}
Room Type: ${roomType}
Guests: ${guests}
Mobile Number: ${mobile}

Please share available room options.`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${hotelPhoneNumber}?text=${encodedText}`;

    // Reset Form & Drawers
    setIsDrawerOpen(false);

    // Redirect
    window.open(whatsappUrl, "_blank");
  };

  return (
    <SiteLayout>
      {/* 1. Cinematic Hero Section */}
      <section id="section-home" className="relative bg-[#040E21] text-white min-h-[600px] md:min-h-[700px] overflow-hidden border-b border-[#E5B83E]/20">

        {/* Background image — full section */}
        <div className="absolute inset-0">
          <img
            src="/hotel-firstpage.png"
            alt="The Paramount Hotel — Besa, Nagpur"
            className="w-full h-full object-cover object-center"
          />
          {/* Heavy left gradient so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#040E21] via-[#040E21]/85 to-[#040E21]/20" />
          {/* Bottom fade into next section */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040E21] to-transparent" />
          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#040E21] to-transparent" />
        </div>

        {/* Content on top of image */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-20 md:py-24">
          <div className="max-w-xl space-y-6 md:space-y-8 animate-slide-in-left">
            <div className="flex items-center gap-3">
              <span className="text-[#E5B83E] font-semibold text-xs tracking-[0.25em] uppercase font-sans">
                Welcome To
              </span>
              <span className="h-[1px] w-12 bg-[#E5B83E]"></span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.08] tracking-wide text-[#FAFAFA]">
              The Paramount <br />
              <span className="text-[#E5B83E]">Hotel</span>
            </h1>

            <p className="text-[#FAFAFA]/80 font-sans font-medium text-sm md:text-base leading-relaxed max-w-md">
              Comfortable Stays. Trusted Hospitality. <br />
              Your perfect stay in the heart of Nagpur.
            </p>

            {/* Amenities Quick Row */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 max-w-sm">
              <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
                <div className="w-10 h-10 rounded-full border border-[#E5B83E]/30 flex items-center justify-center text-[#E5B83E] transition-all duration-300 group-hover:bg-[#E5B83E]/10 group-hover:border-[#E5B83E]">
                  <Wifi className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#FAFAFA]/75 font-sans font-semibold">
                  Free WiFi
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
                <div className="w-10 h-10 rounded-full border border-[#E5B83E]/30 flex items-center justify-center text-[#E5B83E] transition-all duration-300 group-hover:bg-[#E5B83E]/10 group-hover:border-[#E5B83E]">
                  <Car className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#FAFAFA]/75 font-sans font-semibold">
                  Room Service
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
                <div className="w-10 h-10 rounded-full border border-[#E5B83E]/30 flex items-center justify-center text-[#E5B83E] transition-all duration-300 group-hover:bg-[#E5B83E]/10 group-hover:border-[#E5B83E]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#FAFAFA]/75 font-sans font-semibold">
                  Prime Loc
                </span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 group cursor-default">
                <div className="w-10 h-10 rounded-full border border-[#E5B83E]/30 flex items-center justify-center text-[#E5B83E] transition-all duration-300 group-hover:bg-[#E5B83E]/10 group-hover:border-[#E5B83E]">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#FAFAFA]/75 font-sans font-semibold">
                  Safe Stay
                </span>
              </div>
            </div>

            {/* Desktop Booking Widget Card — collapsible */}
            <div className="hidden lg:block max-w-xl">
              {/* Toggle Header — always visible */}
              <button
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="w-full bg-[#040E21] border border-[#E5B83E]/30 rounded-2xl px-6 py-4 flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:border-[#E5B83E]/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-[#E5B83E] fill-[#E5B83E] shrink-0" />
                  <div className="text-left">
                    <p className="font-serif font-bold text-white text-lg tracking-wide">
                      Book in 15 Seconds
                    </p>
                    <p className="text-white/70 font-sans text-sm">No forms. No login. Just WhatsApp.</p>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-[#E5B83E] transition-transform duration-300 ${isDrawerOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Collapsible form body */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isDrawerOpen ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-[#040E21] border border-[#E5B83E]/30 border-t-0 rounded-b-2xl px-6 pb-6 pt-4 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                  {validationError && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-200 text-xs rounded-xl">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <form
                    onSubmit={handleBookingSubmit}
                    className="bg-[#FDFBF7] rounded-xl p-4 space-y-3 shadow-sm border border-gray-100"
                  >
                    {/* Row 1: Check-In & Check-Out */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                          <Calendar className="w-3.5 h-3.5 text-[#040E21]/60" />
                          <span>Check-In</span>
                        </label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-lg py-1.5 px-2.5 text-xs font-semibold text-[#040E21] outline-none transition-all cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                          <Calendar className="w-3.5 h-3.5 text-[#040E21]/60" />
                          <span>Check-Out</span>
                        </label>
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          required
                          min={checkIn || new Date().toISOString().split("T")[0]}
                          className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-lg py-1.5 px-2.5 text-xs font-semibold text-[#040E21] outline-none transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Row 2: Room Type & Guests */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                          <BedDouble className="w-3.5 h-3.5 text-[#040E21]/60" />
                          <span>Room Type</span>
                        </label>
                        <div className="relative">
                          <select
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-1.5 pl-2.5 pr-8 text-xs font-semibold text-[#040E21] outline-none transition-all cursor-pointer appearance-none font-sans"
                          >
                            <option value="Any Room Type">Any Room</option>
                            <option value="Deluxe Room">Deluxe</option>
                            <option value="Executive Room">Executive</option>
                            <option value="Premium Room">Premium</option>
                            <option value="Family Room">Family</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#040E21]/50 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                          <Users className="w-3.5 h-3.5 text-[#040E21]/60" />
                          <span>Guests</span>
                        </label>
                        <div className="relative">
                          <select
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-1.5 pl-2.5 pr-8 text-xs font-semibold text-[#040E21] outline-none transition-all cursor-pointer appearance-none font-sans"
                          >
                            <option value="1 Guest">1 Guest</option>
                            <option value="2 Guests">2 Guests</option>
                            <option value="3 Guests">3 Guests</option>
                            <option value="4 Guests">4 Guests</option>
                            <option value="5+ Guests">5+ Guests</option>
                          </select>
                          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#040E21]/50 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Mobile */}
                    <div className="space-y-1">
                      <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                        <Smartphone className="w-3.5 h-3.5 text-[#040E21]/60" />
                        <span>Your Mobile Number</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-lg py-1.5 px-2.5 text-xs font-semibold text-[#040E21] placeholder:text-[#040E21]/30 outline-none transition-all"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#E5B83E] hover:bg-[#F2C953] text-[#040E21] font-bold text-xs rounded-lg transition-all duration-300 shadow-[0_3px_10px_rgba(229,184,62,0.15)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                    >
                      <svg className="w-4 h-4 fill-current text-[#040E21]" viewBox="0 0 24 24">
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z" />
                      </svg>
                      Send WhatsApp Request
                    </button>

                    <div className="flex items-center justify-center gap-1 pt-0.5 text-[#040E21]/60 font-sans font-semibold text-[10px] select-none">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>We'll confirm your booking on WhatsApp</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Simple CTAs for mobile fallback if widget is hidden */}
            <div className="flex lg:hidden flex-row gap-4 pt-2">
              <a
                href="/rooms"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E5B83E] text-[#040E21] font-bold text-xs uppercase tracking-widest rounded-sm w-full"
              >
                <BedDouble className="w-4 h-4" />
                Explore Rooms
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Primary Feature Ribbon (Navy Card Bar) */}
      <section className="relative -mt-6 z-10 px-6 max-w-7xl mx-auto">
        <div className="bg-[#040E21] border border-[#E5B83E]/30 rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.2)] py-6 px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-[#E5B83E]/20">
            {/* Item 1 */}
            <div className="flex items-center gap-4 px-4 py-2 sm:py-0">
              <MapPin className="w-8 h-8 text-[#E5B83E] shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#FAFAFA] tracking-wide">
                  Prime Besa Location
                </h4>
                <p className="text-xs text-[#FAFAFA]/75 mt-0.5">Heart of Nagpur</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0 sm:px-6">
              <Clock className="w-8 h-8 text-[#E5B83E] shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#FAFAFA] tracking-wide">
                  24/7 Reception
                </h4>
                <p className="text-xs text-[#FAFAFA]/75 mt-0.5">Always at your service</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0 lg:px-6">
              <ShieldCheck className="w-8 h-8 text-[#E5B83E] shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#FAFAFA] tracking-wide">
                  Safe & Hygienic
                </h4>
                <p className="text-xs text-[#FAFAFA]/75 mt-0.5">Your safety is our priority</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0 lg:px-6">
              <BadgePercent className="w-8 h-8 text-[#E5B83E] shrink-0" />
              <div>
                <h4 className="font-serif font-bold text-sm text-[#FAFAFA] tracking-wide">
                  Best Price Guarantee
                </h4>
                <p className="text-xs text-[#FAFAFA]/75 mt-0.5">Book direct & save more</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Secondary Trust Ribbon (Light Gold/Cream Bar Card) */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <div className="bg-[#FAF5EA] border border-[#E5B83E]/20 rounded-sm shadow-[0_6px_25px_rgba(229,184,62,0.06)] py-6 px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#E5B83E]/20">
            {/* Metric 1 */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 text-[#E5B83E] fill-[#E5B83E]" />
                <span className="font-serif font-bold text-base text-[#040E21]">178+</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#040E21]/70 font-bold">
                Google Reviews
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center justify-center space-y-1 pt-4 md:pt-0">
              <div className="flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-[#E5B83E]" />
                <span className="font-serif font-bold text-base text-[#040E21]">24/7</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#040E21]/70 font-bold">
                Reception
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center justify-center space-y-1 pt-4 md:pt-0">
              <div className="flex items-center gap-1.5">
                <Car className="w-5 h-5 text-[#E5B83E]" />
                <span className="font-serif font-bold text-base text-[#040E21]">Free</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#040E21]/70 font-bold">
                Parking
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center justify-center space-y-1 pt-4 md:pt-0">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-[#E5B83E]" />
                <span className="font-serif font-bold text-base text-[#040E21]">100%</span>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#040E21]/70 font-bold">
                Secure Stay
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rooms Section - Full room cards display */}
      <div id="section-rooms"><RoomsSection /></div>

      {/* 5. Gallery — compact peek strip */}
      <div id="section-gallery"><GalleryPeekStrip /></div>

      {/* 6. Amenities Section - Full amenities display */}
      <div id="section-amenities"><AmenitiesSection /></div>

      {/* 6. Reviews — dual marquee ticker */}
      <div id="section-reviews"><ReviewsSection /></div>

      {/* 7. Location preview */}
      <div id="section-location"><LocationSection /></div>

      {/* 8. Contact — quick actions + feedback form */}
      <div id="section-contact"><ContactSection /></div>

      {/* ========================================================================= */}
      {/* WhatsApp Concierge floating button & expanded panel */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
        {/* Mobile floating booking trigger */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="lg:hidden flex items-center justify-center gap-1.5 px-4 py-3 bg-[#E5B83E] hover:bg-[#F2C953] text-[#040E21] font-sans font-bold text-xs uppercase tracking-widest rounded-full shadow-[0_8px_25px_rgba(229,184,62,0.3)] animate-pulse-subtle"
        >
          <Calendar className="w-4 h-4" />⚡ Quick Booking
        </button>



        {/* Expandable Premium Concierge Panel */}
        {isConciergeOpen && (
          <ConciergePanel onClose={() => setIsConciergeOpen(false)} />
        )}

        {/* Circular Floating WhatsApp Button */}
        <button
          onClick={() => {
            setIsConciergeOpen(!isConciergeOpen);
          }}
          className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer"
          aria-label="Toggle WhatsApp Concierge panel"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z" />
          </svg>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* Mobile Experience: Slide-Up Booking Drawer Sheet */}
      {/* ========================================================================= */}
      {isDrawerOpen && (
        <>
          {/* Backdrop mask */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm transition-opacity animate-fade-in"
          ></div>

          {/* Bottom Sheet Drawer */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#040E21] border-t border-[#E5B83E]/30 rounded-t-2xl z-50 p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-[0_-8px_30px_rgba(0,0,0,0.5)] animate-slide-up">
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-[#FAFAFA]/20 rounded-full mx-auto mb-2"></div>

            <div className="flex items-start justify-between border-b border-[#E5B83E]/10 pb-3">
              <div className="space-y-1 text-left">
                <h4 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#E5B83E] fill-[#E5B83E]" /> Book in 15 Seconds
                </h4>
                <p className="text-white/80 font-sans font-medium text-xs">
                  No forms. No login. Just WhatsApp.
                </p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-white/60 hover:text-white p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {validationError && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-200 text-xs rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <form
              onSubmit={handleBookingSubmit}
              className="bg-[#FDFBF7] rounded-xl p-4 space-y-3.5 shadow-sm border border-gray-100 text-left"
            >
              {/* Row 1: Check-In & Check-Out */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                    <Calendar className="w-3.5 h-3.5 text-[#040E21]/60" />
                    <span>Check-In</span>
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-1.5 px-2.5 text-xs font-semibold text-[#040E21] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                    <Calendar className="w-3.5 h-3.5 text-[#040E21]/60" />
                    <span>Check-Out</span>
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-1.5 px-2.5 text-xs font-semibold text-[#040E21] outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Room Type & Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                    <BedDouble className="w-3.5 h-3.5 text-[#040E21]/60" />
                    <span>Room Type</span>
                  </label>
                  <div className="relative">
                    <select
                      value={roomType}
                      onChange={(e) => setRoomType(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-1.5 pl-2.5 pr-8 text-xs font-semibold text-[#040E21] outline-none appearance-none font-sans cursor-pointer"
                    >
                      <option value="Any Room Type">Any Room</option>
                      <option value="Deluxe Room">Deluxe</option>
                      <option value="Executive Room">Executive</option>
                      <option value="Premium Room">Premium</option>
                      <option value="Family Room">Family</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#040E21]/50 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                    <Users className="w-3.5 h-3.5 text-[#040E21]/60" />
                    <span>Guests</span>
                  </label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-1.5 pl-2.5 pr-8 text-xs font-semibold text-[#040E21] outline-none appearance-none font-sans cursor-pointer"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="5+ Guests">5+ Guests</option>
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#040E21]/50 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 3: Mobile Number */}
              <div className="space-y-1">
                <label className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#040E21]/80 select-none">
                  <Smartphone className="w-3.5 h-3.5 text-[#040E21]/60" />
                  <span>Your Mobile Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] rounded-lg py-1.5 px-2.5 text-xs font-semibold text-[#040E21] placeholder:text-[#040E21]/30 outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#E5B83E] hover:bg-[#F2C953] text-[#040E21] font-bold text-xs rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer mt-2 shadow-[0_3px_10px_rgba(229,184,62,0.15)]"
              >
                <svg className="w-4 h-4 fill-current text-[#040E21]" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z" />
                </svg>
                Send WhatsApp Request
              </button>

              {/* Footnote */}
              <div className="flex items-center justify-center gap-1 pt-0.5 text-[#040E21]/60 font-sans font-semibold text-[10px] select-none">
                <ShieldCheck className="w-3.5 h-3.5 text-[#040E21]/60 shrink-0" />
                <span>We'll confirm your booking on WhatsApp</span>
              </div>
            </form>
          </div>
        </>
      )}
    </SiteLayout>
  );
}
