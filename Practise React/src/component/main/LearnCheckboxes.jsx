import React, { useState } from "react";
import tasks from "../../../data/db.json";
import CodeBlock from "./CodeBlock";

function LearnCheckboxes() {
  const Onlytasks = tasks.tasks;
  const initialCheckedItems = {};
  Onlytasks.map((item) => {
    initialCheckedItems[item.id] = item.status;
  });
  const [checkedItems, setCheckedItems] = useState(initialCheckedItems);
  const handleCheckedItems = (e) => {
    setCheckedItems({ ...checkedItems, [e.target.name]: e.target.checked });
  };
  const handleformSubmit = (e) => {
    e.preventDefault();
    console.log(checkedItems);
  };
  return (
    <CodeBlock heading={"Learn CheckBox 🤎"} explanation={`Checkbox component`}>
      <>
        <form
          action=""
          onSubmit={handleformSubmit}
          className="bg-white border-2 border-black p-2 w-fit my-2"
        >
          {Onlytasks.map((item) => (
            <div className="flex flex-row gap-4" key={item.id}>
              <p>{item.id}</p>
              <p>{item.task}</p>
              <input
                type="checkbox"
                name={item.id}
                id={item.id}
                checked={checkedItems[item.id]}
                onChange={handleCheckedItems}
              />
            </div>
          ))}
          <div className="text-center">
            <button
              type="submit"
              className=" bg-orange-300 p-2 rounded-full my-2 border-2 border-orange-600 hover:translate-y-1"
            >
              Submit
            </button>
          </div>
        </form>
      </>
    </CodeBlock>
  );
}

export default LearnCheckboxes;
