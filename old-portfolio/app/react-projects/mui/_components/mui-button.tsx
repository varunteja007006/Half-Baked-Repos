"use client";

import React from "react";
import { Button } from "@mui/base/Button";
import { useButton } from "@mui/base/useButton";

function MuiButton() {
  const { getRootProps } = useButton();

  return (
    <div className="flex flex-col gap-5 w-100 items">
      MaterialUIPage
      <p>
        Check out the base MUI to get unstyled components from MUI. The number
        of components available is limited tho.
      </p>
      <Button
        onClick={() => alert("Button")}
        className="p-3 text-black bg-blue-200 rounded-md w-fit min-w-md"
      >
        Button
      </Button>
      <button
        type="button"
        className="p-3 text-black bg-blue-200 rounded-md w-fit min-w-md"
        {...getRootProps()}
        onClick={() => alert("useButton")}
      >
        useButton
      </button>
    </div>
  );
}

export default MuiButton;
