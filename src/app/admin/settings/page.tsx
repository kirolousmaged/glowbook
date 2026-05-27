import SocialLinksManager from "@/components/admin/SocialLinksManager";
import { Settings2, MapPin } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="px-6 py-8 max-w-2xl">
      <h1 className="font-serif text-2xl font-bold text-glam-text mb-8">Settings</h1>

      {/* Social Links */}
      <section className="bg-white rounded-2xl border border-border p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-pastel-pink flex items-center justify-center shrink-0">
            <Settings2 size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-glam-text text-base">Social Links</h2>
            <p className="text-xs text-glam-text/50">Displayed as icons on the landing page footer</p>
          </div>
        </div>
        <SocialLinksManager />
      </section>

      {/* Branches */}
      <section className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-pastel-pink flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-glam-text text-base">Branches</h2>
            <p className="text-xs text-glam-text/50">Manage your salon locations</p>
          </div>
        </div>
        <div className="text-center py-10">
          <MapPin size={28} className="mx-auto mb-3 text-glam-text/20" strokeWidth={1.5} />
          <p className="text-sm font-semibold text-glam-text/40">Branch management coming soon</p>
          <p className="text-xs text-glam-text/30 mt-1">You&apos;ll be able to add and manage locations here</p>
        </div>
      </section>
    </div>
  );
}
