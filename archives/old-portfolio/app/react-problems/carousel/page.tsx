"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const images = [
  {
    url: "https://picsum.photos/id/13/200/300",
  },
  {
    url: "https://picsum.photos/id/16/200/300",
  },
  {
    url: "https://picsum.photos/id/14/200/300",
  },
];

let setIntervalId: any = null;

export default function Page() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setIntervalId = setInterval(() => {
      setActiveIndex((prev) => (images.length === prev + 1 ? 0 : prev + 1));
    }, 1500);
    return () => {
      clearInterval(setIntervalId);
    };
  }, []);

  return (
    <div className="prose w-full">
      <h1>Carousel</h1>
      <div className="flex flex-col gap-2 justify-center items-center">
        <Image
          src={images[activeIndex].url}
          alt="slider"
          width={200}
          height={300}
        />
        <p>Image {activeIndex + 1}</p>
        <div className="flex gap-2 w-full  items-center justify-center">
          <Button
            onClick={() =>
              setActiveIndex((prev) =>
                prev - 1 < 0 ? images.length - 1 : prev - 1
              )
            }
          >
            Prev
          </Button>
          <Button
            onClick={() =>
              setActiveIndex((prev) =>
                images.length === prev + 1 ? 0 : prev + 1
              )
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
