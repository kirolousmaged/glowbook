"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Services",     href: "#services" },
  { label: "How It Works", href: "#how" },
  { label: "Gallery",      href: "#gallery" },
];

export default function LandingMobileNav() {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wait for client mount before using createPortal (document not available on server)
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  const overlay = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header bar */}
      <div style={{ height: 64, borderBottom: "1px solid #f3e8ff" }} className="flex items-center justify-between px-6 shrink-0">
        <span className="font-serif text-xl font-bold text-primary tracking-tight">GlowBook</span>
        <button
          onClick={close}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-pastel-pink text-glam-text/60 hover:text-primary transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={2} />
        </button>
      </div>

      {/* Nav links — vertically centred */}
      <nav className="flex-1 flex flex-col justify-center px-8">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={close}
            className="flex items-center justify-between py-5 border-b border-border/50 cursor-pointer group"
          >
            <span className="font-serif text-3xl font-bold text-glam-text group-hover:text-primary transition-colors">
              {label}
            </span>
            <ArrowRight size={20} className="text-primary/30 group-hover:text-primary transition-colors" />
          </a>
        ))}

        <Link
          href="/account/dashboard"
          onClick={close}
          className="flex items-center justify-between py-5 cursor-pointer group"
        >
          <span className="font-serif text-3xl font-bold text-glam-text group-hover:text-primary transition-colors">
            My Account
          </span>
          <ArrowRight size={20} className="text-primary/30 group-hover:text-primary transition-colors" />
        </Link>
      </nav>

      {/* Book Now CTA */}
      <div className="px-6 pb-12 pt-4 shrink-0">
        <Link
          href="/book"
          onClick={close}
          className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-4 rounded-2xl w-full shadow-lg shadow-primary/25 hover:bg-secondary transition-colors cursor-pointer text-base active:scale-[0.98]"
        >
          <Sparkles size={16} aria-hidden="true" />
          Book Now
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger trigger — mobile only */}
      <button
        onClick={() => setOpen(true)}
        className="sm:hidden w-9 h-9 flex items-center justify-center rounded-xl text-glam-text/60 hover:bg-pastel-pink hover:text-primary transition-colors cursor-pointer"
        aria-label="Open menu"
      >
        <Menu size={22} strokeWidth={2} />
      </button>

      {/* Portal renders outside header — no stacking context issues */}
      {mounted && open && createPortal(overlay, document.body)}
    </>
  );
}
