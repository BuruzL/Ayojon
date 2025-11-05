import { Link, useLocation } from "react-router-dom"

export default function Header() {
  const { pathname } = useLocation()
  return (
    <header className="app-header">
      <div className="bar glass">
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Link to="/home" className="brand">
            <div className="brand-badge">A</div>
            <div className="brand-text">
              <span>AYO</span><span>JON</span>
            </div>
          </Link>
          <nav style={{display:"flex",gap:8}}>
            {pathname !== "/home" && <Link className="btn" to="/home">Explore</Link>}
            <Link className="btn btn-primary" to="/auth/customer">Login</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
