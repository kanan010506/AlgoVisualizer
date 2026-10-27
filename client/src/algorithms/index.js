 import bubbleSort from "./bubbleSort.js";
import selectionSort from "./selectionSort.js";
import insertionSort from "./insertionSort.js";
import linearSearch from "./linearSearch.js";
import binarySearch from "./binarySearch.js";

export const engines = {
  "bubble-sort": bubbleSort,
  "selection-sort": selectionSort,
  "insertion-sort": insertionSort,
  "linear-search": linearSearch,
  "binary-search": binarySearch,
};