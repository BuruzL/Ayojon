"use client"

import { useState } from "react"
import { Star } from "lucide-react"

export default function ReviewSection({ reviews, businessName }) {
  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    text: "",
  })
  const [allReviews, setAllReviews] = useState(reviews)
  const [showForm, setShowForm] = useState(false)

  const handleSubmitReview = (e) => {
    e.preventDefault()

    if (!newReview.author.trim() || !newReview.text.trim()) {
      alert("Please fill in all fields")
      return
    }

    const review = {
      id: allReviews.length + 1,
      author: newReview.author,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split("T")[0],
    }

    setAllReviews([review, ...allReviews])
    setNewReview({ author: "", rating: 5, text: "" })
    setShowForm(false)
  }

  const averageRating =
    allReviews.length > 0 ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1) : 0

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h3 className="text-3xl font-bold text-foreground mb-2">Reviews</h3>
      <p className="text-foreground/60 mb-8">
        {allReviews.length} reviews • Average rating: <span className="font-bold text-foreground">{averageRating}</span>
      </p>

      {/* Add Review Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        {showForm ? "Cancel" : "Write a Review"}
      </button>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmitReview} className="mb-12 p-6 bg-secondary rounded-lg">
          <div className="mb-4">
            <label className="block text-foreground font-semibold mb-2">Your Name</label>
            <input
              type="text"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-foreground font-semibold mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating })}
                  className="focus:outline-none"
                >
                  <Star
                    size={28}
                    className={`transition-colors ${
                      rating <= newReview.rating ? "fill-accent text-accent" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-foreground font-semibold mb-2">Review</label>
            <textarea
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground min-h-24"
              placeholder="Share your experience..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {allReviews.map((review) => (
          <div key={review.id} className="p-6 bg-card rounded-lg border border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-foreground">{review.author}</p>
                <p className="text-sm text-foreground/60">{review.date}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`transition-colors ${i < review.rating ? "fill-accent text-accent" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-foreground/70">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
