import SearchForm from "../tweet/SearchForm";

function Navbar() {
  return (
    <div className="navbar bg-blue-200 min-w-[400px]">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">tweet 🐦</a>
      </div>
      <div className="flex-none gap-2">
        <SearchForm></SearchForm>
      </div>
    </div>
  );
}

export default Navbar;
