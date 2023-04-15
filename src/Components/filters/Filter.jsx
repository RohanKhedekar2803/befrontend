import React, { useState, useEffect } from "react";
import {
  getBooksBySort,
  getAllAuthors,
  getAllCategories,
  getDataByCategory,
  getFilteredBooks,
} from "../../Services/Book";
import Select from "react-select";

const Filter = ({ setAllData, setLoading, skip }) => {
  const [author, setAuthor] = useState(null);
  const [minPrice, setminPrice] = useState(100);
  const [maxPrice, setmaxPrice] = useState(1000);
  const [categories, setcategories] = useState([]);

  const [selectedAuthor, setselectedAuthor] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const [sortDataBy, setsortDataBy] = useState("rating");

  const getAuthors = async () => {
    const data = await getAllAuthors();
    if (data) {
      console.log(data);
      setAuthor(data);
      setselectedAuthor(data[0]);
    }
  };
  const getCategory = async () => {
    const data = await getAllCategories();
    if (data) {
      console.log(data);
      setcategories(data);
      setselectedCategory(data[0]);
    }
  };

  useEffect(() => {
    getAuthors()
    getCategory();
  }, []);

  const filterBooks = async () => {
    setLoading(true);
    const query = `category=${selectedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortDataBy}`;
    const data = await getFilteredBooks(query);
    if (data) {
      setAllData(data)
      setLoading(false);
    }
  };

  const sortBy = async (selectedOption) => {
    setLoading(true);
    if (selectedOption.value === "Sort By") {
      setLoading(false);
      return;
    }
    setsortDataBy(selectedOption.value)
    const data = await getBooksBySort(selectedOption.value, 50, skip);
    console.log(data);
    if (data) {
      setAllData(data);
      setLoading(false);
    }
  };

  return (
    <div className="block md:grid grid-cols-4 gap-4 w-full px-5 my-10 mx-auto">

      <div className="w-full my-5">
        <Select
          options={[
            { value: "Sort By", label: "Sort By" },
            { value: "rating", label: "Ratings" },
            { value: "price", label: "Price" },
            { value: "noOfReviews", label: "Number of reviews" },
          ]}
          onChange={sortBy}
          className="w-full text-[#5F6DF8]"
          placeholder="Sort By"
        />
      </div>
      {/* Filters */}
      <div className="w-full my-5">
        <Select
            onChange={(val)=>{setselectedAuthor(val.value)}}
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

      <div className="w-full my-5">
        <Select
          // value={categories[0]}
          options={
            categories &&
            categories.map((item) => {
              return { value: item, label: item };
            })
          }
          onChange={(val)=>{setselectedCategory(val.value)}}
          className="w-full text-[#5F6DF8]"
          placeholder="Select Category"
        />
      </div>

      <div className="grid my-5 w-full gap-2 grid-cols-2">
        <div>
          <input
            value={minPrice}
            onChange={(ev) => {
              setminPrice(ev.target.value);
            }}
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
            onChange={(ev) => {
              setmaxPrice(ev.target.value);
            }}
            type="number"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Max"
            required
          />
        </div>
      </div>

      <div className="col w-full flex col-span-4  justify-center items-center">
        <button
          onClick={() => {
            filterBooks();
          }}
          className="w-max px-20 inline-flex justify-center items-center bg-[#5F6DF8] py-2.5 text-white rounded-md"
        >
          Filter Books <i class="bx px-2 bxs-filter-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default Filter;
