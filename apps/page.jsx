"use client"

import { useState, useRef } from "react"
import SearchForm from "@/components/SearchForm"
import CategoryRibbon from "@/components/CategoryRibbon"
import BusinessCard from "@/components/BusinessCard"
import { ChevronDown } from "lucide-react"

const mockBusinesses = [
  {
    id: 1,
    name: "Urban Eats Kitchen",
    category: "Food",
    rating: 4.8,
    image: "/restaurant-food-kitchen.jpg",
    type: "Restaurant",
  },
  {
    id: 2,
    name: "Lens & Light Studio",
    category: "Photography",
    rating: 4.9,
    image: "/photography-studio-professional.png",
    type: "Photography Studio",
  },
  {
    id: 3,
    name: "Style Haven Boutique",
    category: "Clothing",
    rating: 4.6,
    image: "/fashion-clothing-store.png",
    type: "Clothing Store",
  },
  {
    id: 4,
    name: "Perfect Events Catering",
    category: "Catering",
    rating: 4.7,
    image: "/catering-food-service-events.jpg",
    type: "Catering Service",
  },
  {
    id: 5,
    name: "Vibes Entertainment",
    category: "Entertainment",
    rating: 4.5,
    image: "/entertainment-live-music-event.jpg",
    type: "Entertainment Venue",
  },
  {
    id: 6,
    name: "Shop & Save Mart",
    category: "Shopping",
    rating: 4.4,
    image: "/shopping-retail-store.jpg",
    type: "Retail Store",
  },
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const businessSectionRef = useRef(null)

  const filteredBusinesses = mockBusinesses.filter((business) => {
    const matchCategory = !selectedCategory || business.category === selectedCategory
    const matchSearch =
      !searchQuery ||
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  const scrollToBusinesses = () => {
    businessSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground mb-6 tracking-tight">AYOJON</h1>
          <p className="text-xl text-primary-foreground/90 mb-12 font-medium">
            Discover amazing local Facebook businesses curated just for you
          </p>

          <SearchForm onSearch={setSearchQuery} />

          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-primary-foreground/80 text-lg font-semibold">Keep scrolling to explore</p>
            <button
              onClick={scrollToBusinesses}
              className="animate-bounce bg-primary-foreground text-primary p-3 rounded-full hover:scale-110 transition-transform"
              aria-label="Scroll to businesses"
            >
              <ChevronDown size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary py-8 sticky top-0 z-40 shadow-md">
        <CategoryRibbon selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      </section>

      {/* Businesses Grid */}
      <section ref={businessSectionRef} className="px-4 md:px-6 py-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12">
            {selectedCategory ? `${selectedCategory} Businesses` : "Featured Businesses"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.length > 0 ? (
              filteredBusinesses.map((business) => <BusinessCard key={business.id} business={business} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-foreground/60">
                  No businesses found matching your search. Try a different category!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
