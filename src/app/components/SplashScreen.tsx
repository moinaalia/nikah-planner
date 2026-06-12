import { useEffect } from "react";
import { motion } from "motion/react";

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const t = setTimeout(onFinish, 2800);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #E8D5BE 0%, #F5EDE0 35%, #D4E8E4 100%)" }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #C9A96E, transparent)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #8FB5B0, transparent)", transform: "translate(-30%, 30%)" }} />

      {/* Arabesque top ornament */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mb-6"
      >
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
          <path d="M60 5 C40 5 20 15 10 25 C20 20 40 18 60 18 C80 18 100 20 110 25 C100 15 80 5 60 5Z" fill="#C9A96E" opacity="0.6"/>
          <path d="M60 8 C45 8 28 16 18 23 C28 19 45 17 60 17 C75 17 92 19 102 23 C92 16 75 8 60 8Z" fill="#C9A96E" opacity="0.4"/>
          <circle cx="60" cy="5" r="3" fill="#C9A96E"/>
          <circle cx="20" cy="22" r="2" fill="#C9A96E" opacity="0.5"/>
          <circle cx="100" cy="22" r="2" fill="#C9A96E" opacity="0.5"/>
        </svg>
      </motion.div>

      {/* Logo ring */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, type: "spring", stiffness: 120 }}
        className="relative mb-6"
      >
        <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-lg" style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            {/* Rings */}
            <circle cx="24" cy="32" r="10" stroke="white" strokeWidth="2.5" fill="none"/>
            <circle cx="40" cy="32" r="10" stroke="white" strokeWidth="2.5" fill="none"/>
            {/* Heart */}
            <path d="M32 22 C32 22 28 18 24 18 C18 18 14 22 14 27 C14 35 24 42 32 48 C40 42 50 35 50 27 C50 22 46 18 40 18 C36 18 32 22 32 22Z" fill="white" opacity="0.85"/>
          </svg>
        </div>
        <div className="absolute -inset-2 rounded-full border-2 opacity-30" style={{ borderColor: "#C9A96E" }} />
        <div className="absolute -inset-4 rounded-full border opacity-15" style={{ borderColor: "#C9A96E" }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center"
      >
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", letterSpacing: "0.06em" }}>
          Nikah Planner
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.875rem", letterSpacing: "0.14em" }}>
          YOUR DREAM WEDDING AWAITS
        </p>
      </motion.div>

      {/* Bottom ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12"
      >
        <div className="flex gap-2 items-center">
          <div className="h-px w-12 opacity-40" style={{ background: "#C9A96E" }} />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2 L11.5 7.5 L17 7.5 L12.5 11 L14 16.5 L10 13 L6 16.5 L7.5 11 L3 7.5 L8.5 7.5 Z" fill="#C9A96E" opacity="0.6"/>
          </svg>
          <div className="h-px w-12 opacity-40" style={{ background: "#C9A96E" }} />
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.7rem", textAlign: "center", marginTop: "8px" }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
        </p>
      </motion.div>
    </div>
  );
}
