import { useEffect, useState } from "react";

const SPEEDS = [1200, 800, 500, 250, 100];

export default function useCompareRunner(stepsA, stepsB) {
  const [playback, setPlayback] = useState({
    stepsA,
    stepsB,
    indexA: 0,
    indexB: 0,
    running: false,
  });
  const [speed, setSpeed] = useState(3);

  if (playback.stepsA !== stepsA || playback.stepsB !== stepsB) {
    setPlayback({
      stepsA,
      stepsB,
      indexA: 0,
      indexB: 0,
      running: false,
    });
  }

  const { indexA, indexB, running } = playback;
  const lastA = Math.max(stepsA.length - 1, 0);
  const lastB = Math.max(stepsB.length - 1, 0);
  const isFinishedA = stepsA.length === 0 || indexA >= lastA;
  const isFinishedB = stepsB.length === 0 || indexB >= lastB;
  const playing = running && (!isFinishedA || !isFinishedB);

  useEffect(() => {
    if (!playing) return undefined;

    const timer = setTimeout(() => {
      setPlayback((current) => ({
        ...current,
        indexA: isFinishedA ? current.indexA : Math.min(current.indexA + 1, lastA),
        indexB: isFinishedB ? current.indexB : Math.min(current.indexB + 1, lastB),
      }));
    }, SPEEDS[speed - 1]);

    return () => clearTimeout(timer);
  }, [playing, indexA, indexB, isFinishedA, isFinishedB, lastA, lastB, speed]);

  const reset = () => {
    setPlayback((current) => ({ ...current, running: false, indexA: 0, indexB: 0 }));
  };

  const play = () => {
    setPlayback((current) => ({
      ...current,
      indexA: isFinishedA && isFinishedB ? 0 : current.indexA,
      indexB: isFinishedA && isFinishedB ? 0 : current.indexB,
      running: true,
    }));
  };

  return {
    indexA,
    indexB,
    lastA,
    lastB,
    stepA: stepsA[indexA],
    stepB: stepsB[indexB],
    playing,
    play,
    pause: () => setPlayback((current) => ({ ...current, running: false })),
    reset,
    speed,
    setSpeed,
    isFinished: { a: isFinishedA, b: isFinishedB },
  };
}
