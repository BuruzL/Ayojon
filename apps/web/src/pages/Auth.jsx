import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { setUser } from "../state/auth.js"

const ROLES = ["customer","business"]

export default function Auth() {
  const nav = useNavigate()
  const params = useParams()
  const [role, setRole] = useState(ROLES.includes(params.role) ? params.role : "customer")
  const [mode, setMode] = useState("login") // "login" or "signup"

  useEffect(() => {
    if (params.role && ROLES.includes(params.role)) setRole(params.role)
  }, [params.role])

  const title = useMemo(() => {
    const who = role === "business" ? "Business" : "Customer"
    return `${who} ${mode === "login" ? "Login" : "Sign Up"}`
  }, [role, mode])

  const onSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const profile = Object.fromEntries(form.entries())
    setUser({ role, profile })
    nav("/home")
  }

  return (
    <main className="min-h-dvh bg-app">
      <div className="container" style={{padding:"48px 16px"}}>
        {/* Role picker */}
        <div className="center">
          <div className="glass shadow" style={{display:"inline-flex",gap:8,padding:6,borderRadius:999}}>
            <button
              className={`btn-chip ${role==="customer"?"active":""}`}
              onClick={()=>setRole("customer")}
            >Customer</button>
            <button
              className={`btn-chip ${role==="business"?"active":""}`}
              onClick={()=>setRole("business")}
            >Business</button>
          </div>
        </div>

        {/* Card */}
        <div className="container" style={{maxWidth:880, marginTop:24}}>
          <div className="glass shadow" style={{borderRadius:18, padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16, flexWrap:"wrap"}}>
              <h1 style={{fontSize:32,fontWeight:800,margin:0}}>{title}</h1>
              <div className="glass" style={{display:"inline-flex",borderRadius:999,overflow:"hidden"}}>
                <button className={`btn ${mode==="login" ? "btn-primary":""}`} onClick={()=>setMode("login")}>Login</button>
                <button className={`btn ${mode==="signup" ? "btn-primary":""}`} onClick={()=>setMode("signup")}>Sign Up</button>
              </div>
            </div>
            <p style={{opacity:.75, marginTop:6}}>
              {role === "business" ? "Manage your page, media, and orders." : "Find and book local services."}
            </p>

            <form onSubmit={onSubmit} style={{marginTop:18}}>

              {role === "customer" ? (
                <CustomerFields mode={mode}/>
              ) : (
                <BusinessFields mode={mode}/>
              )}

              <div style={{display:"flex",gap:10,marginTop:18}}>
                <button className="btn btn-primary" type="submit">
                  {mode==="login" ? "Login" : "Create account"}
                </button>
                <button className="btn" type="button" onClick={()=>setMode(m => m==="login"?"signup":"login")}>
                  {mode==="login" ? "New here? Create an account" : "Have an account? Login"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Foot note */}
        <div className="center" style={{marginTop:12, opacity:.6, fontSize:12}}>
          *This is a demo UI. Data is stored locally in your browser.
        </div>
      </div>
    </main>
  )
}

function Input({ label, ...props }) {
  return (
    <label style={{display:"grid",gap:6}}>
      <span style={{fontWeight:700}}>{label}</span>
      <input className="input" {...props}/>
    </label>
  )
}
function Textarea({ label, ...props }) {
  return (
    <label style={{display:"grid",gap:6}}>
      <span style={{fontWeight:700}}>{label}</span>
      <textarea className="input" style={{minHeight:120}} {...props}/>
    </label>
  )
}

function CustomerFields({ mode }) {
  return (
    <div className="grid cols-2">
      {mode==="signup" && <Input name="name" label="Full Name" placeholder="Ayesha Rahman" required/>}
      <Input name="email" label="Email" placeholder="you@email.com" type="email" required/>
      <Input name="password" label="Password" placeholder="••••••••" type="password" required/>
      {mode==="signup" && (
        <>
          <Input name="phone" label="Phone" placeholder="01XXX-XXXXXX" />
          <Input name="location" label="Location" placeholder="City, Area" />
        </>
      )}
    </div>
  )
}

function BusinessFields({ mode }) {
  return (
    <>
      {mode==="signup" && (
        <div className="grid cols-2">
          <Input name="businessName" label="Business Name" placeholder="Coco & Spice Café" required/>
          <Input name="businessType" label="Business Type" placeholder="Cafe / Studio / Boutique" required/>
          <Input name="location" label="Location" placeholder="City, Area" />
          <Input name="facebook" label="Facebook Page URL" placeholder="https://facebook.com/yourpage" />
        </div>
      )}

      <div className="grid cols-2" style={{marginTop:12}}>
        <Input name="email" label="Email" placeholder="you@business.com" type="email" required/>
        <Input name="password" label="Password" placeholder="••••••••" type="password" required/>
      </div>

      {mode==="signup" && (
        <>
          <Textarea name="description" label="Short Description" placeholder="Tell customers about your business…" />
          <div className="grid cols-2">
            <Input name="coverImage" label="Cover Image URL" placeholder="https://…" />
            <Input name="videoUrl" label="Promo Video URL (YouTube embed)" placeholder="https://…"/>
          </div>
          <Input name="gallery" label="Gallery Image URLs (comma separated)" placeholder="https://img1,…,https://img2"/>
        </>
      )}
    </>
  )
}
