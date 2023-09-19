import React from "react";
import ThemeToggle from "../component/unsplashComponents/main/ThemeToggle";
import SearchForm from "../component/unsplashComponents/main/SearchForm";
import Gallery from "../component/unsplashComponents/main/Gallery";
import { CodeBlock } from "../component/main";
function unsplash() {
  return (
    <>
      <h1 className="text-2xl font-bold">Unsplash Project</h1>
      <ThemeToggle></ThemeToggle>
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
