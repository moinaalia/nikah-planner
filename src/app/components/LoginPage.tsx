import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { motion } from "motion/react";

interface LoginPageProps {
  onLogin: () => void;
  onGoRegister: () => void;
}

export function LoginPage({ onLogin, onGoRegister }: LoginPageProps) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }
    setError(null);
    onLogin();
  };

  return (
    <div className="h-full w-full overflow-y-auto" style={{ background: "linear-gradient(180deg, #E8D5BE 0%, #FBF8F4 40%)" }}>
      {/* Header illustration */}
      <div className="relative flex flex-col items-center pt-10 pb-8 px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-md"
          style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 8 C20 8 16 5 12 5 C6 5 2 9 2 14 C2 22 12 29 20 35 C28 29 38 22 38 14 C38 9 34 5 28 5 C24 5 20 8 20 8Z" fill="white" opacity="0.9"/>
          </svg>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", textAlign: "center" }}>
            Welcome Back
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.875rem", textAlign: "center", marginTop: "4px" }}>
            Sign in to continue planning your special day
          </p>
        </motion.div>
      </div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mx-4 rounded-3xl p-6 shadow-lg"
        style={{ background: "#FFFFFF" }}
      >
        {error && (
          <div
            className="mb-4 px-3 py-3 rounded-xl"
            style={{ background: "#FDECEC", color: "#C0392B", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}
          >
            {error}
          </div>
        )}
        {/* Email */}
        <div className="mb-4">
          <label style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.85rem", display: "block", marginBottom: "6px" }}>
            Email Address
          </label>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "#F5F0E8", border: "1.5px solid rgba(184,149,106,0.25)" }}>
            <Mail size={18} color="#B8956A" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent outline-none"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.9rem" }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.85rem", display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "#F5F0E8", border: "1.5px solid rgba(184,149,106,0.25)" }}>
            <Lock size={18} color="#B8956A" />
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="flex-1 bg-transparent outline-none"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.9rem" }}
            />
            <button onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={18} color="#8C7B6B" /> : <Eye size={18} color="#8C7B6B" />}
            </button>
          </div>
          <div className="text-right mt-2">
            <button style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.8rem" }}>
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="w-full py-3.5 rounded-2xl shadow-md transition-transform active:scale-95"
          style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)", fontFamily: "'DM Sans', sans-serif", color: "white", letterSpacing: "0.05em" }}
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px" style={{ background: "rgba(184,149,106,0.2)" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>or continue with</span>
          <div className="flex-1 h-px" style={{ background: "rgba(184,149,106,0.2)" }} />
        </div>

        {/* Social buttons */}
        <div className="flex gap-3">
          {["G", "F"].map((letter, i) => (
            <button
              key={i}
              className="flex-1 py-3 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-95"
              style={{ background: "#F5F0E8", border: "1.5px solid rgba(184,149,106,0.2)" }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontWeight: 600, fontSize: "0.9rem" }}>
                {letter === "G" ? "Google" : "Facebook"}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Register link */}
      <div className="text-center mt-6 mb-8">
        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.875rem" }}>
          Don't have an account?{" "}
        </span>
        <button onClick={onGoRegister} style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.875rem", fontWeight: 600 }}>
          Register now
        </button>
      </div>
    </div>
  );
}
