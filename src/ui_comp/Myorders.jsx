import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navebar from './Navebar';
import Footer from './Footer';

const Myorders = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders using previous tokens
  const fetchOrders = async () => {
    try {

      const previousTokens = JSON.parse(localStorage.getItem('previousCartTokens')) || [];
      if (previousTokens.length === 0) {
        setLoading(false);
        return;
      }
      const orders = [];
      for (const token of previousTokens) {
        const response = await axios.get('https://snapmovieserver.onrender.com/api/orders/myorders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        orders.push(response.data.orders);
        setOrderHistory(orders);

      }
      setLoading(false);

    } catch (err) {
      console.error('Error fetching orders:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Navebar />
      {loading ? (
       <div className="flex justify-center items-center h-[330px] text-lg font-semibold text-black mt-6">
       Loading Your Orders...
     </div>  
         ) : (<div className="my-orders px-4 py-8 max-w-5xl mx-auto mt-8">
        {orderHistory.length === 0 ? (
          <p className="text-lg text-gray-600">You have no orders yet.</p>
        ) : (
          orderHistory
            .slice()
            .reverse()
            .map((order, index) => (


              <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
                <h1 className=" text-xl sm:text-2xl font-bold mb-4 text-center">
                  Order #{orderHistory.length - index} Status: <span
                    className={`${order[0].status === 'confirmed' ? 'text-blue-500' :
                        order[0].status === 'delivered' ? 'text-green-500' :
                          'text-red-500'
                      }`}
                  >{order[0].status}</span>
                </h1>

                <div className="mb-4">
                  <h2 className=" text-[15px] font-semibold">Order items:</h2>
                  {order[0].items.map((itemobj, i) => (
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <img
                          src={itemobj.item.image1}
                          alt={itemobj.item.name}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <span className="ml-4">{itemobj.item.name} ({itemobj.language}✓) ({itemobj.quality}✓) </span>
                      </div>
                      <span className="text-lg font-semibold">{itemobj.quality === '4K' ? (<p>Price: Rs.{itemobj.item.fullprice}</p>) : (<p>Price: Rs.{itemobj.item.price}</p>)}</span>
                    </div>
                  ))}
                </div>
                <h2 className="w-full py-2 mt-4 bg-clr2 text-white rounded text-center font-semibold">
                  Total Price: Rs.{order[0].totalPrice}
                </h2>
              </div>
            ))
        )}
      </div>)}
      
      <Footer />
    </div>
  );
};

export default Myorders;