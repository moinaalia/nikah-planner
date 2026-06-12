import { useState } from "react";
import { Heart, Search, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const categories = ["All", "Venue", "Decoration", "Florals", "Attire", "Pelamin", "Table Setting", "Lighting"];

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  liked: boolean;
  unsplashId: string;
  color: string;
}

const items: GalleryItem[] = [
  { id: 1, title: "Grand Pelamin Setup", category: "Pelamin", liked: true, unsplashId: "1519741497674-4f5e0b9f7c8a", color: "#F5EDE0" },
  { id: 2, title: "Floral Arch", category: "Florals", liked: false, unsplashId: "1465495976275-dac563d3e291", color: "#E8F4F3" },
  { id: 3, title: "Rose Gold Table", category: "Table Setting", liked: true, unsplashId: "1608897013039-887f21d9f560", color: "#FDF3E7" },
  { id: 4, title: "Dewan Mulia Interior", category: "Venue", liked: false, unsplashId: "1519167758481-83f550bb49b3", color: "#F0EBE3" },
  { id: 5, title: "White Orchid Centerpiece", category: "Florals", liked: true, unsplashId: "1542314831-068cd1dbfeeb", color: "#E8F4F3" },
  { id: 6, title: "Baju Pengantin — Gold Songket", category: "Attire", liked: true, unsplashId: "1548449122-a79f75a37d1f", color: "#FDF3E7" },
  { id: 7, title: "Fairy Lights Canopy", category: "Lighting", liked: false, unsplashId: "1530103862676-de8c9debad1d", color: "#F5EDE0" },
  { id: 8, title: "Pelamin Minimalist", category: "Pelamin", liked: false, unsplashId: "1511795409834-ef04bbd61622", color: "#F0EBE3" },
  { id: 9, title: "Garden Ceremony Setup", category: "Decoration", liked: true, unsplashId: "1469371670807-013ccf25f16a", color: "#E8F4F3" },
];

const UNSPLASH_PHOTOS: Record<string, string> = {
  "1519741497674-4f5e0b9f7c8a": "https://images.unsplash.com/photo-1519741497674-4f5e0b9f7c8a?w=400&h=300&fit=crop&auto=format",
  "1465495976275-dac563d3e291": "https://images.unsplash.com/photo-1465495976275-dac563d3e291?w=400&h=300&fit=crop&auto=format",
  "1608897013039-887f21d9f560": "https://images.unsplash.com/photo-1608897013039-887f21d9f560?w=400&h=300&fit=crop&auto=format",
  "1519167758481-83f550bb49b3": "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop&auto=format",
  "1542314831-068cd1dbfeeb": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop&auto=format",
  "1548449122-a79f75a37d1f": "https://images.unsplash.com/photo-1548449122-a79f75a37d1f?w=400&h=300&fit=crop&auto=format",
  "1530103862676-de8c9debad1d": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop&auto=format",
  "1511795409834-ef04bbd61622": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&auto=format",
  "1469371670807-013ccf25f16a": "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop&auto=format",
};

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedItems, setLikedItems] = useState(new Set(items.filter(i => i.liked).map(i => i.id)));
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filtered = items.filter(item => activeCategory === "All" || item.category === activeCategory);

  const toggleLike = (id: number) => {
    setLikedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4" style={{ background: "linear-gradient(160deg, #FAF0F0 0%, #FBF8F4 100%)" }}>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#7A5C3A" }}>Decoration Gallery</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8C7B6B", fontSize: "0.8rem" }}>{items.length} inspiration photos saved</p>
          </div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C9A96E, #B8956A)" }}>
            <Plus size={20} color="white" />
          </button>
        </div>
      </div>

      <div className="px-5 pb-6">
        {/* Category scroll */}
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1" style={{ scrollbarWidth: "none" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-4 py-1.5 rounded-full transition-all"
              style={{
                background: activeCategory === cat ? "linear-gradient(135deg, #C9A96E, #B8956A)" : "#F5F0E8",
                border: `1px solid ${activeCategory === cat ? "#C9A96E" : "rgba(184,149,106,0.2)"}`,
              }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", color: activeCategory === cat ? "white" : "#7A5C3A", fontSize: "0.8rem" }}>{cat}</span>
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl overflow-hidden relative cursor-pointer"
              style={{ background: item.color, aspectRatio: i % 3 === 0 ? "3/4" : "4/3" }}
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={UNSPLASH_PHOTOS[item.unsplashId]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)" }} />
              {/* Like button */}
              <button
                className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.9)" }}
                onClick={e => { e.stopPropagation(); toggleLike(item.id); }}
              >
                <Heart size={15} fill={likedItems.has(item.id) ? "#C04040" : "none"} color={likedItems.has(item.id) ? "#C04040" : "#8C7B6B"} />
              </button>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "white", fontSize: "0.8rem", fontWeight: 500 }}>{item.title}</p>
                <span className="px-2 py-0.5 rounded-full mt-1 inline-block" style={{ background: "rgba(255,255,255,0.25)" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", color: "white", fontSize: "0.65rem" }}>{item.category}</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col"
            style={{ background: "rgba(0,0,0,0.92)" }}
          >
            <div className="flex justify-between items-center p-4">
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "white", fontSize: "1rem" }}>{selectedItem.title}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>{selectedItem.category}</p>
              </div>
              <button onClick={() => setSelectedItem(null)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                <X size={18} color="white" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
              <img src={UNSPLASH_PHOTOS[selectedItem.unsplashId]} alt={selectedItem.title} className="w-full rounded-2xl object-cover" style={{ maxHeight: "60vh" }} />
            </div>
            <div className="p-4 flex justify-center">
              <button
                onClick={() => toggleLike(selectedItem.id)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl"
                style={{ background: likedItems.has(selectedItem.id) ? "#C04040" : "rgba(255,255,255,0.15)" }}
              >
                <Heart size={18} color="white" fill={likedItems.has(selectedItem.id) ? "white" : "none"} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", color: "white", fontSize: "0.875rem" }}>
                  {likedItems.has(selectedItem.id) ? "Saved to Favourites" : "Save to Favourites"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
