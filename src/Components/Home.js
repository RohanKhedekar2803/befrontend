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
  const limit = 50;
  const [selectedAuthor, setselectedAuthor] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const [sortDataBy, setsortDataBy] = useState("rating");
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
    const res = await getAllBooks(limit, skip);
    if (res) {
      setAllData(res);
      setloading(false);
    }
  };
  // whenever i click on pagination the sort and filter gets removed beacause of the skip is passed as dependency to getBooks
  const [loading, setloading] = useState(true);

  useEffect(() => {
    // if any filter or sort is applied then dont call getBooks()
    // if (selectedAuthor || selectedCategory || sortDataBy) {
    //   return;
    // }
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
                <i className="bx hover:text-[#5F6DF8] bxs-user-circle"></i>
              </button>
            </Link>
            <div onClick={logoutUser} className="ml-4 text-2xl">
              <i className="bx hover:text-[#5F6DF8] bx-log-out-circle"></i>
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
          selectedAuthor={selectedAuthor}
          setselectedAuthor={setselectedAuthor}
          selectedCategory={selectedCategory}
          setselectedCategory={setselectedCategory}
          sortDataBy={sortDataBy}
          setsortDataBy={setsortDataBy}

        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full place-items-center justify-evenly gap-x-5 gap-y-5 ">
          {!loading && allData.length ? (
            allData.map((data) => {
              return <BookShowcaseCard data={data}></BookShowcaseCard>;
            })
          ) : (
            <div></div>
          )}
        </div>

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
