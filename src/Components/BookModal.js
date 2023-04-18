import React, { useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import "boxicons";
import { useAuthState } from "../context/AuthContext";
import { addtowishlist, addtoread } from "../Services/Book";
import { bool } from "yup";
import BookPlaceHolder from "../assets/book_placeholder.png";
import SingleBook from "./SingleBook";

const reduceString = (str, num) => {
  if (str?.length > num) return str.slice(0, num) + "...";
  else return str;
};

//  const addtoRead =async ()=>{
//   const state = useAuthState();
//  addtoWishlist(state.user.id).then(console.log("noerror"));

// }


export default function BookModal({ handleClose, data }) {
  const getRating = () => {

    return new Array(Math.floor(data['Rating out of 5 stars'])).fill(0);
  }


  console.log(data, data.Title)
  const [wishlisted, setWishlisted] = useState(false);
  const [read, setRead] = useState(false);
  const state = useAuthState();
  const addtoWishlist = async () => {
    if (setWishlisted) {
      alert(`You have already added book to readlist !!`)
      return;
    }
    addtowishlist(state.auth.user.id, data._id).then((res) => console.log(res));
    // setWishlisted(true);
  };
  const addtoRead = async () => {
    if (setRead) {
      alert(`You have already added book to readlist !!`)
      return;
    }
    addtoread(state.auth.user.id, data._id).then((res) => console.log(res));
    // setRead(true);
  };
  const addwishlist = async () => {
    setWishlisted(!wishlisted);
    console.log(state.auth.user.id, data._id);
    addtowishlist(state.auth.user.id, data._id).then((res) => console.log(res));
  }

  const addread = async () => {
    addtoread(state.auth.user.id, data._id).then((res) => console.log(res));
    setRead(!read);
  }


  return (

    <div className="w-full min-h-screen bg-black/20 absolute flex justify-center items-center">
      <div className=" bg-white overflow-y-scroll max-h-[70vh] md:max-h-screen gap-5 grid grid-cols-1 lg:grid-cols-[4fr_7fr]  rounded-md p-5   max-w-[90%] overflow-hidden md:w-[80%] lg:w-[70%]  fixed mx-auto roun ded-lg">
        <div className="col flex-col w-full h-full flex justify-start items-center">
          <div className="card bg-[#EDEFFF]/70 p-2.5 rounded-xl    w-full px-2.5">
            <div className="card-bg rounded-md w-full p-2.5 bg-cover ">

              <div className="bg-black min-h-[30vh] text-white flex-col p-2.5 text-center justify-center items-center flex rounded-md">
                <h1 className="text-white font-bold py-5">{data.Title.substr(0, 40).concat('...')}</h1>
                <p className="w-full text-right"> ~ {data.Author}</p>
              </div>

            </div>

            <div className="content text-black">
              <h1 className="py-2.5 text-xl font-bold text-[#5F6DF8]"> {data['Sub-Category']}</h1>
              <div className="rating ">
                Rating - {getRating().map((ele) => {
                  return <i class='bx bxs-star text-[#F4C055]'></i>
                })}
              </div>
              <h1 className="font-bold my-2.5"> ₹ {data['Paperback/Hardcover Price']}</h1>

            </div>
          </div>

          <div className="my-2 5">
            <button onClick={() => addtoRead()} className="w-full p-2.5 my-2.5 bg-[#5F6DF8] rounded-md text-white ">  Already Read The Book ? </button>
            <button onClick={() => addtoWishlist()} className="w-full p-2.5 my-2.5 bg-[#5F6DF8] rounded-md text-white ">  Add Book To Wishlist </button>
          </div>
        </div>


        <div className="col px-2.5">
          <div className="flex justify-between items-cent">
            <div className="font-bold my-2.5 p-2.5 rounded-md mb-2.5 w-max rounde-md  bg-[#EDEFFF] text-[#5F6DF8]" onClick={addwishlist}>
              {data['Category']}

            </div>


            <div className="close">
              <i class='bx bxs-x-circle text-3xl cursor-pointer text-red-500' onClick={() => handleClose()}></i>
            </div>
          </div>


          <h1 className="font-bold text-xl "> {data.Title} </h1>



          <div className="my-2.5">
            <h1 className="text-gray-500 "> <span className="font-semibold text-xl text-black"> Sub Category - </span> {data['Sub-Category']}  </h1>
          </div>

          <div className="my-2.5">
            <h1 className="text-gray-500 "> <span className="font-semibold text-xl text-black"> Languages - </span> {data['Language']}  </h1>
          </div>

          <div className="my-2.5">
            <h1 className="text-gray-500 "> <span className="font-semibold text-xl text-black"> ISBN - </span> {data['ISBN-10']}  </h1>
          </div>

          <div className="my-2.5">
            <h1 className="text-gray-500 "> <span className="font-semibold text-xl text-black"> Weight - </span> {data['Item Weight']}  </h1>
          </div>

          <div className="my-2.5">
            <h1 className="text-gray-500 "> <span className="font-semibold text-xl text-black"> Price - </span> {data['Paperback/Hardcover Price']}  </h1>
          </div>

          <div className="my-2.5">
            <h1 className="text-gray-500 "> <span className="font-semibold text-xl text-black"> Pages - </span> {data['Pages']}  </h1>
          </div>

          <div className="my-2.5">
            <h1 className="text-gray-500 "> <span className="font-semibold text-xl text-black"> Publisher - </span> {data['Publisher']}  </h1>
          </div>
          <a href={data['URL-TITLE']} rel="noreferrer" target='_blank'>
            <button className="bg-[#5F6DF8] text-lg my-5  w-full md:w-8/12 rounded-md text-white px-2.5 py-5">Buy Ebook / Hardcover <i class='bx bx-link-external align-middle' ></i> </button>
          </a>
        </div>

      </div>
    </div>
    // <></>
  );
}
