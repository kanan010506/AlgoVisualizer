export default function quickSort(input) {
  const arr = [...input];
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

  push(0, "Start Quick Sort");

  const partition = (low, high) => {
    pass++;
    const pivot = arr[high];
    marked = [high];
    push(7, `Partition [${low}, ${high}] using pivot ${pivot}`, [high]);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      push(9, `Compare arr[${j}] (${arr[j]}) <= pivot (${pivot})?`, [j, high]);

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          const a = arr[i], b = arr[j];
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          push(12, `Move ${b} left of the pivot: swap ${a} and ${b}`, [i, j], true);
          if (marked.includes(j)) {
            marked = [i];
          }
        }
      }
    }

    if (i + 1 !== high) {
      const a = arr[i + 1], b = arr[high];
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swaps++;
      push(13, `Place pivot ${pivot}: swap ${a} and ${b}`, [i + 1, high], true);
    }

    marked = [];
    sorted.push(i + 1);
    push(13, `${pivot} is now in its final position at index ${i + 1}`);
    return i + 1;
  };

  const quickSortRange = (low, high) => {
    if (low > high) return;
    if (low === high) {
      sorted.push(low);
      push(1, `${arr[low]} is already in its final position`);
      return;
    }

    const pivotIndex = partition(low, high);
    quickSortRange(low, pivotIndex - 1);
    quickSortRange(pivotIndex + 1, high);
  };

  if (arr.length > 0) {
    quickSortRange(0, arr.length - 1);
  }

  sorted.length = 0;
  for (let k = 0; k < arr.length; k++) sorted.push(k);
  push(-1, "Array is sorted");

  return steps;
}
