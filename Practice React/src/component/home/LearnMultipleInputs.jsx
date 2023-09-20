import React, { useState } from "react";
import CodeBlock from "../CodeBlock";
import YellowBtn from "../subcomponents/YellowBtn";
import { toast } from "react-toastify";

function LearnMultipleInputs() {
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handledata = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    // Why do we use [e.target.name] but not simply e.target.name in above line??
    //Because e.target.name is invalid and even if e.target.name is assigned to some variable and is used
    //it will create a new property hence just use [e.target.name]
  };

  const handleClick = (e) => {
    e.preventDefault();
    // window.alert(JSON.stringify(inputData));
    toast(JSON.stringify(inputData));
    setInputData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <CodeBlock heading={"Learn Multiple Inputs 🤎"} explanation={``}>
      <form className="flex flex-col gap-5 w-1/3 mt-3">
        {/* name field */}
        <input
          className="p-1 border-2 border-black dark:text-black"
          placeholder="Name"
          type="text"
          name="name"
          value={inputData.name}
          onChange={handledata}
        ></input>

        {/* email field */}
        <input
          className="p-1 border-2 border-black dark:text-black"
          placeholder="Email ID"
          type="email"
          name="email"
          value={inputData.email}
          onChange={handledata}
        ></input>

        {/* password field */}
        <input
          className="p-1 border-2 border-black dark:text-black"
          placeholder="Password"
          type="password"
          name="password"
          value={inputData.password}
          onChange={handledata}
        ></input>

        <YellowBtn
          type={"submit"}
          handleButton={handleClick}
          label={"Submit"}
        ></YellowBtn>
      </form>
    </CodeBlock>
  );
}

export default LearnMultipleInputs;
