import { useNavigate } from "react-router-dom"

export default function BusinessCard({ business }) {
  const nav = useNavigate()
  return (
    <button className="card" onClick={()=>nav(`/business/${business.id}`)}>
      <div className="card-cover">
        <img src={business.image || "/placeholder.svg"} alt={business.name} loading="lazy" />
        <span className="card-badge">{business.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{business.name}</h3>
        <p className="card-sub">{business.type}</p>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Stars value={business.rating} />
          <span style={{fontWeight:700}}>{business.rating}</span>
        </div>
        <div className="line"></div>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,color:"var(--primary)",fontWeight:700}}>
          View Details <span style={{fontSize:18}}>→</span>
        </div>
      </div>
    </button>
  )
}
function Stars({ value=0 }) {
  const full = Math.floor(value)
  return <div className="stars">{[0,1,2,3,4].map(i=><span key={i}>{i<full?"★":"☆"}</span>)}</div>
}
