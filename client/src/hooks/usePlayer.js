import { useEffect, useState } from "react";

export default function usePlayer(steps, speedMs) {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [prevSteps, setPrevSteps] = useState(steps);
  const last = steps.length - 1;

  // new array or algorithm → start over
  if (steps !== prevSteps) {
    setPrevSteps(steps);
    setIndex(0);
    setRunning(false);
  }

  const playing = running && index < last;

  // autoplay
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setIndex((i) => i + 1), speedMs);
    return () => clearTimeout(t);
  }, [playing, index, speedMs]);

  return {
    index,
    last,
    playing,
    step: steps[index],
    play: () => {
      if (index >= last) setIndex(0);
      setRunning(true);
    },
    pause: () => setRunning(false),
    next: () => {
      setRunning(false);
      setIndex((i) => Math.min(i + 1, last));
    },
    prev: () => {
      setRunning(false);
      setIndex((i) => Math.max(i - 1, 0));
    },
    reset: () => {
      setRunning(false);
      setIndex(0);
    },
  };
}