import bubbleSort from "./bubbleSort.js";
import selectionSort from "./selectionSort.js";
import insertionSort from "./insertionSort.js";
import quickSort from "./quickSort.js";
import mergeSort from "./mergeSort.js";
import linearSearch from "./linearSearch.js";
import binarySearch from "./binarySearch.js";

export const engines = {
  "bubble-sort": bubbleSort,
  "selection-sort": selectionSort,
  "insertion-sort": insertionSort,
  "quick-sort": quickSort,
  "merge-sort": mergeSort,
  "linear-search": linearSearch,
  "binary-search": binarySearch,
};