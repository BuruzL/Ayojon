"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const categories = ["Food", "Photography", "Shopping", "Catering", "Clothing", "Entertainment"]

export default function CategoryRibbon({ selectedCategory, onSelectCategory }) {
  const scrollContainerRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  return (
    <div className="max-w-7xl mx-auto relative">
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-secondary p-2 rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div ref={scrollContainerRef} onScroll={handleScroll} className="category-ribbon">
        <button
          onClick={() => onSelectCategory(null)}
          className={`category-button ${!selectedCategory ? "active" : ""}`}
        >
          All Categories
        </button>

        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`category-button ${selectedCategory === category ? "active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-secondary p-2 rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  )
}
