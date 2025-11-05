import React, { useEffect, useState } from 'react'
import SearchForm from '../components/SearchForm'
import ResultsList from '../components/ResultsList'
import IdeaSection from '../components/IdeaSection'
import { pingHealth, searchBusinesses } from '../services/api'

export default function SearchPage() {
  const [health, setHealth] = useState(null)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    pingHealth().then(ok => setHealth(ok ? 'API OK' : 'API DOWN')).catch(() => setHealth('API DOWN'))
  }, [])

  const onSearch = async ({ query }) => {
    setLoading(true)
    const data = await searchBusinesses({ query })
    setResults(data)
    setLoading(false)
  }

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <span className={`dot ${health === 'API OK' ? 'ok' : 'down'}`} />
          {health ?? 'Checking API…'}
        </div>
        <h1 className="hero-title">What do you want?</h1>
        <p className="hero-sub">Tell us your need in plain language. We’ll find trusted nearby businesses for you.</p>

        <SearchForm onSearch={onSearch} />

        <div className="quick-tags" role="list">
          {['Wedding photographer', 'Makeup artist', 'Catering', 'Event planner', 'Birthday cake'].map(t => (
            <button key={t} className="chip" onClick={() => onSearch({ query: t })}>{t}</button>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section className="results-wrap">
        <h2 className="section-title">Nearest Facebook businesses</h2>
        {loading ? <div className="skeleton-grid" /> : <ResultsList items={results} />}
      </section>

      {/* STORY */}
      <IdeaSection />
    </>
  )
}
