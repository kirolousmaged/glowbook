"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok",    label: "TikTok" },
  { value: "facebook",  label: "Facebook" },
  { value: "whatsapp",  label: "WhatsApp" },
  { value: "youtube",   label: "YouTube" },
  { value: "twitter",   label: "Twitter / X" },
  { value: "snapchat",  label: "Snapchat" },
];

type SocialLink = { id: string; platform: string; url: string };

export default function SocialLinksManager() {
  const [links, setLinks]     = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [platform, setPlatform] = useState("instagram");
  const [url, setUrl]         = useState("");
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    fetch("/api/admin/social-links")
      .then((r) => r.json())
      .then((data) => setLinks(Array.isArray(data) ? data : []))
      .catch(() => setLinks([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!url.trim()) { setError("Please enter a URL."); return; }
    setSaving(true); setError("");
    try {
      const res  = await fetch("/api/admin/social-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to save."); return; }
      setLinks((prev) => [...prev, data]);
      setUrl("");
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/admin/social-links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setLinks((prev) => prev.filter((l) => l.id !== id));
    } catch { /* ignore */ }
  };

  if (loading) return <p className="text-sm text-glam-text/50 py-2">Loading…</p>;

  return (
    <div className="space-y-4">
      {links.length === 0 ? (
        <p className="text-sm text-glam-text/40 py-3">No social links added yet.</p>
      ) : (
        <ul className="space-y-2">
          {links.map((link) => {
            const label = PLATFORMS.find((p) => p.value === link.platform)?.label ?? link.platform;
            return (
              <li
                key={link.id}
                className="flex items-center justify-between gap-3 bg-pastel-pink/30 rounded-xl px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-bold text-glam-text">{label}</p>
                  <p className="text-xs text-glam-text/50 truncate">{link.url}</p>
                </div>
                <button
                  onClick={() => handleDelete(link.id)}
                  className="p-2 rounded-xl text-glam-text/30 hover:text-red-400 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <div className="border-t border-border pt-4">
        <p className="text-xs font-bold text-glam-text/50 uppercase tracking-wide mb-3">Add Social Link</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-border bg-white text-sm font-medium text-glam-text focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
          >
            {PLATFORMS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="https://instagram.com/yourpage"
            className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            onClick={handleAdd}
            disabled={saving}
            className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-secondary transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Plus size={15} />
            Add
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
