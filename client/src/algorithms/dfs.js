import { bfsGraph } from "./bfs.js";

export default function dfs(input = bfsGraph, start = "A") {
  const graph = input?.nodes ? input : bfsGraph;
  const nodes = graph.nodes;
  const adjacency = graph.adjacency;
  const stack = [];
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
      queue: [...stack],
      stack: [...stack],
      visited: [...visited],
      visitOrder: [...visitOrder],
      edge,
      line,
      message,
      stats: {
        status: current ? "Exploring" : visitOrder.length ? "Complete" : "Ready",
        custom: [
          ["Start", start],
          ["Stack", stack.length ? [...stack].reverse().join(" \u2192 ") : "Empty"],
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

  stack.push(start);
  push(0, `Push start node ${start} onto the stack`);

  while (stack.length > 0) {
    const current = stack.pop();

    if (visited.includes(current)) {
      push(3, `Pop ${current}: it is already visited`, current);
      continue;
    }

    visited.push(current);
    visitOrder.push(current);
    push(4, `Pop ${current}, mark it visited, and add it to the visit order`, current);

    const neighbors = [...(adjacency[current] || [])].reverse();
    for (const neighbor of neighbors) {
      const edge = [current, neighbor];
      if (!visited.includes(neighbor) && !stack.includes(neighbor)) {
        stack.push(neighbor);
        push(7, `Explore edge ${current} \u2192 ${neighbor}: push ${neighbor} onto the stack`, current, edge);
      } else {
        push(7, `Explore edge ${current} \u2192 ${neighbor}: ${neighbor} is already visited or queued`, current, edge);
      }
    }

    push(9, `Finished exploring neighbors of ${current}`, current);
  }

  push(-1, `DFS complete. Visit order: ${visitOrder.join(" \u2192 ")}`);
  return steps;
}
