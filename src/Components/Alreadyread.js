import React, { useState } from "react";
import BookShowcaseCard from "./BookShowcaseCard";

import { useAuthState } from "../context/AuthContext";
import { useEffect } from "react";
import { getBookById } from "../Services/Book";
import { getreadbooksbyid } from "../Services/Book";



const Alreadyread = () => {
  const state = useAuthState();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getreadbooksbyid(state.auth.user.id).then((result) => setBooks(result));
  }, []);

  return (
    <div>
      {books.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-[80%] md:w-11/12 place-items-center justify-evenly gap-x-5 gap-y-5 mx-auto">
            {books.map((data) => {
              return <BookShowcaseCard data={data}></BookShowcaseCard>;
            })}
          </div>
        </div>
      ) : (
        <div className="h-[420px] flex justify-center ">
          <h1 className="mt-[190px] text-2xl">
            You haven't Completed any book yet 😞
          </h1>
        </div>
      )}
    </div>
  );
};

export default Alreadyread;
