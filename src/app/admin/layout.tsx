import AdminNav from "@/components/admin/AdminNav";
import MobileAdminNav from "@/components/admin/MobileAdminNav";
import { Sparkles } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">

      {/* ── Desktop sidebar ──────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 bg-white border-r border-pastel-pink sticky top-0 h-screen">
        <div className="px-6 py-6 border-b border-pastel-pink flex items-center gap-2">
          <Sparkles size={16} className="text-primary shrink-0" strokeWidth={2} aria-hidden="true" />
          <div>
            <span className="text-base font-black text-primary font-serif">GlowBook</span>
            <p className="text-xs text-glam-text/50 mt-0.5">Admin Panel</p>
          </div>
        </div>
        <AdminNav />
      </aside>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile sticky header + sidebar drawer */}
        <MobileAdminNav />

        {/* Page content */}
        <main className="flex-1 pb-8">
          {children}
        </main>
      </div>

    </div>
  );
}
