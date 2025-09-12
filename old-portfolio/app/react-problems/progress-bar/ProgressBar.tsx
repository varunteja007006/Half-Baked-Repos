"use client";
import React from "react";
import "./progressbar.css";

export default function ProgressBar() {
  const arr = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="progress_bar_container">
      {arr.map((_, index) => (
        <Bar key={index} value={_} />
      ))}
    </div>
  );
}

const Bar = (props: { value: number }) => {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      setWidth(props.value);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [props.value]);

  return (
    <div className="progress_bar_outer">
      <div
        className="progress_bar_inner"
        style={{ transform: `translateX(${width - 100}%)` }}
      >
        <p
          style={{
            position: "absolute",
            top: 5,
            left: `${width > 98 ? 97 : 100.5}%`,
            fontWeight: 600,
            color: "black",
          }}
        >
          {width}%
        </p>
      </div>
    </div>
  );
};
