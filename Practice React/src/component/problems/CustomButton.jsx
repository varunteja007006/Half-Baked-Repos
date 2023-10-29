import React from "react";

function CustomButton({ label, customClass, handleFunction }) {
  return (
    <button
      onClick={handleFunction}
      className={
        customClass ? `btn ${customClass}` : "btn bg-red-400 text-white"
      }
    >
      {label}
    </button>
  );
}

export default CustomButton;
