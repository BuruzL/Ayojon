import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Header from "../components/Header.jsx"
import ImageGallery from "../components/ImageGallery.jsx"
import ReviewSection from "../components/ReviewSection.jsx"
import VideoEmbed from "../components/VideoEmbed.jsx"
import { getBusinessById } from "../services/api.js"

export default function BusinessDetail() {
  const { id } = useParams()
  const [biz, setBiz] = useState(null)

  useEffect(() => { getBusinessById(id).then(setBiz) }, [id])
  if (!biz) return <div className="p-6">Loading...</div>

  return (
    <div className="min-h-dvh bg-app">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <Link to="/home" className="text-sm text-foreground/60 hover:text-primary">← Back to results</Link>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">{biz.name}</h1>
            <p className="text-foreground/60">{biz.category} • {biz.type}</p>
          </div>
          <div className="flex items-center gap-3">
            <StarRow value={biz.rating} />
            <span className="font-semibold">{biz.rating}</span>
            <button className="btn-primary">Order / Book</button>
          </div>
        </div>

        <div className="mt-6 h-60 md:h-80 rounded-2xl overflow-hidden border border-border">
          <img src={biz.image} alt={biz.name} className="w-full h-full object-cover" />
        </div>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-2">About</h3>
            <p className="text-foreground/80">{biz.description}</p>

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-3">Photos</h3>
              <ImageGallery images={biz.images} />
            </div>

            <VideoEmbed url={biz.videoUrl} />
            <ReviewSection reviews={biz.reviews} businessName={biz.name} />
          </div>

          <aside className="lg:col-span-1">
            <div className="p-6 rounded-2xl bg-card border border-border sticky top-24">
              <h4 className="font-bold text-lg mb-3">Contact / Order</h4>
              <div className="space-y-2 text-foreground/80">
                <p>Facebook: <a className="underline" href="#" onClick={(e)=>e.preventDefault()}>facebook.com/yourpage</a></p>
                <p>Phone: 01XXX-XXXXXX</p>
                <p>Address: Your City, Area</p>
              </div>
              <button className="btn-primary w-full mt-5">Order / Book</button>
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}

function StarRow({ value = 0 }) {
  const full = Math.floor(value)
  return <div className="flex">{[0,1,2,3,4].map(i => <span key={i} className={`mr-1 ${i < full ? "text-accent" : "text-gray-500"}`}>★</span>)}</div>
}
