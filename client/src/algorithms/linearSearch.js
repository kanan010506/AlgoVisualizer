export default function linearSearch(input, target) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  const eliminated = [];
  let comparisons = 0;
  let found = -1;
  let status = "Searching";

  const push = (line, message, comparing = []) =>
    steps.push({
      array: [...arr],
      comparing,
      swapped: false,
      sorted: [],
      eliminated: [...eliminated],
      found,
      line,
      message,
      stats: {
        status,
        custom: [
          ["Target", target],
          ["Comparisons", comparisons],
          ["Remaining", Math.max(n - comparisons, 0)],
          ["Result", found >= 0 ? `Index ${found}` : "—"],
          ["Array size", n],
        ],
      },
    });

  push(0, `Start Linear Search for ${target}`);

  for (let i = 0; i < n; i++) {
    comparisons++;
    push(1, `Is arr[${i}] (${arr[i]}) == ${target}?`, [i]);

    if (arr[i] === target) {
      found = i;
      status = "Found";
      push(2, `Found ${target} at index ${i}`);
      return steps;
    }
    eliminated.push(i);
  }

  status = "Not found";
  push(3, `Reached the end: ${target} is not in the array`);
  return steps;
}