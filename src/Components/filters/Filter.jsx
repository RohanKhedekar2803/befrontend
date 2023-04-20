import React, { useState, useEffect } from "react";
import {
  getBooksBySort,
  getAllAuthors,
  getAllCategories,
  getFilteredBooks,
} from "../../Services/Book";
import Select from "react-select";
import AuthorSelect from "./AuthorSelect";

const Filter = ({ setAllData, setLoading, skip, setselectedAuthor, selectedAuthor, selectedCategory, setselectedCategory, sortDataBy, setsortDataBy }) => {
  const [author, setAuthor] = useState(null);
  const [minPrice, setminPrice] = useState(100);
  const [maxPrice, setmaxPrice] = useState(1000);
  const [categories, setcategories] = useState([]);

  // const [selectedAuthor, setselectedAuthor] = useState("");
  // const [selectedCategory, setselectedCategory] = useState("");
  // const [sortDataBy, setsortDataBy] = useState("rating");

  const getAuthors = async () => {
    const data = await getAllAuthors();
    if (data) {
      setAuthor(data);
      setselectedAuthor(data[0]);
    }
  };
  const getCategory = async () => {
    const data = await getAllCategories();
    if (data) {
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
    const query = `category=${selectedCategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortBy=${sortDataBy}&skip=${skip}`;
    const data = await getFilteredBooks(query);
    if (data) {
      setAllData(data)
      // setFilterChange(true)
      setLoading(false);
    }
  };

  const sortBy = async (selectedOption) => {
    let query = ''
    setLoading(true);
    if (selectedOption.value === "Sort By") {
      setLoading(false);
      return;
    } else if (selectedOption.value === "rating") {
      query = 'order=desc'
    }

    const data = await getBooksBySort(selectedOption.value, 50, skip, query);
    if (data) {
      setAllData(data);
      // setSortChange(true)
      setLoading(false);
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="block md:grid grid-cols-4 gap-4 w-full px-5 my-10 mx-auto">
        <div className="w-full my-5">
          <Select
            options={[
              { value: "Sort By", label: "Sort By" },
              { value: "rating", label: "Ratings" },
              { value: "price", label: "Price" },
            ]}
            onChange={sortBy}
            className="w-full text-[#5F6DF8]"
            placeholder="Sort By"
          />
        </div>
        {/* Sorting */}
        <div className="w-full my-5">
          <Select
            // value={categories[0]}
            options={
              categories &&
              categories?.map((item) => {
                return { value: item, label: item };
              })
            }
            onChange={(val) => { setselectedCategory(val.value) }}
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
        <div className="w-full mx-auto p-4">
          {
            author && <AuthorSelect
              authors={author} />
          }
        </div>
        <div className="w-full justify-center items-center flex ">
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
    </>
  );
};

export default Filter;
