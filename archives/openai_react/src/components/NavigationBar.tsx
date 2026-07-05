import React from "react";

function NavigationBar() {
  return (
    <header>
      <nav className="flex flex-row items-center gap-4 black-white p-2 sm:bg-yellow-300 md:bg-yellow-300 justify-center">
        <p className=" text-2xl text-green-600 font-semibold">
          Open AI React Project
        </p>
      </nav>
    </header>
  );
}

export default NavigationBar;
