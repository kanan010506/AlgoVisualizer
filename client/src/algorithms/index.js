import bubbleSort from "./bubbleSort.js";
import selectionSort from "./selectionSort.js";
import insertionSort from "./insertionSort.js";
import heapSort from "./heapSort.js";
import shellSort from "./shellSort.js";
import quickSort from "./quickSort.js";
import mergeSort from "./mergeSort.js";
import linearSearch from "./linearSearch.js";
import binarySearch from "./binarySearch.js";
import bfs from "./bfs.js";
import dfs from "./dfs.js";

export const engines = {
  "bubble-sort": bubbleSort,
  "selection-sort": selectionSort,
  "insertion-sort": insertionSort,
  "heap-sort": heapSort,
  "shell-sort": shellSort,
  "quick-sort": quickSort,
  "merge-sort": mergeSort,
  "linear-search": linearSearch,
  "binary-search": binarySearch,
  "graph-bfs": bfs,
  "graph-dfs": dfs,
};