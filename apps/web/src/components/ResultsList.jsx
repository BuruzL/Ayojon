import React from 'react'
import BusinessCard from './components__BusinessCard'

export default function ResultsList({ items }) {
  if (!items || items.length === 0) {
    return <div className="muted">No results yet. Try a search.</div>
  }

  return (
    <div className="grid">
      {items.map(b => <BusinessCard key={b.id} business={b} />)}
    </div>
  )
}
