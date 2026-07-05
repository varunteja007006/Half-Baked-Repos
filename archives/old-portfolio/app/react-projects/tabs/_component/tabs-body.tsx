"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TData } from "../page";

function TabBody({ data }: Readonly<{ data: TData[] }>) {
  const [tabActive, setTabActive] = useState(1);
  const [selectedData, setSelectedData] = useState<TData | undefined>(data[0]);
  const handleSetActiveTab = (order: number) => {
    setTabActive(order);
  };

  useEffect(() => {
    if (data) {
      setSelectedData(data?.find((item) => item.order === tabActive));
    }
  }, [tabActive]);

  return (
    <div>
      <div className="flex flex-row gap-5 items-center">
        {data.map((item: TData) => {
          return (
            <Button
              key={item.id}
              className={cn(
                "",
                tabActive === item.order && "bg-green-400 text-black"
              )}
              onClick={() => handleSetActiveTab(item.order)}
            >
              {item.company}
            </Button>
          );
        })}
      </div>
      {selectedData && (
        <div className="p-5">
          <p className="mb-3 text-lg font-semibold "> {selectedData.title} </p>
          <p className="mb-3 "> {selectedData.dates} </p>

          <ul className="list-disc ps-5">
            {selectedData.duties.map((item, index) => {
              return (
                <li key={index} className="mb-3">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TabBody;
