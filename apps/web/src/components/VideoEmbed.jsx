export default function VideoEmbed({ url }) {
  if (!url) return null
  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-4">Videos</h3>
      <div className="aspect-video rounded-xl overflow-hidden border border-border">
        <iframe
          src={url}
          title="Business video"
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
