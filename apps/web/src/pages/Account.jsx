import { useEffect, useState } from "react"
import { getUser, setUser } from "../state/auth.js"
import Header from "../components/Header.jsx"

export default function Account() {
  const [user, setLocal] = useState(getUser())
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    const onChange = (e) => setLocal(e.detail)
    window.addEventListener("ayojon-auth", onChange)
    return () => window.removeEventListener("ayojon-auth", onChange)
  }, [])

  if (!user) {
    return (
      <div className="min-h-dvh bg-app">
        <Header />
        <div className="container" style={{padding:"48px 16px"}}>
          <div className="glass" style={{borderRadius:18,padding:24}}>
            <h2 style={{marginTop:0}}>You’re not logged in</h2>
            <p>Please login to view your account.</p>
          </div>
        </div>
      </div>
    )
  }

  const isBiz = user.role === "business"
  const p = user.profile || {}

  const [form, setForm] = useState(p)

  const save = () => {
    setUser({ ...user, profile: form })
    setEdit(false)
  }

  return (
    <div className="min-h-dvh bg-app">
      <Header />
      <div className="container" style={{padding:"48px 16px"}}>
        <div className="glass" style={{borderRadius:18,padding:24}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <h1 style={{margin:0}}>{isBiz ? "Business Account" : "My Account"}</h1>
            {!edit ? (
              <button className="btn btn-primary" onClick={()=>setEdit(true)}>Edit</button>
            ) : (
              <div style={{display:"flex",gap:8}}>
                <button className="btn btn-primary" onClick={save}>Save</button>
                <button className="btn" onClick={()=>{ setForm(p); setEdit(false) }}>Cancel</button>
              </div>
            )}
          </div>

          {!edit ? (
            <DisplayView isBiz={isBiz} p={p} />
          ) : (
            <EditForm isBiz={isBiz} form={form} setForm={setForm} />
          )}
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"160px 1fr",gap:12}}>
      <div style={{opacity:.7,fontWeight:700}}>{label}</div>
      <div>{value || <span style={{opacity:.6}}>—</span>}</div>
    </div>
  )
}

function DisplayView({ isBiz, p }) {
  return (
    <div style={{display:"grid",gap:14,marginTop:16}}>
      {isBiz ? (
        <>
          <Row label="Business name" value={p.businessName} />
          <Row label="Type" value={p.businessType} />
          <Row label="Location" value={p.location} />
          <Row label="Facebook" value={p.facebook} />
          <Row label="Email" value={p.email} />
          <Row label="Description" value={p.description} />
          <Row label="Cover image" value={p.coverImage} />
          <Row label="Video URL" value={p.videoUrl} />
          <Row label="Gallery" value={p.gallery} />
        </>
      ) : (
        <>
          <Row label="Name" value={p.name} />
          <Row label="Email" value={p.email} />
          <Row label="Phone" value={p.phone} />
          <Row label="Location" value={p.location} />
        </>
      )}
    </div>
  )
}

function EditForm({ isBiz, form, setForm }) {
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const Input = ({ label, k, ...rest }) => (
    <label style={{display:"grid",gap:6}}>
      <span style={{fontWeight:700}}>{label}</span>
      <input className="input" value={form[k] || ""} onChange={set(k)} {...rest}/>
    </label>
  )
  const Textarea = ({ label, k, ...rest }) => (
    <label style={{display:"grid",gap:6}}>
      <span style={{fontWeight:700}}>{label}</span>
      <textarea className="input" style={{minHeight:120}} value={form[k] || ""} onChange={set(k)} {...rest}/>
    </label>
  )

  return (
    <div className="grid cols-2" style={{marginTop:16}}>
      {isBiz ? (
        <>
          <Input label="Business name" k="businessName" placeholder="Coco & Spice Café"/>
          <Input label="Type" k="businessType" placeholder="Cafe / Studio / Boutique"/>
          <Input label="Location" k="location" placeholder="City, Area"/>
          <Input label="Facebook" k="facebook" placeholder="https://facebook.com/yourpage"/>
          <Input label="Email" k="email" type="email" placeholder="you@business.com"/>
          <Textarea label="Description" k="description" placeholder="Tell customers about your business…"/>
          <Input label="Cover image URL" k="coverImage" placeholder="https://…"/>
          <Input label="Video URL" k="videoUrl" placeholder="https://www.youtube.com/embed/..."/>
          <Input label="Gallery URLs (comma separated)" k="gallery" placeholder="https://img1,…,https://img2"/>
        </>
      ) : (
        <>
          <Input label="Full name" k="name" placeholder="Your name"/>
          <Input label="Email" k="email" type="email" placeholder="you@email.com"/>
          <Input label="Phone" k="phone" placeholder="01XXX-XXXXXX"/>
          <Input label="Location" k="location" placeholder="City, Area"/>
        </>
      )}
    </div>
  )
}
