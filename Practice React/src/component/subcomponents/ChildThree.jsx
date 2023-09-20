import React, { memo } from "react";
import ChildFour from "./ChildFour";
import YellowBtn from "./YellowBtn";

function ChildThree({ data, removeItem }) {
  return (
    <>
      {data.map((item, index) => (
        // each record
        <div key={index} className="flex flex-row items-center">
          <ChildFour item={item}></ChildFour>

          <YellowBtn
            label={"❌"}
            handleButton={() => removeItem(index)}
            customClass={""}
          ></YellowBtn>
        </div>
      ))}
    </>
  );
}

export default memo(ChildThree);
