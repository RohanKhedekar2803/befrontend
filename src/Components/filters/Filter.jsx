import React, { useState, useEffect } from 'react'
import { getBooksBySort, getAllAuthors, getDataByAuthor, getAllBooks } from '../../Services/Book';
import Select from 'react-select'



const Filter = ({ setAllData, skip }) => {
    const [author, setAuthor] = useState(null);

    const getSort = async (sortBy, skip) => {
        const res = await getBooksBySort(sortBy, 50, skip);
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

    const reset = async () => {
        const data = await getAllBooks(50, skip);
        if (data) {
            console.log(data)
            setAllData(data)
        }

    }
    const handleSelectChange = async (selectedOption) => {
        console.log(selectedOption.value)
        const data = await getDataByAuthor(selectedOption.value)
        console.log(data)
        if (data) {
            setAllData(data)
        }
    }

    const handleSelectChange2 = async (selectedOption) => {
        if (selectedOption.value === 'Sort By') {
            return;
        }
        console.log(selectedOption.value)
        const data = await getBooksBySort(selectedOption.value, 50, skip);
        console.log(data)
        if (data) {
            setAllData(data)
        }
    }

    return (
        <div className="grid gap-5 my-5 grid-cols-3 w-full">
            {/* Filters */}
            <div className="w-full ">
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
            <div className="w-full">
                <Select
                    options={
                        [
                            { value: "Sort By", label: "Sort By" },
                            { value: "rating", label: "Ratings" },
                            { value: "price", label: "Price" },
                            { value: "noOfReviews", label: "Number of reviews" }
                        ]
                    }
                    onChange={handleSelectChange2}
                    className="w-full text-[#5F6DF8]"
                    placeholder="Sort By"
                />
            </div>

            <button onClick={() => {
                reset()
            }} className='bg-[#5F6DF8] px-10 w-max py-1 rounded-md text-white'>Clear Filter</button>
        </div>
    )
}

export default Filter

