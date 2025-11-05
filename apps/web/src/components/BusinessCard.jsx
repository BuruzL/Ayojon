import { useNavigate } from "react-router-dom"

export default function BusinessCard({ business }) {
  const navigate = useNavigate()
  const go = () => navigate(`/business/${business.id}`)

  return (
    <button onClick={go} className="group text-left rounded-2xl overflow-hidden border border-border bg-card card-hover">
      <div className="relative h-44 bg-gray-100">
        <img src={business.image || "/placeholder.svg"} alt={business.name}
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute left-3 top-3 px-2.5 py-1 text-xs font-semibold rounded-full glass">{business.category}</span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">{business.name}</h3>
        <p className="text-sm text-foreground/60 mb-2">{business.type}</p>
        <div className="flex items-center gap-2">
          <Stars value={business.rating} />
          <span className="text-sm font-semibold">{business.rating}</span>
        </div>
        <div className="mt-3 inline-flex items-center gap-1 text-primary font-semibold">
          View Details <span className="text-xl transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </button>
  )
}

function Stars({ value = 0 }) {
  const full = Math.floor(value)
  return (
    <div className="flex">
      {[0,1,2,3,4].map(i => <span key={i} className={`w-4 h-4 mr-0.5 ${i < full ? "text-accent" : "text-gray-500"}`}>★</span>)}
    </div>
  )
}
