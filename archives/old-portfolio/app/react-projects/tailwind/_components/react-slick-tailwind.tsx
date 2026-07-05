
import React from "react";
import axios from "axios";
import Image from "next/image";

type Item = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const fetchImages = async () =>
  axios
    .get("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.data);

const TailwindPage = async () => {
  const DELAY = 20;

  const fetchedData = await fetchImages();
  const data = fetchedData.slice(0, 5);

  return (
    <div className="relative overflow-hidden h-[200px] w-[90%] mx-auto">
      {data?.map((item: Item, index: number) => (
        <div
          key={item.id} // Assuming each item has a unique id
          className={`absolute rounded-lg bg-red-500 w-[200px] h-[200px]`}
          style={{
            left: `max(calc(200px *  ${data.length}), 100%)`,
            animationDelay: `${
              (DELAY / data.length) * (data.length - index) * -1
            }s`,
            animationName: "scrollLeft",
            animationDuration: `${DELAY}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          <Image
            unoptimized={true}
            src={item.url}
            alt={item.title}
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
};

export default TailwindPage;
