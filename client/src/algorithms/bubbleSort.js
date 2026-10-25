export default function bubbleSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  const sorted = [];
  let comparisons = 0;
  let swaps = 0;
  let pass = 0;

  const push = (line, message, comparing = [], swapped = false) =>
    steps.push({
      array: [...arr],
      comparing,
      swapped,
      sorted: [...sorted],
      line,
      message,
      stats: { comparisons, swaps, pass },
    });

  push(0, "Start Bubble Sort");

  for (let i = 0; i < n - 1; i++) {
    let didSwap = false;
    pass = i + 1;
    push(1, `Pass ${pass}: set swapped = false`);

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      push(3, `Compare arr[${j}] (${arr[j]}) > arr[${j + 1}] (${arr[j + 1]})?`, [j, j + 1]);

      if (arr[j] > arr[j + 1]) {
        const a = arr[j], b = arr[j + 1];
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        didSwap = true;
        swaps++;
        push(4, `Yes, swap ${a} and ${b}`, [j, j + 1], true);
      }
    }

    sorted.push(n - i - 1);
    push(6, `End of pass ${pass}: ${arr[n - i - 1]} is in its final place`);

    if (!didSwap) {
      push(7, "No swaps in this pass, so the array is already sorted");
      break;
    }
  }

  sorted.length = 0;
  for (let k = 0; k < n; k++) sorted.push(k);
  push(-1, "Array is sorted");

  return steps;
}