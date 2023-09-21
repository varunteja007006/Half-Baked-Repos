import React, { useEffect } from "react";
import { toast } from "react-toastify";

function ToggleComponent() {
  //     useEffect(() => {
  //     console.log("UseEffect Triggered!!!");
  //   }, []);

  useEffect(() => {
    //This will run until the 
    const intervalFunc = setInterval(() => {
      console.log("Interval Triggered!!");
      toast.success("Interval Triggered!!");
    }, 1000);
    // if you are subscribing to a service then you have to unsubscribe the service
    // i.e you use clearInterval after setInterval

    return () => {
      clearInterval(intervalFunc);
      console.log("Cleanup Triggered!!");
      toast.success("Cleanup Triggered!!");
    };
  }, []);

  return (
    <div className="w-fit px-2 bg-white rounded-full text-center items-center align-baseline border-2 border-black font-semibold">
      <p>Hello! UseEffect triggered.</p>
    </div>
  );
}

export default ToggleComponent;
