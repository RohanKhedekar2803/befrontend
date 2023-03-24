import LandingPageHeroComponent from "./LandingPageHeroComponent";
import React, { useEffect, useState } from "react";
import { getAllBooks, searchBooks } from "../Services/Book";
import BookShowcaseCard from "./BookShowcaseCard";
import { useLocation } from "react-router-dom";
import Filter from "./filters/Filter";


function Home() {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [books, setBooks] = useState([]);
  const [skip, setSkip] = useState(1);
  const [filterData, setFilterData] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);

  let limit = 50;
  const getBooks = async () => {
    const res = await getAllBooks(limit, skip);
    return res;
  };

  const getSearchBooks = async (search) => {
    const res = await searchBooks(search);
    return res;
  };


  const handlePrevious = () => {
    if (skip > 1) {
      setSkip(skip - 1);
    }
  }

  const handleNext = () => {
    setSkip(skip + 1);
  }

  const handleFilter = (data) => {
    setFilterData(data);
  }
  const handleRating = (data) => {
    setRatingData(data);
  }
  const handlePrice = (data) => {
    setPriceData(data);
  }
  const handleReviews = (data) => {
    setReviewsData(data);
  }

  useEffect(() => {
    let serverResponse;
    let bookList = [];

    if (filterData) {
      filterData.map((item) => {
        return bookList.push(
          <BookShowcaseCard
            data={item}
            key={item.id}
          />
        )
      })
    }
    if (ratingData) {
      ratingData.map((item) => {
        return bookList.push(
          <BookShowcaseCard
            data={item}
            key={item.id}
          />
        )
      })
    }

    if (priceData) {
      priceData.map((item) => {
        return bookList.push(
          <BookShowcaseCard
            data={item}
            key={item.id}
          />
        )
      })
    }

    if (reviewsData) {
      reviewsData.map((item) => {
        return bookList.push(
          <BookShowcaseCard
            data={item}
            key={item.id}
          />
        )
      })
    }

    if (query.get("search")) {
      getSearchBooks(query.get("search")).then((response) => {
        serverResponse = response;
        serverResponse.map((item) => {
          return bookList.push(
            <BookShowcaseCard
              data={item}
              key={item.id}
            />
          )
        }
        )
        setBooks(bookList);
      });
      
    } else {
      getBooks().then((response) => {
        serverResponse = response;
        serverResponse.map((item) => {
          return bookList.push(
            <BookShowcaseCard
              data={item}
              key={item.id}
            />
          )
        }
        )
        setBooks(bookList);
      });
    }
  }, [location, skip, filterData,ratingData,priceData,reviewsData]);


  return (
    <div>
      <LandingPageHeroComponent />

      <div className="md:mx-32">
        <div className="h-10" />
        <div className="mx-5 text-black font-['DM Sans'] font-semibold text-3xl">
          Categories{" "}
          <button
            className="text-[#5F6DF8] font-semibold text-sm p-1 ml-2 rounded-lg bg-[#EDEFFF]"
            onClick={() => {
              window.history.back();
            }}
          >
            Go Back
          </button>
        </div>
        <div className="h-5" />
        <div className="flex w-full">
          {/* Filter & Sort */}
          <Filter
            onData={handleFilter}
            onDataRating={handleRating}
            onDataPrice={handlePrice}
            onDataReviews={handleReviews}
            skip={skip}
            setSkip={setSkip}
          />
        </div>
        <div className="grid grid-cols-5 w-full justify-evenly gap-x-5 gap-y-5 mx-5">
          {books}
        </div>
        <div className="mt-4 flex justify-center gap-x-2 mb-4">

          <button className="inline-flex items-center px-4 py-2 text-sm font-medium  text-[#5F6DF8] bg-[#EDEFFF]  rounded-lg"
            onClick={handlePrevious}
          >
            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
            Previous
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium  text-[#5F6DF8] bg-[#EDEFFF]  rounded-lg "
            onClick={handleNext}
          >
            Next
            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>

        </div>
      </div>
    </div>
  );
}

export default Home;
