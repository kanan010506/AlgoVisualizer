export default function BarChart({ step }) {
  const max = Math.max(...step.array);
  const marked = step.marked || [];
  const eliminated = step.eliminated || [];
  const p = step.pointers;

  return (
    <div className="bars">
      {step.array.map((v, i) => {
        let state = "idle";
        if (step.found === i) state = "found";
        else if (step.comparing.includes(i)) state = step.swapped ? "swap" : "compare";
        else if (marked.includes(i)) state = "marked";
        else if (step.sorted.includes(i)) state = "sorted";
        else if (eliminated.includes(i)) state = "eliminated";

        const tags = p
          ? [i === p.low && "L", i === p.mid && "M", i === p.high && "H"].filter(Boolean).join("/")
          : "";

        return (
          <div className="bar-col" key={i}>
            <div className="bar-area">
              <div className="bar-wrap" style={{ height: `${(v / max) * 100}%` }}>
                <span className="bar-value">{v}</span>
                <div className={`bar ${state}`} />
              </div>
            </div>
            <span className="bar-index">{i}</span>
            {p && <span className="bar-tag">{tags || "\u00A0"}</span>}
          </div>
        );
      })}
    </div>
  );
}