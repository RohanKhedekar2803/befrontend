import LandingPageHeroComponent from "./LandingPageHeroComponent";
import React, { useEffect, useState } from "react";
import { getAllBooks, searchBooks } from "../Services/Book";
import BookShowcaseCard from "./BookShowcaseCard";
import {
  Link,
  useFetcher,
  useLocation,
  useNavigate,
  useNavigation,
  useRoutes,
} from "react-router-dom";
import Filter from "./filters/Filter";
import Loader from "./Loader";
import { Logout } from "../Services/Auth";

function Home() {
  const navigate = useNavigate();

  const [skip, setSkip] = useState(1);

  const [allData, setAllData] = useState([]);

  const handlePrevious = () => {
    if (skip > 1) {
      setSkip(skip - 1);
    }
  };
  const handleNext = () => {
    setSkip(skip + 1);
  };

  const getBooks = async () => {
    setloading(true);
    const limit = 50;
    const res = await getAllBooks(limit, skip);
    if (res) {
      setAllData(res);
      setloading(false);
    }
  };

  const [loading, setloading] = useState(true);
  useEffect(() => {
    getBooks();
  }, [skip]);

  const updateAllData = (data) => {
    setAllData(data);
  };

  const logoutUser = async () => {
    const data = await Logout();
    if (data) {
      navigate("/");
    }
  };

  return (
    <div>
      <div className="w-full bg-white ">
        <div className="flex w-10/12 min-h-[10vh] items-center mx-auto justify-between">
          <h1 className="text-[#5F6DF8] font-semibold text-2xl  font-serif">
            Book Finder
          </h1>

          <div className="flex ">
            <Link to={'/profile'}>
              <button className="text-2xl">
                <i class="bx hover:text-[#5F6DF8] bxs-user-circle"></i>
              </button>
            </Link>
            <div onClick={logoutUser} className="ml-4 text-2xl">
              <i class="bx hover:text-[#5F6DF8] bx-log-out-circle"></i>
            </div>
          </div>
        </div>
      </div>
      <LandingPageHeroComponent
        setLoading={setloading}
        setAllBooks={updateAllData}
      />

      <div className="md:mx-32">
        <h1 className="font-bold my-5 mx-5 text-2xl">Category</h1>
        {/* Filter & Sort */}
        <Filter
          setLoading={setloading}
          skip={skip}
          setAllData={updateAllData}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full place-items-center justify-evenly gap-x-5 gap-y-5 ">
          {!loading && allData.length ? (
            allData.map((data) => {
              return <BookShowcaseCard data={data}></BookShowcaseCard>;
            })
          ) :null}
        </div>

        { allData.length===0 &&  <div className="w-full flex flex-col justify-center items-center min-h-max">
            <img src="data:image/png;base64,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" alt="" />
          <h1 className="text-center font-bold text-2xl">  No Books Found </h1>
          </div> }
        <div className="loader flex justify-center items-center w-full  my-20">
          {loading && <Loader />}
        </div>

        <div className="mt-4 flex justify-center gap-x-2 mb-4">
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium  text-[#5F6DF8] bg-[#EDEFFF]  rounded-lg"
            onClick={handlePrevious}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Previous
          </button>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium  text-[#5F6DF8] bg-[#EDEFFF]  rounded-lg "
            onClick={handleNext}
          >
            Next
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
