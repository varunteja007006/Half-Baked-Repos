import React from "react";
import CodeBlock from "./CodeBlock";

function LearnChildrenProp({ title, subtitle, children }) {
  return (
    <CodeBlock>
      <article>
        <h2> {title} </h2>
        <h3> {subtitle} </h3>
        {children}
      </article>
    </CodeBlock>
  );
}

export default LearnChildrenProp;
