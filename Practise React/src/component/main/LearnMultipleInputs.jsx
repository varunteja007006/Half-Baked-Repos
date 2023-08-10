import React, { useState } from "react";
import CodeBlock from "./CodeBlock";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert(JSON.stringify(inputData));
    setInputData({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <CodeBlock heading={"Learn Mulitple Inputs 🤎"} explanation={``}>
      <form method="post" action="" className="flex flex-col gap-5 w-1/3">
        <input
          className="p-1 border-2 border-black"
          placeholder="Name"
          type="text"
          name="name"
          value={inputData.name}
          onChange={handledata}
        ></input>
        <input
          className="p-1 border-2 border-black"
          placeholder="Email ID"
          type="email"
          name="email"
          value={inputData.email}
          onChange={handledata}
        ></input>
        <input
          className="p-1 border-2 border-black"
          placeholder="Password"
          type="password"
          name="password"
          value={inputData.password}
          onChange={handledata}
        ></input>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-black text-white p-1"
        >
          Submit
        </button>
      </form>
    </CodeBlock>
  );
}

export default LearnMultipleInputs;
