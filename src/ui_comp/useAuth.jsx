import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('carttoken');
    
        const response = await axios.get('https://snapmovieserver.onrender.com/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${token}`, // Prefix the token with "Bearer"
          },
        });
         setIsAdmin(response.data.orders[0].isAdmin);
      } catch (error) {
        console.error('Failed to check auth:', error);
      } finally {
        setLoading(false); // Loading is done
      }
    };

    fetchOrders();
  }, []);

  return { isAdmin, loading }; // Return both admin status and loading status
};
