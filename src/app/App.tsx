/* MARKER-MAKE-KIT-INVOKED */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { HomePage } from "./components/HomePage";
import { BudgetPage } from "./components/BudgetPage";
import { GuestListPage } from "./components/GuestListPage";
import { SchedulePage } from "./components/SchedulePage";
import { GalleryPage } from "./components/GalleryPage";
import { VendorPage } from "./components/VendorPage";
import { ProfilePage } from "./components/ProfilePage";
import { InvitationPage } from "./components/InvitationPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { SettingsPage } from "./components/SettingsPage";
import { MorePage } from "./components/MorePage";
import { BottomNav } from "./components/BottomNav";

type AppScreen = "splash" | "login" | "register" | "main";
type MainTab = "home" | "budget" | "guests" | "gallery" | "more";
type SubPage = "schedule" | "vendors" | "profile" | "invitation" | "notifications" | "settings" | null;

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("splash");
  const [activeTab, setActiveTab] = useState<MainTab>("home");
  const [subPage, setSubPage] = useState<SubPage>(null);

  const handleNavigate = (page: string) => {
    const subPages = ["schedule", "vendors", "profile", "invitation", "notifications", "settings"];
    if (subPages.includes(page)) {
      setSubPage(page as SubPage);
    } else if (["home", "budget", "guests", "gallery", "more"].includes(page)) {
      setActiveTab(page as MainTab);
      setSubPage(null);
    }
  };

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setSubPage(null);
  };

  const renderSubPage = () => {
    switch (subPage) {
      case "schedule": return <SchedulePage />;
      case "vendors": return <VendorPage />;
      case "profile": return <ProfilePage onNavigate={handleNavigate} />;
      case "invitation": return <InvitationPage />;
      case "notifications": return <NotificationsPage />;
      case "settings": return <SettingsPage onLogout={() => { setScreen("login"); setSubPage(null); }} />;
      default: return null;
    }
  };

  const renderMainTab = () => {
    switch (activeTab) {
      case "home": return <HomePage onNavigate={handleNavigate} />;
      case "budget": return <BudgetPage />;
      case "guests": return <GuestListPage />;
      case "gallery": return <GalleryPage />;
      case "more": return <MorePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{ background: "linear-gradient(135deg, #D4C4A8 0%, #C8DDD8 100%)" }}
    >
      {/* Mobile frame */}
      <div
        className="relative overflow-hidden flex flex-col"
        style={{
          width: "min(430px, 100vw)",
          height: "min(932px, 100vh)",
          borderRadius: "min(48px, 0px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.15)",
          background: "#FBF8F4",
        }}
      >
        {/* Status bar */}
        {screen !== "splash" && (
          <div
            className="flex items-center justify-between px-6 shrink-0"
            style={{ height: 44, background: "transparent", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}
          >
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.8rem", fontWeight: 600 }}>9:41</span>
            <div className="flex items-center gap-1.5">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <rect x="0" y="4" width="3" height="8" rx="1" fill="#7A5C3A" opacity="0.5"/>
                <rect x="4" y="2.5" width="3" height="9.5" rx="1" fill="#7A5C3A" opacity="0.7"/>
                <rect x="8" y="1" width="3" height="11" rx="1" fill="#7A5C3A"/>
                <rect x="12" y="0" width="3" height="12" rx="1" fill="#7A5C3A"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 2 C5 2 2.5 3.5 1 5.5 L2.5 7 C3.8 5.3 5.8 4 8 4 C10.2 4 12.2 5.3 13.5 7 L15 5.5 C13.5 3.5 11 2 8 2Z" fill="#7A5C3A"/>
                <path d="M8 5 C6.3 5 4.8 5.8 3.7 7 L5.2 8.5 C6 7.6 6.9 7 8 7 C9.1 7 10 7.6 10.8 8.5 L12.3 7 C11.2 5.8 9.7 5 8 5Z" fill="#7A5C3A"/>
                <circle cx="8" cy="10" r="1.5" fill="#7A5C3A"/>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#7A5C3A" strokeOpacity="0.35"/>
                <rect x="2" y="2" width="16" height="8" rx="2" fill="#7A5C3A"/>
                <path d="M23 4.5 C23.8 4.8 24.5 5.3 24.5 6 C24.5 6.7 23.8 7.2 23 7.5 V4.5Z" fill="#7A5C3A" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {screen === "splash" && (
            <motion.div key="splash" className="absolute inset-0 z-50" exit={{ opacity: 0 }}>
              <SplashScreen onFinish={() => setScreen("login")} />
            </motion.div>
          )}

          {screen === "login" && (
            <motion.div
              key="login"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div className="h-full pt-11 overflow-hidden">
                <LoginPage
                  onLogin={() => setScreen("main")}
                  onGoRegister={() => setScreen("register")}
                />
              </div>
            </motion.div>
          )}

          {screen === "register" && (
            <motion.div
              key="register"
              className="absolute inset-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <div className="h-full pt-11 overflow-hidden">
                <RegisterPage
                  onRegister={() => setScreen("main")}
                  onGoLogin={() => setScreen("login")}
                />
              </div>
            </motion.div>
          )}

          {screen === "main" && (
            <motion.div
              key="main"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex-1 overflow-hidden relative pt-11">
                <AnimatePresence mode="wait">
                  {subPage ? (
                    <motion.div
                      key={subPage}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.22 }}
                    >
                      {/* Back bar for sub-pages */}
                      <div
                        className="flex items-center gap-2 px-4 py-2 shrink-0"
                        style={{ borderBottom: "1px solid rgba(184,149,106,0.1)", background: "rgba(251,248,244,0.9)" }}
                      >
                        <button
                          onClick={() => setSubPage(null)}
                          className="flex items-center gap-1 py-1 px-2 rounded-xl"
                          style={{ background: "#F5F0E8" }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 3L5 8L10 13" stroke="#B8956A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.8rem" }}>Back</span>
                        </button>
                      </div>
                      <div className="h-full overflow-y-auto" style={{ height: "calc(100% - 42px)" }}>
                        {renderSubPage()}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeTab}
                      className="absolute inset-0"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {renderMainTab()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom nav */}
              {!subPage && (
                <BottomNav activeTab={activeTab} onTab={handleTabChange} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home indicator bar (like Android/iOS) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full" style={{ background: "rgba(184,149,106,0.3)" }} />
      </div>
    </div>
  );
}
