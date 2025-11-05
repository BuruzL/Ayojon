import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-4 bg-app">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="text-foreground">AYO</span>
          <span className="text-primary">JON</span>
        </h1>
        <p className="text-foreground/70 max-w-xl mx-auto mb-10">
          Centralizing local Facebook-oriented businesses. Discover. Compare. Book.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/auth/customer" className="btn-primary justify-center py-4 text-lg">I’m a Customer</Link>
          <Link to="/auth/business" className="btn-outline justify-center py-4 text-lg">I’m a Business</Link>
        </div>

        <p className="mt-6 text-sm text-foreground/60">
          Already logged in? <Link className="underline hover:text-primary" to="/home">Continue to Explore</Link>
        </p>
      </div>
    </main>
  )
}
