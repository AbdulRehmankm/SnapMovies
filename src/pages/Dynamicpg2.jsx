import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navebar from "../ui_comp/Navebar";
import Footer from "../ui_comp/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dynamicpg2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(""); 
  const [selectedQuality, setSelectedQuality] = useState(""); 
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false); // Add loadingImage state
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [screensht, setscreensht] = useState(true); 
   // Add loadingAddToCart state

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://snapmovieserver.onrender.com/api/items/${id}`); // Fetch item details from your API
        setItem(response.data.item);
        setLoading(false);
        setSelectedLanguage(response.data.item.language[0]);
        setSelectedQuality(response.data.item.availableFormats[0]);
      } catch (error) {
        console.error("Error fetching item:", error);
        setLoading(false);
      }
    };
    
    fetchItem();
  }, [id]);


  // Set default language and quality after the item has been fetched
  useEffect(() => {
    if (item) {
      if (item.language && item.language.length > 0) {
        setSelectedLanguage(item.language[0]);
      }
      if (item.availableFormats && item.availableFormats.length > 0) {
        setSelectedQuality(item.availableFormats[0]);
      }
    }
  }, [item]);


  if (loading) return (
    <div>
      <Navebar />
      <div className="flex justify-center items-center h-[500px] text-lg font-semibold text-black mt-8">
            Loading Item...
          </div>   
    </div>
  );

  const productImages = [item.image1, item.image2, item.image3];

  const handleNextImage = () => {
    setscreensht(false);
    setLoadingImage(true); // Set loading before switching the image
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
  };

  const handlePrevImage = () => {
    setscreensht(false);
    setLoadingImage(true); // Set loading before switching the image
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length
    );
  };

  const handleAddToCart = async () => {
    setLoadingAddToCart(true); // Set loading state for the button
    try {
      let tprice;
      if (selectedQuality === '4K') {
        tprice = item.fullprice;
      } else {
        tprice = item.price;
      }
      const token = localStorage.getItem('carttoken'); 
      const response = await axios.post('https://snapmovieserver.onrender.com/api/orders/add', {
        item: item._id,
        language: selectedLanguage,
        quality: selectedQuality,
        price: tprice,
        token,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Make sure to prefix with "Bearer "
        },
      });

      if (response.data.token) {
        localStorage.setItem('carttoken', response.data.token);
      }

      if (response.data.message === 'Item already exists in the cart') {
        toast.warn(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
        });
      } else {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 1000,
          pauseOnHover: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000); // Reload after 2 seconds
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error('Error adding to cart', {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
      });
    } finally {
      setLoadingAddToCart(false); // Reset loading state after the request is done
    }
  };

  return (
    <div>
      <Navebar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl pt-10 pb-10">
          <div className="relative flex justify-center items-center">
            {loadingImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                <div className="loader">Loading...</div>
              </div>
            )}
            <img
              src={productImages[currentImageIndex]}
              alt="Product"
              className="w-full h-auto max-w-lg rounded-lg"
              onLoad={() => setLoadingImage(false)} // Reset loading when image has loaded
            />
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
              <button
                // className="bg-black text-white border p-2 rounded-full"
                className="text-black text-xl font-bold px-2 py-2 border rounded-md bg-gray-200 border-black" 
                onClick={handlePrevImage}
                aria-label="Previous image"
                disabled={loadingImage} // Disable button while loading
              >
                {"<"} 
              </button>


               {screensht? ( 
              <button
                className="text-black text-xl font-bold px-2 py-2 border rounded-md bg-gray-200 border-black" 
                onClick={handleNextImage}
                aria-label="Next image"
                disabled={loadingImage} // Disable button while loading
              >
                {"SCREENSHOTS"}
              </button>
                ): ('')}


              <button
                // className="bg-black text-white border p-2 rounded-full"
                className="text-black text-xl font-bold px-2 py-2 border rounded-md bg-gray-200 border-black" 
                onClick={handleNextImage}
                aria-label="Next image"
                disabled={loadingImage} // Disable button while loading
              >
                {">"}
              </button>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md overflow-y-auto">
            <h1 className="text-2xl font-bold mb-2">{item.name}</h1>

            <div className="mb-4">
              <p className="text-green-500 font-semibold">✓ You Can Download Full {item?.type || "content"}</p>
              <p className="text-green-500 font-semibold">✓ You can also Watch Online Full {item?.type || "content"}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Select Language</h2>
              <div className="flex gap-2 mt-2">
                {item.language.map((language) => (
                  <button
                    key={language}
                    className={`px-4 py-2 border rounded-md hover:bg-gray-200 ${
                      selectedLanguage === language ? "bg-gray-200 border-black" : ""
                    }`}
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold">Select Quality</h2>
              <div className="flex gap-2 mt-2">
                {item.availableFormats.map((quality) => (
                  <button
                    key={quality}
                    className={`px-4 py-2 border rounded-md hover:bg-gray-200 ${
                      selectedQuality === quality ? "bg-gray-200 border-black" : ""
                    }`}
                    onClick={() => setSelectedQuality(quality)}
                  >
                    {quality}
                  </button>
                ))}
              </div>
            </div>

            {selectedQuality === '4K' ? (
              <p className="text-xl font-semibold text-red-500 mb-2">
               <span className="text-gray-500 line-through">Rs.{item.price}</span> Rs.{item.fullprice} <span className="text-gray-500 line-through"> Save 90%</span>
              </p>
            ) : (
              <p className="text-xl font-semibold text-red-500 mb-2">
                Rs.{item.price} <span className="text-gray-500 line-through">Rs.{item.fullprice}</span> Save 90%
              </p>
            )}
            <div className="mb-6">
              <button
                className={`w-full py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 ${
                  loadingAddToCart ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleAddToCart}
                disabled={loadingAddToCart} // Disable button while loading
              >
                {loadingAddToCart ? "Loading..." : "Add to Cart"}
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-700 line-clamp-6">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Dynamicpg2;
