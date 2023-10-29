import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UseUnsplashGlobalContext } from "../../context/UnsplashGlobalContext";

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
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          className="p-2 dark:text-black"
          type="text"
          name="search"
          id="search"
          placeholder="cat"
        />
        <button
          type="submit"
          className="btn bg-purple-700 text-white w-fit hover:bg-purple-600"
        >
          Search
        </button>
      </form>
    </>
  );
}

export default SearchForm;
