import Link from "next/link";
import {
  Sparkles, Gem, Star, Palette, Eye, Scissors, Heart, Wand2,
  Brush, Crown, Leaf, Sun, Zap, Droplets, Flower2, Ribbon,
  MapPin, ArrowRight, CheckCircle2, ChevronRight,
} from "lucide-react";
import { prisma } from "@/lib/db";
import type { LucideIcon } from "lucide-react";
import LandingMobileNav from "@/components/LandingMobileNav";

export const dynamic = "force-dynamic";

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles, Gem, Star, Palette, Eye, Scissors, Heart, Wand2,
  Brush, Crown, Leaf, Sun, Zap, Droplets, Flower2, Ribbon,
};

const STEPS = [
  { num: "01", title: "Pick Your Look", desc: "Browse services and choose the style that speaks to you." },
  { num: "02", title: "Choose Your Slot", desc: "Select a date and time that works perfectly for you." },
  { num: "03", title: "Show Up & Shine", desc: "Arrive, relax, and leave looking absolutely flawless." },
];

const GALLERY_FALLBACK = [
  { title: "French Rose Acrylics", img: "https://images.unsplash.com/photo-1604654894610-df4906b147c0?auto=format&fit=crop&w=900&q=80", slug: "French Rose Acrylics" },
  { title: "Glazed Donut Nails",   img: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&w=900&q=80", slug: "Glazed Donut Nails" },
  { title: "Vanilla Velvet Set",   img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80", slug: "Vanilla Velvet Set" },
  { title: "Lash Lift & Glow",     img: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=900&q=80", slug: "Lash Lift & Glow" },
  { title: "Nail Art Design",      img: "https://images.unsplash.com/photo-1604654894610-df4906b147c0?auto=format&fit=crop&w=900&q=80", slug: "Nail Art Design" },
  { title: "Classic Manicure",     img: "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&w=900&q=80", slug: "Classic Manicure" },
];

const PERKS = [
  "No deposits, no hidden fees",
  "Instant confirmation",
  "Easy reschedule anytime",
];

const TESTIMONIALS = [
  {
    quote: "The glazed donut nails were absolutely perfect! Lasted 3 weeks without a single chip.",
    name: "Sara H.",
    service: "Glazed Donut Nails",
    avatar: "#FECDD3",
  },
  {
    quote: "Super easy to book online and the results were stunning. I've never gotten so many compliments.",
    name: "Nadia K.",
    service: "French Rose Acrylics",
    avatar: "#FDA4AF",
  },
  {
    quote: "Best nail experience in Cairo. Clean, professional, and the lash lift was life-changing.",
    name: "Mariam R.",
    service: "Lash Lift & Glow",
    avatar: "#F0ABFC",
  },
];

/* ── Social platform SVG icons ──────────────────────────── */
function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.07a8.27 8.27 0 004.84 1.56V7.18a4.86 4.86 0 01-1.07-.49z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95 29 29 0 00.46-5.25 29 29 0 00-.46-5.48z" />
          <polygon fill="white" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "snapchat":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12.166 2C9.65 2 7.233 3.223 6.113 5.384c-.507.977-.636 1.985-.636 3.063v.867c-.48.207-1.012.198-1.477.126a1.1 1.1 0 00-.352-.03.963.963 0 00-1.095.995c-.02.607.443 1.105 1.233 1.396.9.333 1.567.543 1.782.656-.02.066-.04.13-.065.19-.295.696-1.028 1.178-1.797 1.655a3.886 3.886 0 00-1.18 1.08 1.895 1.895 0 00-.253 1.63c.23.63.803 1.035 1.487 1.035.337 0 .696-.09 1.082-.272.38-.177.803-.283 1.237-.283.22 0 .44.03.656.093.62.18 1.124.59 1.797 1.09C9.52 19.394 10.578 20 12.17 20c1.59 0 2.65-.605 3.44-1.154.673-.5 1.176-.91 1.797-1.09.217-.063.437-.093.657-.093.434 0 .857.106 1.237.283.386.182.745.272 1.082.272.684 0 1.257-.404 1.487-1.036a1.895 1.895 0 00-.253-1.63 3.886 3.886 0 00-1.18-1.08c-.769-.477-1.502-.958-1.797-1.654a2.3 2.3 0 01-.065-.19c.215-.113.882-.323 1.782-.656.79-.29 1.253-.789 1.233-1.396a.963.963 0 00-1.095-.995c-.11 0-.226.01-.352.03-.465.071-.997.08-1.477-.127v-.867c0-1.078-.13-2.086-.636-3.063C17.133 3.223 14.682 2 12.166 2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4m0 4h.01" />
        </svg>
      );
  }
}

export default async function LandingPage() {
  let dbServices: Awaited<ReturnType<typeof prisma.service.findMany>> = [];
  let dbGallery:  Awaited<ReturnType<typeof prisma.galleryImage.findMany>> = [];
  let dbSocials:  Awaited<ReturnType<typeof prisma.socialLink.findMany>> = [];

  try {
    [dbServices, dbGallery, dbSocials] = await Promise.all([
      prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
      prisma.galleryImage.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
      prisma.socialLink.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    ]);
  } catch {
    // DB not reachable — render with fallback content
  }

  const services = dbServices.length > 0 ? dbServices : null;
  const gallery  = dbGallery.length > 0
    ? dbGallery.map((g) => ({ title: g.title, img: g.imageUrl, slug: g.serviceId ?? g.title }))
    : GALLERY_FALLBACK;

  const whatsappUrl = dbSocials.find((s) => s.platform === "whatsapp")?.url ?? "https://wa.me/201000000000";
  const otherSocials = dbSocials.filter((s) => s.platform !== "whatsapp");

  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HEADER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-xl font-bold text-primary tracking-tight">GlowBook</span>

          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-glam-text/70" aria-label="Main navigation">
            <a href="#services" className="hover:text-primary transition-colors duration-150 cursor-pointer">Services</a>
            <a href="#how"      className="hover:text-primary transition-colors duration-150 cursor-pointer">How It Works</a>
            <a href="#gallery"  className="hover:text-primary transition-colors duration-150 cursor-pointer">Gallery</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/account/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-glam-text/70 hover:text-primary transition-colors duration-150 cursor-pointer"
            >
              My Account
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 bg-primary text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-secondary transition-colors duration-200 shadow-md shadow-primary/25 cursor-pointer"
            >
              Book Now
              <ChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
            </Link>
            {/* Mobile hamburger */}
            <LandingMobileNav />
          </div>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-[calc(100dvh-64px)] flex items-center overflow-hidden px-6 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF1F2]/70 via-[#FFFDF9] to-[#FFFDF9] -z-10" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/6 blur-3xl -z-10" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/5 blur-3xl -z-10" />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="text-center md:text-left">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-glam-text leading-[1.08] tracking-tight mb-5">
              Your Nails.<br />
              <span className="text-primary italic">Perfected.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-sm mx-auto md:mx-0 mb-5 leading-relaxed">
              Premium nail artistry &amp; beauty treatments in Cairo.
              Book your slot in under 60 seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-1.5 mb-8">
              {PERKS.map((p) => (
                <span key={p} className="flex items-center gap-1.5 text-xs font-medium text-muted">
                  <CheckCircle2 size={13} className="text-primary shrink-0" aria-hidden="true" />
                  {p}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-sm mx-auto md:mx-0 mb-10">
              <Link
                href="/book"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-7 py-4 rounded-2xl shadow-lg shadow-primary/30 hover:bg-secondary transition-all duration-200 active:scale-[0.97] cursor-pointer text-base"
              >
                Book Now
                <Sparkles size={16} aria-hidden="true" />
              </Link>
              <a
                href="#services"
                className="flex-1 inline-flex items-center justify-center bg-white border border-border text-glam-text font-semibold px-7 py-4 rounded-2xl hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer text-base"
              >
                See Services
              </a>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="flex -space-x-2.5" aria-hidden="true">
                {["#FECDD3","#FCA5A5","#FDA4AF","#F9A8D4","#F0ABFC"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
              <p className="text-sm text-muted">
                Trusted by <strong className="text-primary font-semibold">200+</strong> happy clients
              </p>
            </div>
          </div>

          <div className="hidden md:flex justify-center relative">
            <div className="relative w-[340px] h-[460px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/15">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df4906b147c0?auto=format&fit=crop&w=700&q=85"
                alt="Nail artistry at GlowBook"
                width={700}
                height={920}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SERVICES
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="services" className="px-6 py-24 max-w-6xl mx-auto w-full scroll-mt-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.12em] bg-pastel-pink px-4 py-1.5 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-glam-text">Our Services</h2>
          <p className="text-muted mt-3 max-w-xs mx-auto text-sm leading-relaxed">
            Every look crafted with precision, care, and a love for detail.
          </p>
        </div>

        {services ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {services.map((s) => {
              const Icon = s.iconName ? (ICON_MAP[s.iconName] ?? Sparkles) : Sparkles;
              return (
                <div
                  key={s.id}
                  className="group relative bg-white rounded-3xl p-6 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 flex flex-col"
                >
                  {s.popular && (
                    <span className="absolute top-4 right-4 text-xs font-bold text-primary bg-pastel-pink px-2.5 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-2xl bg-pastel-pink flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-200">
                    <Icon size={20} className="text-primary" aria-hidden="true" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-glam-text mb-2">{s.name}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-5 flex-1">{s.description ?? ""}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <span className="text-sm font-bold text-primary">From {s.price} EGP</span>
                    <Link
                      href={`/book?service=${encodeURIComponent(s.name)}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-pastel-pink px-3.5 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-150 cursor-pointer"
                      aria-label={`Book ${s.name}`}
                    >
                      Book <ArrowRight size={11} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-border">
            <Sparkles size={32} className="text-muted/30 mx-auto mb-3" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-sm text-muted mb-4">Services coming soon — check back shortly.</p>
            <Link href="/book" className="inline-flex items-center gap-1.5 bg-primary text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-secondary transition-all cursor-pointer">
              Book Now <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        )}
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HOW IT WORKS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="how" className="px-6 py-24 bg-pastel-pink/50 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.12em] bg-white border border-border px-4 py-1.5 rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-glam-text">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            <div className="hidden md:block absolute top-9 left-[calc(33%+20px)] right-[calc(33%+20px)] h-px border-t-2 border-dashed border-primary/20" aria-hidden="true" />
            {STEPS.map((step) => (
              <div key={step.num} className="relative bg-white rounded-3xl p-7 border border-border text-center shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-5">
                  <span className="font-serif text-lg font-bold text-primary">{step.num}</span>
                </div>
                <h3 className="font-serif text-base font-semibold text-glam-text mb-2">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-primary/30 hover:bg-secondary transition-all duration-200 active:scale-[0.97] cursor-pointer"
            >
              Reserve My Spot
              <Sparkles size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          GALLERY
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="gallery" className="px-6 py-24 max-w-6xl mx-auto w-full scroll-mt-16">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.12em] bg-pastel-pink px-4 py-1.5 rounded-full mb-4">
            Our Work
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-glam-text">Mastered Creations</h2>
          <p className="text-muted mt-3 text-sm">Real results. Real clients.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gallery.map((item, i) => (
            <Link
              key={i}
              href={`/book?service=${encodeURIComponent(item.slug)}`}
              className="group relative rounded-3xl overflow-hidden block bg-pastel-pink cursor-pointer aspect-[4/3]"
              aria-label={`Book ${item.title}`}
            >
              <img
                src={item.img}
                alt={item.title}
                loading={i < 3 ? "eager" : "lazy"}
                width={600}
                height={450}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-6">
                <div className="flex items-center justify-between w-full">
                  <span className="text-white font-semibold text-base">{item.title}</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">Book</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TESTIMONIALS
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-6 py-24 bg-pastel-pink/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-bold text-primary uppercase tracking-[0.12em] bg-white border border-border px-4 py-1.5 rounded-full mb-4">
              Client Love
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-glam-text">What Our Clients Say</h2>
            <p className="text-muted mt-3 text-sm">Straight from the people who matter most.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-3xl p-7 border border-border flex flex-col shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="flex gap-0.5 mb-5" aria-label="5 star rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted leading-relaxed flex-1 mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-primary font-bold text-sm shrink-0 border-2 border-white shadow-sm"
                    style={{ backgroundColor: t.avatar }}
                    aria-hidden="true"
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-glam-text">{t.name}</p>
                    <p className="text-xs text-muted">{t.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PRE-FOOTER CTA BANNER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-6 py-10">
        <div className="max-w-4xl mx-auto bg-primary rounded-3xl px-8 py-16 text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/8" aria-hidden="true" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-black/8" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-white/5 -translate-y-1/2" aria-hidden="true" />
          <p className="text-white/70 text-sm font-medium mb-3 relative z-10 uppercase tracking-wider">Limited slots available daily</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 relative z-10 leading-tight">
            Ready to glow up?
          </h2>
          <p className="text-white/65 text-base mb-10 relative z-10 max-w-sm mx-auto leading-relaxed">
            Join 200+ happy clients. Your dream nails are one booking away.
          </p>
          <Link
            href="/book"
            className="relative z-10 inline-flex items-center gap-2 bg-white text-primary font-bold px-10 py-4 rounded-2xl hover:bg-pastel-pink transition-colors duration-200 cursor-pointer shadow-lg active:scale-[0.97] text-base"
          >
            Book My Appointment
            <Sparkles size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="bg-[#2A2A30] text-white">
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary/40" />

        <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/8">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-serif text-2xl font-bold text-primary">GlowBook</span>
              </div>
              <p className="text-white/45 text-sm leading-relaxed max-w-[200px] mb-6">
                Premium nail artistry &amp; lash treatments in Cairo. Book in 60 seconds.
              </p>

              {/* Social icons from DB */}
              {otherSocials.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {otherSocials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/8 hover:bg-primary flex items-center justify-center text-white/50 hover:text-white transition-all duration-150 cursor-pointer"
                      aria-label={s.platform}
                    >
                      <SocialIcon platform={s.platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Services */}
            <div>
              <p className="text-xs font-bold text-white/35 uppercase tracking-[0.12em] mb-5">Services</p>
              <ul className="space-y-2.5">
                {(services ?? []).map((s) => (
                  <li key={s.name}>
                    <Link
                      href={`/book?service=${encodeURIComponent(s.name)}`}
                      className="text-sm text-white/55 hover:text-primary transition-colors duration-150 cursor-pointer"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <p className="text-xs font-bold text-white/35 uppercase tracking-[0.12em] mb-5">Locations</p>
              <ul className="space-y-3.5">
                <li>
                  <p className="text-sm font-semibold text-white/70">Heliopolis</p>
                  <p className="text-xs text-white/35 mt-0.5">Sat–Thu · 11 AM – 9 PM</p>
                </li>
                <li>
                  <p className="text-sm font-semibold text-white/70">New Cairo</p>
                  <p className="text-xs text-white/35 mt-0.5">Sat–Thu · 11 AM – 9 PM</p>
                </li>
              </ul>
              <div className="mt-5 flex items-center gap-2 text-white/35 text-xs">
                <MapPin size={12} className="text-primary shrink-0" aria-hidden="true" />
                Cairo, Egypt
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-xs font-bold text-white/35 uppercase tracking-[0.12em] mb-5">Quick Links</p>
              <ul className="space-y-2.5">
                {[
                  { label: "Book Now",   href: "/book" },
                  { label: "My Account", href: "/account/login" },
                  { label: "Services",   href: "#services" },
                  { label: "How It Works", href: "#how" },
                  { label: "Gallery",    href: "#gallery" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/55 hover:text-primary transition-colors duration-150 cursor-pointer">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
            <span>© {new Date().getFullYear()} GlowBook Egypt. All rights reserved.</span>
            <Link href="/book" className="text-primary hover:text-secondary font-semibold transition-colors duration-150 cursor-pointer">
              Book an Appointment →
            </Link>
          </div>
        </div>
      </footer>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MOBILE STICKY CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-4 pt-3 bg-white/90 backdrop-blur-lg border-t border-border z-50 sm:hidden">
        <Link
          href="/book"
          className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-2xl w-full shadow-lg shadow-primary/25 cursor-pointer active:scale-[0.98] transition-transform duration-150"
        >
          Book Your Appointment
          <Sparkles size={16} aria-hidden="true" />
        </Link>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          WHATSAPP FLOATING BUTTON
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[88px] right-4 sm:bottom-8 sm:right-6 z-40 w-13 h-13 w-[52px] h-[52px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg shadow-black/20 hover:shadow-xl transition-all duration-200 active:scale-95 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
}
