"use client"

import { useParams, useRouter } from "next/navigation"
import { Star, ArrowLeft, MapPin, Phone, Globe, Clock } from "lucide-react"
import Image from "next/image"
import ReviewSection from "@/components/ReviewSection"
import ImageGallery from "@/components/ImageGallery"
import { useState } from "react"

// Mock business details
const mockBusinessDetails = {
  1: {
    id: 1,
    name: "Urban Eats Kitchen",
    category: "Food",
    rating: 4.8,
    reviewCount: 324,
    type: "Restaurant",
    image: "/restaurant-food-kitchen.jpg",
    description:
      "Urban Eats Kitchen is a modern restaurant specializing in fusion cuisine. We combine traditional flavors with contemporary cooking techniques to create unforgettable dining experiences. Our chefs use only the freshest, locally-sourced ingredients.",
    address: "123 Main Street, Downtown District",
    phone: "+1 (555) 123-4567",
    website: "www.urbaneats.com",
    hours: "Mon-Sun: 11:00 AM - 11:00 PM",
    images: [
      "/restaurant-food-dish.jpg",
      "/restaurant-interior-ambiance.jpg",
      "/food-plating-gourmet.jpg",
      "/restaurant-dining-area.png",
    ],
    videos: [
      { id: 1, title: "Chef's Special - Signature Dish", thumbnail: "/cooking-video-scene.png" },
      { id: 2, title: "Restaurant Tour", thumbnail: "/restaurant-tour.jpg" },
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah M.",
        rating: 5,
        text: "Amazing food and great atmosphere! Will definitely come back.",
        date: "2024-01-15",
      },
      {
        id: 2,
        author: "John D.",
        rating: 4,
        text: "Great service and delicious dishes. A bit pricey but worth it.",
        date: "2024-01-10",
      },
      {
        id: 3,
        author: "Emma L.",
        rating: 5,
        text: "Best restaurant in town! The fusion concept is innovative.",
        date: "2024-01-05",
      },
    ],
  },
  2: {
    id: 2,
    name: "Lens & Light Studio",
    category: "Photography",
    rating: 4.9,
    reviewCount: 156,
    type: "Photography Studio",
    image: "/photography-studio-professional.png",
    description:
      "Lens & Light Studio captures your most precious moments with artistic excellence. Specializing in weddings, portraits, and events. Our experienced photographers deliver stunning, timeless images.",
    address: "456 Arts Avenue, Creative District",
    phone: "+1 (555) 234-5678",
    website: "www.lensandlight.com",
    hours: "Tue-Sat: 10:00 AM - 6:00 PM, Sun: 12:00 PM - 5:00 PM",
    images: [
      "/wedding-photography-bride.jpg",
      "/portrait-studio.png",
      "/photography-event-coverage.jpg",
      "/product-photography-lighting.jpg",
    ],
    videos: [
      { id: 1, title: "Wedding Photography Highlights", thumbnail: "/wedding-video.png" },
      { id: 2, title: "Behind the Scenes Studio", thumbnail: "/photography-behind-scenes.jpg" },
    ],
    reviews: [
      {
        id: 1,
        author: "Michael R.",
        rating: 5,
        text: "Outstanding photography work! Our wedding photos are perfect.",
        date: "2024-01-12",
      },
      {
        id: 2,
        author: "Lisa K.",
        rating: 5,
        text: "Professional, creative, and a pleasure to work with!",
        date: "2024-01-08",
      },
    ],
  },
}

export default function BusinessDetail() {
  const params = useParams()
  const router = useRouter()
  const businessId = params.id
  const business = mockBusinessDetails[businessId]
  const [selectedImage, setSelectedImage] = useState(null)

  if (!business) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Business not found</h2>
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4 px-4 md:px-6 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={24} />
            <span className="text-lg font-semibold">Back</span>
          </button>
          <h1 className="text-2xl font-bold">{business.name}</h1>
          <div className="w-24" />
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 bg-gray-200 overflow-hidden">
        <Image src={business.image || "/placeholder.svg"} alt={business.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        {/* Business Header Info */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-2">{business.name}</h2>
              <p className="text-lg text-foreground/60 mb-4">
                {business.category} • {business.type}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`transition-colors ${
                        i < Math.floor(business.rating) ? "fill-accent text-accent" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-foreground">{business.rating}</span>
                <span className="text-foreground/60">({business.reviewCount} reviews)</span>
              </div>
            </div>

            <button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-bold text-lg hover:opacity-90 transition-opacity whitespace-nowrap">
              Place Order
            </button>
          </div>

          {/* Description */}
          <p className="text-lg text-foreground/70 leading-relaxed mb-8">{business.description}</p>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-foreground">Address</p>
                <p className="text-foreground/60">{business.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-foreground">Phone</p>
                <p className="text-foreground/60">{business.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-foreground">Hours</p>
                <p className="text-foreground/60">{business.hours}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Globe className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-foreground">Website</p>
                <a
                  href={`https://${business.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent"
                >
                  {business.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-6">Gallery</h3>
          <ImageGallery images={business.images} />
        </section>

        {/* Videos Section */}
        {business.videos && business.videos.length > 0 && (
          <section className="mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-6">Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {business.videos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 flex items-center justify-center transition-colors">
                      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                        <span className="text-2xl">▶</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-foreground">{video.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <ReviewSection reviews={business.reviews} businessName={business.name} />
      </div>
    </main>
  )
}
