import React, { useEffect, useState } from 'react'
import Ellipse from '../assets/Ellipse.jpg'
import Alreadyread from './Alreadyread';
import BookShowcaseCard from './BookShowcaseCard'
import Recommended from './Recommended';
import Wishlisted from './Wishlisted';
import { useAuthState } from '../context/AuthContext';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { LogOut } from '../Services/Auth';
import { ToastContainer, toast } from "react-toastify";
const Profile = () => {
  const navigate = useNavigate();
  const state = useAuthState();
  const notify = (msg) => toast(msg);
  //useffect and use state to store current bookks data 
  var books = [];
  for (var i = 0; i < 6; i++) {
    books.push(<BookShowcaseCard/>);
  }
  const slideLeft = () => {
    var slider = document.getElementById('slider' );
    console.log(slider)
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider' );
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  const logout =() =>{
        LogOut(localStorage.getItem("currentUser"));
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        notify("Logout successfull !!");
        navigate('/')


  }
  // const [options ,setOptions]= useState([ 
  //       {text : 'Recommended' , status :true}
  //     , {text : 'Wishlist' , status :false}
  //     ,{text : 'Read' , status :false}
  //   ])
  const [option, setOption] = useState(1);
  return (
    <>

        <div className='w-100% flex justify-center h-[155px] bg-blue-700  p-7'>
                    <div className='flex w-2/4 align-middle justify-center ml-20'>
                        <img src={Ellipse} className="rounded-full ml-16"></img>
                        <div className='p-7 pt-5 text-white '>
                            <div>
                              <div>{state.user.name}</div>
                              <div>{state.user.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className='m-7 w-2/4 flex justify-center align-middle'>
                        <button onClick={logout} className='bg-white p-1 pl-14 pr-14 rounded-xl text-blue-600'>Logout</button>
                    </div>
        </div>
 {console.log(option)}
        <div className='mt-5 align-middle bg-white  w-3/5 ml-[290px] drop-shadow-2xl'>
            <div className='h-[50px] w-full  bg-blue-700 opacity-80  flex justify-between pl-14 pr-14 pb-12 pt-8 text-white rounded-t-xl'>
              <button className='pl-5 pr-5 ' onClick={() => setOption(1)} 
              
              >Recommended Books</button>
              <button  className='pl-5 pr-5' onClick={() => setOption(2)} >Wishlist</button>
              <button className='pl-5 pr-5' onClick={() => setOption(3)}>Already Read</button>
            </div>
          {option==2 ?
          <Wishlisted /> : ''} 
          {option==1 ?
          <Recommended /> : ''}
          {option==3 ?
          <Alreadyread /> : ''}    
          
        </div>
        
    </>
  )
}

export default Profile