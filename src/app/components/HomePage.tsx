import { Bell, ChevronRight, Heart, Calendar, Users, DollarSign, MapPin, Star } from "lucide-react";
import { motion } from "motion/react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const weddingDate = new Date("2025-03-15");
const today = new Date();
const daysLeft = Math.max(0, Math.ceil((weddingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

const quickActions = [
  { label: "Budget", icon: DollarSign, color: "#C9A96E", bg: "#FDF3E7", page: "budget" },
  { label: "Guests", icon: Users, color: "#8FB5B0", bg: "#E8F4F3", page: "guests" },
  { label: "Schedule", icon: Calendar, color: "#B8956A", bg: "#F5EDE0", page: "schedule" },
  { label: "Gallery", icon: Heart, color: "#D4A0A0", bg: "#FAF0F0", page: "gallery" },
];

const tasks = [
  { title: "Book Dewan Mulia Ballroom", due: "15 Jan 2025", done: true, priority: "high" },
  { title: "Confirm caterer — Nasi Arab Maju", due: "20 Jan 2025", done: true, priority: "high" },
  { title: "Fitting baju pengantin — 2nd visit", due: "28 Jan 2025", done: false, priority: "medium" },
  { title: "Send invitation cards", due: "1 Feb 2025", done: false, priority: "high" },
  { title: "Hantaran arrangement photoshoot", due: "5 Feb 2025", done: false, priority: "low" },
];

const upcomingEvents = [
  { title: "Akad Nikah", date: "15 Mar", time: "9:00 AM", location: "Masjid Al-Ikhlas" },
  { title: "Majlis Walimah", date: "15 Mar", time: "11:00 AM", location: "Dewan Mulia, Shah Alam" },
  { title: "Bersanding Ceremony", date: "16 Mar", time: "2:00 PM", location: "Dewan Mulia, Shah Alam" },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const completedTasks = tasks.filter(t => t.done).length;

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-5" style={{ background: "linear-gradient(160deg, #E8D5BE 0%, #F5EDE0 60%, #D4E8E4 100%)" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>Assalamualaikum,</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Siti & Ahmad</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("notifications")}
              className="w-10 h-10 rounded-full flex items-center justify-center relative"
              style={{ background: "white", boxShadow: "0 2px 8px rgba(184,149,106,0.2)" }}
            >
              <Bell size={18} color="#B8956A" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: "#C9A96E" }} />
            </button>
            <div
              className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}
            >
              <span style={{ color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600 }}>SA</span>
            </div>
          </div>
        </div>

        {/* Countdown card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #C9A96E, #8FB5B0)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10" style={{ background: "white", transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full opacity-10" style={{ background: "white", transform: "translate(-20%, 20%)" }} />

          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.85)", fontSize: "0.8rem" }}>Days until your wedding</p>
          <div className="flex items-end gap-3 mt-1">
            <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "3rem", lineHeight: 1 }}>{daysLeft}</span>
            <div className="mb-1">
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.9)", fontSize: "0.85rem" }}>days to go</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>15 March 2025</p>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            {[
              { label: "Budget Used", value: "68%" },
              { label: "Guests Confirmed", value: "142" },
              { label: "Tasks Done", value: `${completedTasks}/${tasks.length}` },
            ].map((stat, i) => (
              <div key={i} className="flex-1 rounded-xl py-2 px-2 text-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "1rem" }}>{stat.value}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "0.6rem" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* Quick actions */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Quick Access</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.92 }}
                onClick={() => onNavigate(action.page)}
                className="flex flex-col items-center gap-2 py-3 rounded-2xl"
                style={{ background: action.bg }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: action.color + "22" }}>
                  <action.icon size={20} color={action.color} />
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.72rem" }}>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Upcoming events */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Upcoming Events</h3>
            <button onClick={() => onNavigate("schedule")} className="flex items-center gap-1">
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.8rem" }}>View all</span>
              <ChevronRight size={14} color="#B8956A" />
            </button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3 p-3 rounded-2xl"
                style={{ background: "#FFFFFF", boxShadow: "0 2px 12px rgba(184,149,106,0.08)" }}
              >
                <div className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #C9A96E22, #8FB5B022)" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", color: "#B8956A", fontSize: "1rem", lineHeight: 1 }}>{event.date.split(" ")[0]}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.65rem" }}>{event.date.split(" ")[1]}</span>
                </div>
                <div className="flex-1">
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontWeight: 500, fontSize: "0.9rem" }}>{event.title}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Calendar size={11} color="#8C7B6B" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.75rem" }}>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin size={11} color="#8FB5B0" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.75rem" }}>{event.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Task checklist */}
        <div className="pb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Tasks</h3>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-20 rounded-full overflow-hidden" style={{ background: "#F0EBE3" }}>
                <div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #C9A96E, #8FB5B0)", width: `${(completedTasks / tasks.length) * 100}%` }} />
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.75rem" }}>{completedTasks}/{tasks.length}</span>
            </div>
          </div>
          <div className="space-y-2">
            {tasks.map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-2xl"
                style={{ background: task.done ? "#F5F0E8" : "#FFFFFF", boxShadow: "0 2px 8px rgba(184,149,106,0.06)" }}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${task.done ? "border-transparent" : ""}`}
                  style={{ background: task.done ? "#C9A96E" : "transparent", borderColor: task.done ? "transparent" : "#C9A96E" }}>
                  {task.done && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                </div>
                <div className="flex-1">
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: task.done ? "#8C7B6B" : "#2D2417", fontSize: "0.85rem", textDecoration: task.done ? "line-through" : "none" }}>
                    {task.title}
                  </p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.72rem" }}>Due: {task.due}</p>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.65rem",
                    background: task.priority === "high" ? "#FFE8E8" : task.priority === "medium" ? "#FFF8E0" : "#E8F4F3",
                    color: task.priority === "high" ? "#C04040" : task.priority === "medium" ? "#A08030" : "#407060",
                  }}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
