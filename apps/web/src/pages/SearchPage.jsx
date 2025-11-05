import React, { useState } from "react";
import SearchForm from "../components/SearchForm.jsx";


export default function SearchPage() {
  const [query, setQuery] = useState("");

  const onSearch = (q) => setQuery(q);

  return (
    <div style={{ padding: 16 }}>
      <h1>Search</h1>
      <SearchForm onSearch={onSearch} />
      <pre>Query: {query}</pre>
    </div>
  );
}
