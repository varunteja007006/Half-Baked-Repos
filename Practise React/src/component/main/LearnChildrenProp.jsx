import React from "react";

function LearnChildrenProp({ title, subtitle, children }) {
  return (
    <>
      <article>
        <h2> {title} </h2>
        <h3> {subtitle} </h3>
        {children}
      </article>
    </>
  );
}

export default LearnChildrenProp;
