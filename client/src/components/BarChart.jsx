export default function BarChart({ step }) {
  const max = Math.max(...step.array);
  const marked = step.marked || [];

  return (
    <div className="bars">
      {step.array.map((v, i) => {
        let state = "idle";
        if (step.comparing.includes(i)) state = step.swapped ? "swap" : "compare";
        else if (marked.includes(i)) state = "marked";
        else if (step.sorted.includes(i)) state = "sorted";

        return (
          <div className="bar-col" key={i}>
            <div className="bar-area">
              <div className="bar-wrap" style={{ height: `${(v / max) * 100}%` }}>
                <span className="bar-value">{v}</span>
                <div className={`bar ${state}`} />
              </div>
            </div>
            <span className="bar-index">{i}</span>
          </div>
        );
      })}
    </div>
  );
}