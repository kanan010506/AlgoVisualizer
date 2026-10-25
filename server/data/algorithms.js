const algorithms = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "Sorting",
    description:
      "Repeatedly compares adjacent elements and swaps them if they are in the wrong order. Stops early if a full pass makes no swaps.",
    pseudocode: [
      "for i = 0 to n-2",
      "  swapped = false",
      "  for j = 0 to n-i-2",
      "    if arr[j] > arr[j+1]",
      "      swap(arr[j], arr[j+1])",
      "      swapped = true",
      "  if swapped == false",
      "    break",
    ],
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "Sorting",
    description:
      "Finds the smallest element in the unsorted part and places it at the front, one position at a time.",
    pseudocode: [
      "for i = 0 to n-2",
      "  minIndex = i",
      "  for j = i+1 to n-1",
      "    if arr[j] < arr[minIndex]",
      "      minIndex = j",
      "  swap(arr[i], arr[minIndex])",
    ],
    complexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "Sorting",
    description:
      "Builds the sorted array one element at a time by inserting each element into its correct position among the already sorted ones.",
    pseudocode: [
      "for i = 1 to n-1",
      "  key = arr[i]",
      "  j = i - 1",
      "  while j >= 0 and arr[j] > key",
      "    arr[j+1] = arr[j]",
      "    j = j - 1",
      "  arr[j+1] = key",
    ],
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
  },
  {
    id: "linear-search",
    name: "Linear Search",
    category: "Searching",
    description:
      "Checks each element one by one until the target is found or the array ends. Works on unsorted arrays.",
    pseudocode: [
      "for i = 0 to n-1",
      "  if arr[i] == target",
      "    return i",
      "return -1",
    ],
    complexity: { best: "O(1)", average: "O(n)", worst: "O(n)", space: "O(1)" },
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Searching",
    description:
      "Repeatedly halves the search range by comparing the target with the middle element. Requires a sorted array.",
    pseudocode: [
      "low = 0, high = n-1",
      "while low <= high",
      "  mid = floor((low + high) / 2)",
      "  if arr[mid] == target",
      "    return mid",
      "  else if arr[mid] < target",
      "    low = mid + 1",
      "  else",
      "    high = mid - 1",
      "return -1",
    ],
    complexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)", space: "O(1)" },
  },
];

export default algorithms;