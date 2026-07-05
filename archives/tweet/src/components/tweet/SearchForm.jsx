import { useSearchContext } from "../../context/searchContext";

function SearchForm() {
  const { setSearchTerm } = useSearchContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) {
      return;
    }
    setSearchTerm(searchValue);
  };

  return (
    <form
      className="form-control flex flex-row gap-2 dark:text-black"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search"
        name="search"
        className="input input-bordered w-24 md:w-auto"
      />
      <button
        type="submit"
        className="btn bg-blue-700 text-white w-fit hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
