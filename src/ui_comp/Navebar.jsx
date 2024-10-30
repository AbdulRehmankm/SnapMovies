import React, { useState, useEffect } from 'react';
import Logo from "../Data/main_logo.png";
import { GoSearch } from "react-icons/go";
import { FaCartArrowDown } from "react-icons/fa";
import { VscThreeBars, VscChromeClose } from "react-icons/vsc";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from '../ui_comp/useAuth'; // Import the useAuth hook
import axios from 'axios';
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const menu = [
  { id: 1, name: "Home", link: "/" }
];

const adminLinks = [
  { id: 1, name: "Admin Things", link: "/admin" },
  { id: 2, name: "Check Orders", link: "/orders" }
];

const Navebar = () => {
  const { isAdmin } = useAuth(); // Get admin status
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderPopup, setOrderPopup] = useState(false);
  const [checkoutPopup, setcheckoutPopup] = useState(false);
  const [cartItems, setCartItems] = useState(''); // Store orders as an array
  const [cartItemsno, setCartItemsno] = useState(''); // Store orders as an array
  const [categories, setCategories] = useState([]);
  const [whtnum, setwhtnum] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setImage(file); // Assuming you have a state variable named 'image' for storing the single file
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when component loads
    fetchOrders(); // Fetch orders initially
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await axios.get('https://snapmovieserver.onrender.com/api/admin/category', {
        headers: { Authorization: `Bearer ${token}` } // Send token in header
      });
      setCategories(response.data); // Set fetched categories to state
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('carttoken'); // Retrieve token from localStorage

      const response = await axios.get('https://snapmovieserver.onrender.com/api/orders/myorders', {
        headers: {
          Authorization: `Bearer ${token}`, // Prefix the token with "Bearer"
        },
      });

      setCartItems(response.data.orders); // Set orders to cartItems state
      setCartItemsno(response.data.numberOfItems); // Set number of items

    }
    catch (error) {
      console.error('Error fetching orders:', error);
    }

  };

  const removeItemFromCart = async (orderId, itemId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('carttoken'); // Get token for authentication

      // Send the token in the Authorization header and make DELETE request
      const response = await axios.delete(`https://snapmovieserver.onrender.com/api/orders/${orderId}/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is sent with "Bearer" prefix
        },
      });
      setLoading(false);
      if (response.data.message === 'Order deleted as no items left in the cart') {
        // If the order is deleted, reload the page
        window.location.reload();
      } else {


        fetchOrders();
        // This will update the cart UI with the remaining items
      }

    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
      setLoading(false);
    }
  };

  const handleCompleteOrder = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
 
      const token = localStorage.getItem('carttoken')
      const formData = new FormData();
      formData.append('whhtnum', whtnum); // WhatsApp number
      // formData.append('spm', selectedPaymentMethod); // Selected payment method
      if (image) {
        formData.append('pp', image);
      }
      // Send checkout request to the backend
      await axios.post('https://snapmovieserver.onrender.com/api/orders/checkout', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      let previousTokens = JSON.parse(localStorage.getItem('previousCartTokens')) || [];
      previousTokens.push(token);
      localStorage.setItem('previousCartTokens', JSON.stringify(previousTokens));
      localStorage.removeItem('carttoken');
      setLoading(false);
      navigate('/myorders');
    
    } catch (error) {
      console.error("Error during checkout:", error);
      setLoading(false);
    }
  };

  return (
    <div className=" shadow-md bg-white duration-200 relative z-40">
      <div className=" fixed top-0 left-0 w-full shadow-md bg-white z-40">
        <div className=" bg-clr4 py-1">
          <div className=" container flex justify-between items-center">
            <div>
              <a href="/" className=" text-2xl sm:text-3xl flex gap-2 text-black font-bold">
                <img src={Logo} alt="Logo" className="w-[40px] sm:w-[50px] uppercase" />
                <div className=" pt-3">Snap Movies</div>
              </a>
            </div>
            <div className="flex">
              <div className="relative group hidden sm:block">
                <form action={`/search/${searchQuery}`} method="GET" className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-clr1"
                  />
                  {searchQuery === '' ? (
                    <GoSearch className="text-gray-500 group-hover:text-clr1 absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" />
                  ) : (
                    <a href={`/search/${searchQuery}`} className="absolute top-1/2 -translate-y-1/2 right-3">
                      <GoSearch className="text-gray-500 group-hover:text-clr1 cursor-pointer" />
                    </a>
                  )}
                </form>
              </div>
              <button
                onClick={() => setOrderPopup(true)}
                className="bg-gradient-to-r from-clr1 to-clr2 transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group relative mr-3"
              >
                <span className="group-hover:block hidden transition-all duration-200">ORDER</span>
                <FaCartArrowDown />
                {cartItemsno > 0 && (
                  <span className="absolute -top-3 -right-6 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                    {cartItemsno}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-8">
          <button
            className={`sm:hidden text-2xl ${menuOpen ? "hidden" : ""}`}
            onClick={() => setMenuOpen(true)}
          >
            <VscThreeBars />
          </button>
          <div className="relative group block sm:hidden">
            <form action={`/search/${searchQuery}`} method="GET" className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[200px] my-1 group-hover:w-[250px] transition-all duration-300 rounded-full border border-black px-2 py-1 focus:outline-none"
              />
              {searchQuery === '' ? (
                <GoSearch className="text-black absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" />
              ) : (
                <a href={`/search/${searchQuery}`} className="absolute top-1/2 -translate-y-1/2 right-3">
                  <GoSearch className="text-black cursor-pointer" />
                </a>
              )}
            </form>
          </div>
          <div
            className={`fixed top-0 left-0 h-full w-[250px] bg-white z-[9999] p-4 transition-transform duration-300 ease-in-out ${menuOpen ? "transform translate-x-0" : "transform -translate-x-full"
              } sm:transform-none sm:relative sm:flex sm:flex-grow sm:justify-center sm:items-center sm:py-0`}
          >
            {menuOpen && (
              <button
                className="sm:hidden text-2xl absolute right-4 z-[10000]"
                onClick={() => setMenuOpen(false)}
              >
                <VscChromeClose />
              </button>
            )}
            <ul className="sm:flex sm:items-center gap-4 mt-2 mb-2 ">
              {menu.map((data) => (
                <li key={`menu-${data.id}`} 
                className="sm:inline-block my-2 sm:my-0">
                    <Link to={data.link}
                    className="block px-4 py-2 sm:py-0 rounded-md hover:bg-clr4 hover:text-xl duration-200"
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
              {categories.map((data) => (
                <li key={`menu-${data.id}`} className="sm:inline-block my-2 sm:my-0">
                  <Link to={`/dynpage/${data.name}`}
                    className="block px-4 py-2 sm:py-0 rounded-md hover:bg-clr4 hover:text-xl duration-200"
                    onClick={() => {setMenuOpen(false); }}
                  >
                    {data.name}
                    </Link>
                </li>
              ))}
              <li className="sm:inline-block my-2 sm:my-0">
              <Link to={"/myorders"}
                  className="block px-4 py-2 sm:py-0 rounded-md hover:bg-clr4 hover:text-xl duration-200"
                >
                  My Orders
                  </Link>
              </li>

              {isAdmin && adminLinks.map((data) => (
                <li key={`admin-${data.id}`} className="sm:inline-block my-2 sm:my-0">
                 <Link to={data.link}
                    className="block px-4 py-2 sm:py-0 rounded-md hover:bg-clr4 hover:text-xl duration-200"
                  >
                    {data.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="h-[100px]"></div>

      {orderPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex justify-center items-center">
          <div className=" bg-gray-100 p-6 rounded-md w-full max-w-md relative">
            <IoCloseOutline
              className="absolute top-4 right-4 text-2xl cursor-pointer"
              onClick={() => setOrderPopup(false)}
            />
            <div className="flex items-center gap-10 mb-4 ">
              <h2 className="text-xl font-bold">CART</h2>
            </div>
            {cartItems.length > 0 ? (
              <div className=" bg-white max-h-96 overflow-y-auto space-y-4">
                {cartItems[0].items.map((itemobj, index) => (
                  <div key={itemobj.item._id} className="flex items-center gap-4 border-y-2">

                    <img src={itemobj.item.image1} alt={itemobj.item.name} className="object-cover h-20" />

                    <div>
                      <p className="font-bold">{itemobj.item.name}</p>
                      {itemobj.quality === '4K' ? (<p>Price: Rs.{itemobj.item.fullprice}</p>) : (<p>Price: Rs.{itemobj.item.price}</p>)}
                      <p>Language: {itemobj.language}</p>
                      <p>Quality: {itemobj.quality}</p>

                    </div><button
                      onClick={() => removeItemFromCart(cartItems[0]._id, itemobj.item._id)}
                      className="text-red-600 hover:text-red-800 pr-4"
                    >
                      Remove
                    </button>
                  </div>
                ))}

              </div>

            ) : (
              <p>No items in the cart.</p>
            )}
            <div className="flex items-center gap-10 mt-4">
              {cartItems.length > 0 ? (<h2 className="text-xl font-bold">Total Price: Rs.{cartItems[0].totalPrice}</h2>) : ('')}
              {cartItems.length > 0 ?
                (<button
                  onClick={() => {
                    setOrderPopup(false);
                    setcheckoutPopup(true);
                  }}
                  className='bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 hover:shadow-lg transition duration-300 text-white py-1 px-4 rounded-full font-medium'>
                  Check Out
                </button>) : ('')}
            </div>

          </div>
        </div>

      )}

      {checkoutPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex justify-center items-center">
          <div className=" bg-gray-100 p-6 rounded-md w-full max-w-md relative">
            <IoCloseOutline
              className="absolute top-4 right-4 text-2xl cursor-pointer"
              onClick={() => setcheckoutPopup(false)}
            />
            <div className="flex items-center gap-10 mb-4 ">
               <h2 className="text-xl font-bold">CHECK OUT</h2>
              <button
                onClick={() => {
                  setcheckoutPopup(false);
                  setOrderPopup(true);
                }}
                className='bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 hover:shadow-lg transition duration-300 text-white py-1 px-4 rounded-full font-medium'>
                Back to CART
              </button>
             
            </div>
            {cartItems[0].totalPrice === 0 ? (
              <form onSubmit={handleCompleteOrder}>
                 <h2 className="text-2xl font-semibold mb-2">Total Price: Rs.{cartItems[0].totalPrice}</h2>
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 font-semibold">Enter Your Whatsapp Number:</label>
                  <input
                    type="text"
                    id="whtnum"
                    value={whtnum}
                    onChange={(e) => setwhtnum(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    required
                    placeholder='eg: 0300 1234567'
                  />
                </div>
                <div className="mb-4">
                  <p className="text-green-500 font-semibold">✓ Your order will be delivered to your
                    <span className='flex'><FaWhatsapp className="text-2xl" /> WhatsApp Number in 10 to 15 minutes.</span>
                  </p>
                </div>
                <div className=' flex items-center justify-center'>
                  <button
                    type="submit"
                    className='bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 hover:shadow-lg transition duration-300 text-white py-1 px-4 rounded-full font-medium'>
                    COMPLETE ORDER
                  </button>
                </div>
              </form>
            ) : (
              
              <form onSubmit={handleCompleteOrder}>
                  <h2 className="text-xl font-semibold mb-2">Total Price: Rs.{cartItems[0].totalPrice}</h2>
                <label htmlFor="paymentMethod" className="block font-semibold">1. Pay through Easypaisa/Jazzcash</label>
                <h1>☛Easypaisa (0343-7208277)</h1>
                <h1>☛Jazzcash (0328-1870686)</h1>
                <div className="mb-4">
                  <label htmlFor="paymentProof" className="block mb-2 font-semibold">2. Upload Payment Proof (Image):</label>
                  <input
                    type="file"
                    id="paymentProof"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    className="border rounded-lg p-2 w-full"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 font-semibold">3. Enter Your Whatsapp Number:</label>
                  <input
                    type="text"
                    id="whtnum"
                    value={whtnum}
                    onChange={(e) => setwhtnum(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    required
                    placeholder='eg: 0300 1234567'
                  />
                </div>
                <div className="mb-4">
                  <p className="text-green-500 font-semibold">✓ Your order will be delivered to your
                    <span className='flex'><FaWhatsapp className="text-2xl" /> WhatsApp Number in 10 to 15 minutes.</span>
                  </p>
                </div>
  
                <div className=' flex items-center justify-center'>
                  <button
                    type="submit"
                    className='bg-gradient-to-r from-clr1 to-clr2 hover:scale-105 hover:shadow-lg transition duration-300 text-white py-1 px-4 rounded-full font-medium'>
                    COMPLETE ORDER
                  </button>
                </div>
              </form>
            )}


          </div>
        </div>

      )}

      {loading && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm flex justify-center items-center">
          <div className="flex items-center gap-10 mb-4 ">
            <h2 className="text-xl font-bold text-white">Please Wait Loading...</h2>
          </div>
        </div>

      )}

    </div>
  );
};

export default Navebar;
