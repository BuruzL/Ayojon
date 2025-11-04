import React, { useState } from 'react'

export default function SearchForm({ onSearch }) {
  const [intent, setIntent] = useState('wedding photographer')
  const [location, setLocation] = useState('Bogura')
  const [date, setDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ intent, location, date })
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        value={intent}
        onChange={e => setIntent(e.target.value)}
        placeholder="What do you need?"
      />
      <input
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Location (e.g., Bogura)"
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}
