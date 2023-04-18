import BookPlaceHolder from "../assets/book_placeholder.png";

import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import BookModal from "./BookModal";

export default function BookShowcaseCard({ data }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getRating = () => {
    return new Array(Math.floor(data['Rating out of 5 stars'])).fill(0);
  }

  return (
    <>
      <div
        onClick={handleOpen}
        className="w-[80%] md:w-[90%] rounded-xl bg-white flex flex-col items-center justify-start relative cursor-pointer"
      >
        <div className="card shadow-md bg-white/70 p-2.5 rounded-xl w-11/12  md:w-full ">
          <div className="card-bg  rounded-md w-full  bg-cover ">

            <div className="bg-blue-900/70 min-h-[30vh] rounded-md text-white flex-col p-2.5 text-center justify-center items-center flex ">
              <h1 className="text-white font-bold py-5">{data?.Title?.substr(0, 40).concat('...')}</h1>
              <p className="w-full text-right"> ~ {data?.Author}</p>
            </div>

          </div>

          <div className="content text-black">
            <h1 className="py-2.5 text-xl font-bold text-[#5F6DF8]"> {data['Sub-Category']}</h1>
            <div className="rating ">
              Rating - {getRating()?.map((ele, idx) => {
                return <i key={idx} class='bx bxs-star text-[#F4C055]'></i>
              })}
            </div>
            <h1 className=" my-2.5"> No. of reviews -   {data['Number of ratings']}</h1>

            <h1 className="font-bold my-2.5"> ₹ {data['Paperback/Hardcover Price']}</h1>

          </div>
        </div>
      </div>
      <div
        className={`min-h-screen w-full flex items-center justify-center ${open ? "block" : "hidden  "
          }`}
      >
        <Modal
          onClose={handleClose}
          open={open}
          style={{
            position: "absolute",

            boxShadow: "2px solid black",
            paddingTop: 5,
            margin: "auto",
            height: "100%",
            display: "fixed",
          }}
        >
          <div>
            <BookModal data={data} handleClose={handleClose} />
          </div>
        </Modal>
      </div>
    </>
  );
}
