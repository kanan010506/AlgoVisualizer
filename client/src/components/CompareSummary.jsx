function MetricCell({ value, other }) {
  return <td className={value < other ? "compare-lower" : ""}>{value}</td>;
}

export default function CompareSummary({
  algorithmA,
  algorithmB,
  statsA,
  statsB,
  totalStepsA,
  totalStepsB,
}) {
  const metrics = [
    { name: "comparisons", valueA: statsA.comparisons, valueB: statsB.comparisons },
    { name: "swaps / shifts", valueA: statsA.swaps, valueB: statsB.swaps },
    { name: "steps", valueA: totalStepsA, valueB: totalStepsB },
  ];
  const winsA = metrics.filter((metric) => metric.valueA < metric.valueB).map((metric) => metric.name);
  const winsB = metrics.filter((metric) => metric.valueB < metric.valueA).map((metric) => metric.name);
  const ties = metrics.filter((metric) => metric.valueA === metric.valueB).map((metric) => metric.name);

  let winnerText;
  if (winsA.length === metrics.length) {
    winnerText = `${algorithmA.name} wins on all metrics.`;
  } else if (winsB.length === metrics.length) {
    winnerText = `${algorithmB.name} wins on all metrics.`;
  } else if (winsA.length === 0 && winsB.length === 0) {
    winnerText = "All metrics were tied.";
  } else {
    const statements = [];
    if (winsA.length) statements.push(`${algorithmA.name} used fewer ${winsA.join(" and ")}`);
    if (winsB.length) statements.push(`${algorithmB.name} used fewer ${winsB.join(" and ")}`);
    if (ties.length) statements.push(`${ties.join(" and ")} were tied`);
    winnerText = `${statements.join("; ")}.`;
  }

  return (
    <section className="card compare-summary">
      <h3>Comparison summary</h3>
      <p className="compare-summary-note">
        {winnerText}
      </p>
      <table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>{algorithmA.name}</th>
            <th>{algorithmB.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Comparisons</th>
            <MetricCell value={statsA.comparisons} other={statsB.comparisons} />
            <MetricCell value={statsB.comparisons} other={statsA.comparisons} />
          </tr>
          <tr>
            <th>Swaps / Shifts</th>
            <MetricCell value={statsA.swaps} other={statsB.swaps} />
            <MetricCell value={statsB.swaps} other={statsA.swaps} />
          </tr>
          <tr>
            <th>Total steps</th>
            <MetricCell value={totalStepsA} other={totalStepsB} />
            <MetricCell value={totalStepsB} other={totalStepsA} />
          </tr>
        </tbody>
      </table>
    </section>
  );
}
