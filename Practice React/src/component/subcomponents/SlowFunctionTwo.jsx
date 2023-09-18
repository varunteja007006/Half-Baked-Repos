import React, { useEffect, useState } from "react";

function SlowFunctionTwo() {
  const [images, SetImages] = useState([]);

  useEffect(() => {
    const newImages = Array.from({ length: 5000 }, (_, index) => {
      return (
        <img
          key={index}
          className=" h-40 w-50"
          src="/crystal_blue_cube.jpg"
          alt="crystal blue cube"
        />
      );
    });
    SetImages(newImages);
  }, []);

  return (
    <>
      <div className="flex flex-wrap gap-3">{images}</div>
    </>
  );
}

export default SlowFunctionTwo;
