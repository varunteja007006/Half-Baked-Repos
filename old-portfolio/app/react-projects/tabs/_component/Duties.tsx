import * as React from "react";

import { FcNext } from "react-icons/fc";

function Duties({ duties }: Readonly<{ duties: string[] | null }>) {
  return (
    <React.Fragment>
      {duties?.map((item, index: number) => {
        return (
          <div key={index + 1} className="flex flex-row p-2">
            <span className="mt-1">
              <FcNext />
            </span>
            <p key="index"> {item}</p>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default Duties;
