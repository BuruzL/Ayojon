"use client"

import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import Image from "next/image"

export default function BusinessCard({ business }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/business/${business.id}`)
  }

  return (
    <button
      onClick={handleClick}
      className="group h-full text-left bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={business.image || "/placeholder.svg"}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {business.name}
        </h3>

        <p className="text-sm text-foreground/60 mb-3">
          {business.category} • {business.type}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`transition-colors ${
                  i < Math.floor(business.rating) ? "fill-accent text-accent" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">{business.rating}</span>
        </div>

        <div className="mt-4 inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
          View Details
          <span className="text-xl">→</span>
        </div>
      </div>
    </button>
  )
}
