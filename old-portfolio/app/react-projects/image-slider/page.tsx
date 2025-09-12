"use client";
import * as React from "react";

const imageURLs = [
  "https://images.unsplash.com/photo-1619293195798-07fc2dec8323?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1614978474506-42d30acd205d?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1529651121800-01d45d421ec9?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1624989753080-adf2a224cd1a?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function ImageSlider() {
  const [image, setImage] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      image === imageURLs.length - 1 ? setImage(0) : setImage(image + 1);
    }, 5000);
  }, [image]);

  return (
    <div>
      <div className="flex flex-col gap-5 items-start mx-6">
        {/* Method 1 */}
        <div className="mt-5 text-left">
          <h3 className="text-xl font-bold">Method 1</h3>
          <p>Iterate through single image URL from the Array of URLs.</p>
          <div className="flex flex-row gap-5 items-center mt-5">
            <button
              onClick={() => {
                image === 0
                  ? setImage(imageURLs.length - 1)
                  : setImage(image - 1);
              }}
              className="yellow-btn"
            >
              Previous
            </button>
            <img
              src={imageURLs[image]}
              alt="slider"
              className="w-96 h-96 rounded-md"
            />
            <button
              onClick={() =>
                image === imageURLs.length - 1
                  ? setImage(0)
                  : setImage(image + 1)
              }
              className="yellow-btn"
            >
              Next
            </button>
          </div>
        </div>

        {/* Method 2 */}
        <div className="flex flex-col mt-5 text-left">
          <h3 className="text-xl font-bold">Method 2</h3>
          <p>
            Iterate through all image URLs from the Array of URLs and only show
            the only image that matches the state.
          </p>
          <div className="flex flex-row gap-5 items-center mt-5">
            <button
              onClick={() => {
                image === 0
                  ? setImage(imageURLs.length - 1)
                  : setImage(image - 1);
              }}
              className="yellow-btn"
            >
              Previous
            </button>
            {imageURLs.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item}
                  alt="slider"
                  className={`h-96 w-96 rounded-md ${
                    index === image ? "visible" : "hidden"
                  }`}
                />
              );
            })}

            <button
              onClick={() =>
                image === imageURLs.length - 1
                  ? setImage(0)
                  : setImage(image + 1)
              }
              className="yellow-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
