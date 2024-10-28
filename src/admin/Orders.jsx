import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Import React icons
import Navebar from '../ui_comp/Navebar';

const Orders = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null); // State to track expanded order
  const [filterOption, setFilterOption] = useState('all'); // State for the selected filter option

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://snapmovieserver.onrender.com/api/orders/history');
      setOrderHistory(response.data.orders);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders history:', err);
      setError('Error fetching your orders history. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleItems = (index) => {
    // Toggle the expansion of items for a specific order
    setExpandedOrder(expandedOrder === index ? null : index);
  };

  // Function to handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.post('https://snapmovieserver.onrender.com/api/orders/status', {
        status: newStatus,
        token: orderId,
      });

      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  // Filter the orderHistory based on the selected filter option
  const filteredOrders = filterOption === 'all'
    ? orderHistory
    : orderHistory.filter(order => order.status === filterOption);

  if (loading) return <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">Loading your orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navebar />
      <div className="my-orders px-4 py-8 max-w-5xl mx-auto">
        <div className='sm:flex mb-2'>
          <h3 className='mr-4 text-xl xl:text-2xl'>Select Filter by Status</h3>
          <select value={filterOption} onChange={handleFilterChange} className="px-4 py-2 border rounded-md">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-lg text-gray-600">You have no orders yet.</p>
        ) : (
          filteredOrders
            .slice()
            .reverse()
            .map((order, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
                <div className='flex'>
                  <div className='mr-10'>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                      Order #{filteredOrders.length - index}
                    </h2>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                      WhatsApp Number: {order.whnum}
                    </h2>
                    <p className="text-white py-2 px-4 rounded-lg mb-4 inline-block mr-2 bg-clr2">
                      <strong>Total Price:</strong> Rs.{order.totalPrice}
                    </p>

                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="px-4 py-2 border rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => toggleItems(index)}
                      className="text-lg text-white py-1 px-4 rounded-lg mb-2 mr-2 bg-clr2 font-semibold flex items-center"
                    >
                      Items {expandedOrder === index ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                    </button>
                  </div>
                  <div>
                    <img
                      src={order.image}
                      alt={order.totalPrice}
                      className="object-cover h-40 rounded-lg mb-2"
                    />
                  </div>
                </div>

                {expandedOrder === index && (
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {order.items.map((itemobj, i) => (
                        <li key={i} className="flex flex-col items-center p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
                          <img
                            src={itemobj.item.image1}
                            alt={itemobj.item.name}
                            className="object-cover h-24 rounded-lg mb-2"
                          />
                          <div className="flex-grow text-center">
                            <p className="text-xs font-bold text-gray-800">{itemobj.item.name}</p>
                            <div className="text-gray-600 text-xs flex flex-col items-center">
                              <span className="text-center">Language: <span className="font-semibold">{itemobj.language}</span></span>
                              <span className="text-center">Quality: <span className="font-semibold">{itemobj.quality}</span></span>
                            </div>
                            {itemobj.quality === '4K' ? (
                               <p className="text-white py-1 px-2 rounded-lg mb-4 inline-block mt-2 bg-clr2">
                                 Price: <span className="font-semibold">Rs.{itemobj.item.fullprice}</span>
                               </p>
                            ):(
                              <p className="text-white py-1 px-2 rounded-lg mb-4 inline-block mt-2 bg-clr2">
                                 Price: <span className="font-semibold">Rs.{itemobj.item.price}</span>
                               </p>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Orders;
