import React from 'react';
import { Link } from 'react-router-dom';

const DynamicpgWebcard = ({ item,}) => {
    return (
    // <a href={product.link} >
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
            
            <div className="w-full relative mb-4 rounded-md shadow-md overflow-hidden" style={{ paddingTop: '133.33%' }}>
            <Link to={`/dynpage2/${item._id}`}>
                <img 
                    src={item.image1} 
                    alt={item.name} 
                    className="absolute top-0 left-0 w-full h-full object-cover transform duration-300 hover:scale-105" 
                /></Link>
            </div>
            <Link to={`/dynpage2/${item._id}`}>
    <h2 className="text-sm font-bold text-gray-800 mb-2 cursor-pointer line-clamp-3 overflow-hidden">
     {item.name}
    </h2>
</Link>

            <p className="text-lg font-bold text-red-500 mb-2">
                Rs.{item.price} 
                <span className="text-sm text-gray-500 line-through ml-2">
                    Rs.{item.fullprice}
                </span>
            </p>
            <Link to={`/dynpage2/${item._id}`} className='bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 hover:shadow-lg transition duration-300 text-white py-1 px-4 rounded-full font-medium'>
                Download
            </Link>
                
           
        </div>
    //  </a>
    );
};

export default DynamicpgWebcard;


