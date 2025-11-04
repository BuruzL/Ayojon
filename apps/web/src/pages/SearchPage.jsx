import React, { useEffect, useState } from 'react'
import SearchForm from '../components/SearchForm'
import ResultsList from '../components/ResultsList'
import { pingHealth, searchBusinesses } from '../services/api'

export default function SearchPage() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    pingHealth()
      .then(ok => setHealth(ok ? 'API OK' : 'API DOWN'))
      .catch(() => setHealth('API DOWN'))
  }, [])

  const handleSearch = async (query) => {
    setLoading(true)
    setError(null)
    try {
      const data = await searchBusinesses(query)
      setResults(data)
    } catch {
      setError('Search failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className="hero">
        <h1>Find trusted local services near you</h1>
        <p className="sub">Type what you need, where, and when.</p>
        <div className={`api-pill ${health === 'API OK' ? 'ok' : 'down'}`}>
          {health ? health : 'Checking API...'}
        </div>
      </div>

      <SearchForm onSearch={handleSearch} />

      {loading && <div className="loading">Searching…</div>}
      {error && <div className="error">{error}</div>}

      <ResultsList items={results} />
    </section>
  )
}
