import { useMemo, useState } from "react";
import { engines } from "../algorithms/index.js";
import algorithms from "../data/algorithms.js";
import BarPanel from "../components/BarPanel.jsx";
import CompareSummary from "../components/CompareSummary.jsx";
import useCompareRunner from "../hooks/useCompareRunner.js";

const randomArray = (n = 8) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 5);

const sortingAlgorithms = algorithms.filter(
  (algorithm) => algorithm.category === "Sorting" && engines[algorithm.id]
);

function AlgorithmPanel({ algorithm, onChange, step, stepsTaken, totalSteps, finished }) {
  const progress = totalSteps ? (stepsTaken / totalSteps) * 100 : 0;

  return (
    <section className="card compare-panel">
      <div
        className="compare-panel-progress"
        role="progressbar"
        aria-label={`${algorithm.label} progress`}
        aria-valuemin="0"
        aria-valuemax={totalSteps}
        aria-valuenow={stepsTaken}
      >
        <div style={{ width: `${progress}%` }} />
      </div>
      <div className="compare-panel-head">
        <label>
          <span className="compare-select-label">
            <span className={`compare-side-badge ${algorithm.side.toLowerCase()}`}>{algorithm.side}</span>
            <span>{algorithm.label}</span>
          </span>
          <select value={algorithm.id} onChange={(event) => onChange(event.target.value)}>
            {sortingAlgorithms.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <div className="chips">
          <span>Best {algorithm.data.complexity.best}</span>
          <span>Average {algorithm.data.complexity.average}</span>
          <span>Worst {algorithm.data.complexity.worst}</span>
          <span>Space {algorithm.data.complexity.space}</span>
        </div>
        {finished && <span className="compare-finished">Finished</span>}
      </div>
      <BarPanel step={step} stats={step.stats} stepsTaken={stepsTaken} variant="compare" />
    </section>
  );
}

export default function Compare() {
  const [algorithmAId, setAlgorithmAId] = useState(sortingAlgorithms[0]?.id);
  const [algorithmBId, setAlgorithmBId] = useState(sortingAlgorithms[1]?.id);
  const [array, setArray] = useState(() => randomArray());
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const algorithmAData = algorithms.find((algorithm) => algorithm.id === algorithmAId);
  const algorithmBData = algorithms.find((algorithm) => algorithm.id === algorithmBId);
  const engineA = engines[algorithmAId];
  const engineB = engines[algorithmBId];
  const stepsA = useMemo(() => engineA(array), [engineA, array]);
  const stepsB = useMemo(() => engineB(array), [engineB, array]);
  const runner = useCompareRunner(stepsA, stepsB);

  const applyInput = () => {
    const values = input.split(/[\s,]+/).filter(Boolean).map(Number);
    if (
      values.length < 2 ||
      values.length > 15 ||
      values.some((value) => !Number.isInteger(value) || value < 1 || value > 99)
    ) {
      setError("Enter 2 to 15 whole numbers (1 to 99), separated by commas.");
      return;
    }
    setError("");
    setArray(values);
  };

  const randomize = () => {
    setError("");
    setArray(randomArray());
  };

  const currentA = runner.stepA;
  const currentB = runner.stepB;
  const finished = runner.isFinished.a && runner.isFinished.b;
  const changeAlgorithmA = (id) => {
    setAlgorithmAId(id);
    runner.reset();
  };
  const changeAlgorithmB = (id) => {
    setAlgorithmBId(id);
    runner.reset();
  };
  const reset = () => {
    setError("");
    runner.reset();
  };

  if (!algorithmAData || !algorithmBData || !currentA || !currentB) {
    return <main className="container page"><p className="muted">Loading algorithms...</p></main>;
  }

  return (
    <main className="container page compare-page">
      <h2>Compare Sorting Algorithms</h2>

      <div className="compare-controls">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && applyInput()}
          placeholder="Custom array, e.g. 5, 3, 8, 1"
          aria-label="Custom array"
        />
        <button className="btn btn-ghost" onClick={applyInput}>Apply</button>
        <button className="btn btn-ghost" onClick={randomize}>Random</button>
        <button className="btn btn-ghost" onClick={reset}>Reset</button>
        <button
          className="btn btn-primary btn-play"
          onClick={runner.playing ? runner.pause : runner.play}
        >
          {runner.playing ? "Pause" : "Play"}
        </button>
        <label className="speed">
          Speed
          <input
            type="range"
            min="1"
            max="5"
            value={runner.speed}
            onChange={(event) => runner.setSpeed(Number(event.target.value))}
          />
        </label>
      </div>
      {error && <p className="error">{error}</p>}

      <div className="legend-row compare-legend" aria-label="Bar chart color legend">
        <span><i className="dot idle" />Unsorted</span>
        <span><i className="dot compare" />Comparing</span>
        <span><i className="dot swap" />Swapping</span>
        <span><i className="dot marked" />Pivot / Key</span>
        <span><i className="dot sorted" />Sorted</span>
      </div>

      <div className="compare-grid">
        <AlgorithmPanel
          algorithm={{ id: algorithmAId, data: algorithmAData, label: "Algorithm A", side: "A" }}
          onChange={changeAlgorithmA}
          step={currentA}
          stepsTaken={runner.indexA + 1}
          totalSteps={stepsA.length}
          finished={runner.isFinished.a}
        />
        <AlgorithmPanel
          algorithm={{ id: algorithmBId, data: algorithmBData, label: "Algorithm B", side: "B" }}
          onChange={changeAlgorithmB}
          step={currentB}
          stepsTaken={runner.indexB + 1}
          totalSteps={stepsB.length}
          finished={runner.isFinished.b}
        />
      </div>

      {finished && (
        <CompareSummary
          algorithmA={algorithmAData}
          algorithmB={algorithmBData}
          statsA={stepsA.at(-1).stats}
          statsB={stepsB.at(-1).stats}
          totalStepsA={stepsA.length}
          totalStepsB={stepsB.length}
        />
      )}
    </main>
  );
}
