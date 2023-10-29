import React from "react";
import CustomBadge from "./CustomBadge";

function ChildFour({ item }) {
  console.log("useCallback: ChildFour Component render");

  return (
    <>
      <CustomBadge label={item}></CustomBadge>
    </>
  );
}

export default ChildFour;
