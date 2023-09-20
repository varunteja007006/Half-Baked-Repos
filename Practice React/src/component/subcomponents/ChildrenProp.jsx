import React from "react";

function ChildrenProp({ title, subtitle, children }) {
  return (
    <>
      <div className="card w-96 bg-slate-200 border-2 border-slate-400 shadow-xl my-3 dark:text-black ">
        <div className="card-body">
          <h4 className="text-lg font-semibold"> {title} </h4>
          <h5 className="text-md text-justify"> {subtitle} </h5>
        </div>
        {children}
      </div>
    </>
  );
}

export default ChildrenProp;
