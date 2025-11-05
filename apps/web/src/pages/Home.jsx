import { useEffect, useState } from "react"
import Header from "../components/Header.jsx"
import SearchBar from "../components/SearchBar.jsx"
import CategoryRibbon from "../components/CategoryRibbon.jsx"
import BusinessCard from "../components/BusinessCard.jsx"
import { getBusinesses } from "../services/api.js"

const quickChips = ["Coffee", "Photography", "Catering", "Boutique", "Food", "Wedding"]

export default function Home() {
  const [q, setQ] = useState("")
  const [category, setCategory] = useState(null)
  const [items, setItems] = useState([])

  useEffect(() => {
    let active = true
    getBusinesses({ q, category }).then((data) => active && setItems(data))
    return () => { active = false }
  }, [q, category])

  return (
    <div className="min-h-dvh bg-app">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="hero-grid" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs mb-5">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" />
            Built for local Facebook businesses
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="text-foreground">AYO</span>
            <span className="text-primary">JON</span>
          </h1>

          <p className="text-foreground/70 mt-4 text-lg">What do you want?</p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <SearchBar onSearch={setQ} />
            <div className="flex flex-wrap justify-center gap-2">
              {quickChips.map(c => (
                <button key={c} onClick={() => setQ(c)} className="px-3 py-1.5 rounded-full glass text-sm hover:bg-white/10 transition">
                  {c}
                </button>
              ))}
            </div>
          </div>

          <p className="text-foreground/50 mt-10">Keep scrolling to explore</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-4">
        <CategoryRibbon selectedCategory={category} onSelectCategory={setCategory} />
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(b => <BusinessCard key={b.id} business={b} />)}
        </div>
        {!items.length && (
          <div className="glass rounded-2xl p-8 text-center mt-10">
            <p className="text-foreground/70">No results. Try another search or category.</p>
          </div>
        )}
      </section>
    </div>
  )
}
