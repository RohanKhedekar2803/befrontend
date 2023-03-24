import React from 'react'
import { useEffect } from 'react'
import BookShowcaseCard from './BookShowcaseCard';
import SingleBook from './SingleBook';
import 'boxicons'
import { useState } from 'react';
import { useAuthState } from '../context/AuthContext';
import { getwishlistedbooksbyid } from '../Services/Book';

    // var books = [];
    // for (var i = 0; i < 10; i++) {
    //   books.push(<BookShowcaseCard/>);
    // }
    // console.log("active wishlist")

  const slideLeft = () => {
    var slider = document.getElementById('slider' );
    console.log(slider)
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider' );
    slider.scrollLeft = slider.scrollLeft + 500;
  };
 

const Wishlisted = () => {
  const state = useAuthState();
  const [books,setBooks]=useState ([]);
    useEffect(() => {
      
      getwishlistedbooksbyid(state.auth.user.id).then(result =>setBooks(result))
  
      
    },[]);   
     
  const  reduceString=(str , num)=>{
        if(str?.length > num)return str.slice(3,num)+ '...'
        else return str
      }
           
    return (
      <div>
        { books.length>0 ? <div>
        <div className='mt-6'>
                   <div className="flex h-[400px]  w-full p-5">                                      
                          <div className=' text-white flex items-center group w-full'>
                           
                             <box-icon name='left-arrow-alt' onClick={slideLeft} size={15} className='bg-white/10 rounded-full opacity-70 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' ></box-icon>
                               
                                 <div id={'slider'}  className=' flex overflow-x-scroll  scrollbar-hide  whitespace-nowrap  scroll-smooth  mx-2'>
                                 { books.map((data)=>(
                                       
                                       <SingleBook data={{  name: data.Title , writer : data.Author}}/>
                                   ))}  
                                 </div>
 
                                 <box-icon name='right-arrow-alt' onClick={slideRight} size={15} className='mr-1 bg-white/10 rounded-full opacity-70 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' ></box-icon>
                                 
                             </div>
                   </div>   
                 
             </div>
        </div> :
          <div className='h-[420px] flex justify-center '>
              <h1 className='mt-[190px] text-2xl'>
                 You haven't Completed any book yet :) 
              </h1>
          </div>
        }
      </div>
     
    )
}
export default Wishlisted