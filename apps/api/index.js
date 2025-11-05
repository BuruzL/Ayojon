import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "api", time: new Date().toISOString() });
});

// Example search endpoint (mock)
app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").toString().trim();
  const results = q
    ? [
        { id: 1, title: `Result for "${q}" #1` },
        { id: 2, title: `Result for "${q}" #2` }
      ]
    : [];
  res.json({ query: q, results });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
