import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Herofree = () => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://snapmovieserver.onrender.com/api/items/free`); // Fetch item details from your API
        setItem(response.data.item);
      } catch (error) {
        console.error("Error fetching free item:", error);
      }
    };

    fetchItem();
  }, []);

  if (!item) {
    return <div>Loading...</div>; // Show a loading state while fetching the item
  }

  return (
    <div className="bg-gray-100 min-h-[550px] flex justify-center items-center py-12 sm:py-0">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div>
            <img
              src={item.image1}
              alt="sale"
              className="max-w-[400px] h-[350px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 sm:pt-0">
          <h1 className=" text-3xl sm:text-4xl font-bold">Today's free {item.type}:</h1>
            <h1 className="text-3xl sm:text-4xl font-bold">{item.name}</h1>
            <p className="text-green-500 font-semibold">
              ✓ Enjoy Daily One movie or series 100% Free
            </p>
            <p className="text-xl font-semibold text-red-500 mb-2">
              Rs.0 <span className="text-gray-500 line-through">Rs.{item.fullprice}</span> Save 100%
            </p>
            <Link  to={`/dynpage2/${item._id}`} className=' text-center bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 hover:shadow-lg transition duration-300 text-white py-1 px-4 rounded-full font-medium '>
              Download Free {item.type}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herofree;
