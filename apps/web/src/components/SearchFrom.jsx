import React, { useState } from "react";

export default function SearchForm({ onSearch }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        placeholder="Search…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ flex: 1, padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8 }}
      />
      <button
        type="submit"
        style={{ padding: "10px 14px", border: "1px solid #111", background: "#111", color: "#fff", borderRadius: 8, cursor: "pointer" }}
      >
        Search
      </button>
    </form>
  );
}
