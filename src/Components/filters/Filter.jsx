import React, { useState, useEffect } from "react";
import {
  getBooksBySort,
  getAllAuthors,
  getDataByAuthor,
  getAllBooks,
  getByPrice,
  getCategories,
  getAllCategories,
  getDataByCategory,
} from "../../Services/Book";
import Select from "react-select";

const Filter = ({ setAllData, skip }) => {
  const [author, setAuthor] = useState(null);
  const [minPrice, setminPrice] = useState(100);
  const [maxPrice, setmaxPrice] = useState(1000);
  const [categories, setcategories] = useState([]);

  const getAuthors= async()=>{
     const data = await getAllAuthors();
     if(data){
      console.log(data)
      setAuthor(data)
     }
  } 
  const getCategory= async()=>{
    const data = await getAllCategories();
    if(data){
     console.log(data)
     setcategories(data)
    }
 } 

  useEffect(()=>{
    // getCategory()
    getCategory()
  },[])
 
  return (
    <div className="grid gap-5 my-5 grid-cold-1 md:grid-cols-4 align-center mx-auto w-[90%]">
      {/* Filters */}
      <div className="w-full ">
        <Select
          options={
            author &&
            author.map((item) => {
              return { value: item, label: item };
            })
          }
       
          className="w-full text-[#5F6DF8]"
          placeholder="Select Author"
        />
      </div>
      {/* Sorting */}
      <div className="w-full">
        <Select
           options={[
            { value: "Sort By", label: "Sort By" },
            { value: "rating", label: "Ratings" },
            { value: "price", label: "Price" },
            { value: "noOfReviews", label: "Number of reviews" },
          ]}
          // onChange={handleSelectChange2}
          className="w-full text-[#5F6DF8]"
          placeholder="Sort By"
        />
      </div>
      <div className="w-full ">
        <Select
            // value={categories[0]}  
          options={
            categories &&
            categories.map((item) => {
              return { value: item, label: item };
            })
          }
          // onChange={handleCategoryChange}
          className="w-full text-[#5F6DF8]"
          placeholder="Select Category"
        />
      </div>

      <div className="grid w-full gap-2 grid-cols-3">
        <div>
          <input
            value={minPrice}
            // onChange={(ev) => {
            //   setminPrice(ev.target.value);
            // }}
            type="number"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Min"
            required
          />
        </div>

        <div>
          <input
            value={maxPrice}
            // onChange={(ev) => {
            //   setmaxPrice(ev.target.value);
            // }}
            type="number"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Max"
            required
          />
        </div>
    
        <div className="px-2 w-full flex justify-center items-center">
          <button
            // onClick={() => {
            //   filterByPrice();
            // }}
            className="w-full inline-flex justify-center items-center bg-[#5F6DF8] py-2.5 text-white rounded-md"
          >
            <i class="bx bxs-filter-alt"></i>
          </button>
     
        </div>

    


        
      </div>

      <div className="col w-full flex col-span-4  justify-center items-center">
      <button
            // onClick={() => {
            //   filterByPrice();
            // }}
            className="w-max px-20 inline-flex justify-center items-center bg-[#5F6DF8] py-2.5 text-white rounded-md"
          >
            Filter Books <i class="bx px-2 bxs-filter-alt"></i>
          </button>
     
        </div>
    </div>
  );
};

export default Filter;
