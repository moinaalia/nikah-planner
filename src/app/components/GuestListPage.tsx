import { useState } from "react";
import { Search, Plus, Users, Check, X, Clock, Filter } from "lucide-react";
import { motion } from "motion/react";

type RSVPStatus = "confirmed" | "pending" | "declined";

interface Guest {
  id: number;
  name: string;
  relation: string;
  side: "bride" | "groom";
  rsvp: RSVPStatus;
  table: number;
  phone: string;
  plusOne: boolean;
}

const guests: Guest[] = [
  { id: 1, name: "Dato' Hj. Ibrahim & Family", relation: "Father of Bride", side: "bride", rsvp: "confirmed", table: 1, phone: "+60 12-888 1234", plusOne: true },
  { id: 2, name: "Puan Salmah binti Yusof", relation: "Mother of Groom", side: "groom", rsvp: "confirmed", table: 1, phone: "+60 11-777 5678", plusOne: false },
  { id: 3, name: "Nur Aisyah & Husband", relation: "Sister of Bride", side: "bride", rsvp: "confirmed", table: 2, phone: "+60 19-444 9012", plusOne: true },
  { id: 4, name: "Mohd Fadzil bin Hassan", relation: "Best Friend", side: "groom", rsvp: "pending", table: 3, phone: "+60 17-333 3456", plusOne: false },
  { id: 5, name: "Dr. Rozana & Dr. Azman", relation: "Family Friend", side: "bride", rsvp: "confirmed", table: 4, phone: "+60 16-222 7890", plusOne: true },
  { id: 6, name: "Ustaz Hafiz bin Malik", relation: "Imam", side: "groom", rsvp: "confirmed", table: 1, phone: "+60 13-111 2345", plusOne: false },
  { id: 7, name: "Cik Nora binti Ramli", relation: "Colleague", side: "bride", rsvp: "pending", table: 5, phone: "+60 18-555 6789", plusOne: false },
  { id: 8, name: "En. Kamal & Keluarga", relation: "Uncle of Groom", side: "groom", rsvp: "declined", table: 0, phone: "+60 14-666 0123", plusOne: true },
];

const statusConfig: Record<RSVPStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  confirmed: { label: "Confirmed", color: "#408060", bg: "#E8F4EE", icon: <Check size={12} /> },
  pending: { label: "Pending", color: "#A08030", bg: "#FFF8E0", icon: <Clock size={12} /> },
  declined: { label: "Declined", color: "#C04040", bg: "#FFE8E8", icon: <X size={12} /> },
};

export function GuestListPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "bride" | "groom">("all");
  const [rsvpFilter, setRsvpFilter] = useState<"all" | RSVPStatus>("all");

  const filtered = guests.filter(g => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase()) || g.relation.toLowerCase().includes(search.toLowerCase());
    const matchSide = filter === "all" || g.side === filter;
    const matchRsvp = rsvpFilter === "all" || g.rsvp === rsvpFilter;
    return matchSearch && matchSide && matchRsvp;
  });

  const confirmed = guests.filter(g => g.rsvp === "confirmed").length;
  const pending = guests.filter(g => g.rsvp === "pending").length;
  const declined = guests.filter(g => g.rsvp === "declined").length;
  const totalWithPlusOne = guests.filter(g => g.rsvp === "confirmed" && g.plusOne).length * 2 + guests.filter(g => g.rsvp === "confirmed" && !g.plusOne).length;

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ background: "linear-gradient(160deg, #E8F4F3 0%, #FBF8F4 100%)" }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Guest List</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>{guests.length} guests total · {totalWithPlusOne} pax expected</p>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}>
            <Plus size={20} color="white" />
          </button>
        </div>
      </div>

      <div className="px-5 space-y-4 pb-6">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Confirmed", count: confirmed, color: "#408060", bg: "#E8F4EE" },
            { label: "Pending", count: pending, color: "#A08030", bg: "#FFF8E0" },
            { label: "Declined", count: declined, color: "#C04040", bg: "#FFE8E8" },
          ].map((stat, i) => (
            <div key={i} className="rounded-2xl p-3 text-center" style={{ background: stat.bg }}>
              <p style={{ fontFamily: "'Playfair Display', serif", color: stat.color, fontSize: "1.4rem" }}>{stat.count}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: stat.color, fontSize: "0.7rem" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(184,149,106,0.08)" }}>
          <Search size={18} color="#8C7B6B" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search guest name or relation..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.9rem" }}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {/* Side filter */}
          {(["all", "bride", "groom"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-full transition-all"
              style={{
                background: filter === f ? "linear-gradient(135deg, #C9A96E, #B8956A)" : "#F5F0E8",
                border: `1px solid ${filter === f ? "#C9A96E" : "rgba(184,149,106,0.2)"}`,
              }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: filter === f ? "white" : "#7A5C3A", fontSize: "0.78rem" }}>
                {f === "all" ? "All Guests" : f === "bride" ? "Bride's Side" : "Groom's Side"}
              </span>
            </button>
          ))}
          {/* RSVP filter */}
          {(["all", "confirmed", "pending", "declined"] as const).map(f => (
            <button
              key={f}
              onClick={() => setRsvpFilter(f)}
              className="px-3 py-1.5 rounded-full transition-all"
              style={{
                background: rsvpFilter === f ? "#8FB5B0" : "#F5F0E8",
                border: `1px solid ${rsvpFilter === f ? "#8FB5B0" : "rgba(184,149,106,0.2)"}`,
              }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: rsvpFilter === f ? "white" : "#7A5C3A", fontSize: "0.78rem" }}>
                {f === "all" ? "All RSVP" : statusConfig[f as RSVPStatus].label}
              </span>
            </button>
          ))}
        </div>

        {/* Guest cards */}
        <div className="space-y-3">
          {filtered.map((guest, i) => {
            const status = statusConfig[guest.rsvp];
            const initials = guest.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
            return (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="p-4 rounded-2xl"
                style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.07)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: guest.side === "bride" ? "linear-gradient(135deg, #D4A0A055, #C9A96E55)" : "linear-gradient(135deg, #8FB5B055, #A8C5A055)" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: guest.side === "bride" ? "#B8956A" : "#5A9090", fontSize: "0.8rem", fontWeight: 600 }}>{initials}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontWeight: 500, fontSize: "0.875rem" }}>{guest.name}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.75rem" }}>{guest.relation}</p>
                      </div>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: status.bg }}>
                        <span style={{ color: status.color }}>{status.icon}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: status.color, fontSize: "0.68rem" }}>{status.label}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-2 py-0.5 rounded-full" style={{ background: guest.side === "bride" ? "#FDF3E7" : "#E8F4F3", fontFamily: "'DM Sans', sans-serif", color: guest.side === "bride" ? "#B8956A" : "#5A9090", fontSize: "0.65rem" }}>
                        {guest.side === "bride" ? "Bride's" : "Groom's"}
                      </span>
                      {guest.table > 0 && (
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.72rem" }}>
                          Table {guest.table}
                        </span>
                      )}
                      {guest.plusOne && (
                        <span className="px-2 py-0.5 rounded-full" style={{ background: "#F0EBE3", fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.65rem" }}>
                          +1
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-10">
            <Users size={40} color="#D4C4A8" className="mx-auto mb-3" />
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B" }}>No guests found</p>
          </div>
        )}
      </div>
    </div>
  );
}
