import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import { HOTEL_PHONE } from "@/components/RoomModal";

const INSTAGRAM_URL = "https://www.instagram.com/the_paramount_hotel_ngp/";

const OCCASIONS = [
  { value: "Birthday 🎂", label: "Birthday 🎂" },
  { value: "Anniversary 💍", label: "Anniversary 💍" },
  { value: "Honeymoon 🌹", label: "Honeymoon 🌹" },
  { value: "Proposal 💐", label: "Proposal 💐" },
  { value: "Business Stay 💼", label: "Business Stay 💼" },
  { value: "Other 🎉", label: "Other 🎉" },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — The Paramount Hotel Nagpur" },
      {
        name: "description",
        content:
          "Get in touch with The Paramount Hotel, Besa, Nagpur. Call, WhatsApp, or visit us at Plot No. 30, Beltarodi Road.",
      },
      { property: "og:title", content: "Contact — The Paramount Hotel Nagpur" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const whatsappGeneral = `https://wa.me/${HOTEL_PHONE}?text=${encodeURIComponent(
    "Hello The Paramount Hotel, I have an enquiry.",
  )}`;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [occasion, setOccasion] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !occasion || !request) return;
    const text = `Hello The Paramount Hotel,\n\nI'd like to make a Special Request 🎉\n\n👤 Name: ${name}\n📞 Mobile: ${mobile}\n🎊 Occasion: ${occasion}${checkIn ? `\n📅 Check-in Date: ${checkIn}` : ""}\n\n💌 Special Request:\n${request}\n\nPlease help make it unforgettable!`;
    window.open(`https://wa.me/${HOTEL_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false); setName(""); setMobile(""); setOccasion(""); setCheckIn(""); setRequest("");
  };

  return (
    <SiteLayout>

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="bg-[#040E21] py-20 px-6 border-b border-[#E5B83E]/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-[#E5B83E]">
            We're Always Here For You
          </span>

          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight">
              Get In Touch
            </h1>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="w-16 h-[1px] bg-[#E5B83E]/30"></span>
              <div className="w-2 h-2 bg-[#E5B83E] rotate-45"></div>
              <span className="w-16 h-[1px] bg-[#E5B83E]/30"></span>
            </div>
          </div>

          <p className="text-white/60 font-sans text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Reach us instantly via call, WhatsApp, or follow us on Instagram for updates and offers.
          </p>

          {/* 3 Quick-action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">

            {/* Call */}
            <a
              href="tel:+918889977988"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-[#E5B83E]/20 hover:border-[#E5B83E]/60 hover:bg-[#E5B83E]/8 rounded-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(229,184,62,0.1)]"
            >
              <div className="w-8 h-8 rounded-full border border-[#E5B83E]/30 flex items-center justify-center group-hover:border-[#E5B83E]/60 transition-colors shrink-0">
                <Phone className="w-4 h-4 text-[#E5B83E]" />
              </div>
              <div className="text-left">
                <p className="font-serif font-bold text-white text-sm tracking-wide">Call Reception</p>
                <p className="text-[11px] text-white/40 font-sans">+91 88899 77988</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#E5B83E] shadow-[0_0_6px_#E5B83E] ml-1 shrink-0"></span>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-[#25D366]/20 hover:border-[#25D366]/60 hover:bg-[#25D366]/8 rounded-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(37,211,102,0.1)]"
            >
              <div className="w-8 h-8 rounded-full border border-[#25D366]/30 flex items-center justify-center group-hover:border-[#25D366]/60 transition-colors shrink-0">
                <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-serif font-bold text-white text-sm tracking-wide">WhatsApp Us</p>
                <p className="text-[11px] text-white/40 font-sans">Reply within minutes</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_6px_#25D366] ml-1 shrink-0"></span>
            </a>

            {/* Instagram */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-pink-400/40 hover:bg-pink-500/5 rounded-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(238,42,123,0.08)]"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 bg-gradient-to-br from-[#f9ce34]/20 via-[#ee2a7b]/20 to-[#6228d7]/20">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="ig-hero" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f9ce34" />
                      <stop offset="50%" stopColor="#ee2a7b" />
                      <stop offset="100%" stopColor="#6228d7" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig-hero)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-serif font-bold text-white text-sm tracking-wide">Instagram</p>
                <p className="text-[11px] text-white/40 font-sans">@the_paramount_hotel_ngp</p>
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: SPECIAL REQUEST FORM ─────────────────────────── */}
      <section className="bg-[#FDFBF7] py-16 px-6 border-b border-[#E5B83E]/15">
        <div className="max-w-2xl mx-auto space-y-8">

          <div className="text-center space-y-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
              Make It Memorable
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#040E21]">
              Planning Something Special?
            </h2>
            <p className="text-[#040E21]/55 font-sans text-sm max-w-sm mx-auto">
              Birthday · Anniversary · Proposal · Celebration — tell us and we'll make it unforgettable.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-14 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#E5B83E]/10 border border-[#E5B83E]/30 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-[#E5B83E]" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#040E21]">We'll Make It Special! 🌟</h3>
              <p className="text-[#040E21]/55 font-sans text-sm">Our team will get back to you on WhatsApp shortly.</p>
              <button onClick={resetForm} className="text-xs font-bold text-[#E5B83E] uppercase tracking-wider hover:text-[#F2C953] transition-colors">
                Send Another Request →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                    Your Name <span className="text-[#E5B83E]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] placeholder:text-[#040E21]/30 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                    Mobile <span className="text-[#E5B83E]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] placeholder:text-[#040E21]/30 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                    Occasion <span className="text-[#E5B83E]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      required
                      className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select occasion...</option>
                      {OCCASIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#040E21]/40">▾</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                    Check-in Date <span className="text-[#040E21]/30">(optional)</span>
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] outline-none transition-all cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-bold text-[#040E21]/60 font-sans">
                  Special Request <span className="text-[#E5B83E]">*</span>
                </label>
                <textarea
                  placeholder="Tell us what you'd like arranged — cake, decoration, flowers, surprise setup, room preferences..."
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  required
                  rows={4}
                  className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] placeholder:text-[#040E21]/30 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!name || !mobile || !occasion || !request}
                className="w-full py-4 bg-[#E5B83E] hover:bg-[#F2C953] disabled:opacity-40 disabled:cursor-not-allowed text-[#040E21] font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(229,184,62,0.2)] hover:shadow-[0_6px_20px_rgba(229,184,62,0.3)]"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z" />
                </svg>
                Send My Special Request via WhatsApp 💌
              </button>
              <p className="text-center text-[10px] text-[#040E21]/35 font-sans">
                This will open WhatsApp with your request pre-filled
              </p>
            </form>
          )}
        </div>
      </section>

    </SiteLayout>
  );
}

export function ContactSection() {
  const whatsappGeneral = `https://wa.me/${HOTEL_PHONE}?text=${encodeURIComponent(
    "Hello The Paramount Hotel, I have an enquiry.",
  )}`;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [occasion, setOccasion] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !occasion || !request) return;
    const text = `Hello The Paramount Hotel,\n\nI'd like to make a Special Request 🎉\n\n👤 Name: ${name}\n📞 Mobile: ${mobile}\n🎊 Occasion: ${occasion}${checkIn ? `\n📅 Check-in Date: ${checkIn}` : ""}\n\n� Special Request:\n${request}\n\nPlease help make it unforgettable!`;
    window.open(`https://wa.me/${HOTEL_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false); setName(""); setMobile(""); setOccasion(""); setCheckIn(""); setRequest("");
  };

  return (
    <section className="bg-[#040E21] py-16 px-6 border-t border-[#E5B83E]/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT — contact heading + quick actions */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.3em] text-[#E5B83E]">
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Get In Touch
            </h2>
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-[#E5B83E]"></span>
              <span className="text-white/40 font-sans text-xs tracking-wider">WE'RE ALWAYS HERE</span>
            </div>
            <p className="text-white/55 font-sans text-base leading-relaxed max-w-sm">
              Reach us instantly via call or WhatsApp. Our front desk is open 24/7.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="tel:+918889977988"
              className="group inline-flex items-center gap-4 px-6 py-4 bg-white/5 border border-[#E5B83E]/20 hover:border-[#E5B83E]/60 hover:bg-[#E5B83E]/8 rounded-sm transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full border border-[#E5B83E]/30 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#E5B83E]" />
              </div>
              <div>
                <p className="font-serif font-bold text-white text-sm">Call Reception</p>
                <p className="text-[11px] text-white/40 font-sans">+91 88899 77988 · 24/7</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#E5B83E] shadow-[0_0_5px_#E5B83E] ml-auto shrink-0"></span>
            </a>

            <a
              href={whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-6 py-4 bg-white/5 border border-[#25D366]/20 hover:border-[#25D366]/60 hover:bg-[#25D366]/8 rounded-sm transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full border border-[#25D366]/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z" />
                </svg>
              </div>
              <div>
                <p className="font-serif font-bold text-white text-sm">WhatsApp Us</p>
                <p className="text-[11px] text-white/40 font-sans">Reply within minutes</p>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#25D366] shadow-[0_0_5px_#25D366] ml-auto shrink-0"></span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 hover:border-pink-400/40 rounded-sm transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-[#f9ce34]/20 via-[#ee2a7b]/20 to-[#6228d7]/20 border border-white/20">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="ig-cs" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f9ce34" />
                      <stop offset="50%" stopColor="#ee2a7b" />
                      <stop offset="100%" stopColor="#6228d7" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig-cs)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <p className="font-serif font-bold text-white text-sm">Instagram</p>
                <p className="text-[11px] text-white/40 font-sans">@the_paramount_hotel_ngp</p>
              </div>
            </a>
          </div>
        </div>

        {/* RIGHT — special request form, cream bg */}
        <div className="bg-[#FDFBF7] border border-[#E5B83E]/20 rounded-sm p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
          <div className="space-y-1 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#E5B83E]" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#E5B83E]">Make It Memorable</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-[#040E21]">Planning Something Special?</h3>
            <p className="text-[#040E21]/50 font-sans text-xs leading-relaxed">
              Birthday · Anniversary · Proposal · Celebration — tell us and we'll make it unforgettable.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E5B83E]/10 border border-[#E5B83E]/30 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5 text-[#E5B83E]" />
              </div>
              <p className="font-serif font-bold text-[#040E21] text-lg">We'll Make It Special! 🌟</p>
              <p className="text-[#040E21]/50 font-sans text-sm">Our team will reach you on WhatsApp shortly.</p>
              <button onClick={resetForm} className="text-xs font-bold text-[#E5B83E] uppercase tracking-wider hover:text-[#F2C953] transition-colors">
                Send Another Request →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] placeholder:text-[#040E21]/35 outline-none transition-all"
                />
                <input
                  type="tel"
                  placeholder="Mobile *"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  className="bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] placeholder:text-[#040E21]/35 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    required
                    className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Occasion *</option>
                    {OCCASIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#040E21]/40 text-xs">▾</div>
                </div>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] outline-none transition-all cursor-pointer"
                />
              </div>

              <textarea
                placeholder="Tell us what you'd like — cake, decoration, flowers, surprise setup..."
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                required
                rows={3}
                className="w-full bg-white border border-[#E2E8F0] focus:border-[#E5B83E] focus:ring-1 focus:ring-[#E5B83E] rounded-sm px-4 py-3 text-sm font-sans text-[#040E21] placeholder:text-[#040E21]/35 outline-none transition-all resize-none"
              />

              <button
                type="submit"
                disabled={!name || !mobile || !occasion || !request}
                className="w-full py-3.5 bg-[#E5B83E] hover:bg-[#F2C953] disabled:opacity-40 disabled:cursor-not-allowed text-[#040E21] font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(229,184,62,0.2)]"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z" />
                </svg>
                Send My Special Request 💌
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
