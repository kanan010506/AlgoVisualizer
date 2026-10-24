import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start:", err.message);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});