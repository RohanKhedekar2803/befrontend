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
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);
  const [categories, setcategories] = useState("");
  const getSort = async (sortBy, skip) => {
    const res = await getBooksBySort(sortBy, 50, skip);
    return res;
  };
  const getauthor = async () => {
    const res = await getAllAuthors();
    return res;
  };

  const getCategories = async () => {
    return await getAllCategories();
  };

  useEffect(() => {
    getauthor().then((response) => {
      setAuthor(response.slice(0, 500));
    });
    getCategories().then((res) => {
      console.log(res);
      setcategories(res.slice(0, 100));
    });
  }, []);

  const reset = async () => {
    const data = await getAllBooks(50, skip);
    if (data) {
      console.log(data);
      setAllData(data);
    }
  };
  const handleSelectChange = async (selectedOption) => {
    console.log(selectedOption.value);
    const data = await getDataByAuthor(selectedOption.value);

    console.log(data);
    if (data) {
      setAllData(data);
    }
  };

  const handleSelectChange2 = async (selectedOption) => {
    if (selectedOption.value === "Sort By") {
      return;
    }
    console.log(selectedOption.value);
    const data = await getBooksBySort(selectedOption.value, 50, skip);
    console.log(data);
    if (data) {
      setAllData(data);
    }
  };

  const handleCategoryChange = async (selectedOption) => {
    const data = await getDataByCategory(selectedOption.value);
    console.log(data);
    if (data) {
      setAllData(data);
    }
  };

  const filterByPrice = async () => {
    const data = await getByPrice(minPrice, maxPrice);
    console.log(data);
  };
  return (
    <div className="grid gap-5 my-5 grid-cold-1 md:grid-cols-3 align-center mx-auto w-[90%]">
      {/* Filters */}
      <div className="w-full ">
        <Select
          options={
            author &&
            author.map((item) => {
              return { value: item, label: item };
            })
          }
          onChange={handleSelectChange}
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
          onChange={handleSelectChange2}
          className="w-full text-[#5F6DF8]"
          placeholder="Sort By"
        />
      </div>
      <div className="w-full ">
        <Select
          options={
            categories &&
            categories.map((item) => {
              return { value: item, label: item };
            })
          }
          onChange={handleCategoryChange}
          className="w-full text-[#5F6DF8]"
          placeholder="Select Category"
        />
      </div>

      <div className="grid w-full gap-2 grid-cols-3">
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
        <div className="px-2">
          <button
            onClick={() => {
              filterByPrice();
            }}
            className="w-full inline-flex justify-center items-center bg-[#5F6DF8] py-2.5 text-white rounded-md"
          >
            <i class="bx bxs-filter-alt"></i>
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Filter;
