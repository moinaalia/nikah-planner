import { Plus, TrendingUp, Wallet, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const categories = [
  { name: "Venue & Dewan", budget: 15000, spent: 15000, color: "#C9A96E", icon: "🏛️" },
  { name: "Catering", budget: 12000, spent: 8500, color: "#8FB5B0", icon: "🍽️" },
  { name: "Attire & Hantaran", budget: 8000, spent: 5200, color: "#D4A0A0", icon: "👗" },
  { name: "Photography", budget: 5000, spent: 4500, color: "#A8C5A0", icon: "📸" },
  { name: "Decoration", budget: 4000, spent: 2800, color: "#B8A4D8", icon: "🌸" },
  { name: "Makeup & Hair", budget: 2500, spent: 1000, color: "#F0C070", icon: "💄" },
  { name: "Invitation Cards", budget: 1500, spent: 900, color: "#90B8D8", icon: "💌" },
  { name: "Miscellaneous", budget: 2000, spent: 600, color: "#C8B8A0", icon: "📦" },
];

const totalBudget = categories.reduce((a, c) => a + c.budget, 0);
const totalSpent = categories.reduce((a, c) => a + c.spent, 0);

const pieData = categories.map(c => ({ name: c.name, value: c.spent, color: c.color }));

const transactions = [
  { title: "Full payment — Dewan Mulia", amount: -15000, date: "10 Jan 2025", cat: "Venue" },
  { title: "Deposit caterer Nasi Arab Maju", amount: -3000, date: "8 Jan 2025", cat: "Catering" },
  { title: "Baju pengantin deposit", amount: -2000, date: "5 Jan 2025", cat: "Attire" },
  { title: "Photography 50% deposit", amount: -2250, date: "2 Jan 2025", cat: "Photography" },
  { title: "Wedding gift from uncle", amount: 2000, date: "1 Jan 2025", cat: "Income" },
];

export function BudgetPage() {
  const remaining = totalBudget - totalSpent;
  const pct = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ background: "linear-gradient(160deg, #FDF3E7 0%, #FBF8F4 100%)" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Budget Tracker</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>Track every ringgit wisely</p>
      </div>

      <div className="px-5 space-y-5 pb-6">
        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10" style={{ background: "white", transform: "translate(20%,-20%)" }} />
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={18} color="rgba(255,255,255,0.9)" />
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.85)", fontSize: "0.85rem" }}>Total Wedding Budget</span>
          </div>
          <p style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "2rem" }}>
            RM {totalBudget.toLocaleString()}
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.2)" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)", fontSize: "0.7rem" }}>Spent</p>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "1.1rem" }}>RM {totalSpent.toLocaleString()}</p>
            </div>
            <div className="flex-1 rounded-2xl p-3" style={{ background: "rgba(255,255,255,0.2)" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.75)", fontSize: "0.7rem" }}>Remaining</p>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "1.1rem" }}>RM {remaining.toLocaleString()}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="flex justify-between mb-1">
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "0.75rem" }}>Used {pct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.3)" }}>
              <div className="h-full rounded-full" style={{ background: "white", width: `${pct}%` }} />
            </div>
          </div>
        </motion.div>

        {/* Pie chart */}
        <div className="rounded-3xl p-5" style={{ background: "white", boxShadow: "0 2px 12px rgba(184,149,106,0.08)" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A", marginBottom: "12px" }}>Spending Breakdown</h3>
          <div className="flex items-center gap-4">
            <div style={{ width: 120, height: 120 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={32} outerRadius={55} paddingAngle={2} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => `RM ${v.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5">
              {categories.slice(0, 5).map((cat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat.color }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#5A4A3A", fontSize: "0.72rem", flex: 1 }}>{cat.name}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.7rem" }}>{Math.round((cat.spent / totalSpent) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category list */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Categories</h3>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}>
              <Plus size={14} color="white" />
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: "white", fontSize: "0.75rem" }}>Add</span>
            </button>
          </div>
          <div className="space-y-3">
            {categories.map((cat, i) => {
              const catPct = Math.round((cat.spent / cat.budget) * 100);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-2xl"
                  style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(184,149,106,0.07)" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ fontSize: "1.2rem" }}>{cat.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.875rem", fontWeight: 500 }}>{cat.name}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: cat.spent >= cat.budget ? "#C04040" : "#7A5C3A", fontSize: "0.8rem" }}>
                          RM {cat.spent.toLocaleString()} / {cat.budget.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#F0EBE3" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(catPct, 100)}%`, background: cat.color }} />
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.7rem", marginTop: "4px" }}>{catPct}% used</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="pb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Recent Transactions</h3>
            <button className="flex items-center gap-1">
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.8rem" }}>View all</span>
              <ChevronRight size={14} color="#B8956A" />
            </button>
          </div>
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(184,149,106,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tx.amount > 0 ? "#E8F4F3" : "#FDF3E7" }}>
                  <TrendingUp size={18} color={tx.amount > 0 ? "#8FB5B0" : "#C9A96E"} style={{ transform: tx.amount < 0 ? "rotate(180deg)" : "none" }} />
                </div>
                <div className="flex-1">
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.85rem" }}>{tx.title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.72rem" }}>{tx.date} · {tx.cat}</p>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: tx.amount > 0 ? "#408060" : "#C9A96E", fontWeight: 600, fontSize: "0.875rem" }}>
                  {tx.amount > 0 ? "+" : ""}RM {Math.abs(tx.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
