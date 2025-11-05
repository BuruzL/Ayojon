import { useState } from "react"

export default function ReviewSection({ reviews = [], businessName }) {
  const [all, setAll] = useState(reviews)
  const [form, setForm] = useState({ author: "", rating: 5, text: "" })
  const [open, setOpen] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!form.author.trim() || !form.text.trim()) return
    const review = { id: all.length + 1, ...form, date: new Date().toISOString().split("T")[0] }
    setAll([review, ...all])
    setForm({ author: "", rating: 5, text: "" })
    setOpen(false)
  }

  const avg = all.length ? (all.reduce((s, r) => s + r.rating, 0) / all.length).toFixed(1) : "0.0"

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h3 className="text-3xl font-bold mb-2">Reviews {businessName ? `for ${businessName}` : ""}</h3>
      <p className="text-foreground/60 mb-8">{all.length} reviews • Average rating: <b>{avg}</b></p>

      <button className="btn-primary mb-6" onClick={() => setOpen(o => !o)}>{open ? "Cancel" : "Write a Review"}</button>

      {open && (
        <form onSubmit={submit} className="mb-8 p-6 bg-secondary rounded-xl border border-border space-y-4">
          <div>
            <label className="block font-semibold mb-1">Your Name</label>
            <input className="w-full px-4 py-2 rounded-lg bg-background border border-border" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Enter your name" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Rating</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(r => (
                <button key={r} type="button" onClick={() => setForm({ ...form, rating: r })}>
                  <span className={`text-2xl ${r <= form.rating ? "text-accent" : "text-gray-500"}`}>★</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Review</label>
            <textarea className="w-full px-4 py-2 rounded-lg bg-background border border-border min-h-24" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Share your experience..." />
          </div>
          <button className="btn bg-accent text-accent-foreground w-full">Submit Review</button>
        </form>
      )}

      <div className="space-y-4">
        {all.map(r => (
          <div key={r.id} className="p-5 bg-card rounded-xl border border-border">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-bold">{r.author}</p>
                <p className="text-sm text-foreground/60">{r.date}</p>
              </div>
              <div>{[0,1,2,3,4].map(i => <span key={i} className={`text-sm ${i < r.rating ? "text-accent" : "text-gray-500"}`}>★</span>)}</div>
            </div>
            <p className="text-foreground/80">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
