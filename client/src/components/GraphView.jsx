import { bfsGraph } from "../algorithms/bfs.js";

export default function GraphView({ step }) {
  const visited = step.visited || [];
  const queue = step.queue || [];
  const isStack = step.stack !== undefined;

  const nodeState = (node) => {
    if (step.current === node) return "current";
    if (queue.includes(node)) return "queue";
    if (visited.includes(node)) return "visited";
    return "unvisited";
  };

  return (
    <div className="graph-view">
      <svg className="graph-svg" viewBox="0 0 740 300" role="img" aria-label="Graph traversal visualization">
        {bfsGraph.edges.map(([from, to]) => {
          const a = bfsGraph.positions[from];
          const b = bfsGraph.positions[to];
          const active = step.edge && (
            (step.edge[0] === from && step.edge[1] === to) ||
            (step.edge[0] === to && step.edge[1] === from)
          );

          return (
            <line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={`graph-edge ${active ? "active" : ""}`}
            />
          );
        })}

        {bfsGraph.nodes.map((node) => {
          const position = bfsGraph.positions[node];
          return (
            <g key={node} className={`graph-node ${nodeState(node)}`}>
              <circle cx={position.x} cy={position.y} r="24" />
              <text x={position.x} y={position.y} dy="0.35em" textAnchor="middle">{node}</text>
            </g>
          );
        })}
      </svg>

      <div className="graph-stats">
        <div>
          <span className="stat-label">{isStack ? "Stack" : "Queue"}</span>
          <span className="graph-stat-value">
            {queue.length
              ? (isStack ? [...queue].reverse().join(" \u2192 ") : queue.join(" \u2192 "))
              : "Empty"}
          </span>
        </div>
        <div>
          <span className="stat-label">Visit order</span>
          <span className="graph-stat-value">{step.visitOrder?.length ? step.visitOrder.join(" \u2192 ") : "None"}</span>
        </div>
      </div>
    </div>
  );
}
