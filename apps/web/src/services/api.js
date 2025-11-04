export async function pingHealth() {
  try {
    const res = await fetch('/api/health')
    if (!res.ok) return false
    const data = await res.json()
    return !!data?.ok
  } catch { return false }
}

// Mock results (replace with real /api/search later)
export async function searchBusinesses({ query }) {
  await new Promise(r => setTimeout(r, 700))
  const cityGuess = /bogura|বগুড়া/i.test(query) ? 'Bogura' : 'Dhaka'
  return [
    {
      id: 'p1',
      name: 'Bogura Wedding Lens',
      rating: 4.7,
      category: 'Photographer',
      city: cityGuess,
      distance_km: 2.1,
      tagline: `Great for: ${query}`,
      tags: ['Wedding', 'Budget', 'Fast reply']
    },
    {
      id: 'p2',
      name: 'Golden Frame Studio',
      rating: 4.9,
      category: 'Photographer',
      city: cityGuess,
      distance_km: 4.5,
      tagline: 'Premium packages available',
      tags: ['Premium', 'Editing', 'Team']
    },
    {
      id: 'p3',
      name: 'Dhanmondi Delight Catering',
      rating: 4.6,
      category: 'Catering',
      city: 'Dhaka',
      distance_km: 3.3,
      tagline: 'Hygienic & crowd-friendly menu',
      tags: ['Catering', 'Halal', 'Event']
    }
  ]
}
