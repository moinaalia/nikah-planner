import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

interface RegisterPageProps {
  onRegister: () => void;
  onGoLogin: () => void;
}

export function RegisterPage({ onRegister, onGoLogin }: RegisterPageProps) {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<"bride" | "groom" | "planner">("bride");

  const roleOptions = [
    { id: "bride", label: "Bride", emoji: "👰" },
    { id: "groom", label: "Groom", emoji: "🤵" },
    { id: "planner", label: "Planner", emoji: "📋" },
  ] as const;

  return (
    <div className="h-full w-full overflow-y-auto" style={{ background: "#FBF8F4" }}>
      {/* Header */}
      <div className="relative px-6 pt-8 pb-4" style={{ background: "linear-gradient(180deg, #E8D5BE 0%, #FBF8F4 100%)" }}>
        <button onClick={onGoLogin} className="flex items-center gap-1 mb-4">
          <ChevronLeft size={20} color="#B8956A" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.875rem" }}>Back</span>
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>
            Create Account
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.875rem", marginTop: "4px" }}>
            Begin your wedding journey today
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mt-2 rounded-3xl p-6 shadow-lg mb-6"
        style={{ background: "#FFFFFF" }}
      >
        {/* Role selector */}
        <div className="mb-5">
          <label style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.85rem", display: "block", marginBottom: "8px" }}>
            I am a...
          </label>
          <div className="flex gap-2">
            {roleOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setRole(opt.id)}
                className="flex-1 py-2.5 rounded-2xl flex flex-col items-center gap-1 transition-all"
                style={{
                  background: role === opt.id ? "linear-gradient(135deg, #C9A96E, #B8956A)" : "#F5F0E8",
                  border: `1.5px solid ${role === opt.id ? "#C9A96E" : "rgba(184,149,106,0.2)"}`,
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{opt.emoji}</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: role === opt.id ? "white" : "#7A5C3A", fontSize: "0.75rem" }}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <InputField icon={<User size={18} color="#B8956A" />} placeholder="Full Name" type="text" label="Full Name" />

        {/* Email */}
        <InputField icon={<Mail size={18} color="#B8956A" />} placeholder="your@email.com" type="email" label="Email Address" />

        {/* Phone */}
        <InputField icon={<Phone size={18} color="#B8956A" />} placeholder="+60 12-345 6789" type="tel" label="Phone Number" />

        {/* Password */}
        <div className="mb-4">
          <label style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.85rem", display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "#F5F0E8", border: "1.5px solid rgba(184,149,106,0.25)" }}>
            <Lock size={18} color="#B8956A" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Min 8 characters"
              className="flex-1 bg-transparent outline-none"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.9rem" }}
            />
            <button onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={18} color="#8C7B6B" /> : <Eye size={18} color="#8C7B6B" />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mb-5">
          <input type="checkbox" id="terms" className="mt-1" style={{ accentColor: "#B8956A" }} />
          <label htmlFor="terms" style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem", lineHeight: "1.4" }}>
            I agree to the <span style={{ color: "#B8956A" }}>Terms of Service</span> and{" "}
            <span style={{ color: "#B8956A" }}>Privacy Policy</span>
          </label>
        </div>

        <button
          onClick={onRegister}
          className="w-full py-3.5 rounded-2xl shadow-md transition-transform active:scale-95"
          style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)", fontFamily: "'DM Sans', sans-serif", color: "white", letterSpacing: "0.05em" }}
        >
          Create Account
        </button>
      </motion.div>

      <div className="text-center mb-8">
        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.875rem" }}>
          Already have an account?{" "}
        </span>
        <button onClick={onGoLogin} style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.875rem", fontWeight: 600 }}>
          Sign in
        </button>
      </div>
    </div>
  );
}

function InputField({ icon, placeholder, type, label }: { icon: React.ReactNode; placeholder: string; type: string; label: string }) {
  return (
    <div className="mb-4">
      <label style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.85rem", display: "block", marginBottom: "6px" }}>
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "#F5F0E8", border: "1.5px solid rgba(184,149,106,0.25)" }}>
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.9rem" }}
        />
      </div>
    </div>
  );
}
