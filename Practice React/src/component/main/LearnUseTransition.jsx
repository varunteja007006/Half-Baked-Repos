import React, { useState, useTransition } from "react";
import CodeBlock from "./CodeBlock";

function LearnUseTransition() {
  const [text, setText] = useState("");
  const [images, SetImages] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(true);
  const handleText = (e) => {
    setText(e.target.value);

    // // Below code will slow down the UI and the input field is least responsive
    // const newImages = Array.from({ length: 5000 }, (_, index) => {
    //   return (
    //     <img
    //       key={index}
    //       className=" h-40 w-50"
    //       src="/crystal_blue_cube.jpg"
    //       alt="crystal blue cube"
    //     />
    //   );
    // });
    // SetImages(newImages);

    // Solution - useTransition will make it possible to load the required data lazily
    startTransition(() => {
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
    });
  };

  return (
    <CodeBlock
      heading={"Learn UseTransition 🧡"}
      explanation={`Lets you update the state without blocking the UI. useTransition will make it possible to load the required data lazily`}
    >
      <>
        <form>
          <input
            className="border-2 border-black p-2 w-96"
            placeholder="Enter any text to test the performance"
            type="text"
            name="text"
            onChange={handleText}
            value={text}
          />
        </form>
        
        <button
          className="my-3 bg-fuchsia-700 text-white font-semibold hover:bg-fuchsia-500 hover:text-black p-2"
          onClick={() => setShow(!show)}
        >
          {show
            ? "Toggle to hide the images 😎"
            : "Toggle to show the images 😎"}
        </button>

        <h1 className="text-lg my-3 font-semibold underline">Images Below</h1>

        {/* <div className="flex flex-wrap gap-3">{images}</div> */}
        {show &&
          (isPending ? (
            <p> Loading...</p>
          ) : (
            <div className="flex flex-wrap gap-3">{images}</div>
          ))}
      </>
    </CodeBlock>
  );
}

export default LearnUseTransition;
