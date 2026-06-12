import { useState } from "react";
import { Star, Phone, MapPin, Check, Search, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

type VendorCategory = "All" | "Venue" | "Catering" | "Photography" | "Makeup" | "Decoration" | "Attire" | "Entertainment";

interface Vendor {
  id: number;
  name: string;
  category: VendorCategory;
  rating: number;
  reviews: number;
  price: string;
  location: string;
  booked: boolean;
  featured: boolean;
  tags: string[];
  emoji: string;
}

const vendors: Vendor[] = [
  { id: 1, name: "Dewan Mulia Shah Alam", category: "Venue", rating: 4.9, reviews: 312, price: "RM 15,000 – 25,000", location: "Shah Alam, Selangor", booked: true, featured: true, tags: ["Air-conditioned", "1000 pax", "Halal"], emoji: "🏛️" },
  { id: 2, name: "Nasi Arab Maju Catering", category: "Catering", rating: 4.7, reviews: 189, price: "RM 45/pax", location: "Subang Jaya", booked: true, featured: true, tags: ["Halal certified", "Malay & Arabic", "300–1000 pax"], emoji: "🍽️" },
  { id: 3, name: "Studio Imago Photography", category: "Photography", rating: 4.8, reviews: 245, price: "RM 4,500 – 8,000", location: "Kuala Lumpur", booked: true, featured: false, tags: ["Full day", "2 Photographers", "Drone"], emoji: "📸" },
  { id: 4, name: "Puan Reza Artistry", category: "Makeup", rating: 5.0, reviews: 98, price: "RM 800 – 1,500", location: "Ampang, KL", booked: false, featured: true, tags: ["Bridal specialist", "Tudung styling", "Airbrush"], emoji: "💄" },
  { id: 5, name: "Bunga Raya Decoration", category: "Decoration", rating: 4.6, reviews: 167, price: "RM 3,500 – 7,000", location: "Petaling Jaya", booked: false, featured: false, tags: ["Pelamin", "Floral arch", "Table deco"], emoji: "🌸" },
  { id: 6, name: "Songket Warisan Boutique", category: "Attire", rating: 4.7, reviews: 134, price: "RM 1,200 – 4,000", location: "Jalan Masjid India, KL", booked: false, featured: false, tags: ["Custom made", "Rental available", "Songket & Lace"], emoji: "👗" },
  { id: 7, name: "Kompang Seni Budaya", category: "Entertainment", rating: 4.5, reviews: 56, price: "RM 400 – 800", location: "Shah Alam", booked: false, featured: false, tags: ["12 pax group", "Traditional", "Nasyid"], emoji: "🥁" },
];

const categories: VendorCategory[] = ["All", "Venue", "Catering", "Photography", "Makeup", "Decoration", "Attire", "Entertainment"];

export function VendorPage() {
  const [activeCategory, setActiveCategory] = useState<VendorCategory>("All");
  const [search, setSearch] = useState("");

  const filtered = vendors.filter(v => {
    const matchCat = activeCategory === "All" || v.category === activeCategory;
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const bookedCount = vendors.filter(v => v.booked).length;

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ background: "linear-gradient(160deg, #F5F0FF 0%, #FBF8F4 100%)" }}>
        <div className="flex justify-between items-center">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Vendor Booking</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>{bookedCount}/{vendors.length} vendors confirmed</p>
          </div>
          <div className="px-3 py-1.5 rounded-full" style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", color: "white", fontSize: "0.75rem" }}>{bookedCount} Booked</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 space-y-4">
        {/* Search */}
        <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(184,149,106,0.08)" }}>
          <Search size={18} color="#8C7B6B" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search vendors..."
            className="flex-1 bg-transparent outline-none"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontSize: "0.9rem" }}
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-3.5 py-1.5 rounded-full transition-all"
              style={{
                background: activeCategory === cat ? "linear-gradient(135deg, #C9A96E, #B8956A)" : "#F5F0E8",
                border: `1px solid ${activeCategory === cat ? "#C9A96E" : "rgba(184,149,106,0.2)"}`,
              }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: activeCategory === cat ? "white" : "#7A5C3A", fontSize: "0.78rem" }}>{cat}</span>
            </button>
          ))}
        </div>

        {/* Vendor cards */}
        <div className="space-y-3">
          {filtered.map((vendor, i) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(184,149,106,0.08)" }}
            >
              <div className="flex gap-4 p-4">
                {/* Emoji icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: "#F5F0E8" }}>
                  <span style={{ fontSize: "1.8rem" }}>{vendor.emoji}</span>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#2D2417", fontWeight: 500, fontSize: "0.9rem" }}>{vendor.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star size={12} fill="#C9A96E" color="#C9A96E" />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.75rem" }}>{vendor.rating}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.72rem" }}>({vendor.reviews})</span>
                      </div>
                    </div>
                    {vendor.booked ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{ background: "#E8F4EE" }}>
                        <Check size={11} color="#408060" />
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#408060", fontSize: "0.68rem" }}>Booked</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full" style={{ background: "#FDF3E7" }}>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.68rem" }}>Available</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-1.5">
                    <MapPin size={11} color="#8C7B6B" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.72rem" }}>{vendor.location}</span>
                  </div>

                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.8rem", fontWeight: 500, marginTop: "4px" }}>{vendor.price}</p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {vendor.tags.map((tag, ti) => (
                      <span key={ti} className="px-2 py-0.5 rounded-full" style={{ background: "#F0EBE3", fontFamily: "'DM Sans', sans-serif", color: "#7A5C3A", fontSize: "0.65rem" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action row */}
              {!vendor.booked && (
                <div className="flex border-t px-4 py-3 gap-3" style={{ borderColor: "rgba(184,149,106,0.12)" }}>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl" style={{ background: "#F5F0E8" }}>
                    <Phone size={15} color="#B8956A" />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "#B8956A", fontSize: "0.8rem" }}>Contact</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl" style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "white", fontSize: "0.8rem" }}>Book Now</span>
                    <ChevronRight size={15} color="white" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
