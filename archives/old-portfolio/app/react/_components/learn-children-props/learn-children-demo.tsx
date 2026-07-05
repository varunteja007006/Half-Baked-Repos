import React from "react";

const LearnChildrenPropsDemo = () => {
  return (
    <div>
      <Child>
        <p>This will render inside a child component.</p>
      </Child>
    </div>
  );
};

const Child = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <p className="font-semibold">This is child component</p>
      {children}
    </div>
  );
};

export default LearnChildrenPropsDemo;
