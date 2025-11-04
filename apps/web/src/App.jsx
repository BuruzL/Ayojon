import React from 'react'
import './App.css'
import SearchPage from './pages/SearchPage'

export default function App() {
  return (
    <div className="app-root">
      {/* animated background */}
      <div className="bg-aurora" aria-hidden />

      <header className="site-header">
        <div className="brand">
          <span className="logo-dot" /> Ayojon
        </div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Businesses</a>
          <a href="#">About</a>
        </nav>
      </header>

      <main className="site-main">
        <SearchPage />
      </main>

      <footer className="site-footer">
        <small>© {new Date().getFullYear()} Ayojon — AI-powered local discovery</small>
      </footer>
    </div>
  )
}
