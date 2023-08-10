import React, { useEffect } from "react";

function ToggleComponent() {
  //     useEffect(() => {
  //     console.log("UseEffect Triggered!!!");
  //   }, []);

  useEffect(() => {
    const intervalFunc = setInterval(() => {
      console.log("Interval Triggered!!");
    }, 1000);
    // if you are subscribing to a service then you have to unsubscribe the service
    // i.e you use clearInterval after setInterval
    return () => {
      clearInterval(intervalFunc);
      console.log("Cleanup Triggered!!");
    };
  }, []);

  return (
    <div className="w-fit px-2 bg-white rounded-full text-center items-center align-baseline border-2 border-black font-semibold">
      <p>Hello!</p>
    </div>
  );
}

export default ToggleComponent;
