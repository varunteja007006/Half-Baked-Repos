import React, { memo } from "react";
import CustomBadge from "./CustomBadge";

function ChildOne({ data }) {
  return (
    <div className="mt-3">
      <ul className="flex flex-row gap-4">
        {data.map((item, index) => (
          <li key={index}>
            <CustomBadge label={item}></CustomBadge>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(ChildOne);
