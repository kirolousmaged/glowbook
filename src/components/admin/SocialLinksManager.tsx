"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle2, Loader2 } from "lucide-react";

const PLATFORMS = [
  {
    value: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/yourpage",
    hint: "Your Instagram profile URL",
  },
  {
    value: "tiktok",
    label: "TikTok",
    placeholder: "https://tiktok.com/@yourpage",
    hint: "Your TikTok profile URL",
  },
  {
    value: "facebook",
    label: "Facebook",
    placeholder: "https://facebook.com/yourpage",
    hint: "Your Facebook page URL",
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    placeholder: "20123456789",
    hint: "Phone number with country code, no + or spaces (e.g. 20123456789)",
  },
] as const;

type Platform = (typeof PLATFORMS)[number]["value"];

type State = Record<Platform, { value: string; saving: boolean; saved: boolean; error: string }>;

const empty = () => ({ value: "", saving: false, saved: false, error: "" });

export default function SocialLinksManager() {
  const [fields, setFields] = useState<State>({
    instagram: empty(),
    tiktok:    empty(),
    facebook:  empty(),
    whatsapp:  empty(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/social-links")
      .then((r) => r.json())
      .then((data: { platform: string; url: string }[]) => {
        if (!Array.isArray(data)) return;
        setFields((prev) => {
          const next = { ...prev };
          for (const link of data) {
            const p = link.platform as Platform;
            if (p in next) {
              // For WhatsApp, strip the wa.me prefix to show just the number
              const display =
                p === "whatsapp"
                  ? link.url.replace("https://wa.me/", "")
                  : link.url;
              next[p] = { ...next[p], value: display };
            }
          }
          return next;
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (p: Platform, patch: Partial<State[Platform]>) =>
    setFields((prev) => ({ ...prev, [p]: { ...prev[p], ...patch } }));

  const handleSave = async (p: Platform) => {
    const raw = fields[p].value.trim();
    if (!raw) {
      set(p, { error: "Please enter a value." });
      return;
    }

    const url = p === "whatsapp" ? `https://wa.me/${raw.replace(/\D/g, "")}` : raw;
    set(p, { saving: true, error: "", saved: false });

    try {
      const res = await fetch("/api/admin/social-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: p, url }),
      });
      if (!res.ok) {
        const d = await res.json();
        set(p, { saving: false, error: d.error ?? "Failed to save." });
      } else {
        set(p, { saving: false, saved: true });
        setTimeout(() => set(p, { saved: false }), 2500);
      }
    } catch {
      set(p, { saving: false, error: "Network error." });
    }
  };

  const handleClear = async (p: Platform) => {
    set(p, { saving: true, error: "", saved: false });
    try {
      await fetch("/api/admin/social-links", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: p }),
      });
      set(p, { saving: false, value: "", saved: false });
    } catch {
      set(p, { saving: false, error: "Network error." });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-6 text-sm text-glam-text/50">
        <Loader2 size={14} className="animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {PLATFORMS.map(({ value: p, label, placeholder, hint }) => {
        const f = fields[p];
        return (
          <div key={p} className="space-y-1.5">
            <label className="block text-sm font-bold text-glam-text">{label}</label>
            <p className="text-xs text-glam-text/45">{hint}</p>
            <div className="flex gap-2">
              <input
                value={f.value}
                onChange={(e) => set(p, { value: e.target.value, error: "", saved: false })}
                onKeyDown={(e) => e.key === "Enter" && handleSave(p)}
                placeholder={placeholder}
                className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <button
                onClick={() => handleSave(p)}
                disabled={f.saving}
                className="flex items-center gap-1.5 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-secondary transition-colors disabled:opacity-50 cursor-pointer shrink-0"
              >
                {f.saving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : f.saved ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <Save size={14} />
                )}
                {f.saving ? "Saving…" : f.saved ? "Saved!" : "Save"}
              </button>
              {f.value && !f.saving && (
                <button
                  onClick={() => handleClear(p)}
                  className="px-3 py-2.5 rounded-xl border border-border text-xs text-glam-text/50 hover:text-red-400 hover:border-red-200 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            {f.error && <p className="text-xs text-red-500">{f.error}</p>}
          </div>
        );
      })}
    </div>
  );
}
