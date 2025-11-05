import { useState } from "react"

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("")
  const submit = (e) => { e.preventDefault(); onSearch?.(value) }

  return (
    <form onSubmit={submit} className="w-full max-w-xl mx-auto flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type business, food, photography..."
        className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button type="submit" className="btn-primary">Search</button>
    </form>
  )
}
