import React from "react";
import { Gallery, SearchForm, CodeBlock } from "../components";

function unsplash() {
  return (
    <>
      <h1 className="text-2xl font-bold">Unsplash Project</h1>
      <CodeBlock
        heading={"Search the Unsplash Gallery"}
        explanation={
          "Create a search functionality using React Context API and React Query"
        }
      >
        <SearchForm></SearchForm>
        <Gallery></Gallery>
      </CodeBlock>
    </>
  );
}

export default unsplash;
