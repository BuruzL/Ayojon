import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUser, logout } from "../state/auth.js"

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(getUser())

  useEffect(() => {
    const onChange = (e) => setUser(e.detail)
    window.addEventListener("ayojon-auth", onChange)
    return () => window.removeEventListener("ayojon-auth", onChange)
  }, [])

  return (
    <header className="app-header">
      <div className="bar glass">
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Link to="/home" className="brand">
            <div className="brand-badge">A</div>
            <div className="brand-text"><span>AYO</span><span>JON</span></div>
          </Link>

          <nav style={{display:"flex",gap:8,alignItems:"center"}}>
            {pathname !== "/home" && <Link className="btn" to="/home">Explore</Link>}

            {!user && (
              <Link className="btn btn-primary" to="/auth/customer">Login</Link>
            )}

            {user && (
              <>
                <Link className="btn btn-primary" to="/account">
                  {user.role === "business" ? "Business Account" : "My Account"}
                </Link>
                <button
                  className="btn"
                  onClick={() => { logout(); navigate("/home") }}
                  title="Log out"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
