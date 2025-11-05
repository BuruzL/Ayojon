import { useRef, useState } from "react"

const categories = ["Food", "Photography", "Shopping", "Catering", "Clothing", "Entertainment"]

export default function CategoryRibbon({ selectedCategory, onSelectCategory }) {
  const ref = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)

  const scroll = (dir) => {
    if (!ref.current) return
    const amount = 300
    ref.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  const onScroll = () => {
    if (!ref.current) return
    const { scrollLeft, scrollWidth, clientWidth } = ref.current
    setShowLeft(scrollLeft > 0)
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  return (
    <div className="max-w-7xl mx-auto relative">
      {showLeft && (
        <button onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-secondary p-2 rounded-full border border-border"
                aria-label="Scroll left">‹</button>
      )}

      <div ref={ref} onScroll={onScroll} className="category-ribbon">
        <button onClick={() => onSelectCategory(null)} className={`category-button ${!selectedCategory ? "active" : ""}`}>All</button>
        {categories.map((c) => (
          <button key={c} onClick={() => onSelectCategory(c)} className={`category-button ${selectedCategory === c ? "active" : ""}`}>{c}</button>
        ))}
      </div>

      {showRight && (
        <button onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-secondary p-2 rounded-full border border-border"
                aria-label="Scroll right">›</button>
      )}
    </div>
  )
}
