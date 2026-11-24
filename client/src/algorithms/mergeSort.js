export default function mergeSort(input) {
  const arr = [...input];
  const steps = [];
  const sorted = [];
  let marked = [];
  let comparisons = 0;
  let writes = 0;
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
      stats: { comparisons, swaps: writes, pass, moveLabel: "Writes" },
    });

  push(0, "Start Merge Sort");

  const merge = (left, mid, right) => {
    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    marked = Array.from({ length: right - left + 1 }, (_, index) => left + index);
    push(5, `Merge subarrays [${left}, ${mid}] and [${mid + 1}, ${right}]`, marked);

    while (i < leftArray.length && j < rightArray.length) {
      comparisons++;
      const leftIndex = left + i;
      const rightIndex = mid + 1 + j;
      push(7, `Compare ${leftArray[i]} from the left run with ${rightArray[j]} from the right run`, [leftIndex, rightIndex]);

      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      writes++;
      push(8, `Write ${arr[k]} into index ${k}`, [k], true);
      k++;
    }

    while (i < leftArray.length) {
      arr[k] = leftArray[i];
      writes++;
      push(10, `Copy remaining left value ${arr[k]} into index ${k}`, [k], true);
      i++;
      k++;
    }

    while (j < rightArray.length) {
      arr[k] = rightArray[j];
      writes++;
      push(10, `Copy remaining right value ${arr[k]} into index ${k}`, [k], true);
      j++;
      k++;
    }
  };

  const mergeSortRange = (left, right) => {
    if (left >= right) return;

    pass++;
    const mid = Math.floor((left + right) / 2);
    marked = Array.from({ length: right - left + 1 }, (_, index) => left + index);
    push(2, `Divide range [${left}, ${right}] at index ${mid}`, marked);

    mergeSortRange(left, mid);
    mergeSortRange(mid + 1, right);
    merge(left, mid, right);
  };

  if (arr.length > 0) {
    mergeSortRange(0, arr.length - 1);
  }

  marked = [];
  sorted.length = 0;
  for (let k = 0; k < arr.length; k++) sorted.push(k);
  push(-1, "Array is sorted");

  return steps;
}
