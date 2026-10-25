export default function Controls({ player, speed, setSpeed }) {
  const { playing, play, pause, next, prev, reset, index, last } = player;
  const progress = last ? (index / last) * 100 : 0;

  return (
    <div>
      <div className="controls">
        <div className="control-group">
          <button className="btn btn-ghost" onClick={reset}>Reset</button>
          <button className="btn btn-ghost" onClick={prev} disabled={index === 0}>← Prev</button>
          <button className="btn btn-primary btn-play" onClick={playing ? pause : play}>
            {playing ? "Pause" : "Play"}
          </button>
          <button className="btn btn-ghost" onClick={next} disabled={index === last}>Next →</button>
        </div>

        <div className="control-group">
          <label className="speed">
            Speed
            <input type="range" min="1" max="5" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
          </label>
          <span className="step-count">Step {index + 1}/{last + 1}</span>
        </div>
      </div>
      <div className="progress"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
    </div>
  );
}