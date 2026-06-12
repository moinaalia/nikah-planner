import { Home, Wallet, Users, Image, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";

type Tab = "home" | "budget" | "guests" | "gallery" | "more";

interface BottomNavProps {
  activeTab: Tab;
  onTab: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.FC<{ size: number; color: string }> }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "guests", label: "Guests", icon: Users },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "more", label: "More", icon: MoreHorizontal },
];

export function BottomNav({ activeTab, onTab }: BottomNavProps) {
  return (
    <div
      className="flex items-center justify-around px-2 py-2 shrink-0"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(184,149,106,0.15)",
        boxShadow: "0 -4px 20px rgba(184,149,106,0.1)",
      }}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTab(tab.id)}
            className="flex flex-col items-center gap-0.5 flex-1 py-1 rounded-2xl transition-all relative"
          >
            {isActive && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 rounded-2xl"
                style={{ background: "linear-gradient(135deg, #C9A96E15, #8FB5B015)" }}
              />
            )}
            <div className="relative z-10">
              <tab.icon size={22} color={isActive ? "#B8956A" : "#A09080"} />
            </div>
            <span
              className="relative z-10"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: isActive ? "#B8956A" : "#A09080",
                fontSize: "0.65rem",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-dot"
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: "#C9A96E" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
