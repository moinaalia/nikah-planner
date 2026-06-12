import { useState } from "react";
import { Calendar, Clock, MapPin, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Event {
  id: number;
  title: string;
  arabicTitle?: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  description: string;
  color: string;
  category: "akad" | "reception" | "prep" | "hantaran" | "other";
  tasks: string[];
}

const events: Event[] = [
  {
    id: 1,
    title: "Akad Nikah",
    arabicTitle: "عقد النكاح",
    date: "15 March 2025",
    time: "9:00 AM",
    endTime: "11:00 AM",
    location: "Masjid Al-Ikhlas, Petaling Jaya",
    description: "The sacred Islamic marriage contract ceremony. Wali, witnesses, and Imam required.",
    color: "#C9A96E",
    category: "akad",
    tasks: ["Confirm Imam Ustaz Hafiz", "Prepare mahar (RM1,500 + Al-Quran)", "Wali confirmed: Dato' Ibrahim", "Two witnesses arranged"],
  },
  {
    id: 2,
    title: "Majlis Walimah — Sesi Pagi",
    date: "15 March 2025",
    time: "11:00 AM",
    endTime: "2:00 PM",
    location: "Dewan Mulia, Shah Alam",
    description: "Morning reception for family and close relatives.",
    color: "#8FB5B0",
    category: "reception",
    tasks: ["Decor setup complete by 8AM", "Caterer arrives 7AM", "Photo & video team briefed", "Sound system check"],
  },
  {
    id: 3,
    title: "Bersanding & Pelamin",
    date: "16 March 2025",
    time: "10:00 AM",
    endTime: "1:00 PM",
    location: "Dewan Mulia, Shah Alam",
    description: "Bersanding ceremony at the pelamin. Traditional Malay wedding ceremony.",
    color: "#D4A0A0",
    category: "reception",
    tasks: ["Pelamin decoration by Dekor Seri", "Kompang group confirmed (12 pax)", "Sireh junjung prepared", "Bunga telur ready (300 pcs)"],
  },
  {
    id: 4,
    title: "Majlis Walimah — Sesi Malam",
    date: "16 March 2025",
    time: "6:00 PM",
    endTime: "10:00 PM",
    location: "Dewan Mulia, Shah Alam",
    description: "Evening reception for friends and extended family.",
    color: "#B8A4D8",
    category: "reception",
    tasks: ["DJ / Nasyid group booked", "Buffet dinner for 300 pax", "Photo booth setup"],
  },
  {
    id: 5,
    title: "Hantaran Exchange",
    date: "14 March 2025",
    time: "10:00 AM",
    endTime: "12:00 PM",
    location: "Rumah Pengantin Perempuan",
    description: "Exchange of hantaran gifts between families.",
    color: "#A8C5A0",
    category: "hantaran",
    tasks: ["Groom's hantaran: 9 trays", "Bride's hantaran: 7 trays", "Photographer booked for hantaran session"],
  },
  {
    id: 6,
    title: "Pre-Wedding Photoshoot",
    date: "1 March 2025",
    time: "7:00 AM",
    endTime: "12:00 PM",
    location: "Putrajaya Gardens & Masjid Putra",
    description: "Pre-wedding photography session at iconic Putrajaya locations.",
    color: "#90B8D8",
    category: "prep",
    tasks: ["Stylist: Puan Reza Makeup", "Outfits: 3 changes ready", "Props list confirmed with photographer"],
  },
];

const categoryColors: Record<string, string> = {
  akad: "#C9A96E",
  reception: "#8FB5B0",
  hantaran: "#A8C5A0",
  prep: "#90B8D8",
  other: "#B8A4D8",
};

export function SchedulePage() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ background: "linear-gradient(160deg, #F5EDE0 0%, #FBF8F4 100%)" }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Wedding Schedule</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>March 14–16, 2025</p>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}>
            <Plus size={20} color="white" />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-5 pb-6 pt-3 space-y-1">
        {events.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-3"
          >
            {/* Timeline line */}
            <div className="flex flex-col items-center" style={{ minWidth: 20 }}>
              <div className="w-4 h-4 rounded-full border-2 mt-4 shrink-0" style={{ background: event.color, borderColor: event.color }} />
              {i < events.length - 1 && <div className="w-0.5 flex-1 mt-1" style={{ background: "linear-gradient(180deg, " + event.color + "60, transparent)" }} />}
            </div>

            {/* Card */}
            <div className="flex-1 mb-3">
              <button
                className="w-full text-left rounded-2xl overflow-hidden"
                style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.08)" }}
                onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
              >
                <div className="h-1" style={{ background: event.color }} />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p style={{ fontFamily: "'Playfair Display', serif", color: "#2D2417", fontSize: "1rem" }}>{event.title}</p>
                      {event.arabicTitle && (
                        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.8rem", direction: "rtl" }}>{event.arabicTitle}</p>
                      )}
                    </div>
                    {expandedId === event.id ? <ChevronUp size={16} color="#8C7B6B" /> : <ChevronDown size={16} color="#8C7B6B" />}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={13} color="#8C7B6B" />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.75rem" }}>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={13} color="#8C7B6B" />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.75rem" }}>{event.time} – {event.endTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={13} color={event.color} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A4A3A", fontSize: "0.75rem" }}>{event.location}</span>
                  </div>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedId === event.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mx-2 mt-1 p-4 rounded-2xl" style={{ background: "#F5F0E8" }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A4A3A", fontSize: "0.82rem", marginBottom: "10px" }}>{event.description}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.8rem", fontWeight: 600, marginBottom: "6px" }}>Checklist:</p>
                      <div className="space-y-2">
                        {event.tasks.map((task, ti) => (
                          <div key={ti} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: event.color }}>
                              <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            </div>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A4A3A", fontSize: "0.8rem" }}>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
