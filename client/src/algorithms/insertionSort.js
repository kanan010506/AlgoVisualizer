export default function insertionSort(input) {
  const arr = [...input];
  const n = arr.length;
  const steps = [];
  const sorted = [0];
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

  push(0, "Start Insertion Sort: arr[0] is already sorted");

  for (let i = 1; i < n; i++) {
    pass = i;
    const key = arr[i];
    let j = i - 1;
    marked = [i];
    push(1, `Pick key = ${key} from index ${i}`);

    while (j >= 0) {
      comparisons++;
      push(3, `Compare arr[${j}] (${arr[j]}) > key (${key})?`, [j]);

      if (arr[j] > key) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        shifts++;
        marked = [j];
        push(4, `Yes, shift ${arr[j + 1]} one place right`, [j, j + 1], true);
        j--;
      } else {
        break;
      }
    }

    marked = [];
    sorted.push(i);
    push(6, `Insert ${key} at index ${j + 1}`);
  }

  push(-1, "Array is sorted");

  return steps;
}