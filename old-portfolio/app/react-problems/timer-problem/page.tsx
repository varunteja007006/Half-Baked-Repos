"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function hoursToSeconds(hours: string) {
  return parseInt(hours) * 3600;
}

function minutesToSeconds(minutes: string) {
  function secondsToMinutes(seconds: number) {
    return (seconds / 60)?.toFixed(1);
  }

  function secondsToHours(seconds: number) {
    return (seconds / 3600).toFixed(1);
  }
  return parseInt(minutes) * 60;
}

function secondsToMilliseconds(seconds: string) {
  return parseInt(seconds) * 1000;
}

function millisecondsToSeconds(milliseconds: number) {
  return Math.floor(milliseconds / 1000);
}

function getTimerValue(hours: string, minutes: string, seconds: string) {
  const totalSeconds =
    hoursToSeconds(hours) + minutesToSeconds(minutes) + parseInt(seconds);
  return secondsToMilliseconds(totalSeconds?.toString());
}

let timer: any = null;

export default function TimerProblem() {
  const [hours, setHours] = React.useState("00");
  const [minutes, setMinutes] = React.useState("00");
  const [seconds, setSeconds] = React.useState("00");
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [disabledFields, setDisabledFields] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    cbFunc: React.Dispatch<React.SetStateAction<string>>,
    maxValue: number
  ) => {
    const value = e.target.value;

    if (value && parseInt(value) < 0) {
      return;
    }
    if (value && value.length > 2) {
      return;
    }
    if (value && parseInt(value) > maxValue) {
      return;
    }
    cbFunc(value || "");
  };

  const updateDisplay = React.useCallback((totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    setHours(hrs.toString().padStart(2, "0"));
    setMinutes(mins.toString().padStart(2, "0"));
    setSeconds(secs.toString().padStart(2, "0"));
  }, []);

  const handleStart = () => {
    if (isTimerRunning) return;

    setIsTimerRunning(true);
    setDisabledFields(true);

    let countdown = getTimerValue(hours, minutes, seconds);

    timer = setInterval(() => {
      countdown -= 1000;
      const secs = millisecondsToSeconds(countdown);

      updateDisplay(secs);

      if (countdown <= 0) {
        clearInterval(timer);
        handleReset();
      }
    }, 1000);
  };

  const handlePause = () => {
    setIsTimerRunning(false);
    setDisabledFields(true);
    clearInterval(timer);
  };

  const handleReset = () => {
    setHours("00");
    setMinutes("00");
    setSeconds("00");
    setIsTimerRunning(false);
    setDisabledFields(false);
    clearInterval(timer);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timer Problem</CardTitle>
        <CardDescription>
          A timer that has start, pause and reset functionality.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5 justify-center items-center w-full">
          <div className="flex flex-row gap-1 justify-center items-center">
            <input
              className="number-field text-center dark:bg-black dark:text-white text-2xl w-[40px]"
              type="number"
              value={hours}
              onChange={(e) => {
                handleChange(e, setHours, 24);
              }}
              disabled={disabledFields}
            />
            <input
              className="number-field text-center dark:bg-black dark:text-white text-2xl w-[40px]"
              type="number"
              value={minutes}
              onChange={(e) => {
                handleChange(e, setMinutes, 60);
              }}
              disabled={disabledFields}
            />
            <input
              className="number-field text-center dark:bg-black dark:text-white text-2xl w-[40px]"
              type="number"
              value={seconds}
              onChange={(e) => {
                handleChange(e, setSeconds, 60);
              }}
              disabled={disabledFields}
            />
          </div>
          <div className="flex gap-4 justify-center items-center w-full">
            <Button variant={"success"} onClick={handleStart}>
              START
            </Button>

            <Button variant={"default"} onClick={handlePause}>
              PAUSE
            </Button>

            <Button variant={"destructive"} onClick={handleReset}>
              RESET
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
