import React, { useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import "boxicons";
import { useAuthState } from '../context/AuthContext';
import { addtowishlist,addtoread } from "../Services/Book";
import { bool } from "yup";


const  reduceString=(str , num)=>{
  if(str?.length > num)return str.slice(3,num)+ '...'
  else return str
}

//  const addtoRead =async ()=>{
//   const state = useAuthState();
//  addtoWishlist(state.user.id).then(console.log("noerror"));

// }

export default function BookModal({ handleClose, data }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [read, setRead] = useState(false);
  const state = useAuthState();
  const addtoWishlist =async ()=>{
    console.log(state.auth.user.id,data._id)
    addtowishlist(state.auth.user.id,data._id).then(res=>console.log(res));
    setWishlisted(true);
   }
   const addtoRead =async()=>{
    addtoread(state.auth.user.id,data._id).then(res=>console.log(res));
    setRead(true);
   }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full fixed ">
      <div className="w-4/6 m-auto p-12 rounded-lg ">
        <div className="p-10 bg-white rounded-lg flex flex-row">
          <div className="w-2/4  h-auto mx-5 p-2">
            <div>
              <img src={img4} className="w-auto h-auto  " alt="" />
            </div>
            <div className="flex  my-3">
              <img src={img1} className=" w-1/3  " alt="" />
              <img src={img2} className=" w-1/3 pl-3 " alt="" />
              <img src={img3} className=" w-1/3 pl-3 " alt="" />
            </div>
          </div>
          <div className="ml-10 mt-1 mr-2">
            <div className="flex justify-between">
              <div className="flex">
                  <div onClick={addtoWishlist} className=" flex mr-2 hover:cursor-pointer bg-blue-100 w-[152px] rounded-lg font-sans text p-2 font-medium pl-10 pr-10 text-blue-500">
                      <div className="m-1">Wishlist</div>
                      <div className="pt-1 pl-1 ">{wishlisted?<box-icon type='solid' name='user-check'></box-icon>:''}</div>
                  </div>
                  <div className="fle">
                    <div onClick={addtoRead} className="flex mr-2 hover:cursor-pointer bg-blue-100 w-[140px] rounded-lg font-sans text p-2 font-medium pl-10 pr-10 text-blue-500">
                      <div className="m-1">Read</div>
                      <div className="pt-1 pl-1 ">{read?<box-icon type='solid' name='user-check'></box-icon>:''}</div>
                    </div>
                  </div>
              </div>
              <div onClick={handleClose} className="mt-2">
                <box-icon name="window-close"></box-icon>
              </div>
            </div>

            <div className=" align-middle font-sans font-bold text-xl mt-2">
              {/* {data.Title} */}
              {reduceString(data?.Title,150) }
            </div>

            <div className="mt-3">
              <div className="mt-2 flex">
                <p className="font-sans text-lg font-normal">
                  Rating : {data["Rating out of 5 stars"]}/5
                </p>
              </div>

              <div className="mt-[8px] flex">
                <p className="font-sans text-lg font-normal">Sub-Category-</p>
                <p className="font-sans text-base text-gray-600 font-normal ml-2 pt-1">
                  {data["Sub-Category"]}
                </p>
              </div>
              <div className="mt-[8px] flex">
                <p className="font-sans text-lg font-normal">Language- </p>
                <p className="font-sans text-base text-gray-600 font-normal ml-2 pt-1">
                  {data?.Language}
                </p>
              </div>
              <div className="mt-[8px] flex">
                <p className="font-sans text-lg font-normal">ISBN- </p>
                <p className="font-sans text-base text-gray-600 font-normal ml-2 pt-1">
                  10{" "}
                </p>
              </div>

              <div className="mt-[8px] flex">
                <p className="font-sans text-lg font-normal">Price- </p>
                <p className="font-sans text-base text-gray-600 font-normal ml-2 pt-1">
                  {console.log(data)}
                  {/* {data.Paperback["Hardcover Price"]} */}
                </p>
              </div>
              <div className="mt-[8px] flex">
                <p className="font-sans text-lg font-normal">Author- </p>
                <p className="font-sans text-base text-gray-600 font-normal ml-2 pt-1">
                  {data?.Author}
                </p>
              </div>
              <div className="mt-[8px] flex">
                <p className="font-sans text-lg font-normal">Pages- </p>
                <p className="font-sans text-base text-gray-600 font-normal ml-2 pt-1">
                  {data?.Pages === "" ? "N/A" : data?.Pages}
                </p>
              </div>
              <div className="mt-[8px] flex">
                <p className="font-sans text-lg font-normal">Publisher- </p>
                <p className="font-sans text-base text-gray-600 font-normal ml-2 pt-1">
                  {data?.Publisher}
                </p>
              </div>
            </div>
            <div>
              <button className="flex bg-blue-500 rounded-lg w-[450px] text-white mt-3 h-[50px] py-3 justify-center" >
                <a href={data['URL-TITLE']}>Buy Ebook / Hardcover Online</a>
                <div className="ml-2">
                  <box-icon name="link-external" color="white"></box-icon>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <></>
  );
}