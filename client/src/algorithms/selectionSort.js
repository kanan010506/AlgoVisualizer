export default function selectionSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  const sorted = [];
  let marked = [];
  let comparisons = 0;
  let swaps = 0;
  let pass = 0;

  const push = (line, message, comparing = [], swapped = false) =>
    steps.push({
      array: [...arr],
      comparing,
      swapped,
      sorted: [...sorted],
      marked: [...marked],
      line,
      message,
      stats: { comparisons, swaps, pass, moveLabel: "Swaps" },
    });

  push(0, "Start Selection Sort");

  for (let i = 0; i < n - 1; i++) {
    pass = i + 1;
    let min = i;
    marked = [min];
    push(1, `Pass ${pass}: assume arr[${i}] (${arr[i]}) is the minimum`);

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      push(3, `Compare arr[${j}] (${arr[j]}) < current min (${arr[min]})?`, [j]);

      if (arr[j] < arr[min]) {
        min = j;
        marked = [min];
        push(4, `Yes, new minimum is ${arr[min]} at index ${min}`, [j]);
      }
    }

    if (min !== i) {
      const a = arr[i], b = arr[min];
      [arr[i], arr[min]] = [arr[min], arr[i]];
      swaps++;
      push(5, `Swap ${a} and ${b}`, [i, min], true);
    }

    marked = [];
    sorted.push(i);
    push(5, `${arr[i]} is now in its final place`);
  }

  sorted.push(n - 1);
  push(-1, "Array is sorted");

  return steps;
}