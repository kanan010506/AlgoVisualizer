export const bfsGraph = {
  nodes: ["A", "B", "C", "D", "E", "F", "G", "H"],
  positions: {
    A: { x: 90, y: 150 },
    B: { x: 230, y: 70 },
    C: { x: 230, y: 230 },
    D: { x: 370, y: 70 },
    E: { x: 370, y: 230 },
    F: { x: 510, y: 150 },
    G: { x: 650, y: 70 },
    H: { x: 650, y: 230 },
  },
  adjacency: {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "E", "F"],
    D: ["B", "G"],
    E: ["B", "C", "F"],
    F: ["C", "E", "G", "H"],
    G: ["D", "F", "H"],
    H: ["F", "G"],
  },
  edges: [
    ["A", "B"], ["A", "C"], ["B", "D"], ["B", "E"],
    ["C", "E"], ["C", "F"], ["D", "G"], ["E", "F"],
    ["F", "G"], ["F", "H"], ["G", "H"],
  ],
};

export default function bfs(input = bfsGraph, start = "A") {
  const graph = input?.nodes ? input : bfsGraph;
  const nodes = graph.nodes;
  const adjacency = graph.adjacency;
  const queue = [];
  const visited = [];
  const visitOrder = [];
  const steps = [];

  const push = (line, message, current = null, edge = null) => {
    steps.push({
      array: [...nodes],
      comparing: edge ? [edge[0], edge[1]] : [],
      swapped: false,
      sorted: [...visited],
      current,
      queue: [...queue],
      visited: [...visited],
      visitOrder: [...visitOrder],
      edge,
      line,
      message,
      stats: {
        status: current ? "Exploring" : visitOrder.length ? "Complete" : "Ready",
        custom: [
          ["Start", start],
          ["Queue", queue.length ? queue.join(" \u2192 ") : "Empty"],
          ["Visited", visited.length],
          ["Visit order", visitOrder.join(" \u2192 ") || "None"],
        ],
      },
    });
  };

  if (!nodes.includes(start)) {
    push(0, `Start node ${start} is not in the graph`);
    return steps;
  }

  visited.push(start);
  queue.push(start);
  push(0, `Start at node ${start}: mark it visited and enqueue it`);

  while (queue.length > 0) {
    const current = queue.shift();
    visitOrder.push(current);
    push(2, `Dequeue ${current} and visit it`, current);

    for (const neighbor of adjacency[current] || []) {
      const edge = [current, neighbor];
      if (!visited.includes(neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
        push(5, `Explore edge ${current} \u2192 ${neighbor}: enqueue and mark ${neighbor} visited`, current, edge);
      } else {
        push(5, `Explore edge ${current} \u2192 ${neighbor}: ${neighbor} is already visited`, current, edge);
      }
    }

    push(7, `Finished exploring neighbors of ${current}`, current);
  }

  push(-1, `BFS complete. Visit order: ${visitOrder.join(" \u2192 ")}`);
  return steps;
}
