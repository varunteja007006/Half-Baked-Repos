import React, { useState } from "react";
import tasks from "../../../data/db.json";
import CodeBlock from "../CodeBlock";
import YellowBtn from "../subcomponents/YellowBtn";
import { toast } from "react-toastify";

function LearnCheckboxes() {
  const Onlytasks = tasks.tasks; //fetch only 'tasks' not 'noTasks' from db.json

  // console.log(Onlytasks) // Onlytasks is array of objects. [{},{},{},...]

  const [checkedItems, setCheckedItems] = useState({ ...Onlytasks });

  // console.log(checkedItems); // checkedItems is array of arrays { 1:{}, 2:{}, ...}

  const handleCheckedItems = (e) => {
    const id = e.target.name - 1; // e.target.name starts from 1 but the javascript arrays are accessible from 0 [zero indexed]
    const updateRecord = {
      ...checkedItems[id],
      status: e.target.checked,
    }; // destructure the specific record and update its status.

    // console.log({ ...checkedItems, [id]: updateRecord });
    setCheckedItems({ ...checkedItems, [id]: updateRecord }); //Now update the array of arrays by index.

    const message = `${e.target.id} is ${
      e.target.checked ? "completed 🙂" : "incomplete 😢"
    }`;
    e.target.checked ? (toast.success(message)):(toast.error(message))
   
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(checkedItems);
    toast(JSON.stringify(checkedItems));
  };

  const handleReset = () => {
    setCheckedItems(Onlytasks);
  };

  return (
    <CodeBlock
      heading={"Learn CheckBox 🤎"}
      explanation={`Trying to work with checkbox input by creating a Checkbox component`}
    >
      <form
        onSubmit={handleFormSubmit}
        className="bg-gray-200 border-2 border-black dark:text-black p-5"
      >
        {Onlytasks.map((item, index) => (
          <div
            className="flex flex-row gap-4 border-b-2 border-black py-3"
            key={item.id}
          >
            <p>{item.id}</p>
            <p>{item.task}</p>
            <input
              type="checkbox"
              name={item.id}
              id={item.task}
              checked={checkedItems[index].status}
              onChange={handleCheckedItems}
            />
          </div>
        ))}
        <YellowBtn
          type={"submit"}
          label={"Reset"}
          handleButton={handleReset}
          customClass={"mt-3"}
        ></YellowBtn>
      </form>
    </CodeBlock>
  );
}

export default LearnCheckboxes;
