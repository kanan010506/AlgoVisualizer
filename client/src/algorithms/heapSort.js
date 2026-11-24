export default function heapSort(input) {
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

  const siftDown = (root, heapSize) => {
    let parent = root;
    push(8, `Sift down from index ${root} in a heap of size ${heapSize}`);

    while (true) {
      const left = 2 * parent + 1;
      const right = left + 1;
      let largest = parent;
      marked = [parent];

      if (left < heapSize) {
        comparisons++;
        push(12, `Compare parent ${arr[parent]} with left child ${arr[left]}`, [parent, left]);
        if (arr[left] > arr[largest]) largest = left;
      }

      if (right < heapSize) {
        comparisons++;
        push(14, `Compare current largest ${arr[largest]} with right child ${arr[right]}`, [largest, right]);
        if (arr[right] > arr[largest]) largest = right;
      }

      if (largest === parent) break;

      const a = arr[parent], b = arr[largest];
      [arr[parent], arr[largest]] = [arr[largest], arr[parent]];
      swaps++;
      push(17, `Swap ${a} with larger child ${b}`, [parent, largest], true);
      parent = largest;
    }

    marked = [];
  };

  push(0, "Start Heap Sort: build a max heap");

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    pass++;
    push(2, `Build heap: sift down the subtree rooted at index ${i}`);
    siftDown(i, n);
  }

  for (let end = n - 1; end > 0; end--) {
    pass++;
    const a = arr[0], b = arr[end];
    [arr[0], arr[end]] = [arr[end], arr[0]];
    swaps++;
    sorted.push(end);
    push(5, `Move maximum ${a} to final index ${end}`, [0, end], true);
    siftDown(0, end);
  }

  if (n > 0) sorted.push(0);
  marked = [];
  push(-1, "Array is sorted");

  return steps;
}
