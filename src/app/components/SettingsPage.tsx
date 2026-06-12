import { useState } from "react";
import { Bell, Globe, Moon, Shield, HelpCircle, LogOut, ChevronRight, Palette, Calendar, Users } from "lucide-react";
import { motion } from "motion/react";

interface ToggleRowProps {
  label: string;
  desc?: string;
  checked: boolean;
  onChange: () => void;
}

function ToggleRow({ label, desc, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.875rem" }}>{label}</p>
        {desc && <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.75rem" }}>{desc}</p>}
      </div>
      <button
        onClick={onChange}
        className="w-12 h-6 rounded-full transition-all relative"
        style={{ background: checked ? "linear-gradient(135deg, #C9A96E, #B8956A)" : "#D4C4A8" }}
      >
        <div
          className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm"
          style={{ left: checked ? "calc(100% - 21px)" : "2px" }}
        />
      </button>
    </div>
  );
}

function NavRow({ icon, label, value, onClick }: { icon: React.ReactNode; label: string; value?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-3.5"
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#F5F0E8" }}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.875rem" }}>{label}</p>
      </div>
      {value && <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>{value}</span>}
      <ChevronRight size={16} color="#B8956A" />
    </button>
  );
}

export function SettingsPage({ onLogout }: { onLogout: () => void }) {
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifReminder, setNotifReminder] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [islahmicCalendar, setIslamicCalendar] = useState(true);
  const [privacyLock, setPrivacyLock] = useState(false);

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ background: "linear-gradient(160deg, #F0EBE3 0%, #FBF8F4 100%)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Settings</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>Customize your app experience</p>
      </div>

      <div className="px-5 pb-6 space-y-4 pt-3">
        {/* Profile quick card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-4 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, #C9A96E22, #8FB5B022)", border: "1px solid rgba(184,149,106,0.2)" }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "1.2rem" }}>SA</span>
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", fontSize: "1rem" }}>Siti & Ahmad</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.78rem" }}>siti.nurhaliza@gmail.com</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.72rem" }}>Wedding: 15 March 2025</p>
          </div>
          <button className="px-3 py-1.5 rounded-xl" style={{ background: "rgba(184,149,106,0.15)" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.78rem" }}>Edit</span>
          </button>
        </motion.div>

        {/* Notifications */}
        <SettingsSection title="Notifications" icon={<Bell size={14} color="#B8956A" />}>
          <ToggleRow label="Push Notifications" desc="Get alerts on your device" checked={notifPush} onChange={() => setNotifPush(!notifPush)} />
          <div className="h-px" style={{ background: "rgba(184,149,106,0.1)" }} />
          <ToggleRow label="Email Notifications" checked={notifEmail} onChange={() => setNotifEmail(!notifEmail)} />
          <div className="h-px" style={{ background: "rgba(184,149,106,0.1)" }} />
          <ToggleRow label="Wedding Reminders" desc="Countdown & task alerts" checked={notifReminder} onChange={() => setNotifReminder(!notifReminder)} />
        </SettingsSection>

        {/* Appearance */}
        <SettingsSection title="Appearance" icon={<Palette size={14} color="#B8956A" />}>
          <ToggleRow label="Dark Mode" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <div className="h-px" style={{ background: "rgba(184,149,106,0.1)" }} />
          <NavRow icon={<Globe size={16} color="#B8956A" />} label="Language" value="English" />
          <div className="h-px" style={{ background: "rgba(184,149,106,0.1)" }} />
          <ToggleRow label="Show Islamic Calendar" desc="Hijri date display" checked={islahmicCalendar} onChange={() => setIslamicCalendar(!islahmicCalendar)} />
        </SettingsSection>

        {/* Wedding settings */}
        <SettingsSection title="Wedding Details" icon={<Calendar size={14} color="#B8956A" />}>
          <NavRow icon={<Calendar size={16} color="#C9A96E" />} label="Wedding Date" value="15 Mar 2025" />
          <div className="h-px" style={{ background: "rgba(184,149,106,0.1)" }} />
          <NavRow icon={<Users size={16} color="#8FB5B0" />} label="Guest Limit" value="350 pax" />
          <div className="h-px" style={{ background: "rgba(184,149,106,0.1)" }} />
          <NavRow icon={<Globe size={16} color="#A8C5A0" />} label="Wedding Theme" value="Sage & Gold" />
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection title="Privacy & Security" icon={<Shield size={14} color="#B8956A" />}>
          <ToggleRow label="App Lock (PIN)" desc="Require PIN to open app" checked={privacyLock} onChange={() => setPrivacyLock(!privacyLock)} />
          <div className="h-px" style={{ background: "rgba(184,149,106,0.1)" }} />
          <NavRow icon={<Shield size={16} color="#8080C0" />} label="Privacy Policy" />
          <div className="h-px" style={{ background: "rgba(184,149,106,0.1)" }} />
          <NavRow icon={<HelpCircle size={16} color="#80A0C0" />} label="Help & Support" />
        </SettingsSection>

        {/* App info */}
        <div className="rounded-3xl p-4" style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.08)" }}>
          <div className="text-center mb-3">
            <p style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", fontSize: "1rem" }}>Nikah Planner</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.75rem" }}>Version 2.4.1 · Made with ❤️ for Muslim couples</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ background: "#FFE8E8", border: "1px solid rgba(192,64,64,0.2)" }}
        >
          <LogOut size={18} color="#C04040" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#C04040", fontWeight: 500 }}>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

function SettingsSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl px-5 py-1" style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.08)" }}>
      <div className="flex items-center gap-2 py-3 border-b" style={{ borderColor: "rgba(184,149,106,0.1)" }}>
        {icon}
        <span style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", fontSize: "0.9rem" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}
