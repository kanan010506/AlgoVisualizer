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
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function Visualizer() {
  const { id } = useParams();
  const [algo, setAlgo] = useState(null);
  const [initial] = useState(() => randomArray());
  const [array, setArray] = useState(initial);
  const [target, setTarget] = useState(() => pick(initial));
  const [speed, setSpeed] = useState(3);
  const [input, setInput] = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAlgorithm(id).then(({ data }) => setAlgo(data));
  }, [id]);

  const isSearch = algo?.category === "Searching";
  const needsSorted = id === "binary-search";

  const view = useMemo(
    () => (needsSorted ? [...array].sort((a, b) => a - b) : array),
    [array, needsSorted]
  );

  const engine = engines[id];
  const steps = useMemo(() => (engine ? engine(view, target) : []), [engine, view, target]);
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

  const applyTarget = () => {
    const t = Number(targetInput);
    if (!targetInput.trim() || !Number.isInteger(t) || t < 1 || t > 99) {
      setError("Target must be a whole number between 1 and 99.");
      return;
    }
    setError("");
    setTarget(t);
    setTargetInput("");
  };

  const randomize = () => {
    const a = randomArray();
    setError("");
    setArray(a);
    setTarget(pick(a));
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
              {isSearch ? (
                <>
                  <span><i className="dot idle" />Not checked</span>
                  <span><i className="dot compare" />Checking</span>
                  <span><i className="dot eliminated" />Eliminated</span>
                  <span><i className="dot found" />Found</span>
                </>
              ) : (
                <>
                  <span><i className="dot idle" />Unsorted</span>
                  <span><i className="dot compare" />Comparing</span>
                  <span><i className="dot swap" />Swapping</span>
                  <span><i className="dot marked" />Min / Key</span>
                  <span><i className="dot sorted" />Sorted</span>
                </>
              )}
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
              <button className="btn btn-ghost" onClick={randomize}>Random</button>
            </div>

            {isSearch && (
              <div className="array-input">
                <input
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applyTarget()}
                  placeholder={`Target value (current: ${target})`}
                />
                <button className="btn btn-ghost" onClick={applyTarget}>Set target</button>
                <button className="btn btn-ghost" onClick={() => setTarget(pick(array))}>From array</button>
              </div>
            )}

            {needsSorted && (
              <p className="hint">Binary Search needs a sorted array, so the array is sorted automatically.</p>
            )}
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