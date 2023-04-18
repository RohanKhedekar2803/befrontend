import React, { useState, useEffect } from "react";
import Select from "react-select";
import ReactPaginate from "react-paginate";

const itemsPerPage = 500;

const AuthorSelect = ({ authors }) => {

    const [selectedAuthor, setSelectedAuthor] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const paginatedAuthors = authors.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const options = paginatedAuthors.map((item) => {
        return { value: item, label: item };
    });

    return (
        <div className="bg-blue-50 p-4 rounded">
            <Select
                onChange={(val) => setSelectedAuthor(val.value)}
                options={options}
                className="w-full text-[#5F6DF8]"
                placeholder="Select Author"
            />
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

        </div>
    );
};

export default AuthorSelect;
