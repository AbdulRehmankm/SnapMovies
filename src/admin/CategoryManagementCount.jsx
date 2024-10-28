import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CategoryManagementCount = ({ usedata }) => {
    const [count, setCount] = useState(0);

    // Fetch items from backend whenever usedata changes
    const fetchItems = useCallback(async () => {
        try {
            const response = await axios.get(`https://snapmovieserver.onrender.com/api/items/category/${usedata}`);
            setCount(response.data.items.length);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }, [usedata]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return (
        <div>
            <h4 className="text-lg font-semibold">Number of Items: {count}</h4>
        </div>
    );
};

export default CategoryManagementCount;
