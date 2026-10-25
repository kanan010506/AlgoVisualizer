import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAlgorithm } from "../api/algorithms.js";
import { engines } from "../algorithms/index.js";
import usePlayer from "../hooks/usePlayer.js";
import BarChart from "../components/BarChart.jsx";
import Controls from "../components/Controls.jsx";
import PseudocodePanel from "../components/PseudocodePanel.jsx";
import StatsPanel from "../components/StatsPanel.jsx";

const SPEEDS = [1200, 800, 500, 250, 100];
const randomArray = (n = 8) => Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 5);

export default function Visualizer() {
  const { id } = useParams();
  const [algo, setAlgo] = useState(null);
  const [array, setArray] = useState(() => randomArray());
  const [speed, setSpeed] = useState(3);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAlgorithm(id).then(({ data }) => setAlgo(data));
  }, [id]);

  const engine = engines[id];
  const steps = useMemo(() => (engine ? engine(array) : []), [engine, array]);
  const player = usePlayer(steps, SPEEDS[speed - 1]);

  const applyInput = () => {
    const nums = input.split(/[\s,]+/).filter(Boolean).map(Number);
    if (nums.length < 2 || nums.length > 15 || nums.some((n) => !Number.isInteger(n) || n < 1 || n > 99)) {
      setError("Enter 2 to 15 whole numbers (1 to 99), separated by commas.");
      return;
    }
    setError("");
    setArray(nums);
  };

  if (!algo) {
    return <main className="container page"><p className="muted">Loading...</p></main>;
  }

  return (
    <main className="container wide viz-page">
      <div className="viz-head">
        <div className="viz-title">
          <Link to="/explore" className="back-icon" title="All algorithms">←</Link>
          <h2>{algo.name}</h2>
          <span className="tag">{algo.category}</span>
        </div>
        <div className="chips">
          <span>Best {algo.complexity.best}</span>
          <span>Average {algo.complexity.average}</span>
          <span>Worst {algo.complexity.worst}</span>
          <span>Space {algo.complexity.space}</span>
        </div>
      </div>

      {!engine ? (
        <div className="notice">The visualization for this algorithm is coming soon.</div>
      ) : (
        <div className="viz-grid">
          <div className="card viz-card">
            <BarChart step={player.step} />

            <div className="legend-row">
              <span><i className="dot idle" />Unsorted</span>
              <span><i className="dot compare" />Comparing</span>
              <span><i className="dot swap" />Swapping</span>
              <span><i className="dot sorted" />Sorted</span>
              <span><i className="dot marked" />Min / Key</span>
            </div>

            <div className="message">{player.step.message}</div>

            <Controls player={player} speed={speed} setSpeed={setSpeed} />

            <div className="array-input">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyInput()}
                placeholder="Custom array, e.g. 5, 3, 8, 1"
              />
              <button className="btn btn-ghost" onClick={applyInput}>Apply</button>
              <button className="btn btn-ghost" onClick={() => { setError(""); setArray(randomArray()); }}>
                Random
              </button>
            </div>
            {error && <p className="error">{error}</p>}
          </div>

          <div className="right-col">
            <StatsPanel step={player.step} />
            <PseudocodePanel lines={algo.pseudocode} active={player.step.line} />
          </div>
        </div>
      )}
    </main>
  );
}