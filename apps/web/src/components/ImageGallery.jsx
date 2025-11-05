"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

export default function ImageGallery({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className="group relative h-48 overflow-hidden rounded-lg bg-gray-100 hover:shadow-lg transition-all"
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            {/* Image */}
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg">
              <Image
                src={images[selectedImageIndex] || "/placeholder.svg"}
                alt={`Gallery image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Navigation */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white hover:text-gray-300 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white hover:text-gray-300 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Counter */}
            <div className="text-center text-white mt-4">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
