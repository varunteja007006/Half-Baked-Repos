import React, { useState, useTransition } from "react";
import CodeBlock from "../CodeBlock";
import YellowBtn from "../subcomponents/YellowBtn";

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

  const handleClick = () => setShow(!show);

  return (
    <CodeBlock
      heading={"Learn UseTransition 💖"}
      explanation={`Lets you update the state without blocking the UI. useTransition will make it possible to load the required data lazily`}
    >
      <div className="flex flex-col gap-3">
        <form>
          <input
            className="border-2 border-black p-2 w-96 dark:text-black"
            placeholder="Enter any text to test the performance"
            type="text"
            name="text"
            onChange={handleText}
            value={text}
          />
        </form>
        <span>
          <YellowBtn
            type={"button"}
            handleButton={handleClick}
            label={
              show
                ? "Toggle to hide the images 😎"
                : "Toggle to show the images 😎"
            }
          ></YellowBtn>
        </span>
        <h1 className="text-lg font-semibold underline">Images Below</h1>

        {/* <div className="flex flex-wrap gap-3">{images}</div> */}
        {show &&
          (isPending ? (
            <p> Loading...</p>
          ) : (
            <div className="flex flex-wrap gap-3">{images}</div>
          ))}
      </div>
    </CodeBlock>
  );
}

export default LearnUseTransition;
