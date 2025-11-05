import { useState } from "react"

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("")
  const submit = (e) => { e.preventDefault(); onSearch?.(value) }
  return (
    <form onSubmit={submit} style={{display:"flex",gap:8,maxWidth:720,margin:"0 auto"}}>
      <input
        className="input"
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder="Search businesses, food, photography…"
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  )
}
