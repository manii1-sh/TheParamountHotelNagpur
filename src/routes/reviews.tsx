import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Star, Quote } from "lucide-react";
import { HOTEL_PHONE } from "@/components/RoomModal";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Guest Reviews — The Paramount Hotel Nagpur" },
      {
        name: "description",
        content:
          "Read what our guests say about The Paramount Hotel, Besa, Nagpur. 178+ Google reviews.",
      },
      { property: "og:title", content: "Guest Reviews — The Paramount Hotel Nagpur" },
    ],
  }),
  component: ReviewsPage,
});

// ─── Review data ─────────────────────────────────────────────────────────────
export const REVIEWS = [
  {
    name: "charmingchakri guptha",
    initial: "C",
    date: "Google Review",
    rating: 5,
    text: "Great stay with strict policies. We stayed at this hotel twice in a week — once while heading to Maha Kumbh. Highly recommend.",
    tag: "Repeat Guest",
  },
  {
    name: "AMAN RAUT",
    initial: "A",
    date: "Google Review",
    rating: 4,
    text: "In Manish Nagar, you can call the owner before visiting for charges and availability. Cloud kitchen service is there till 11 PM — you can order food on call. Fridge and water bottle available at reception too.",
    tag: "Local Guide",
  },
  {
    name: "Naved Akhter",
    initial: "N",
    date: "Google Review",
    rating: 5,
    text: "The staff was very polite and helpful. Room service was prompt, and every request was handled professionally. The check-out process was also hassle-free.",
    tag: "Verified Stay",
  },
  {
    name: "Devendra Thakur",
    initial: "D",
    date: "Google Review",
    rating: 5,
    text: "Nice, clean and hygienic rooms. The amount you pay is worth it. I would recommend getting an offline booking done rather than online. Pretty good staff too.",
    tag: "Verified Stay",
  },
  {
    name: "Pragya Gangber",
    initial: "P",
    date: "Google Review",
    rating: 5,
    text: "Very well arranged and clean rooms. You get a good view during the day and a sky full of stars at night. The food they serve is hot and tasty.",
    tag: "Leisure Stay",
  },
  {
    name: "Abhijith V",
    initial: "A",
    date: "Google Review",
    rating: 5,
    text: "Very well maintained rooms. Service boys are polite. Sahil is a super host here — he will be there to assist you anytime. Thanks to Sahil!",
    tag: "Verified Stay",
  },
  {
    name: "Auchit Sawai",
    initial: "A",
    date: "Google Review",
    rating: 5,
    text: "Best for a night stay or 3–4 hour stay. Rooms are great and people are good to talk to. Location is also great with parking.",
    tag: "Local Guide",
  },
  {
    name: "Manjunath Sindhe",
    initial: "M",
    date: "Google Review",
    rating: 5,
    text: "Hotel atmosphere is very good, main road approach is also good. Housekeeping and service providers communication is very appreciable. Do visit for a good experience.",
    tag: "Verified Stay",
  },
  {
    name: "Sanjay Ahirwar",
    initial: "S",
    date: "Google Review",
    rating: 5,
    text: "Hotel staff was very friendly. Loved the service of the hotel, especially the rooms — they were tidy and clean.",
    tag: "Verified Stay",
  },
  {
    name: "MR GUJJAR",
    initial: "M",
    date: "Google Review",
    rating: 5,
    text: "Very good and fantastic service here. Love from Jharkhand to Hotel Paramount!",
    tag: "Verified Stay",
  },
  {
    name: "Mrunali Lokhande",
    initial: "M",
    date: "Google Review",
    rating: 5,
    text: "Rooms were very clean and the staff was very polite and helpful towards the customer. The service was very good.",
    tag: "Verified Stay",
  },
  {
    name: "Akash Khodke",
    initial: "A",
    date: "Google Review",
    rating: 5,
    text: "Clean rooms, comfortable check-in and good service too.",
    tag: "Verified Stay",
  },
  {
    name: "Yash Laxane",
    initial: "Y",
    date: "Google Review",
    rating: 5,
    text: "Clean rooms and service is also pretty good. Very polite towards the customers.",
    tag: "Verified Stay",
  },
  {
    name: "Ankit Keshri",
    initial: "A",
    date: "Google Review",
    rating: 5,
    text: "Best for a night stay. Rooms are great and people are good to talk to. Location is also great with parking.",
    tag: "Local Guide",
  },
  {
    name: "Gaurav Sinha",
    initial: "G",
    date: "Google Review",
    rating: 4,
    text: "Small hotel in a residential area. Good for individual or business travellers. Near highway and restaurants. Rooms are budget-friendly — inspect before checking in.",
    tag: "Local Guide",
  },
  {
    name: "Kumar Dev",
    initial: "K",
    date: "Google Review",
    rating: 4,
    text: "Good stay and fantastic experience. Staff behaviour is good.",
    tag: "Verified Stay",
  },
  {
    name: "Saikiran Reddy",
    initial: "S",
    date: "Google Review",
    rating: 3,
    text: "Good place and quite relaxing. Price is competitive.",
    tag: "Verified Stay",
  },
  {
    name: "Surbhi Singh",
    initial: "S",
    date: "Google Review",
    rating: 5,
    text: "Good service and good parking facilities.",
    tag: "Verified Stay",
  },
  {
    name: "nalini singh",
    initial: "N",
    date: "Google Review",
    rating: 5,
    text: "Much better rooms at a reasonable price.",
    tag: "Local Guide",
  },
  {
    name: "ASmart Auto Service",
    initial: "A",
    date: "Google Review",
    rating: 5,
    text: "Fast check-in. No waiting time, which was great.",
    tag: "Verified Stay",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Single review card used in the marquee
function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div className="flex-shrink-0 w-72 md:w-80 bg-white border border-[#E5B83E]/20 rounded-xl p-5 space-y-3 shadow-[0_4px_20px_rgba(4,14,33,0.06)] hover:border-[#E5B83E]/50 hover:shadow-[0_8px_30px_rgba(4,14,33,0.1)] transition-all duration-300 mx-3">
      {/* Top row: quote icon + stars */}
      <div className="flex items-start justify-between">
        <Quote className="w-5 h-5 text-[#E5B83E]/40 shrink-0" />
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-3 h-3 ${
                s <= review.rating ? "text-[#E5B83E] fill-[#E5B83E]" : "text-gray-200 fill-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Review text */}
      <p className="text-sm text-[#040E21]/70 font-sans leading-relaxed line-clamp-3">
        "{review.text}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-2.5">
          {/* Avatar initial */}
          <div className="w-7 h-7 rounded-full bg-[#040E21] flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-[#E5B83E] font-sans">
              {review.initial}
            </span>
          </div>
          <div>
            <p className="font-serif font-bold text-xs text-[#040E21] leading-tight">{review.name}</p>
            <p className="text-[10px] text-[#040E21]/40 font-sans">{review.date}</p>
          </div>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#E5B83E]/10 text-[#E5B83E] rounded-full border border-[#E5B83E]/20 whitespace-nowrap">
          {review.tag}
        </span>
      </div>
    </div>
  );
}

// ─── Exported marquee section (used in index.tsx too) ────────────────────────
export function ReviewsSection() {
  // Duplicate arrays so the marquee loops seamlessly
  const row1 = [...REVIEWS.slice(0, 10), ...REVIEWS.slice(0, 10)];
  const row2 = [...REVIEWS.slice(10), ...REVIEWS.slice(10)];

  return (
    <section className="bg-[#FDFBF7] py-16 overflow-hidden border-t border-b border-[#E5B83E]/20">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 text-center space-y-3 mb-12">
        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
          Guest Reviews
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#040E21]">
          Loved By Our Guests
        </h2>
        <div className="flex items-center justify-center gap-3">
          <span className="w-16 h-[1px] bg-[#E5B83E]/40"></span>
          <div className="w-2.5 h-2.5 bg-[#E5B83E] rotate-45"></div>
          <span className="w-16 h-[1px] bg-[#E5B83E]/40"></span>
        </div>

        {/* Rating summary pill */}
        <div className="inline-flex items-center gap-3 mt-2 px-5 py-2.5 bg-[#040E21]/5 border border-[#E5B83E]/25 rounded-full">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-4 h-4 text-[#E5B83E] fill-[#E5B83E]" />
            ))}
          </div>
          <span className="font-serif font-bold text-[#040E21] text-base">4.0</span>
          <span className="w-px h-4 bg-[#040E21]/20"></span>
          <span className="text-[#040E21]/50 font-sans text-xs">178+ reviews · Google</span>
        </div>
      </div>

      {/* Row 1 — scrolls LEFT */}
      <div className="marquee-track relative mb-4">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#FDFBF7] to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#FDFBF7] to-transparent" />

        <div className="flex animate-marquee-left">
          {row1.map((review, i) => (
            <ReviewCard key={`r1-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls RIGHT */}
      <div className="marquee-track relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#FDFBF7] to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#FDFBF7] to-transparent" />

        <div className="flex animate-marquee-right">
          {row2.map((review, i) => (
            <ReviewCard key={`r2-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* View all reviews link */}
      <div className="flex justify-center mt-10">
        <a
          href="/reviews"
          className="inline-flex items-center gap-2 px-7 py-3 border border-[#E5B83E]/60 hover:border-[#E5B83E] text-[#E5B83E] hover:bg-[#E5B83E]/10 font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 hover:shadow-[0_4px_15px_rgba(229,184,62,0.15)]"
        >
          Read All Reviews
          <Star className="w-3.5 h-3.5 fill-[#E5B83E]" />
        </a>
      </div>
    </section>
  );
}

// ─── Full /reviews page ───────────────────────────────────────────────────────
function ReviewsPage() {
  return (
    <SiteLayout>
      {/* Page hero */}
      <section className="bg-[#040E21] py-16 px-6 border-b border-[#E5B83E]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#E5B83E]">
            What Our Guests Say
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Guest Reviews</h1>
          <div className="w-16 h-[2px] bg-[#E5B83E] mx-auto"></div>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-[#E5B83E]/20 rounded-full">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-[#E5B83E] fill-[#E5B83E]" />
              ))}
            </div>
            <span className="font-serif font-bold text-white text-lg">4.0</span>
            <span className="w-px h-4 bg-white/20"></span>
            <span className="text-white/50 font-sans text-sm">178+ reviews · Google</span>
          </div>
        </div>
      </section>

      {/* Marquee — the main event */}
      <ReviewsSection />

      {/* CTA */}
      <section className="bg-[#040E21] border-t border-[#E5B83E]/20 py-14 px-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-white mb-2">Stayed With Us?</h2>
        <p className="text-white/60 font-sans text-sm mb-6">
          We'd love to hear your experience. Leave us a review on Google or WhatsApp us your feedback.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://www.google.com/travel/search?q=Paramount%20Hotel&g2lb=4965990%2C72471280%2C72560029%2C72573224%2C72647020%2C72686036%2C72803964%2C72880339%2C72882230%2C73064764%2C121529350&hl=en-IN&gl=in&cs=1&ssta=1&ts=CAESCgoCCAMKAggDEAAaHBIaEhQKBwjqDxAGGAoSBwjqDxAGGAsYATICCAIqBwoFOgNJTlI&qs=CAEyE0Nnb0kwUE8wcXFYR3NhdGFFQUU4CkIJEREzHZ-4___NQgkRvbAJvwlyFD5CCRGDPI-QcNxd9lpRMk-qAUwQASoTIg9wYXJhbW91bnQgaG90ZWwoADIeEAEiGtx4Rwtnesn8Rb784XlthavZ1BwA5NckfkvLMhMQAiIPcGFyYW1vdW50IGhvdGVs&ap=ugEHcmV2aWV3cw&ictx=111"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#040E21] font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 hover:bg-gray-100"
          >
            <Star className="w-4 h-4 text-[#E5B83E] fill-[#E5B83E]" />
            Review on Google
          </a>

        </div>
      </section>
    </SiteLayout>
  );
}
