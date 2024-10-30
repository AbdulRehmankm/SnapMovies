import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DynamicpgWebcard from './DynamicpgWebcard';

const DynamicpgWebpage = ({ usedata, isLimited }) => {
    const [items, setItems] = useState([]); // State to store all items
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const itemsPerPage = 12; // Number of items per page
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const [filterOption, setFilterOption] = useState("all"); // State for filtering (all, movie, series)
    const [sortOption, setSortOption] = useState("default"); // State for sorting
    const [loading, setLoading] = useState(true);


    const fetchItems = useCallback(async () => {
        try {
            if(loading == false)
            {
                setLoading(true);
            }
            const response = await axios.get(`https://snapmovieserver.onrender.com/api/items/category/${usedata}`);
            const sortedItems = response.data.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setItems(sortedItems);
            setTotalPages(Math.ceil(response.data.items.length / itemsPerPage));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching items:', error);
            setLoading(false);
        }
    }, [usedata, itemsPerPage]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);


    // Handle filtering by "movies" or "series"
    const filteredItems = items.filter(item => {
        if (filterOption === "all") return true;
        return item.type === filterOption;
    });

    // Handle sorting based on selected option
    const sortedItems = filteredItems.sort((a, b) => {
        switch (sortOption) {
            case "popularity":
                return b.popularity - a.popularity;
            case "rating":
                return b.rating - a.rating;
            case "latest":
                return new Date(b.releaseDate) - new Date(a.releaseDate);
            case "lowToHigh":
                return a.price - b.price;
            case "highToLow":
                return b.price - a.price;
            default:
                return 0; // Default sorting
        }
    });

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem); // Items for the current page

    // Scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling effect
        });
    };

    // Handle page change
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            scrollToTop(); // Scroll to the top when the page changes
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            scrollToTop(); // Scroll to the top when the page changes
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
        scrollToTop(); // Scroll to the top when the page changes
    };

    // Handle filter change
    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
        setCurrentPage(1); // Reset to first page after filtering
    };

    // Handle sort change
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1); // Reset to first page after sorting
    };

    if (loading) return (
        <div>
          <div className="flex justify-center items-center h-[325px] text-lg font-semibold text-black mt-8">
                Loading Item...
              </div>   
        </div>
      );

    return (
        <div>
        
        <div className="container mx-auto p-4 mt-2 sm:mt-4">
            {isLimited ? '' :
                <div className=" grid grid-cols-1 grc xl:grid-cols-2 mb-4">
                    <div className='sm:flex mb-2'>
                        <h3 className='  mr-4 text-xl xl:text-2xl'>Select the Desire Filter</h3>
                        <select value={filterOption} onChange={handleFilterChange} className="px-4 py-2 border rounded-md">
                            <option value="all" >All</option>
                            <option value="movie">Movies</option>
                            <option value="series">Series</option>
                        </select>
                    </div>
                    <div className='sm:flex mb-2'>
                        <h3 className='  mr-4 text-xl xl:text-2xl'>Select the Desire Sort</h3>
                        <select value={sortOption} onChange={handleSortChange} className="px-4 py-2 border rounded-md">
                            <option value="default">Default Sorting</option>
                            <option value="popularity">Sort by Popularity</option>
                            <option value="rating">Sort by Rating</option>
                            <option value="latest">Sort by Latest</option>
                            <option value="lowToHigh">Sort by Price: Low to High</option>
                            <option value="highToLow">Sort by Price: High to Low</option>
                        </select>
                    </div>

                </div>
            }

{/* 
{loading ? (
            <div className="flex justify-center items-center h-[170px] text-lg font-semibold text-black">
            Loading Items...
          </div>          
           ) : ('')}  */}

            {/* Display Items */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {isLimited
                    ? currentItems.slice(0, 6).map((item) => (
                        <DynamicpgWebcard key={item.id} item={item} />
                    ))
                    : currentItems.map((item) => (
                        <DynamicpgWebcard key={item.id} item={item} />
                    ))
                }
            </div>

            {/* Pagination Controls */}

            {isLimited ? '' :
                <div className="flex justify-between items-center mt-4">
                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex space-x-2">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                onClick={() => handlePageClick(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>

            }
        </div>
        
    </div>
    );
};

export default DynamicpgWebpage;
