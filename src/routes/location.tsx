import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  MapPin,
  Navigation,
  Phone,
  Car,
  PlaneLanding,
  Building2,
  TrainFront,
  Trophy,
  Waves,
  ShieldCheck,
  Headphones,
  BadgePercent,
  CircleParking,
} from "lucide-react";
import { HOTEL_PHONE } from "@/components/RoomModal";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — The Paramount Hotel Nagpur" },
      {
        name: "description",
        content:
          "Find us at Plot No. 30, Beltarodi Road, Besa, Nagpur. Close to Nagpur Airport, AIIMS, MIHAN and key landmarks.",
      },
      { property: "og:title", content: "Location — The Paramount Hotel Nagpur" },
    ],
  }),
  component: LocationPage,
});

const MAPS_URL = "https://maps.app.goo.gl/NpaQVNQ1PWpgPg228";

const EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.2570075591386!2d79.0838848!3d21.1022834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4bd2853243171%3A0xc3466ae41fa16db3!2sThe%20Paramount%20Hotel!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin";

const NEARBY = [
  { icon: PlaneLanding, label: "Dr. Babasaheb Ambedkar International Airport", km: "3.9 KM", drive: "8 Mins Drive" },
  { icon: Building2,    label: "AIIMS Nagpur",     km: "6.5 KM",  drive: "12 Mins Drive" },
  { icon: Building2,    label: "MIHAN",             km: "7.2 KM",  drive: "14 Mins Drive" },
  { icon: TrainFront,   label: "Metro Station",     km: "6.0 KM",  drive: "10 Mins Drive" },
  { icon: Trophy,       label: "VCA Stadium",       km: "10 KM",   drive: "15 Mins Drive" },
  { icon: Waves,        label: "Ambazari Lake",     km: "8.2 KM",  drive: "15 Mins Drive" },
];

const FEATURES = [
  { icon: Car,           title: "Easy Access",     desc: "Well connected to major highways and city centres for a smooth journey." },
  { icon: CircleParking, title: "Free Parking",    desc: "Spacious and secure parking available for all our guests." },
  { icon: PlaneLanding,  title: "Airport Pickup",  desc: "Hassle-free airport transfers available on request." },
  { icon: MapPin,        title: "Prime Location",  desc: "Stay close to business hubs, hospitals, attractions and transport." },
];

const TRUST = [
  { icon: MapPin,        title: "Prime Besa Location", desc: "Heart of Nagpur" },
  { icon: ShieldCheck,   title: "Safe & Secure Area",  desc: "Peace of mind for you and your family" },
  { icon: Headphones,    title: "24/7 Guest Support",  desc: "We're always here whenever you need" },
  { icon: BadgePercent,  title: "Best Price Guarantee",desc: "Book direct & save more" },
];

function LocationPage() {
  return (
    <SiteLayout>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-[#FDFBF7] border-b border-[#E5B83E]/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

          {/* LEFT */}
          <div className="flex flex-col justify-center px-8 md:px-14 py-16 space-y-7">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
              Our Location
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#040E21] leading-[1.1]">
              Find Us In The<br />
              Heart Of{" "}
              <span className="text-[#E5B83E] italic">Nagpur</span>
            </h1>

            <div className="w-12 h-[3px] bg-[#E5B83E] rounded-full" />

            <p className="text-[#040E21]/65 font-sans text-base md:text-lg leading-relaxed max-w-md">
              The Paramount Hotel is perfectly located in Besa,
              close to the airport, business hubs, hospitals,
              and major attractions.
            </p>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#E5B83E] mt-0.5 shrink-0" />
              <p className="text-sm text-[#040E21]/60 font-sans leading-relaxed">
                Plot No. 30, Beltarodi Road, Manish Nagar,<br />
                Behind Raghav Stone, Nagpur, Maharashtra – 440037
              </p>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#040E21] hover:bg-[#E5B83E] text-white hover:text-[#040E21] font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(4,14,33,0.15)] hover:shadow-[0_4px_20px_rgba(229,184,62,0.3)] group"
            >
              <Navigation className="w-4 h-4 text-[#E5B83E] group-hover:text-[#040E21] transition-colors duration-300" />
              Get Directions
            </a>
          </div>

          {/* RIGHT — hotel photo */}
          <div className="relative min-h-[340px] lg:min-h-[520px] overflow-hidden">
            <img
              src="/hotel-exterior.png"
              alt="The Paramount Hotel, Besa Nagpur"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* All-direction fades to blend into cream bg */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FDFBF7] to-transparent" />
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#FDFBF7] to-transparent" />
            {/* left blend into text column */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── 2. NEARBY PLACES ────────────────────────────────────────────── */}
      <section className="bg-[#FDFBF7] py-16 px-6 border-b border-[#E5B83E]/15">
        <div className="max-w-5xl mx-auto space-y-10">

          <div className="text-center space-y-2">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
              Everything Close To You
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#040E21]">
              Nearby Places &amp; Key Destinations
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {NEARBY.map(({ icon: Icon, label, km, drive }) => (
              <div
                key={label}
                className="group flex flex-col items-center text-center gap-4 p-5 bg-white border border-[#E5B83E]/15 rounded-sm hover:border-[#E5B83E]/50 hover:shadow-[0_4px_24px_rgba(229,184,62,0.12)] transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 rounded-full border border-[#E5B83E]/25 flex items-center justify-center group-hover:border-[#E5B83E]/60 group-hover:bg-[#E5B83E]/6 transition-all duration-300 shrink-0">
                  <Icon className="w-6 h-6 text-[#E5B83E]" />
                </div>
                <p className="font-sans text-sm font-semibold text-[#040E21] leading-snug">
                  {label}
                </p>
                <div className="space-y-0.5 mt-auto">
                  <p className="font-serif font-bold text-base text-[#E5B83E]">{km}</p>
                  <p className="text-xs text-[#040E21]/45 font-sans uppercase tracking-wide">{drive}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. MAP + FEATURES SPLIT ─────────────────────────────────────── */}
      <section className="bg-[#FDFBF7] py-16 px-6 border-b border-[#E5B83E]/15">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Map */}
          <div className="relative rounded-sm overflow-hidden border border-[#E5B83E]/20 shadow-[0_8px_40px_rgba(4,14,33,0.1)] h-[420px] lg:h-[460px]">
            <iframe
              src={EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="The Paramount Hotel Map"
            />
            {/* "Open in Maps" pill — top-left, matches Google Maps style */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-[#dadce0] rounded-sm px-3 py-1.5 text-xs font-semibold text-[#1a73e8] shadow-md transition-all duration-200"
            >
              <Navigation className="w-3.5 h-3.5" />
              Open in Maps
            </a>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
                Getting Here Is Easy
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#040E21] leading-tight">
                Well Connected.<br />
                <span className="text-[#E5B83E]">Easy To Reach.</span>
              </h2>
            </div>

            <div className="space-y-6">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-sm border border-[#E5B83E]/20 bg-[#E5B83E]/5 flex items-center justify-center shrink-0 group-hover:border-[#E5B83E]/50 group-hover:bg-[#E5B83E]/10 transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#E5B83E]" />
                  </div>
                  <div className="pt-1">
                    <p className="font-serif font-bold text-base text-[#040E21]">{title}</p>
                    <p className="text-sm text-[#040E21]/55 font-sans mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. DIRECTIONS CTA BAR ───────────────────────────────────────── */}
      <section className="bg-[#040E21] border-b border-[#E5B83E]/20 px-6 py-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
              Need Directions?
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
              We're Here To Help You Reach Us
            </h3>
            <p className="text-white/50 font-sans text-sm">
              Click the button to get the best route or contact us for any assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E5B83E] hover:bg-[#F2C953] text-[#040E21] font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300 shadow-[0_4px_15px_rgba(229,184,62,0.3)] whitespace-nowrap"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
            <a
              href={`tel:+${HOTEL_PHONE}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#E5B83E]/50 hover:border-[#E5B83E] text-[#E5B83E] hover:bg-[#E5B83E]/10 font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* ── 5. TRUST STRIP ──────────────────────────────────────────────── */}
      <section className="bg-[#FDFBF7] px-6 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-[#E5B83E]/15">
          {TRUST.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 md:px-6 first:pl-0 last:pr-0">
              <Icon className="w-6 h-6 text-[#E5B83E] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif font-bold text-base text-[#040E21]">{title}</p>
                <p className="text-sm text-[#040E21]/50 font-sans mt-0.5 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </SiteLayout>
  );
}

// ─── Exported preview for home page ─────────────────────────────────────────
export function LocationSection() {
  return (
    <section className="bg-[#FDFBF7] py-16 px-6 border-t border-[#E5B83E]/15">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
            Our Location
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#040E21]">
            Find Us In The Heart Of{" "}
            <span className="text-[#E5B83E] italic">Nagpur</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="w-16 h-[1px] bg-[#E5B83E]/40"></span>
            <div className="w-2.5 h-2.5 bg-[#E5B83E] rotate-45"></div>
            <span className="w-16 h-[1px] bg-[#E5B83E]/40"></span>
          </div>
          <p className="text-[#040E21]/60 font-sans text-base max-w-md mx-auto">
            Plot No. 30, Beltarodi Road, Manish Nagar, Besa, Nagpur — 440037
          </p>
        </div>

        {/* Map + nearby split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Map */}
          <div className="relative rounded-sm overflow-hidden border border-[#E5B83E]/20 shadow-[0_8px_30px_rgba(4,14,33,0.08)] h-[400px]">
            <iframe
              src={EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="The Paramount Hotel Location"
            />
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-[#dadce0] rounded-sm px-3 py-1.5 text-xs font-semibold text-[#1a73e8] shadow-md transition-all duration-200"
            >
              <Navigation className="w-3.5 h-3.5" />
              Open in Maps
            </a>
          </div>

          {/* Nearby landmarks */}
          <div className="space-y-1">
            <p className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#E5B83E]/70 mb-4">
              Nearby Landmarks
            </p>
            {NEARBY.map(({ icon: Icon, label, km, drive }) => (
              <div
                key={label}
                className="flex items-center gap-4 py-4 border-b border-[#E5B83E]/10 hover:border-[#E5B83E]/35 group transition-all duration-200 cursor-default hover:pl-1"
              >
                <div className="w-10 h-10 rounded-full border border-[#E5B83E]/25 flex items-center justify-center shrink-0 group-hover:border-[#E5B83E]/60 group-hover:bg-[#E5B83E]/6 transition-all duration-200">
                  <Icon className="w-5 h-5 text-[#E5B83E]" />
                </div>
                <p className="font-serif font-bold text-base md:text-lg text-[#040E21] flex-1 leading-snug group-hover:text-[#E5B83E] transition-colors duration-200">
                  {label}
                </p>
                <div className="text-right shrink-0">
                  <p className="font-serif font-bold text-xl text-[#E5B83E]">{km}</p>
                  <p className="text-xs text-[#040E21]/45 font-sans uppercase tracking-wide mt-0.5">{drive}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#040E21] hover:bg-[#E5B83E] text-white hover:text-[#040E21] font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300 group"
          >
            <Navigation className="w-4 h-4 text-[#E5B83E] group-hover:text-[#040E21] transition-colors" />
            Get Directions
          </a>
          <a
            href="/location"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#E5B83E]/50 hover:border-[#E5B83E] text-[#E5B83E] hover:bg-[#E5B83E]/10 font-bold text-sm uppercase tracking-widest rounded-sm transition-all duration-300"
          >
            View Full Location Page
          </a>
        </div>

      </div>
    </section>
  );
}
