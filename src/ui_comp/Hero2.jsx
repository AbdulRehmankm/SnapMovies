import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowCircleRight } from "react-icons/fa";
import DynamicpgWebpage from '../pages/DynamicpgWebpage';




const Hero2 = () => {
    const [categories, setCategories] = useState([]);
    const isLimited = true;

    useEffect(() => {
        fetchCategories(); // Fetch categories when component loads
    }, []);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from local storage

            const response = await axios.get('https://snapmovieserver.onrender.com/api/admin/category', {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token in header
                },
            });

            setCategories(response.data); // Set fetched categories to state
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    return (
        <div className=' bg-gray-100'>
            {categories.map((data) => (
                <div key={data.id} className='pb-12 container'>
                    <div className=' text-center mb-10 max-w-[600px] mx-auto'>
                        <h1 data-aos="fade-up" className=' text-3xl font-bold'>{data.name}</h1>
                    </div>
                    <div>
                        <DynamicpgWebpage usedata={data.name} isLimited={isLimited} />
                        <div className='flex items-center justify-center h-full'>
                            <a
                                href={`/dynpage/${data.name}`}
                                className='flex items-center bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 hover:shadow-lg duration-300 text-white py-2 px-6 mt-6 rounded-full mx-auto font-semibold tracking-wider transform transition-transform hover:from-clr2 hover:to-clr1 shadow-md'>
                                View More <FaArrowCircleRight className="ml-2" />
                            </a>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default Hero2