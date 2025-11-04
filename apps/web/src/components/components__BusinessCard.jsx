import React from 'react'

export default function BusinessCard({ business }) {
  return (
    <div className="card">
      <div className="card-head">
        <h3>{business.name}</h3>
        <span className="rating">★ {business.rating ?? '—'}</span>
      </div>
      <p className="muted">{business.category} • {business.city}</p>
      <p>{business.tagline}</p>
      <div className="chips">
        {business.tags?.map(tag => (
          <span key={tag} className="chip">{tag}</span>
        ))}
      </div>
    </div>
  )
}
