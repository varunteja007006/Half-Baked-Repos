import React from "react";
import CodeBlock from "../CodeBlock";
import YellowBtn from "../subcomponents/YellowBtn";
import { toast } from "react-toastify";

function LearnFormData() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.currentTarget)

    const formData = new FormData(e.currentTarget);
    // const name = formData.get("name");
    // console.log(name);

    // The below line gives array of arrays
    // console.log([...formData.entries()]);

    //The below line gives the json object data
    const newUser = Object.fromEntries(formData);
    // console.log(newUser);

    toast(JSON.stringify(newUser));

    // clear the input fields
    e.currentTarget.reset();
  };
  return (
    <CodeBlock
      heading={"Learn Form Data API 🤎"}
      explanation={`Trying to understand the usage of FormData API in JavaScript`}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-1/3">
        <input
          className="p-1 border-2 border-black dark:text-black"
          placeholder="Name"
          type="text"
          name="name"
        ></input>
        <input
          className="p-1 border-2 border-black dark:text-black"
          placeholder="Email ID"
          type="email"
          name="email"
        ></input>
        <input
          className="p-1 border-2 border-black dark:text-black"
          placeholder="Password"
          type="password"
          name="password"
        ></input>
        <YellowBtn type={"submit"} label={"submit"}></YellowBtn>
      </form>
    </CodeBlock>
  );
}

export default LearnFormData;
