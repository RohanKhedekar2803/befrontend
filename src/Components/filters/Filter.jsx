import React, { useState } from 'react'
import { getBooksByPrice, getBooksByRating, getFilteredBooks } from '../../Services/Book';

const Filter = (props,{skip,setSkip}) => {
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const handleShowFilter = () => {
        setShowFilter(!showFilter)
    }
    const handleShowSort = () => {
        setShowSort(!showSort)
    }

    const filterData = async () => {
        const res = await getFilteredBooks();
        return res;
    }
    const sortByPrice = async () => {
        const res = await getBooksByPrice(50,skip);
        return res;
    }
    const sortByRating = async () => {
        const res = await getBooksByRating(50,skip);
        return res;
    }

    function handleClickFilter() {
        filterData().then((response) => {
            console.log(response)
            props.onData(response);
        });
    }

    function handleClickSortByPrice() {
        sortByPrice().then((response) => {
            console.log(response)
            props.onDataPrice(response);
        });
    }
    function handleClickSortByRating() {
        sortByRating().then((response) => {
            console.log(response)
            props.onDataRating(response);
        });
    }



    return (
        <div>
            {/* Filters */}
            <div className=" relative inline-block text-left ml-6 mb-6">
                <div>
                    <button type="button" className="text-[#5F6DF8]  inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2  text-sm font-medium  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="filter-menu" aria-haspopup="true" aria-expanded="false"
                        onClick={handleShowFilter}
                    >
                        Filter By
                        <svg className="-mr-1 ml-2 h-5 w-5 text-[#5F6DF8] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {
                    showFilter &&
                    <div className="z-50 origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="filter-menu">
                        <div className="py-1" role="none">
                            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#EDEFFF] hover:text-gray-900" role="menuitem"
                                onClick={() => { handleClickFilter(); }}
                            >Author</span>
                        </div>
                    </div>
                }
            </div>
            {/* Sorting */}
            <div className=" relative inline-block text-left ml-6 mb-6">
                <div>
                    <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-[#5F6DF8]  hover:bg-gray-50  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="filter-menu" aria-haspopup="true" aria-expanded="false"
                        onClick={handleShowSort}
                    >
                        Sort By
                        <svg className="-mr-1 ml-2 h-5 w-5 text-[#5F6DF8] " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                {
                    showSort &&
                    <div className="z-50 origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="filter-menu">
                        <div className="py-1" role="none">
                            <span className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-[#EDEFFF] hover:text-gray-900" role="menuitem"
                                onClick={
                                    () => {
                                        handleClickSortByRating();
                                    }}
                            >Ratings</span>
                            <span className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-[#EDEFFF] hover:text-gray-900" role="menuitem"
                                onClick={() => {
                                    handleClickSortByPrice();
                                }}
                            >Price</span>
                            <span className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-[#EDEFFF] hover:text-gray-900" role="menuitem"
                                onClick={() => {
                                    console.log("hello")
                                }}
                            >Number of reviews</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Filter

// for passing the data from child to parent i should use callback function