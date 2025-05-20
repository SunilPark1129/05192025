import { useState, useRef } from "react";
import "./App.css";

let timer = null;

function App() {
  const [seconds, setSeconds] = useState(0);
  const secRef = useRef();
  const minRef = useRef();

  function runTimer() {
    if (!timer) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 100);
    }
  }

  function handleStart() {
    const sec = Number(secRef.current.value);
    const min = Number(minRef.current.value);

    // Number('') or Number(' ') returns 0
    if (Number.isNaN(sec)) return;
    if (Number.isNaN(min)) return;

    // Normalize input values
    // if the user enters 1 min 100 sec in the input,
    // convert it to 2 min 40 sec
    secRef.current.value = sec % 60;
    minRef.current.value = min + Math.floor(sec / 60);

    // calculate total seconds
    const totalSeconds = min * 60 + sec;

    setSeconds(totalSeconds);
    runTimer();
  }

  function handleResume() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    } else {
      runTimer();
    }
  }

  function handleReset() {
    clearTimeout(timer);
    setSeconds(0);
    timer = null;
  }

  // calculate and convert total seconds to 'mm:ss' format
  const currentTimer = (function () {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    console.log(min, sec);
    return `${min}:${sec}`;
  })();

  return (
    <div>
      <h1>Timer</h1>
      <div style={{ display: "flex" }}>
        <label>
          <input type="text" ref={minRef} style={{ textAlign: "right" }} />
          Minutes
        </label>
        <label>
          <input type="text" ref={secRef} style={{ textAlign: "right" }} />
          Seconds
        </label>
        <button onClick={handleStart}>START</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handleResume} disabled={seconds === 0}>
          PAUSE/RESUME
        </button>
        <button onClick={handleReset}>RESET</button>
      </div>
      <div>
        <span>{currentTimer}</span>
      </div>
    </div>
  );
}

export default App;
