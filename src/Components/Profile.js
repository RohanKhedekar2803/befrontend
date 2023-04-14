import React, { useEffect, useState } from "react";
import Ellipse from "../assets/Ellipse.jpg";
import Alreadyread from "./Alreadyread";
import BookShowcaseCard from "./BookShowcaseCard";
import Recommended from "./Recommended";
import Wishlisted from "./Wishlisted";
import { useAuthState } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../Services/Auth";
import { ToastContainer, toast } from "react-toastify";
const Profile = () => {
  const navigate = useNavigate();
  const state = useAuthState();
  const notify = (msg) => toast(msg);
  //useffect and use state to store current bookks data
  var books = [];
  // for (var i = 0; i < 6; i++) {
  //   books.push(<BookShowcaseCard/>);
  // }
  // const slideLeft = () => {
  //   var slider = document.getElementById('slider' );
  //   console.log(slider)
  //   slider.scrollLeft = slider.scrollLeft - 500;
  // };
  // const slideRight = () => {
  //   var slider = document.getElementById('slider' );
  //   slider.scrollLeft = slider.scrollLeft + 500;
  // };
  const logout = () => {
    LogOut(localStorage.getItem("currentUser"));
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    notify("Logout successfull !!");
    navigate("/");
  };
  // const [options ,setOptions]= useState([
  //       {text : 'Recommended' , status :true}
  //     , {text : 'Wishlist' , status :false}
  //     ,{text : 'Read' , status :false}
  //   ])
  const [option, setOption] = useState(1);
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-3 min-h-[30%] w-full bg-blue-700 place-items-center items-center py-7">
        <img alt="" src={Ellipse} className="rounded-full "></img>
        <div className="flex py-5 flex-col text-xl text-white justify-center items-center">
          <div>{state.auth.user.name}</div>
          <div>{state.auth.user.email}</div>
        </div>
        <div className="flex py-5 justify-center align-center">
          <button
            onClick={logout}
            className="bg-white px-10 py-2 rounded-md text-blue-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="py-4"></div>
      <div className="w-full  flex flex-col md:flex-row place-items-center justify-evenly">
        <div className="py-2 md:py-0"></div>
        <div className="h-10 w-64 bg-blue-700 opacity-80  flex justify-between  text-white rounded-md">
          <button className="mx-auto" onClick={() => setOption(1)}>
            Recommended Books
          </button>
        </div>

        <div className="py-2 md:py-0"></div>
        <div className="h-10 w-64 bg-blue-700 opacity-80  flex   text-white rounded-md">
          <button className="mx-auto" onClick={() => setOption(2)}>
            Wishlist
          </button>
        </div>
        <div className="py-2 md:py-0"></div>
        <div className="h-10 w-64 bg-blue-700 opacity-80  flex justify-between  text-white rounded-md">
          <button className="mx-auto" onClick={() => setOption(3)}>
            Already Read
          </button>
        </div>
      </div>
      <div className="py-5"></div>
      {option === 1 ? <Recommended /> : ""}
      {option === 2 ? <Wishlisted /> : ""}
      {option === 3 ? <Alreadyread /> : ""}
    </>
  );
};

export default Profile;
