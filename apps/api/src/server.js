// apps/api/src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'API is running', time: new Date().toISOString() });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
