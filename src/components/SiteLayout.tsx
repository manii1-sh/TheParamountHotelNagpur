import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Calendar, Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home",      sectionId: "section-home"      },
  { to: "/rooms", label: "Rooms",     sectionId: "section-rooms"     },
  { to: "/gallery", label: "Gallery",   sectionId: "section-gallery"   },
  { to: "/amenities", label: "Amenities", sectionId: "section-amenities" },
  { to: "/reviews", label: "Reviews",   sectionId: "section-reviews"   },
  { to: "/location", label: "Location",  sectionId: "section-location"  },
  { to: "/contact", label: "Contact",   sectionId: "section-contact"   },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Scroll-spy — only active on the home page
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(null);
      return;
    }

    const sectionIds = navItems.map((item) => item.sectionId);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let best = "";
        let bestRatio = 0;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            best = entry.target.id;
          }
        });
        if (best) setActiveSection(best);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-80px 0px -20% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  // Helper: is a nav item "active"
  const isActive = (item: (typeof navItems)[number]) => {
    if (isHomePage && activeSection) {
      return activeSection === item.sectionId;
    }
    return location.pathname === item.to;
  };

  const activeCls =
    "text-[#E5B83E] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#E5B83E] after:rounded-full";
  const inactiveCls =
    "relative py-2 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#FAFAFA]/80 transition-all duration-300 hover:text-[#E5B83E]";

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#040E21] font-sans antialiased selection:bg-[#E5B83E]/30 selection:text-[#040E21]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#040E21] border-b border-[#E5B83E]/30 shadow-[0_4px_30px_rgba(0,0,0,0.15)] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          {/* Luxury Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Main Logo Image */}
            <div className="relative flex items-center justify-center w-11 h-11 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/main-logo.png"
                alt="The Paramount Logo"
                className="w-full h-full object-contain"
              />
            </div>
            {/* Logo text stack */}
            <div className="flex flex-col select-none">
              <span className="font-serif text-[15px] md:text-lg font-bold tracking-[0.12em] text-[#E5B83E] leading-none">
                THE PARAMOUNT
              </span>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className="h-[1px] w-4 bg-[#E5B83E]/50"></span>
                <span className="text-[9px] md:text-[10px] font-sans font-semibold tracking-[0.25em] text-[#E5B83E] leading-none uppercase">
                  Hotel
                </span>
                <span className="h-[1px] w-4 bg-[#E5B83E]/50"></span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${inactiveCls} ${isActive(item) ? activeCls : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Book Now Button */}
          <div className="hidden lg:block">
            <a
              href="https://wa.me/919322520682?text=Hello%20The%20Paramount%20Hotel,%20I%20would%20like%20to%20book%20a%20stay."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E5B83E] hover:bg-[#F2C953] text-[#040E21] font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-[0_4px_15px_rgba(229,184,62,0.25)] hover:shadow-[0_6px_20px_rgba(229,184,62,0.35)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4 text-[#040E21]" />
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 text-[#FAFAFA] hover:text-[#E5B83E] lg:hidden transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5B83E]/20 bg-[#040E21] px-6 py-6 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-sm font-semibold uppercase tracking-[0.15em] hover:text-[#E5B83E] transition-colors ${
                    isActive(item)
                      ? "text-[#E5B83E] border-l-2 border-[#E5B83E] pl-3"
                      : "text-[#FAFAFA]/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://wa.me/919322520682?text=Hello%20The%20Paramount%20Hotel,%20I%20would%20like%20to%20book%20a%20stay."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#E5B83E] text-[#040E21] font-bold text-xs uppercase tracking-widest rounded-sm"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">{children}</main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-[#040E21] border-t border-[#E5B83E]/20 font-sans">

        {/* Main row */}
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Brand */}
          <div className="space-y-3">
            <div>
              <p className="font-serif font-bold text-sm tracking-[0.12em] text-[#E5B83E]">THE PARAMOUNT HOTEL</p>
              <p className="text-white/40 text-xs font-sans mt-0.5">Besa, Nagpur — 440037</p>
            </div>
            <p className="text-white/45 text-xs leading-relaxed max-w-xs">
              Comfortable stays &amp; trusted hospitality in the heart of Nagpur.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a href="https://wa.me/919322520682" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-7 h-7 rounded-full border border-white/15 hover:border-[#25D366]/60 bg-white/5 hover:bg-[#25D366]/10 flex items-center justify-center transition-all duration-300">
                <svg className="w-3 h-3 fill-[#25D366]" viewBox="0 0 24 24"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.936 9.936 0 0 0 4.777 1.224h.005c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.92-7.062A9.925 9.925 0 0 0 12.012 2zm5.72 14.12c-.244.688-1.22 1.253-1.68 1.302-.459.049-.902.247-2.906-.578-2.56-1.056-4.212-3.67-4.34-3.841-.127-.171-1.039-1.382-1.039-2.637 0-1.255.656-1.872.888-2.122.233-.25.508-.313.678-.313.17 0 .34.002.489.008.156.007.364-.06.57.452.212.525.72 1.756.784 1.887.064.13.106.282.021.452-.085.17-.127.282-.254.43-.127.148-.268.328-.381.442-.127.128-.26.268-.112.523.148.253.659 1.084 1.417 1.76.974.87 1.794 1.139 2.049 1.267.255.127.403.106.551-.064.149-.17.637-.743.807-.998.17-.255.339-.213.57-.128.233.085 1.484.7 1.738.828.254.128.424.191.488.301.064.111.064.644-.18 1.332z"/></svg>
              </a>
              <a href="https://www.instagram.com/the_paramount_hotel_ngp/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-7 h-7 rounded-full border border-white/15 hover:border-pink-400/50 bg-white/5 hover:bg-pink-500/10 flex items-center justify-center transition-all duration-300">
                <svg className="w-3 h-3 fill-white/60" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="font-serif font-bold text-xs text-white tracking-wide uppercase">Quick Links</p>
            <div className="w-6 h-px bg-[#E5B83E]/40"></div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/rooms", label: "Rooms" },
                { to: "/gallery", label: "Gallery" },
                { to: "/amenities", label: "Amenities" },
                { to: "/reviews", label: "Reviews" },
                { to: "/location", label: "Location" },
                { to: "/contact", label: "Contact" },
              ].map((item) => (
                <Link key={item.to} to={item.to}
                  className="text-xs text-white/45 hover:text-[#E5B83E] transition-colors duration-200">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <p className="font-serif font-bold text-xs text-white tracking-wide uppercase">Contact</p>
            <div className="w-6 h-px bg-[#E5B83E]/40"></div>
            <ul className="space-y-2 text-xs text-white/45">
              <li>📍 Plot No. 30, Beltarodi Road, Besa, Nagpur</li>
              <li><a href="tel:+919322520682" className="hover:text-[#E5B83E] transition-colors">📞 +91 93225 20682</a></li>
              <li>🕐 Check-in 12 PM · Check-out 11 AM</li>
              <li>⭐ 4.8 · 178+ Google Reviews</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#E5B83E]/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/30 tracking-wide">
            <span>© {new Date().getFullYear()} The Paramount Hotel, Nagpur. All rights reserved.</span>
            <span className="font-serif text-[#E5B83E]/40 text-[10px] tracking-[0.2em]">LUXURY · COMFORT · TRUST</span>
          </div>
        </div>

      </footer>
    </div>
  );
}

export function LaunchingSoon({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 text-center animate-fade-in py-16">
      <span className="mb-4 inline-flex items-center rounded-full border border-[#E5B83E]/30 bg-[#040E21] px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#E5B83E] font-semibold">
        Arriving Soon
      </span>
      <h1 className="text-4xl font-serif font-bold tracking-wide text-[#040E21] md:text-5xl lg:text-6xl">
        {title}
      </h1>
      <div className="w-16 h-[2px] bg-[#E5B83E] my-6"></div>
      <p className="max-w-xl text-sm leading-relaxed text-[#040E21]/70 md:text-base font-sans font-medium">
        {description}
      </p>
    </section>
  );
}
