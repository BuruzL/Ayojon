import React, { useState } from 'react'

export default function SearchForm({ onSearch }) {
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(value)
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type to search..."
      />
      <button type="submit">Search</button>
    </form>
  )
}
