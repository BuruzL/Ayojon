import { useState } from "react"

export default function ChatBox({ placeholder = "Type your message…" }) {
  const [messages, setMessages] = useState([
    { id: 1, from: "biz", text: "Hi! How can we help today?" }
  ])
  const [text, setText] = useState("")

  const send = (e) => {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    setMessages(m => [...m, { id: Date.now(), from: "me", text: t }])
    setText("")
    // mock auto-reply
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, from: "biz", text: "Thanks! We’ll reply shortly." }])
    }, 600)
  }

  return (
    <div className="glass" style={{ borderRadius: 14, padding: 12, border: "1px solid var(--border)" }}>
      <div style={{ maxHeight: 260, overflow: "auto", display: "grid", gap: 8, padding: 6 }}>
        {messages.map(m => (
          <div key={m.id} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
            <div
              className={m.from === "me" ? "btn-primary" : ""}
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                background: m.from === "me" ? undefined : "rgba(255,255,255,.06)",
                border: m.from === "me" ? "none" : "1px solid rgba(255,255,255,.12)",
                maxWidth: 420
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={send} style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder={placeholder}/>
        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  )
}
