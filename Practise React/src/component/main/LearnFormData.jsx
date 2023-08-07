import React from "react";
import CodeBlock from "./CodeBlock";

function LearnFormData() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.currentTarget)
    const formData = new FormData(e.currentTarget);
    // const name = formData.get("name");
    // console.log(name);

    // The below line gives array of arrays
    // console.log([...formData.entries()]);

    //The brlow line gives the json object data
    const newUser = Object.fromEntries(formData);
    console.log(newUser);

    // clear the input fields
    e.currentTarget.reset();
  };
  return (
    <CodeBlock>
      <h1 className="text-2xl mb-4">Learn Form Data API 🤎</h1>
      <form
        method="post"
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 w-1/3"
      >
        <input
          className="p-1 border-2 border-black"
          placeholder="Name"
          type="text"
          name="name"
        ></input>
        <input
          className="p-1 border-2 border-black"
          placeholder="Email ID"
          type="email"
          name="email"
        ></input>
        <input
          className="p-1 border-2 border-black"
          placeholder="Password"
          type="password"
          name="password"
        ></input>
        <button type="submit" className="bg-black text-white p-1">
          Submit
        </button>
      </form>
    </CodeBlock>
  );
}

export default LearnFormData;
