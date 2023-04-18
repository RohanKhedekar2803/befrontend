import React from "react";
import BookShowcaseCard from "./BookShowcaseCard";
import { useEffect } from "react";
import "boxicons";
import { useState } from "react";
import { useAuthState } from "../context/AuthContext";
import { getrecommendedbooksbyid } from "../Services/Book";

const Recommended = () => {
  const state = useAuthState();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getrecommendedbooksbyid(state.auth.user.id).then((result) =>
      setBooks(result)
    );
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-[80%] md:w-11/12 place-items-center justify-evenly gap-x-5 gap-y-5 mx-auto">
    {books.map((data) => {
        return <BookShowcaseCard data={data}></BookShowcaseCard>;
      })}
    </div>
  );
};

export default Recommended;
