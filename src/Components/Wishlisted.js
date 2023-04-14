import React from "react";
import { useEffect } from "react";
import BookShowcaseCard from "./BookShowcaseCard";
import "boxicons";
import { useState } from "react";
import { useAuthState } from "../context/AuthContext";
import { getwishlistedbooksbyid } from "../Services/Book";

// var books = [];
// for (var i = 0; i < 10; i++) {
//   books.push(<BookShowcaseCard/>);
// }
// console.log("active wishlist")

const slideLeft = () => {
  var slider = document.getElementById("slider");
  console.log(slider);
  slider.scrollLeft = slider.scrollLeft - 500;
};
const slideRight = () => {
  var slider = document.getElementById("slider");
  slider.scrollLeft = slider.scrollLeft + 500;
};

const Wishlisted = () => {
  const state = useAuthState();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getwishlistedbooksbyid(state.auth.user.id).then((result) =>
      setBooks(result)
    );
  }, []);

  const reduceString = (str, num) => {
    if (str?.length > num) return str.slice(3, num) + "...";
    else return str;
  };

  return (
    <div>
      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-80 md:w-full place-items-center justify-evenly gap-x-5 gap-y-5 mx-auto">
      {books.map((data) => {
        return <BookShowcaseCard data={data}></BookShowcaseCard>;
      })}
    </div>
      ) : (
        <div className="h-[420px] flex justify-center ">
          <h1 className="mt-[190px] text-2xl">
            You haven't Wishlisted any book yet 🙂
          </h1>
        </div>
      )}
    </div>
  );
};
export default Wishlisted;
