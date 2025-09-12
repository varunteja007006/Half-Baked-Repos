"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const dummyArray = Array.from({ length: 50 }, (_, index) => {
  return index;
});

const Child = (props: { value: number }) => {
  const countRef = React.useRef(0);

  React.useEffect(() => {
    countRef.current += 1;
  });

  return (
    <div className="space-y-2">
      <p>Child Wrapped in Memo: {props?.value}</p>
      <div className="flex flex-col flex-wrap gap-2 items-start md:items-center md:flex-row">
        Times re-rendered: {countRef.current}{" "}
      </div>
      <div className="mt-2 text-xs font-semibold">
        I cause re-render when you click on both UPDATE CHILD VALUE only.
      </div>
      <ScrollArea className="h-[7rem] p-2">
        <div className="flex flex-wrap gap-2 items-center">
          {dummyArray.map((item, index) => {
            return (
              <div
                key={index}
                className="inline-flex justify-center items-center p-1 bg-blue-100 rounded border border-blue-500 dark:bg-blue-900 size-10"
              >
                {item + 1}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default React.memo(Child);
