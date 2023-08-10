import React, { memo } from "react";
import ChildFour from "./ChildFour";

function ChildThree({ data, removeItem }) {
  return (
    <>
      {data.map((item, id) => (
        <div key={id} className="flex flex-row gap-0">
          <ChildFour item={item}></ChildFour>
          <button
            onClick={() => removeItem(id)}
            className="bg-yellow-400 hover:bg-yellow-300 p-1 text-xs font-semibold border-2 border-black"
          >
          ❌
          </button>
        </div>
      ))}
    </>
  );
}

export default memo(ChildThree);
