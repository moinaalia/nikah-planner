import { Edit3, Camera, MapPin, Calendar, Heart, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export function ProfilePage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Gradient header */}
      <div className="relative px-5 pt-6 pb-16" style={{ background: "linear-gradient(160deg, #E8D5BE 0%, #D4E8E4 100%)" }}>
        <div className="flex justify-between items-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Our Profile</h2>
          <button className="p-2 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }}>
            <Edit3 size={18} color="#B8956A" />
          </button>
        </div>
      </div>

      {/* Profile cards — overlapping the header */}
      <div className="px-5 -mt-12 pb-6 space-y-4">
        {/* Couple card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 shadow-lg"
          style={{ background: "#FFFFFF" }}
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            {/* Bride */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden" style={{ background: "linear-gradient(135deg, #C9A96E22, #D4A0A022)" }}>
                  <img src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=128&h=128&fit=crop&auto=format" alt="Bride" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#C9A96E" }}>
                  <Camera size={10} color="white" />
                </button>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", fontSize: "0.875rem" }}>Siti Nurhaliza</span>
              <span className="px-2 py-0.5 rounded-full" style={{ background: "#FDF3E7", fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.65rem" }}>Bride 👰</span>
            </div>

            {/* Heart divider */}
            <div className="flex flex-col items-center gap-1">
              <Heart size={24} fill="#C9A96E" color="#C9A96E" />
              <div className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }} />
            </div>

            {/* Groom */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden" style={{ background: "linear-gradient(135deg, #8FB5B022, #A8C5A022)" }}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&auto=format" alt="Groom" className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#8FB5B0" }}>
                  <Camera size={10} color="white" />
                </button>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", fontSize: "0.875rem" }}>Ahmad Fauzi</span>
              <span className="px-2 py-0.5 rounded-full" style={{ background: "#E8F4F3", fontFamily: "'DM Sans', sans-serif", color: "#5A9090", fontSize: "0.65rem" }}>Groom 🤵</span>
            </div>
          </div>

          {/* Wedding info */}
          <div className="space-y-3 pt-4 border-t" style={{ borderColor: "rgba(184,149,106,0.15)" }}>
            <InfoRow icon={<Calendar size={16} color="#C9A96E" />} label="Wedding Date" value="15 March 2025" />
            <InfoRow icon={<MapPin size={16} color="#8FB5B0" />} label="Venue" value="Dewan Mulia, Shah Alam" />
            <InfoRow icon={<Heart size={16} color="#D4A0A0" />} label="Theme" value="Elegant Gold & Sage Green" />
          </div>
        </motion.div>

        {/* Bride's details */}
        <ProfileCard
          title="Bride's Details"
          color="#C9A96E"
          emoji="👰"
          fields={[
            { label: "Full Name", value: "Siti Nurhaliza binti Ibrahim" },
            { label: "IC Number", value: "960314-03-1234" },
            { label: "Phone", value: "+60 12-345 6789" },
            { label: "Email", value: "siti.nurhaliza@gmail.com" },
            { label: "Address", value: "No. 12, Jalan Cempaka 3, Shah Alam, Selangor" },
            { label: "Father (Wali)", value: "Dato' Hj. Ibrahim bin Yusof" },
          ]}
        />

        {/* Groom's details */}
        <ProfileCard
          title="Groom's Details"
          color="#8FB5B0"
          emoji="🤵"
          fields={[
            { label: "Full Name", value: "Ahmad Fauzi bin Hassan" },
            { label: "IC Number", value: "940815-14-5678" },
            { label: "Phone", value: "+60 19-876 5432" },
            { label: "Email", value: "ahmad.fauzi@gmail.com" },
            { label: "Address", value: "No. 8, Jalan Melati 5, Ampang, Selangor" },
            { label: "Father", value: "En. Hassan bin Mahmud" },
          ]}
        />

        {/* Quick links */}
        <div className="rounded-3xl overflow-hidden" style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.08)" }}>
          {[
            { label: "Invitation Card Preview", page: "invitation", emoji: "💌" },
            { label: "Wedding Budget", page: "budget", emoji: "💰" },
            { label: "Guest List", page: "guests", emoji: "👥" },
            { label: "Settings", page: "settings", emoji: "⚙️" },
          ].map((item, i, arr) => (
            <button
              key={i}
              onClick={() => onNavigate(item.page)}
              className="w-full flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(184,149,106,0.1)" : "none" }}
            >
              <span style={{ fontSize: "1.2rem" }}>{item.emoji}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.9rem", flex: 1, textAlign: "left" }}>{item.label}</span>
              <ChevronRight size={16} color="#B8956A" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div className="flex-1">
        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.72rem" }}>{label}</span>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.875rem" }}>{value}</p>
      </div>
    </div>
  );
}

function ProfileCard({ title, color, emoji, fields }: { title: string; color: string; emoji: string; fields: { label: string; value: string }[] }) {
  return (
    <div className="rounded-3xl p-5" style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.08)" }}>
      <div className="flex items-center gap-2 mb-4">
        <span style={{ fontSize: "1.2rem" }}>{emoji}</span>
        <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>{title}</h3>
        <div className="flex-1 h-px ml-2" style={{ background: color + "40" }} />
      </div>
      <div className="space-y-3">
        {fields.map((field, i) => (
          <div key={i} className="flex justify-between items-start">
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.78rem", minWidth: 100 }}>{field.label}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.82rem", textAlign: "right", flex: 1 }}>{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
