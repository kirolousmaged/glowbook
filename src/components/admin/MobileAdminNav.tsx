"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles, Menu, X, LogOut,
  LayoutDashboard, CalendarDays, BarChart3, Tag,
  Scissors, ImageIcon, Star, Users, Settings2,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/admin",            label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/orders",     label: "Orders",    Icon: CalendarDays },
  { href: "/admin/analytics",  label: "Analytics", Icon: BarChart3 },
  { href: "/admin/promos",     label: "Promos",    Icon: Tag },
  { href: "/admin/services",   label: "Services",  Icon: Scissors },
  { href: "/admin/gallery",    label: "Gallery",   Icon: ImageIcon },
  { href: "/admin/points",     label: "Points",    Icon: Star },
  { href: "/admin/users",      label: "Clients",   Icon: Users },
  { href: "/admin/settings",   label: "Settings",  Icon: Settings2 },
];

const PAGE_TITLES: Record<string, string> = {
  "/admin":            "Dashboard",
  "/admin/orders":     "Orders",
  "/admin/analytics":  "Analytics",
  "/admin/promos":     "Promos",
  "/admin/services":   "Services",
  "/admin/gallery":    "Gallery",
  "/admin/points":     "Points",
  "/admin/users":      "Clients",
  "/admin/settings":   "Settings",
};

export default function MobileAdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* ── Sticky top header ───────────────────────────── */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-border">
        <div className="h-14 flex items-center justify-between px-4">

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-glam-text/60 hover:bg-pastel-pink hover:text-primary transition-colors cursor-pointer"
            aria-label="Open navigation"
          >
            <Menu size={22} strokeWidth={2} />
          </button>

          {/* Page title */}
          <span className="font-serif font-bold text-glam-text text-sm">
            {PAGE_TITLES[pathname] ?? "Admin"}
          </span>

          <div className="w-9" />

        </div>
      </header>

      {/* ── Backdrop ────────────────────────────────────── */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/40 z-[60] transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Slide-out sidebar ───────────────────────────── */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-72 bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Admin navigation"
      >
        {/* Sidebar header */}
        <div className="px-5 py-5 border-b border-pastel-pink flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <Sparkles size={15} className="text-white" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-black text-primary font-serif leading-none">GlowBook</p>
              <p className="text-xs text-glam-text/50 mt-0.5">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-pastel-pink text-glam-text/60 hover:text-primary transition-colors cursor-pointer"
            aria-label="Close navigation"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {NAV_LINKS.map(({ href, label, Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 cursor-pointer min-h-[44px] ${
                    active
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-glam-text/60 hover:bg-pastel-pink hover:text-primary"
                  }`}
                >
                  <Icon size={16} strokeWidth={active ? 2.5 : 2} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6 pt-2 border-t border-border shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-glam-text/40 hover:text-red-400 hover:bg-red-50 transition-all duration-150 cursor-pointer min-h-[44px]"
          >
            <LogOut size={16} strokeWidth={2} aria-hidden="true" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
