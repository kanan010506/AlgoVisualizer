export default function binarySearch(input, target) {
  const arr = [...input]; // the page passes a sorted array
  const n = arr.length;
  const steps = [];
  let low = 0;
  let high = n - 1;
  let mid = -1;
  let comparisons = 0;
  let found = -1;
  let status = "Searching";

  const push = (line, message, comparing = []) =>
    steps.push({
      array: [...arr],
      comparing,
      swapped: false,
      sorted: [],
      eliminated: arr.map((_, i) => i).filter((i) => i < low || i > high),
      found,
      pointers: { low, mid, high },
      line,
      message,
      stats: {
        status,
        custom: [
          ["Target", target],
          ["Comparisons", comparisons],
          ["Remaining", low <= high ? high - low + 1 : 0],
          ["Result", found >= 0 ? `Index ${found}` : "—"],
          ["Array size", n],
        ],
      },
    });

  push(0, `Start Binary Search for ${target} in the sorted array`);

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    push(2, `mid = floor((${low} + ${high}) / 2) = ${mid}`);

    comparisons++;
    push(3, `Is arr[${mid}] (${arr[mid]}) == ${target}?`, [mid]);

    if (arr[mid] === target) {
      found = mid;
      status = "Found";
      push(4, `Found ${target} at index ${mid}`);
      return steps;
    }

    if (arr[mid] < target) {
      push(5, `${arr[mid]} < ${target}, so the target must be in the right half`, [mid]);
      low = mid + 1;
      push(6, `Move low to ${low}: discard the left half`);
    } else {
      push(7, `${arr[mid]} > ${target}, so the target must be in the left half`, [mid]);
      high = mid - 1;
      push(8, `Move high to ${high}: discard the right half`);
    }
  }

  mid = -1;
  status = "Not found";
  push(9, `Search range is empty: ${target} is not in the array`);
  return steps;
}