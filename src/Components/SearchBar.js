import { useState ,useEffect} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
export default function SearchBar() {


  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleQuery = (event) => {
    event.preventDefault();
    const newSearchQuery = search;
    setSearch(newSearchQuery);
    navigate(`/home?search=${newSearchQuery}`);
  }


  return (
    <form className="w-9/12 font-DMsans">
      <div className="relative w-full">
        <input
          type="search"
          id="default-search"
          className="placeholder:text-black block w-full p-6 pl-10 text-sm text-black rounded-xl"
          placeholder="Search Your Favourite Book"
          required
          onChange={
            (e) => {
              setSearch(e.target.value)
            }
          }
        />
        <button
          type="submit"
          className="text-white absolute  right-2.5 bottom-2.5 bg-[#5F6DF8] px-20 py-2.5 rounded-md"
          onClick={handleQuery}
        >
          Search
        </button>
      </div>
    </form>
  );
}