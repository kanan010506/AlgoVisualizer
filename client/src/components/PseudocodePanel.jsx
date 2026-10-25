export default function PseudocodePanel({ lines, active }) {
  return (
    <div className="card">
      <h3>Pseudocode</h3>
      <div className="code">
        {lines.map((l, i) => (
          <div key={i} className={`code-line ${i === active ? "active" : ""}`}>
            <span className="ln">{i + 1}</span>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}