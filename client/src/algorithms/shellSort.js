export default function shellSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  const sorted = [];
  let marked = [];
  let comparisons = 0;
  let shifts = 0;
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
      stats: { comparisons, swaps: shifts, pass, moveLabel: "Shifts" },
    });

  let gap = Math.floor(n / 2);
  push(0, `Start Shell Sort: gap = ${gap}`);

  while (gap > 0) {
    pass++;
    push(1, `Pass ${pass}: gap is ${gap}`);

    for (let i = gap; i < n; i++) {
      push(2, `Process index ${i} in the gap-sorted groups`);
      const key = arr[i];
      marked = [i];
      push(3, `Set key = ${key}`);
      let j = i;
      push(4, `Set j = ${j}`);

      while (j >= gap) {
        comparisons++;
        push(5, `Compare ${arr[j - gap]} at index ${j - gap} with key ${key}`, [j - gap, j]);

        if (arr[j - gap] > key) {
          arr[j] = arr[j - gap];
          shifts++;
          push(6, `Shift ${arr[j]} from index ${j - gap} to index ${j}`, [j - gap, j], true);
          j -= gap;
          push(7, `Move j back by gap to index ${j}`);
        } else {
          break;
        }
      }

      arr[j] = key;
      marked = [j];
      push(8, `Place key ${key} at index ${j}`);
    }

    gap = Math.floor(gap / 2);
    push(9, `Reduce gap to ${gap}`);
  }

  marked = [];
  for (let i = 0; i < n; i++) sorted.push(i);
  push(-1, "Array is sorted");

  return steps;
}
