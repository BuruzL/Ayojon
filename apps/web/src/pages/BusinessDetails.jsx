import { useParams, Link } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import Header from "../components/Header.jsx"
import ImageGallery from "../components/ImageGallery.jsx"
import ReviewSection from "../components/ReviewSection.jsx"
import VideoEmbed from "../components/VideoEmbed.jsx"
import { getBusinessById } from "../services/api.js"
import ChatBox from "../components/ChatBox.jsx"

export default function BusinessDetail() {
  const { id } = useParams()
  const [biz, setBiz] = useState(null)

  useEffect(() => { getBusinessById(id).then(setBiz) }, [id])
  const hasGallery = useMemo(() => (biz?.images || []).length > 0, [biz])

  if (!biz) {
    return (
      <div className="min-h-dvh bg-app">
        <Header />
        <div className="container" style={{ padding: "48px 16px" }}>
          <div className="glass" style={{ borderRadius: 18, padding: 24 }}>Loading…</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-app">
      <Header />

      {/* breadcrumb */}
      <div className="container" style={{ padding: "12px 16px 0" }}>
        <Link to="/home" style={{ color: "var(--primary)" }}>← Back to results</Link>
      </div>

      {/* HERO COVER */}
      <div className="container" style={{ marginTop: 12 }}>
        <div
          className="shadow"
          style={{
            position: "relative",
            height: 260,
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "#0c0f1d",
          }}
        >
          <img
            src={biz.image}
            alt={biz.name}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.4), rgba(0,0,0,.65))" }} />
          <div style={{ position: "absolute", left: 18, bottom: 16, right: 18 }}>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 900 }}>{biz.name}</h1>
            <p style={{ margin: "6px 0 0", opacity: .85 }}>{biz.category} • {biz.type}</p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <main className="container" style={{ padding: "24px 16px 60px" }}>
        <div className="grid cols-3">
          {/* LEFT (content) */}
          <div className="col-span-2" style={{ gridColumn: "span 2 / span 2", display: "grid", gap: 18 }}>
            {/* Quick stats + CTA */}
            <section className="glass" style={{ borderRadius: 18, padding: 16 }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <StarRow value={biz.rating} />
                  <b>{biz.rating}</b>
                  <span style={{ opacity: .7 }}>•</span>
                  <span style={{ opacity: .8 }}>{biz.category}</span>
                  <span style={{ opacity: .7 }}>•</span>
                  <span style={{ opacity: .8 }}>{biz.type}</span>
                </div>
                <a href="#order" className="btn btn-primary">Order / Book</a>
              </div>
            </section>

            {/* About / Services */}
            <section className="glass" style={{ borderRadius: 18, padding: 18 }}>
              <h3 className="section-title" style={{ marginTop: 0 }}>About</h3>
              <p style={{ color: "var(--fg)", opacity: .9, lineHeight: 1.6 }}>{biz.description}</p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
                {["Quality guaranteed", "Fast response", "Online booking"].map(t => (
                  <span key={t} className="btn-chip" style={{ cursor: "default" }}>{t}</span>
                ))}
              </div>
            </section>

            {/* Gallery */}
            <section className="glass" style={{ borderRadius: 18, padding: 18 }}>
              <h3 className="section-title" style={{ marginTop: 0 }}>Photos</h3>
              {hasGallery ? <ImageGallery images={biz.images} /> : <Empty text="No photos yet" />}
            </section>

            {/* Products / Packages (sample) */}
            <section className="glass" style={{ borderRadius: 18, padding: 18 }}>
              <h3 className="section-title" style={{ marginTop: 0 }}>Popular Packages</h3>
              <ProductGrid
                items={
                  biz.category === "Photography"
                    ? [
                        { id: 1, name: "Wedding Day Package", price: "৳45,000", desc: "8 hours, 2 photographers, 300 edits" },
                        { id: 2, name: "Engagement Shoot", price: "৳12,000", desc: "2 hours, 40 edits, softcopy" },
                      ]
                    : [
                        { id: 1, name: "Signature Latte & Dessert", price: "৳550", desc: "2 drinks • 1 dessert" },
                        { id: 2, name: "Brunch for Two", price: "৳1,200", desc: "2 mains • 2 drinks" },
                      ]
                }
              />
            </section>

            {/* Video */}
            <section className="glass" style={{ borderRadius: 18, padding: 18 }}>
              <h3 className="section-title" style={{ marginTop: 0 }}>Videos</h3>
              <VideoEmbed url={biz.videoUrl} />
              {!biz.videoUrl && <Empty text="No videos yet" />}
            </section>

            {/* Reviews */}
            <section className="glass" style={{ borderRadius: 18, padding: 18 }}>
              <ReviewSection reviews={biz.reviews} businessName={biz.name} />
            </section>

            {/* Chat */}
            <section className="glass" style={{ borderRadius: 18, padding: 18 }}>
              <h3 className="section-title" style={{ marginTop: 0 }}>Chat with {biz.name}</h3>
              <ChatBox placeholder={`Ask ${biz.name} about timing, price, or availability…`} />
            </section>
          </div>

          {/* RIGHT (sticky order + contact) */}
          <aside className="sidebar-sticky" style={{ position: "sticky", top: 90, alignSelf: "start" }}>
            <div id="order" className="glass" style={{ borderRadius: 18, padding: 18 }}>
              <h3 className="section-title" style={{ marginTop: 0 }}>Order / Book</h3>
              <div style={{ display: "grid", gap: 10 }}>
                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontWeight: 700 }}>Preferred date</span>
                  <input className="input" type="date" />
                </label>
                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontWeight: 700 }}>Preferred time</span>
                  <input className="input" type="time" />
                </label>
                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontWeight: 700 }}>Notes</span>
                  <textarea className="input" placeholder="Tell us your need…" style={{ minHeight: 100 }} />
                </label>
                <button className="btn btn-primary">Request Quote</button>
              </div>
            </div>

            <div className="glass" style={{ borderRadius: 18, padding: 18, marginTop: 12 }}>
              <h4 style={{ margin: "0 0 10px" }}>Contact</h4>
              <div style={{ display: "grid", gap: 8, color: "var(--fg)", opacity: .9 }}>
                <div><b>Facebook:</b> <a href="#" onClick={e=>e.preventDefault()} style={{ color: "var(--primary)" }}>facebook.com/yourpage</a></div>
                <div><b>Phone:</b> 01XXX-XXXXXX</div>
                <div><b>Location:</b> Your City, Area</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

/* ------- local helpers ------- */

function StarRow({ value = 0 }) {
  const full = Math.floor(value)
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <span key={i} style={{ color: i < full ? "var(--accent)" : "#6572a6" }}>★</span>
      ))}
    </div>
  )
}

function ProductGrid({ items = [] }) {
  if (!items.length) return <Empty text="No packages yet" />
  return (
    <div className="grid cols-2">
      {items.map(p => (
        <div key={p.id} className="glass" style={{ borderRadius: 14, padding: 14, border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <h4 style={{ margin: 0 }}>{p.name}</h4>
            <span className="btn-chip" style={{ cursor: "default" }}>{p.price}</span>
          </div>
          <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>{p.desc}</p>
        </div>
      ))}
    </div>
  )
}

function Empty({ text }) {
  return (
    <div className="glass" style={{ borderRadius: 12, padding: 18, textAlign: "center", color: "var(--muted)" }}>
      {text}
    </div>
  )
}
