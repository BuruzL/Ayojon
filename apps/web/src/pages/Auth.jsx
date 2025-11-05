import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Auth() {
  const { role } = useParams()
  const navigate = useNavigate()
  const [mode, setMode] = useState("login")
  const isBusiness = role === "business"

  const submit = e => { e.preventDefault(); navigate("/home") }

  return (
    <main className="min-h-dvh flex items-center justify-center px-4 bg-app">
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">{isBusiness ? "Business" : "Customer"} {mode === "login" ? "Login" : "Sign Up"}</h1>
        <p className="text-foreground/60 mb-6">{isBusiness ? "Manage your page, media, and orders." : "Find and book local services."}</p>

        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && <input className="w-full px-4 py-3 rounded-xl bg-background border border-border" placeholder="Full name" />}
          <input className="w-full px-4 py-3 rounded-xl bg-background border border-border" placeholder="Email" />
          <input type="password" className="w-full px-4 py-3 rounded-xl bg-background border border-border" placeholder="Password" />
          {isBusiness && mode === "signup" && (
            <>
              <input className="w-full px-4 py-3 rounded-xl bg-background border border-border" placeholder="Business name" />
              <input className="w-full px-4 py-3 rounded-xl bg-background border border-border" placeholder="Facebook page URL" />
            </>
          )}
          <button className="btn-primary w-full py-3">{mode === "login" ? "Login" : "Create account"}</button>
        </form>

        <button className="w-full mt-4 text-sm text-foreground/70 underline" onClick={() => setMode(m => m === "login" ? "signup" : "login")}>
          {mode === "login" ? "New here? Create an account" : "Already have an account? Log in"}
        </button>
      </div>
    </main>
  )
}
