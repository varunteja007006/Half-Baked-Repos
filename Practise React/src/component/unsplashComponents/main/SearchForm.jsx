import React from "react";
import { CodeBlock } from "../../main";
import { useQuery } from "@tanstack/react-query";
import { UseUnsplashGlobalContext } from "../../../context/UnsplashGlobalContext";

function SearchForm() {
  const { setSearchTerm } = UseUnsplashGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) {
      return;
    }
    setSearchTerm(searchValue);
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
      <>
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
      </>
    </div>
  );
}

export default SearchForm;
