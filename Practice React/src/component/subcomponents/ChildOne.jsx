import React, { memo } from "react";
import YellowBtn from "./YellowBtn";

function ChildOne({ data }) {
  return (
    <div className="mt-3">
      <ul className="flex flex-row gap-4">
        {data.map((item, index) => (
          <li key={index}>
            <YellowBtn
              type={"button"}
              label={item}
              disabledStatus={true}
            ></YellowBtn>
          </li>
        ))}
      </ul>
    </div>  
  );
}

export default memo(ChildOne);
