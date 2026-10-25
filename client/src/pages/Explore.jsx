import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAlgorithms } from "../api/algorithms.js";

export default function Explore() {
  const [algos, setAlgos] = useState([]);
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getAlgorithms().then(({ data, source }) => {
      setAlgos(data);
      setSource(source);
      setLoading(false);
    });
  }, []);

  const categories = ["All", ...new Set(algos.map((a) => a.category))];
  const visible = category === "All" ? algos : algos.filter((a) => a.category === category);

  return (
    <main className="container page">
      <h2>Explore Algorithms</h2>
      <p className="muted">Pick an algorithm to watch it run step by step.</p>

      {source === "local" && (
        <div className="notice">Server unreachable, showing built-in data.</div>
      )}

      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${c === category ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="muted">Loading...</p>
      ) : (
        <div className="algo-grid">
          {visible.map((a) => (
            <Link key={a.id} to={`/visualizer/${a.id}`} className="card algo-card">
              <span className="tag">{a.category}</span>
              <h3>{a.name}</h3>
              <p>{a.description}</p>
              <div className="complexity">
                <span>Best {a.complexity.best}</span>
                <span>Avg {a.complexity.average}</span>
                <span>Worst {a.complexity.worst}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}