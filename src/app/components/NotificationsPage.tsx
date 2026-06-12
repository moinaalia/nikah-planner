import { Bell, Calendar, Users, DollarSign, MessageCircle, CheckCircle, AlertCircle, Info } from "lucide-react";
import { motion } from "motion/react";

type NotifType = "reminder" | "rsvp" | "payment" | "message" | "success" | "alert";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: 1, type: "reminder", title: "Fitting appointment tomorrow!", body: "Don't forget your 2nd baju pengantin fitting at Songket Warisan Boutique, 10:00 AM.", time: "1 hour ago", read: false },
  { id: 2, type: "rsvp", title: "New RSVP received", body: "En. Kamal & Keluarga have declined the invitation. Your guest count updated to 142.", time: "3 hours ago", read: false },
  { id: 3, type: "payment", title: "Payment due in 7 days", body: "Balance payment for Studio Imago Photography: RM 2,250 due on 20 Jan 2025.", time: "Yesterday", read: false },
  { id: 4, type: "success", title: "Venue booking confirmed! 🎉", body: "Dewan Mulia Shah Alam has confirmed your booking for 15–16 March 2025.", time: "2 days ago", read: true },
  { id: 5, type: "message", title: "Message from caterer", body: "Nasi Arab Maju: 'Menu tasting session available this Saturday. Please confirm your slot.'", time: "2 days ago", read: true },
  { id: 6, type: "alert", title: "Budget alert", body: "Photography category is at 90% of budget. Consider reviewing if additional services are needed.", time: "3 days ago", read: true },
  { id: 7, type: "rsvp", title: "5 new RSVPs received", body: "Dr. Rozana, Puan Salmah, Nur Aisyah and 2 others have confirmed attendance.", time: "4 days ago", read: true },
  { id: 8, type: "reminder", title: "Send invitations soon", body: "Wedding is in 54 days. Recommended to send invitations at least 4 weeks before.", time: "5 days ago", read: true },
];

const typeConfig: Record<NotifType, { icon: React.ReactNode; color: string; bg: string }> = {
  reminder: { icon: <Bell size={18} />, color: "#B8956A", bg: "#FDF3E7" },
  rsvp: { icon: <Users size={18} />, color: "#8FB5B0", bg: "#E8F4F3" },
  payment: { icon: <DollarSign size={18} />, color: "#C04040", bg: "#FFE8E8" },
  message: { icon: <MessageCircle size={18} />, color: "#7080C0", bg: "#EEF0F8" },
  success: { icon: <CheckCircle size={18} />, color: "#408060", bg: "#E8F4EE" },
  alert: { icon: <AlertCircle size={18} />, color: "#A08030", bg: "#FFF8E0" },
};

export function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ background: "linear-gradient(160deg, #F0EEF8 0%, #FBF8F4 100%)" }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Notifications</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>{unreadCount} unread notifications</p>
          </div>
          <button style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.8rem" }}>Mark all read</button>
        </div>
      </div>

      <div className="px-5 pb-6 pt-3">
        {/* Unread section */}
        {unreadCount > 0 && (
          <div className="mb-4">
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.78rem", marginBottom: "8px", letterSpacing: "0.05em" }}>NEW</p>
            <div className="space-y-2">
              {notifications.filter(n => !n.read).map((notif, i) => (
                <NotifCard key={notif.id} notif={notif} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Read section */}
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.78rem", marginBottom: "8px", letterSpacing: "0.05em" }}>EARLIER</p>
          <div className="space-y-2">
            {notifications.filter(n => n.read).map((notif, i) => (
              <NotifCard key={notif.id} notif={notif} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotifCard({ notif, index }: { notif: Notification; index: number }) {
  const config = typeConfig[notif.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-3 p-4 rounded-2xl relative"
      style={{
        background: notif.read ? "#FFFFFF" : config.bg,
        boxShadow: "0 2px 8px rgba(184,149,106,0.06)",
        border: notif.read ? "none" : `1px solid ${config.color}20`,
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: config.bg, color: config.color }}>
        {config.icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.875rem", fontWeight: notif.read ? 400 : 600 }}>{notif.title}</p>
          {!notif.read && <div className="w-2 h-2 rounded-full shrink-0 mt-1 ml-2" style={{ background: config.color }} />}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A4A3A", fontSize: "0.78rem", marginTop: "2px", lineHeight: 1.4 }}>{notif.body}</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.7rem", marginTop: "6px" }}>{notif.time}</p>
      </div>
    </motion.div>
  );
}
