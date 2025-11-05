const BUSINESSES = [
  {
    id: "1",
    name: "Coco & Spice Café",
    type: "Cafe",
    category: "Food",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1466979939565-131c4b39a51c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Artisanal coffee, small bites, and a cozy corner to chat. We love local beans and weekend acoustic sessions.",
    reviews: [
      { id: 1, author: "Ayesha", rating: 5, text: "Best latte in town!", date: "2025-10-10" },
      { id: 2, author: "Rafi", rating: 4, text: "Great vibe, a bit crowded.", date: "2025-10-02" },
    ],
    videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
  {
    id: "2",
    name: "FrameWorks Studio",
    type: "Studio",
    category: "Photography",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516637090014-cb1ab0d08fc7?q=80&w=1600&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop",
    ],
    description: "Wedding & event photography with cinematic edits. Packages for every budget.",
    reviews: [{ id: 1, author: "Mitu", rating: 5, text: "Photos looked cinematic!", date: "2025-09-20" }],
    videoUrl: "",
  },
  {
    id: "3",
    name: "DressLab",
    type: "Boutique",
    category: "Clothing",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd59?q=80&w=1600&auto=format&fit=crop",
    images: [],
    description: "Trendy ethnic & western wear from local designers.",
    reviews: [],
    videoUrl: "",
  },
]

export async function getBusinesses({ q = "", category = null } = {}) {
  const term = q.trim().toLowerCase()
  return BUSINESSES.filter((b) => {
    const matchesQ = !term || b.name.toLowerCase().includes(term) || b.type.toLowerCase().includes(term) || b.category.toLowerCase().includes(term)
    const matchesC = !category || b.category === category
    return matchesQ && matchesC
  })
}

export async function getBusinessById(id) {
  return BUSINESSES.find((b) => b.id === id)
}
