export default function StatsPanel({ step }) {
  const { comparisons, swaps, pass, moveLabel = "Swaps" } = step.stats;
  const n = step.array.length;

  let status = "Ready";
  if (step.line === -1) status = "Sorted";
  else if (step.swapped) status = moveLabel === "Shifts" ? "Shifting" : "Swapping";
  else if (step.comparing.length) status = "Comparing";
  else if (step.line > 0) status = "Running";

  const tiles = [
    ["Status", status, `status-${status.toLowerCase()}`],
    ["Comparisons", comparisons],
    [moveLabel, swaps],
    ["Pass", `${pass} / ${Math.max(n - 1, 1)}`],
    ["Sorted", `${step.sorted.length} / ${n}`],
    ["Array size", n],
  ];

  return (
    <div className="stats-grid">
      {tiles.map(([label, value, cls]) => (
        <div key={label} className="stat">
          <span className="stat-label">{label}</span>
          <span className={`stat-value ${cls || ""}`}>{value}</span>
        </div>
      ))}
    </div>
  );
}