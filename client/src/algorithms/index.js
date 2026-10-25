import bubbleSort from "./bubbleSort.js";
import selectionSort from "./selectionSort.js";
import insertionSort from "./insertionSort.js";

export const engines = {
  "bubble-sort": bubbleSort,
  "selection-sort": selectionSort,
  "insertion-sort": insertionSort,
};