import { Router } from "express";
import algorithms from "../data/algorithms.js";

const router = Router();

// GET /api/algorithms → short list for the Explore page
router.get("/", (req, res) => {
  const list = algorithms.map(({ id, name, category, description, complexity }) => ({
    id,
    name,
    category,
    description,
    complexity,
  }));
  res.json(list);
});

// GET /api/algorithms/:id → full details
router.get("/:id", (req, res) => {
  const algo = algorithms.find((a) => a.id === req.params.id);
  if (!algo) {
    return res.status(404).json({ error: "Algorithm not found" });
  }
  res.json(algo);
});

export default router;