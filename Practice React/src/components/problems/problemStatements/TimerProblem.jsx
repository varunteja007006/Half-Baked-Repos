import React, { useRef, useState } from "react";
import CodeBlock from "../../CodeBlock";
import CustomButton from "../CustomButton";

function TimerProblem() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [runningTimer, setRunningTimer] = useState(false);
  const intervalID = useRef(null);

  const convertToMilliSeconds = () => {
    if (milliseconds === 0) {
      let milliseconds = minutes * 60 * 1000 + seconds * 1000;
      setMilliseconds(milliseconds);
    }
  };

  const startTimer = () => {
    setRunningTimer(true);
    convertToMilliSeconds();
    intervalID.current = setInterval(() => {
      setMilliseconds((prevState) => {
        if (prevState === 0) {
          clearInterval(intervalID.current);
          resetTimer();
          return;
        }
        return prevState - 1000;
      });
    }, 1000);
  };

  const resetTimer = () => {
    setMilliseconds(0);
    setMinutes(0);
    setSeconds(0);
    setRunningTimer(false);
    clearInterval(intervalID.current);
  };

  const pauseTimer = () => {
    if (runningTimer) {
      clearInterval(intervalID.current);
      setRunningTimer(false);
      return;
    }
    startTimer();
  };

  const timeAsString = (mins = minutes, secs = seconds) => {
    if (mins === "") {
      mins = 0;
    }
    if (secs === "") {
      secs = 0;
    }
    let strMins = mins.toString();
    let strSecs = secs.toString();
    return `${strMins.length < 2 ? `0${strMins}` : strMins}:${
      strSecs.length < 2 ? `0${strSecs}` : strSecs
    }`;
  };

  const getTime = (milliseconds) => {
    if (milliseconds !== 0) {
      let mins = Math.floor(milliseconds / (60 * 1000));
      let secs = Math.floor((milliseconds - mins * 60 * 1000) / 1000);
      return timeAsString(mins, secs);
    } else {
      return timeAsString();
    }
  };

  const timerElement = () => {
    return (
      <h3 className="text-xl font-semibold">
        {minutes + seconds === 0 ? "00:00" : getTime(milliseconds)}
      </h3>
    );
  };

  return (
    <CodeBlock>
      <h2 className="text-xl mt-3">Create Timer</h2>
      <span className="flex flex-row gap-3 py-3 items-center">
        <input
          type="text"
          name="minutes"
          id="minutes"
          className="p-3"
          value={minutes}
          placeholder="Enter minutes"
          onChange={(e) => {
            setMinutes(e.target.value);
          }}
        />
        <input
          type="text"
          name="seconds"
          id="seconds"
          className="p-3"
          value={seconds}
          placeholder="Enter seconds"
          onChange={(e) => {
            setSeconds(e.target.value);
          }}
        />
        {timerElement()}
      </span>

      <span className="flex flex-row gap-3 my-5">
        <CustomButton
          label={"start"}
          customClass={"bg-green-400"}
          handleFunction={startTimer}
        ></CustomButton>

        <CustomButton
          label={"pause"}
          customClass={"bg-yellow-400"}
          handleFunction={pauseTimer}
        ></CustomButton>

        <CustomButton
          label={"reset"}
          customClass={"bg-red-400"}
          handleFunction={resetTimer}
        ></CustomButton>
      </span>
    </CodeBlock>
  );
}

export default TimerProblem;
