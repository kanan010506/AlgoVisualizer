import BarChart from "./BarChart.jsx";

export default function BarPanel({ step, stats = step.stats, stepsTaken, variant = "" }) {
  return (
    <>
      <BarChart step={step} variant={variant} />
      {stepsTaken !== undefined && (
        <div className="compare-mini-stats">
          <div className="stat">
            <span className="stat-label">Comparisons</span>
            <span className="stat-value">{stats.comparisons}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Swaps / Shifts</span>
            <span className="stat-value">{stats.swaps}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Steps taken</span>
            <span className="stat-value">{stepsTaken}</span>
          </div>
        </div>
      )}
    </>
  );
}
