import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navebar from './Navebar';
import Footer from './Footer';
import DynamicpgWebcard from '../pages/DynamicpgWebcard';

const Search = () => {
  const { query } = useParams(); 
  const [results, setResults] = useState([]);
  const [mass, setmass] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://snapmovieserver.onrender.com/api/items/search/${query}`);
        setResults(response.data.items);
        setmass(response.data.message)
      } catch (err) {
        console.error('Error fetching search items:', err);
      }
    };

    if (query) {
      fetchSearchResults();  // Only fetch if a query is present
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">  
    <Navebar />
    
    <div className="flex-grow">  {/* This ensures that the content takes up as much space as possible */}
      <h1 className=' mt-6 mb-2'>{mass} for "{query}"</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {results.map((item) => (
                        <DynamicpgWebcard key={item.id} item={item} />
                    ))}
        </div>
    </div>
    
    <Footer className="mt-auto" />  {/* Footer stays at the bottom */}
  </div>
  );
};

export default Search;
