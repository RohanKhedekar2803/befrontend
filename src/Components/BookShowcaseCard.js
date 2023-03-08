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

  const  reduceString=(str , num)=>{
        if(str?.length > num)return str.slice(3,num)+ '...'
        else return str
      }
  return (
    <>
      <button
        onClick={handleOpen}
        className="w-[90%] h-[20rem] rounded-xl bg-[#EDEFFF] flex flex-col items-center justify-start relative "
      >
        <img src={BookPlaceHolder} className="w-[90%] h-[90%] mt-4" alt="" />
        <div className="flex flex-col absolute w-[90%] rounded-t-[12px] h-[45%] top-4  bg-black justify-center">
          <div className="">
            <span className="absolute text-white top-5 left-0 mx-2 font-['D'] text-md">
              {reduceString(data.Title,45) }
            </span>
            <span className="absolute bottom-2 right-2 text-sm  text-white font-['Della Respira'] ">
              ~{reduceString(data.Author,20) }
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full my-2">
          <div className=" text-black font-semibold  font-['D'] text-sm mx-5 mt-2">
            {/* {data.Title} */}
            {reduceString(data.Title,40) }
          </div>
          <div className=" text-slate-500  font-['D'] text-xs mx-5">
            ~ {data.Author}
            {reduceString(data.Author,10) }
          </div>
        </div>
      </button>
      <div
        className={`min-h-screen w-full flex items-center justify-center ${
          open ? "block" : "hidden  "
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
