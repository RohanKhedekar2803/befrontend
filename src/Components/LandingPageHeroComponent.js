import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
export default function LandingPageHeroComponent() {
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="static  bg-hero w-full bg-cover">
      <button
        className="font-[Parisienne] text-[4xl] text-white"
        onClick={navigateToProfile}
      >
        Click here to view profile
      </button>
      <div className="w-full h-[25rem] flex justify-center items-center bg-black/50   flex-col">
        <div className="w-10/12 flex flex-row justify-center items-center  my-5 text-xl ">
          <span className="font-['Englebert'] text-2xl  md:text-5xl text-white">
            A Book is a dream that you hold in your hand
            &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="font-[Parisienne] text-[4xl] text-white">
            ~ Neil Gaiman
          </span>
        </div>

        <SearchBar />
      </div>
    </div>
  );
}
