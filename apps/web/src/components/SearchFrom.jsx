"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          placeholder="What do you want?"
          value={query}
          onChange={handleChange}
          className="w-full px-6 py-4 rounded-full text-lg bg-white text-foreground placeholder-gray-400 border-4 border-primary-foreground focus:outline-none focus:ring-4 focus:ring-accent shadow-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-3 rounded-full hover:bg-accent transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  )
}
