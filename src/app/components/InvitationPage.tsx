import { useState } from "react";
import { Share2, Download, Eye, Mail, MessageCircle, Copy } from "lucide-react";
import { motion } from "motion/react";

export function InvitationPage() {
  const [tab, setTab] = useState<"digital" | "physical">("digital");

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ background: "linear-gradient(160deg, #FDF3E7 0%, #FBF8F4 100%)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Invitation Cards</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>Digital & physical invitation management</p>
      </div>

      <div className="px-5 pb-6 space-y-4">
        {/* Tabs */}
        <div className="flex p-1 rounded-2xl" style={{ background: "#F5F0E8" }}>
          {(["digital", "physical"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2 rounded-xl transition-all"
              style={{ background: tab === t ? "linear-gradient(135deg, #C9A96E, #B8956A)" : "transparent" }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: tab === t ? "white" : "#7A5C3A", fontSize: "0.875rem" }}>
                {t === "digital" ? "Digital Card" : "Physical Card"}
              </span>
            </button>
          ))}
        </div>

        {tab === "digital" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {/* Digital card preview */}
            <div className="rounded-3xl overflow-hidden shadow-lg" style={{ background: "#FFFFFF" }}>
              {/* Card design */}
              <div className="relative p-6 text-center" style={{ background: "linear-gradient(160deg, #E8D5BE 0%, #F5EDE0 50%, #D4E8E4 100%)", minHeight: 280 }}>
                {/* Decorative corners */}
                <div className="absolute top-3 left-3 w-12 h-12 opacity-30">
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M0 48 C0 20 20 0 48 0" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
                    <path d="M0 36 C0 16 16 0 36 0" stroke="#C9A96E" strokeWidth="1" fill="none" opacity="0.6"/>
                  </svg>
                </div>
                <div className="absolute top-3 right-3 w-12 h-12 opacity-30" style={{ transform: "scaleX(-1)" }}>
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M0 48 C0 20 20 0 48 0" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
                <div className="absolute bottom-3 left-3 w-12 h-12 opacity-30" style={{ transform: "scaleY(-1)" }}>
                  <svg viewBox="0 0 48 48" fill="none">
                    <path d="M0 48 C0 20 20 0 48 0" stroke="#C9A96E" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>

                {/* Bismillah */}
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.9rem", direction: "rtl", marginBottom: "8px" }}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
                </p>

                {/* Ornament */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-px flex-1 max-w-12" style={{ background: "#C9A96E50" }} />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2 L13.5 8 L19 8 L14.5 11.5 L16 17 L12 13.5 L8 17 L9.5 11.5 L5 8 L10.5 8 Z" fill="#C9A96E" opacity="0.8"/>
                  </svg>
                  <div className="h-px flex-1 max-w-12" style={{ background: "#C9A96E50" }} />
                </div>

                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.75rem", letterSpacing: "0.12em" }}>WITH THE BLESSINGS OF ALLAH</p>

                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", fontSize: "1.5rem", margin: "8px 0" }}>
                  Siti & Ahmad
                </h3>

                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>
                  cordially invite you to celebrate our
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#B8956A", fontSize: "1rem", fontStyle: "italic", margin: "4px 0" }}>
                  Walimatul Urus
                </p>

                <div className="mt-4 p-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.6)" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", fontSize: "1.1rem" }}>15 March 2025</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>Saturday · 11:00 AM</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A4A3A", fontSize: "0.8rem", marginTop: "4px" }}>Dewan Mulia, Shah Alam</p>
                </div>

                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.72rem", marginTop: "12px" }}>
                  RSVP: +60 12-345 6789 · By 1 March 2025
                </p>
              </div>

              {/* Action buttons */}
              <div className="p-4 grid grid-cols-3 gap-3">
                {[
                  { icon: <Eye size={18} color="#B8956A" />, label: "Preview", bg: "#F5F0E8" },
                  { icon: <Share2 size={18} color="#8FB5B0" />, label: "Share", bg: "#E8F4F3" },
                  { icon: <Download size={18} color="#A8C5A0" />, label: "Save", bg: "#EEF5EE" },
                ].map((action, i) => (
                  <button key={i} className="flex flex-col items-center gap-1.5 py-3 rounded-2xl" style={{ background: action.bg }}>
                    {action.icon}
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.75rem" }}>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Share via */}
            <div className="rounded-3xl p-5" style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.08)" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", marginBottom: "12px" }}>Share Invitation</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <MessageCircle size={20} color="#25D366" />, label: "WhatsApp", bg: "#E8F8EE" },
                  { icon: <Mail size={20} color="#B8956A" />, label: "Email", bg: "#FDF3E7" },
                  { icon: <Copy size={20} color="#8FB5B0" />, label: "Copy Link", bg: "#E8F4F3" },
                  { icon: <Share2 size={20} color="#B8A4D8" />, label: "More", bg: "#F0EEF8" },
                ].map((share, i) => (
                  <button key={i} className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: share.bg }}>
                    {share.icon}
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.875rem" }}>{share.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "284", label: "Sent", color: "#8FB5B0", bg: "#E8F4F3" },
                { value: "142", label: "Opened", color: "#C9A96E", bg: "#FDF3E7" },
                { value: "97", label: "RSVP'd", color: "#A8C5A0", bg: "#EEF5EE" },
              ].map((stat, i) => (
                <div key={i} className="rounded-2xl p-3 text-center" style={{ background: stat.bg }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", color: stat.color, fontSize: "1.5rem" }}>{stat.value}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.7rem" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === "physical" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="rounded-3xl p-5" style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.08)" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", marginBottom: "12px" }}>Physical Card Order</h3>
              <div className="space-y-3">
                {[
                  { label: "Card Design", value: "Floral Gold Embossed" },
                  { label: "Quantity Ordered", value: "350 cards" },
                  { label: "Supplier", value: "Cetak Mulia Sdn Bhd" },
                  { label: "Status", value: "Ready for collection", highlight: true },
                  { label: "Cost", value: "RM 875 (RM 2.50/card)" },
                  { label: "Collected", value: "250 distributed, 100 remaining" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b" style={{ borderColor: "rgba(184,149,106,0.1)" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.82rem" }}>{item.label}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: (item as any).highlight ? "#408060" : "#2D2417", fontSize: "0.82rem", fontWeight: (item as any).highlight ? 600 : 400 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
