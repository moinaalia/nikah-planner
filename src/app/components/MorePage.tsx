import { ChevronRight, User, Mail, Calendar, ShoppingBag, Bell, Settings } from "lucide-react";
import { motion } from "motion/react";

interface MorePageProps {
  onNavigate: (page: string) => void;
}

const items = [
  { icon: User, label: "Bride & Groom Profile", desc: "Your personal wedding details", page: "profile", color: "#C9A96E", bg: "#FDF3E7", emoji: "💑" },
  { icon: Mail, label: "Invitation Cards", desc: "Digital & physical invitations", page: "invitation", color: "#8FB5B0", bg: "#E8F4F3", emoji: "💌" },
  { icon: Calendar, label: "Wedding Schedule", desc: "Events & ceremony timeline", page: "schedule", color: "#B8A4D8", bg: "#F0EEF8", emoji: "📅" },
  { icon: ShoppingBag, label: "Vendor Booking", desc: "Manage your service vendors", page: "vendors", color: "#A8C5A0", bg: "#EEF5EE", emoji: "🛍️" },
  { icon: Bell, label: "Notifications", desc: "Reminders & updates", page: "notifications", color: "#D4A0A0", bg: "#FAF0F0", emoji: "🔔" },
  { icon: Settings, label: "Settings", desc: "App preferences & account", page: "settings", color: "#90A8C8", bg: "#EEF2F8", emoji: "⚙️" },
];

export function MorePage({ onNavigate }: MorePageProps) {
  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-6" style={{ background: "linear-gradient(160deg, #E8D5BE 0%, #FBF8F4 100%)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>More Features</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>Everything you need for your big day</p>
      </div>

      <div className="px-5 pb-6 pt-3 space-y-3">
        {items.map((item, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(item.page)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-left"
            style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.08)" }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: item.bg }}>
              <span style={{ fontSize: "1.4rem" }}>{item.emoji}</span>
            </div>
            <div className="flex-1">
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontWeight: 500, fontSize: "0.9rem" }}>{item.label}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.78rem" }}>{item.desc}</p>
            </div>
            <ChevronRight size={18} color="#B8956A" />
          </motion.button>
        ))}

        {/* Quote */}
        <div className="rounded-3xl p-5 mt-4" style={{ background: "linear-gradient(135deg, #C9A96E22, #8FB5B022)", border: "1px solid rgba(184,149,106,0.2)" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", fontSize: "0.9rem", fontStyle: "italic", textAlign: "center", lineHeight: 1.6 }}>
            "And of His signs is that He created for you from yourselves mates that you may find tranquility in them."
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.75rem", textAlign: "center", marginTop: "8px" }}>
            — Surah Ar-Rum, 30:21
          </p>
        </div>
      </div>
    </div>
  );
}
