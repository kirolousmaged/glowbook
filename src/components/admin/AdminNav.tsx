"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, CalendarDays, BarChart3, Tag, LogOut,
  Scissors, Star, Users, ImageIcon, Settings2,
} from "lucide-react";

const ALL_LINKS = [
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

export default function AdminNav() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <nav className="flex-1 px-3 py-4 flex flex-col justify-between" aria-label="Admin navigation">
      <div className="space-y-1">
        {ALL_LINKS.map(({ href, label, Icon }) => {
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
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-glam-text/40 hover:text-red-400 hover:bg-red-50 transition-all duration-150 w-full cursor-pointer min-h-[44px]"
      >
        <LogOut size={16} strokeWidth={2} aria-hidden="true" />
        Log out
      </button>
    </nav>
  );
}
