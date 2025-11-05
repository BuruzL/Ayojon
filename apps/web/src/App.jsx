import React from "react";
import SearchPage from "./pages/SearchPage.jsx";

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px" }}>
      <h1 style={{ marginBottom: 8 }}>Ayojon</h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Simple starter wired to the API proxy.
      </p>
      <SearchPage />
    </div>
  );
}
