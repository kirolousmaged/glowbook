"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Power, X, Loader2, Image, Link } from "lucide-react";

type GalleryImage = {
  id: string; title: string; imageUrl: string; serviceId: string | null;
  sortOrder: number; isActive: boolean; createdAt: string;
};
type ServiceOption = { id: string; name: string };

const INPUT = "w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-glam-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all duration-150";

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", imageUrl: "", serviceId: "" });
  const [saving, setSaving] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const [imgRes, svcRes] = await Promise.all([
      fetch("/api/admin/gallery"),
      fetch("/api/admin/services"),
    ]);
    setImages(await imgRes.json());
    setServices(await svcRes.json());
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) { setForm({ title: "", imageUrl: "", serviceId: "" }); setShowForm(false); fetchImages(); }
    else { const d = await res.json(); alert(d.error ?? "Failed to add image."); }
  };

  const toggleActive = async (img: GalleryImage) => {
    await fetch(`/api/admin/gallery/${img.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...img, isActive: !img.isActive }),
    });
    fetchImages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    fetchImages();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 bg-primary text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-secondary transition-all duration-150 shadow-sm shadow-primary/20 cursor-pointer min-h-[44px]"
        >
          {showForm ? <><X size={14} aria-hidden="true" /> Cancel</> : <><Plus size={14} aria-hidden="true" /> Add Image</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-border p-6 space-y-4 shadow-sm">
          <h2 className="font-serif font-bold text-glam-text flex items-center gap-2">
            <Image size={16} className="text-primary" aria-hidden="true" />
            New Gallery Image
          </h2>
          <div>
            <label className="block text-xs font-bold text-glam-text/70 mb-1.5">Title *</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Glazed Donut Nails" className={INPUT} />
          </div>
          <div>
            <label className="block text-xs font-bold text-glam-text/70 mb-1.5">
              Image URL *
              <span className="font-normal text-muted ml-1">(paste a direct image link)</span>
            </label>
            <div className="relative">
              <Link size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" aria-hidden="true" />
              <input type="url" required value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://…" className={`${INPUT} pl-9`} />
            </div>
            {form.imageUrl && (
              <div className="mt-2 w-full h-32 rounded-xl overflow-hidden border border-border bg-pastel-pink/30">
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-bold text-glam-text/70 mb-1.5">Linked Service <span className="font-normal text-muted">(optional)</span></label>
            <select value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })} className={INPUT}>
              <option value="">— No service link —</option>
              {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <button type="submit" disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-xl hover:bg-secondary transition-all disabled:opacity-50 min-h-[48px] cursor-pointer shadow-sm shadow-primary/20">
            {saving ? <><Loader2 size={14} className="animate-spin" aria-hidden="true" /> Saving…</> : "Add to Gallery"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-muted text-sm">
          <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Loading…
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-border">
          <Image size={28} className="text-muted/30 mx-auto mb-3" strokeWidth={1.5} aria-hidden="true" />
          <p className="text-sm text-muted">No gallery images yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img) => {
            const linkedService = services.find((s) => s.id === img.serviceId);
            return (
              <div key={img.id} className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all duration-150 ${img.isActive ? "border-border" : "border-dashed border-muted/30 opacity-60"}`}>
                <div className="aspect-square bg-pastel-pink/30 relative overflow-hidden">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  {!img.isActive && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <span className="text-xs font-bold text-muted bg-white px-2 py-1 rounded-full border border-border">Hidden</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-bold text-xs text-glam-text truncate">{img.title}</p>
                  {linkedService && (
                    <p className="text-xs text-muted truncate mt-0.5">{linkedService.name}</p>
                  )}
                  <div className="flex items-center gap-1.5 mt-2">
                    <button onClick={() => toggleActive(img)} title={img.isActive ? "Hide" : "Show"}
                      className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg border cursor-pointer transition-all duration-150 flex-1 justify-center ${img.isActive ? "bg-green-50 text-green-600 border-green-100" : "bg-gray-50 text-gray-400 border-gray-100"}`}>
                      <Power size={10} aria-hidden="true" />
                      {img.isActive ? "Live" : "Off"}
                    </button>
                    <button onClick={() => handleDelete(img.id)} title="Delete"
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 bg-red-50 hover:bg-red-500 hover:text-white transition-all duration-150 cursor-pointer">
                      <Trash2 size={12} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
