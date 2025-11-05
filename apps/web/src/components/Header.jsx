import { Link, useLocation } from "react-router-dom"

export default function Header() {
  const { pathname } = useLocation()
  return (
    <header className="sticky top-0 z-40">
      <div className="glass">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/home" className="inline-flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/30 border border-primary/40 grid place-items-center">
              <span className="text-primary font-extrabold">A</span>
            </div>
            <span className="text-xl font-extrabold tracking-widest">
              <span className="text-foreground">AYO</span>
              <span className="text-primary">JON</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            {pathname !== "/home" && <Link className="btn-outline" to="/home">Explore</Link>}
            <Link className="btn-primary" to="/auth/customer">Login</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
