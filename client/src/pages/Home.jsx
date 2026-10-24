import { Link } from "react-router-dom";

const bars = [
  { v: 2, c: "idle" }, { v: 5, c: "compare" }, { v: 3, c: "compare" },
  { v: 7, c: "idle" }, { v: 1, c: "idle" }, { v: 8, c: "sorted" }, { v: 9, c: "sorted" },
];

const features = [
  { title: "Step-by-Step Control", text: "Play, pause, and step forward or backward through every operation." },
  { title: "Synchronized Pseudocode", text: "The active line highlights exactly what the algorithm is doing." },
  { title: "Intuitive Complexity", text: "See best, average, and worst cases with time and space complexity." },
];

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <div>
          <h1>
            Understand Algorithms.
            <br />
            <span className="gradient-text">See Them in Action.</span>
          </h1>
          <p className="hero-text">
            Watch array states change, follow pseudocode line by line, and see
            comparisons and swaps happen in real time.
          </p>
          <div className="hero-actions">
            <Link to="/explore" className="btn btn-primary">Explore Algorithms →</Link>
          </div>
        </div>

        <div className="preview-card">
          <div className="preview-title">Bubble Sort Preview</div>
          <div className="preview-bars">
            {bars.map((b, i) => (
              <div key={i} className="bar-col">
                <span className="bar-value">{b.v}</span>
                <div className={`bar ${b.c}`} style={{ height: `${b.v * 16}px` }} />
                <span className="bar-index">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Designed for Clear Conceptual Understanding</h2>
        <div className="feature-grid">
          {features.map((f) => (
            <div key={f.title} className="card">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}