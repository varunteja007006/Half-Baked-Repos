import React from "react";
import { CodeBlock } from "../../main";
import { useQuery } from "@tanstack/react-query";

function SearchForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.search.value);
  };
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <CodeBlock heading={"Search form"} explanation={"Search the images"}>
        <form
          onSubmit={handleSubmit}
          action=""
          method="post"
          className="flex flex-col gap-5"
        >
          <input
            className="p-2"
            type="text"
            name="search"
            id="search"
            placeholder="cat"
          />
          {/* <input
            className="p-2"
            type="search"
            name="sampleSearch"
            id="sampleSearch"
          /> */}
          <button
            type="submit"
            className="btn bg-purple-700 text-white w-fit hover:bg-purple-600"
          >
            Search
          </button>
        </form>
      </CodeBlock>
    </div>
  );
}

export default SearchForm;
