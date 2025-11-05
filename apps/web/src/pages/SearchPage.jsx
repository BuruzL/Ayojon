import React, { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm.jsx";
import ResultsList from "../components/ResultsList.jsx";
import IdeaSection from "../components/IdeaSection.jsx";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const doSearch = async (q) => {
    const trimmed = q.trim();
    setQuery(trimmed);
    if (!trimmed) {
      setResults([]);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Optional: run once with a default query
  useEffect(() => {
    // doSearch("venue");
  }, []);

  return (
    <div>
      <SearchForm onSearch={doSearch} />
      {loading ? <p>Searching…</p> : <ResultsList items={results} />}
      <IdeaSection />
    </div>
  );
}
