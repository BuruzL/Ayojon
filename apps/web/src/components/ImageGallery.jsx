import { useState } from "react"

export default function ImageGallery({ images = [] }) {
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState(0)
  if (!images.length) return null

  const openAt = (i) => { setIdx(i); setOpen(true) }
  const prev = () => setIdx((p) => (p === 0 ? images.length - 1 : p - 1))
  const next = () => setIdx((p) => (p === images.length - 1 ? 0 : p + 1))

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button key={i} onClick={() => openAt(i)} className="group relative h-40 overflow-hidden rounded-lg bg-gray-100">
            <img src={src} alt={`Gallery ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button onClick={() => setOpen(false)} className="absolute -top-10 right-0 text-white">✕</button>
            <div className="relative h-96 overflow-hidden rounded-lg">
              <img src={images[idx]} alt="" className="w-full h-full object-contain" />
            </div>
            <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white">‹</button>
            <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white">›</button>
            <div className="text-center text-white mt-4">{idx + 1} / {images.length}</div>
          </div>
        </div>
      )}
    </>
  )
}
