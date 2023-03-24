import React, { useState, useEffect } from 'react'
import { getBooksByPrice, getBooksByRating, getFilteredBooks, getBooksByReviews, getAllAuthors, getDataByAuthor } from '../../Services/Book';
import Select from 'react-select'



const Filter = (props, { skip, setSkip }) => {
    const [showSort, setShowSort] = useState(false);
    const [filters, setFilters] = useState("");
    const [author, setAuthor] = useState(null);

    const handleShowSort = () => {
        setShowSort(!showSort)
    }
    const sortByPrice = async () => {
        const res = await getBooksByPrice(50, skip);
        return res;
    }
    const sortByRating = async () => {
        const res = await getBooksByRating(50, skip);
        return res;
    }
    const sortByReviews = async () => {
        const res = await getBooksByReviews(50, skip);
        return res;
    }
    const getauthor = async () => {
        const res = await getAllAuthors();
        return res;
    }

    useEffect(() => {
        getauthor().then((response) => {
            setAuthor(response.slice(0, 500));
        });
    }, [])


    useEffect(() => {
            getDataByAuthor(filters).then((response) => {
                props.onDataAuthor(response);
            })
    }, [filters])

    function handleClickSortByPrice() {
        sortByPrice().then((response) => {
            props.onDataPrice(response);
        });
    }
    function handleClickSortByRating() {
        sortByRating().then((response) => {
            props.onDataRating(response);
        });
    }

    function handleClickSortByReviews() {
        sortByReviews().then((response) => {
            props.onDataReviews(response);
        });
    }



    const handleSelectChange = (selectedOption) => {
        setFilters(selectedOption.value);
    }



    return (
        <div>
            {/* Filters */}
            <div className="relative inline-block text-left ml-6 mb-6">
                <Select
                    options={
                        author && author.map((item) => {
                            return { value: item, label: item }
                        }
                        )
                    }
                    onChange={handleSelectChange}
                    className="w-full text-[#5F6DF8]"
                    placeholder="Filter by Author"
                />
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
                                    handleClickSortByReviews();
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

