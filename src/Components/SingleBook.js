import React from 'react'
import BookPlaceHolder from "../assets/book_placeholder.png";

const SingleBook = ({data}) => {

  const  reduceString=(str , num)=>{
    if(str?.length > num)return str.slice(0,num)+ '..'
    else return str
  }
  return (
    <>
    
    </>
  )
}

export default SingleBook
