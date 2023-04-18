import React, { useEffect, useState } from "react";
import Ellipse from "../assets/Ellipse.jpg";
import Alreadyread from "./Alreadyread";
import BookShowcaseCard from "./BookShowcaseCard";
import Recommended from "./Recommended";
import Wishlisted from "./Wishlisted";
import { useAuthState } from "../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Logout } from "../Services/Auth";
import { ToastContainer, toast } from "react-toastify";
const Profile = () => {
  const navigate = useNavigate();
  const state = useAuthState();
  const notify = (msg) => toast(msg);

  const logout = async () => {
    await Logout();
    localStorage.getItem("currentUser");
    notify("Logout successfull !!");
    navigate("/");
  };

  const [option, setOption] = useState(1);

  const tabOptions = [
    { id: 1, name: "Reccomended" },
    { id: 2, name: "Wishlist" },
    { id: 3, name: "Already Read" },

  ];

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
      <div className="w-11/12 mx-auto bg-blue-600/10 rounded-md  grid-cols-1 grid md:grid-cols-3">
        {tabOptions.map((ele) => {
          return option === ele.id ? (
            <button className="px-10  bg-blue-500 rounded-md text-white font-semibold py-2.5 ">
              {ele.name}
            </button>
          ) : (
            <button onClick={()=>{setOption(ele.id)}} className="px-10 rounded-md  text-blue-500 font-semibold py-2.5 ">
              {ele.name}
            </button>
          );
        })}
      </div>
      <div className="py-5"></div>
      {option === 1 ? <Recommended /> : ""}
      {option === 2 ? <Wishlisted /> : ""}
      {option === 3 ? <Alreadyread /> : ""}
    </>
  );
};

export default Profile;
