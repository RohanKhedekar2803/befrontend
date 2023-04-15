import React from "react";
import BookShowcaseCard from "./BookShowcaseCard";
import { useEffect } from "react";
import "boxicons";
import { useState } from "react";
import { useAuthState } from "../context/AuthContext";
import { getrecommendedbooksbyid } from "../Services/Book";


// const [books,useBooks]=useState ();
// useEffect(() => {
// getrecommendedbooksbyid( localStorage.setItem("currentUser"))
//   },[]);

// var books = [];
// for (var i = 0; i < 10; i++) {
//   books.push(<BookShowcaseCard />);
// }

const slideLeft = () => {
  var slider = document.getElementById("slider");
  console.log(slider);
  slider.scrollLeft = slider.scrollLeft - 500;
};
const slideRight = () => {
  var slider = document.getElementById("slider");
  slider.scrollLeft = slider.scrollLeft + 500;
};

const reduceString = (str, num) => {
  if (str?.length > num) return str.slice(3, num) + "...";
  else return str;
};
const Recommended = () => {
  const state = useAuthState();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getrecommendedbooksbyid(state.auth.user.id).then((result) =>
      setBooks(result)
    );
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-80 md:w-full place-items-center justify-evenly gap-x-5 gap-y-5 mx-auto">
      {books.map((data) => {
        return <BookShowcaseCard data={data}></BookShowcaseCard>;
      })}
    </div>
  );
};

export default Recommended;

{
  /* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-full place-items-center justify-evenly gap-x-5 gap-y-5 ">
  {allData.map((data) => {
    return <BookShowcaseCard data={data}></BookShowcaseCard>;
  })}
</div>; */
}
