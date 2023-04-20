import React, { useState } from "react";
import Select from "react-select";
// import ReactPaginate from "react-paginate";

const itemsPerPage = 500;
const AuthorSelect = ({ authors }) => {
    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [optionsToShow, setOptionsToShow] = useState(itemsPerPage);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
        setOptionsToShow((selected + 1) * itemsPerPage);
    };
    const paginatedAuthors = authors.slice(
        0,
        optionsToShow
    );
    const options = paginatedAuthors.map((item) => {
        return { value: item, label: item };
    });
    return (
        <div className="bg-blue-50 p-2 rounded flex gap-x-2">
            <Select
                onChange={(val) => setSelectedAuthor(val.value)}
                options={options}
                className="w-full text-[#5F6DF8]"
                placeholder="Select Author"
            />
            {optionsToShow < authors.length && (
                <button
                    onClick={() => setOptionsToShow(optionsToShow + itemsPerPage)}
                    className=" rounded bg-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white p-1 text-[#5F6DF8]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                </button>
            )}
            {/* <div className="hidden">
                <ReactPaginate
                    previousLabel={'prev'}
                    nextLabel={'next'}
                    pageCount={Math.ceil(authors.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={'flex p-1 justify-center my-4'}
                    pageClassName={'mx-2 p-1 rounded bg-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'}
                    previousClassName={'mx-2 p-1 rounded bg-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'}
                    nextClassName={'mx-2 rounded p-1 bg-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'}
                    breakClassName={'mx-2'}
                    activeClassName={'bg-blue-500 p-1 text-blue-700 rounded-full'}
                    disabledClassName={'opacity-50 cursor-not-allowed'}
                />
            </div> */}
        </div>
    );
};
export default AuthorSelect;